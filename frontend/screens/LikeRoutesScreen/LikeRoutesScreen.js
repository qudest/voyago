import React, { useState, useEffect } from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import BackButton from "../../components/BackButton/BackButton";
import RouteCard from "../../components/RouteCard/RouteCard";
import SettingsButton from "../../components/SettingsButton/SettingsButton";
import { findAllFavorites, deleteFavorites } from "../../services/routesApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0";

const LikeRoutesScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [allFavoriteRoutes, setAllFavoriteRoutes] = useState([]);
  const [displayedRoutes, setDisplayedRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [cityNamesCache, setCityNamesCache] = useState({});

  const [filters, setFilters] = useState({ tags: [], duration: null });
  const [areInitialFiltersLoaded, setAreInitialFiltersLoaded] = useState(false);

  useEffect(() => {
    const loadUserDataAndToken = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const data = await AsyncStorage.getItem("userData");
        if (token) {
          setAccessToken(token);
        }
        if (data) {
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.log("Ошибка загрузки данных пользователя и токена:", error);
      }
    };
    loadUserDataAndToken();
  }, []);

  useEffect(() => {
    const loadFiltersFromStorage = async () => {
      try {
        const storedFilters = await AsyncStorage.getItem("storedFiltersLikes");
        if (storedFilters !== null) {
          setFilters(JSON.parse(storedFilters));
          console.log(
            "Фильтры для избранного загружены из AsyncStorage:",
            JSON.parse(storedFilters)
          );
        }
      } catch (e) {
        console.error(
          "Не удалось загрузить фильтры для избранного из AsyncStorage",
          e
        );
      } finally {
        setAreInitialFiltersLoaded(true);
      }
    };
    loadFiltersFromStorage();
  }, []);

  const getCityName = async (placeId) => {
    const extractCleanPlaceId = (rawId) => {
      if (!rawId) return null;
      if (typeof rawId === "object") return rawId.place_id || rawId.id || null;
      return String(rawId)
        .replace(/^place_id:/i, "")
        .trim();
    };

    const cleanPlaceId = extractCleanPlaceId(placeId);

    if (!cleanPlaceId || !cleanPlaceId.startsWith("ChIJ")) {
      return "Место не указано";
    }

    if (cityNamesCache[cleanPlaceId]) {
      return cityNamesCache[cleanPlaceId];
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${cleanPlaceId}&fields=name,formatted_address&language=ru&key=${API_KEY}`
      );
      const data = await response.json();
      if (data.status !== "OK") {
        return "Место не найдено";
      }
      const name =
        data.result?.name ||
        data.result?.formatted_address ||
        "Название недоступно";
      setCityNamesCache((prev) => ({ ...prev, [cleanPlaceId]: name }));
      return name;
    } catch (error) {
      return "Ошибка загрузки";
    }
  };

  useEffect(() => {
    if (accessToken && userData?.id) {
      loadAllFavorites();
    }
  }, [accessToken, userData]);

  const loadAllFavorites = async () => {
    if (!userData?.id || !accessToken) return;
    setLoading(true);
    try {
      const response = await findAllFavorites(userData.id, accessToken);
      const favoritesData =
        response.data && Array.isArray(response.data)
          ? response.data
          : response.data.data && Array.isArray(response.data.data)
          ? response.data.data
          : [];

      const routesWithDetails = await Promise.all(
        favoritesData.map(async (route) => {
          if (!route.routePoints) return { ...route, isFavorite: true };

          const processPoint = async (point) => {
            if (!point) return "Точка не указана";
            return await getCityName(point);
          };

          const [originName, ...waypointNames] = await Promise.all([
            processPoint(route.routePoints.origin),
            ...(route.routePoints.waypoints || []).map(processPoint),
          ]);

          const destinationName = await processPoint(
            route.routePoints.destination
          );

          return {
            ...route,
            pointNames: [originName, ...waypointNames, destinationName],
            isFavorite: true,
          };
        })
      );
      setAllFavoriteRoutes(routesWithDetails);
    } catch (error) {
      console.log(
        "Ошибка загрузки избранных маршрутов:",
        error,
        error.response
      );
      setAllFavoriteRoutes([]);
    } finally {
      setLoading(false);
    }
  };

  const getDurationOption = (durationId) => {
    const durationOptions = [
      { id: "LESS_THAN_HOUR", value: { from: 0, to: 3600 } },
      { id: "ONE_TO_TWO_HOURS", value: { from: 3600, to: 7200 } },
      { id: "MORE_THAN_TWO_HOURS", value: { from: 7200, to: null } },
    ];
    return durationOptions.find((opt) => opt.id === durationId);
  };

  useEffect(() => {
    if (!areInitialFiltersLoaded || loading) return;

    let routesToFilter = [...allFavoriteRoutes];

    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      routesToFilter = routesToFilter.filter(
        (route) =>
          (route.name || "").toLowerCase().includes(searchLower) ||
          (route.title || "").toLowerCase().includes(searchLower)
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      routesToFilter = routesToFilter.filter(
        (route) =>
          route.tags && filters.tags.every((tag) => route.tags.includes(tag))
      );
    }

    if (filters.duration) {
      const durationOption = getDurationOption(filters.duration);
      if (durationOption) {
        routesToFilter = routesToFilter.filter((route) => {
          const routeDuration = route.duration;
          if (routeDuration === undefined || routeDuration === null)
            return false;
          if (routeDuration < durationOption.value.from) return false;
          if (
            durationOption.value.to !== null &&
            routeDuration > durationOption.value.to
          )
            return false;
          return true;
        });
      }
    }
    setDisplayedRoutes(routesToFilter);
  }, [
    allFavoriteRoutes,
    searchQuery,
    filters,
    areInitialFiltersLoaded,
    loading,
  ]);

  const formatDuration = (seconds) => {
    if (seconds === null || seconds === undefined) return "N/A";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours > 0 ? `${hours} ч ` : ""}${minutes} мин`;
  };

  const handlerBackButton = () => navigation.navigate("ProfileScreen");

  const handleSettingsButton = () => {
    navigation.navigate("FiltersScreen", {
      currentAppliedFilters: filters,
      onApplyFilters: async (newFiltersFromScreen) => {
        setFilters(newFiltersFromScreen);
        try {
          await AsyncStorage.setItem(
            "storedFiltersLikes",
            JSON.stringify(newFiltersFromScreen)
          );
          console.log(
            "Фильтры для избранного сохранены в AsyncStorage:",
            newFiltersFromScreen
          );
        } catch (e) {
          console.error(
            "Не удалось сохранить фильтры для избранного в AsyncStorage",
            e
          );
        }
      },
    });
  };

  const handleLikePress = async (route, isLiked) => {
    if (!userData?.id || !accessToken) return;
    try {
      if (!isLiked) {
        await deleteFavorites(route.id, userData.id, accessToken);
        setAllFavoriteRoutes((prev) => prev.filter((r) => r.id !== route.id));
      }
    } catch (error) {
      console.log("Ошибка при обновлении избранного:", error);
    }
  };

  const handleRoutePress = (route) => {
    navigation.navigate("PreviewRouteScreen", {
      routeData: {
        id: route.id,
        name: route.name,
        rating: parseFloat(route.rating),
        distance: route.distance,
        duration: route.duration,
        pointNames: route.pointNames,
        routePoints: {
          origin: route.routePoints.origin,
          destination: route.routePoints.destination,
          waypoints: route.routePoints.waypoints || [],
        },
        coordinates: route.coordinates,
      },
    });
  };

  const mapRouteToCardInfo = (route) => {
    if (!route) return null;
    return {
      id: route.id,
      title: route.name || route.title || "Без названия",
      time: formatDuration(route.duration),
      distance: `${((route.distance || 0) / 1000).toFixed(1)}`,
      points: route.pointNames || ["Загрузка...", "Загрузка..."],
      rating: route.rating || 0,
    };
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={handlerBackButton} />
      <Text style={styles.containerTitle}>Избранные маршруты</Text>

      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            placeholder=""
            onChangeText={setSearchQuery}
            placeholderTextColor={
              styles.searchInput.placeholderTextColor || "#8E8E93"
            }
          />
          <Image
            source={require("../../assets/search.png")}
            style={styles.searchIcon}
          />
        </View>
        <SettingsButton
          onPress={handleSettingsButton}
          style={styles.settingsButton}
        />
      </View>

      <ScrollView
        style={styles.buttonContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {loading && displayedRoutes.length === 0 ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : (
          <>
            {displayedRoutes.map((route) => {
              const cardInfo = mapRouteToCardInfo(route);
              if (!cardInfo) return null;
              return (
                <RouteCard
                  key={route.id}
                  cardInformation={cardInfo}
                  functional="like"
                  onPress={() => handleRoutePress(route)}
                  onLikePress={(isLiked) => handleLikePress(route, isLiked)}
                  isLiked={true}
                />
              );
            })}

            {!loading && displayedRoutes.length === 0 && (
              <Text style={styles.noResults}>
                {searchQuery || filters.tags.length > 0 || filters.duration
                  ? "Маршруты по вашим критериям не найдены"
                  : "У вас нет избранных маршрутов"}
              </Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default LikeRoutesScreen;
