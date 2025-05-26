import React, { useState, useEffect } from "react";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import BackButton from "../../components/BackButton/BackButton";
import RouteCard from "../../components/RouteCard/RouteCard";
import SettingsButton from "../../components/SettingsButton/SettingsButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { findAll } from "../../services/routesApi";

const API_KEY = "AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0";

const MyRoutesScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [allMyRoutes, setAllMyRoutes] = useState([]);
  const [displayedRoutes, setDisplayedRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [cityNamesCache, setCityNamesCache] = useState({});
  const routeNavHook = useRoute();

  const [filters, setFilters] = useState({ tags: [], duration: null });
  const [areInitialFiltersLoaded, setAreInitialFiltersLoaded] = useState(false);

  const [initialLoadAttempted, setInitialLoadAttempted] = useState(false);

  useEffect(() => {
    const fetchCachedUserAndToken = async () => {
      try {
        const cachedData = await AsyncStorage.getItem("userData");
        const token = await AsyncStorage.getItem("accessToken");
        setAccessToken(token);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setUserData(parsedData);
        }
      } catch (error) {
        console.log(
          "Ошибка при получении данных пользователя и токена из кэша:",
          error
        );
      }
    };
    fetchCachedUserAndToken();
  }, []);

  useEffect(() => {
    const loadFiltersFromStorage = async () => {
      try {
        const storedFilters = await AsyncStorage.getItem(
          "storedFiltersMyRoutes"
        );
        if (storedFilters !== null) {
          setFilters(JSON.parse(storedFilters));
          console.log(
            "Фильтры для 'Мои маршруты' загружены из AsyncStorage:",
            JSON.parse(storedFilters)
          );
        }
      } catch (e) {
        console.log(
          "Не удалось загрузить фильтры для 'Мои маршруты' из AsyncStorage",
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
      console.log("Ошибка getCityName:", error);
      return "Ошибка загрузки";
    }
  };

  const fetchAllMyRoutes = async () => {
    if (!accessToken) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await findAll(accessToken, filters);

      const routesData =
        response.data && Array.isArray(response.data)
          ? response.data
          : response.data?.data && Array.isArray(response.data.data)
          ? response.data.data
          : [];

      const filteredRoutes = routesData.filter(
        (route) => route.createdBy === userData.id
      );

      const routesWithCityNames = await Promise.all(
        filteredRoutes.map(async (route) => {
          if (!route.routePoints)
            return { ...route, pointNames: ["Точки не указаны"] };
          const processPoint = async (point) => {
            if (!point) return "Точка не указана";
            return await getCityName(point);
          };
          const originName = await processPoint(route.routePoints.origin);
          const waypointNames = route.routePoints.waypoints
            ? await Promise.all(route.routePoints.waypoints.map(processPoint))
            : [];
          const destinationName = await processPoint(
            route.routePoints.destination
          );
          return {
            ...route,
            pointNames: [originName, ...waypointNames, destinationName].filter(
              Boolean
            ),
          };
        })
      );
      setAllMyRoutes(routesWithCityNames);
    } catch (err) {
      setError(err.message || "Произошла неизвестная ошибка");
      console.log(
        'Ошибка загрузки "моих" маршрутов:',
        err.response?.data || err.message || err
      );
      setAllMyRoutes([]);
    } finally {
      setLoading(false);
      setInitialLoadAttempted(true);
    }
  };

  useEffect(() => {
    if (accessToken && areInitialFiltersLoaded) {
      if (!initialLoadAttempted || (allMyRoutes.length === 0 && !error)) {
        fetchAllMyRoutes();
      }
    }
  }, [accessToken, areInitialFiltersLoaded, initialLoadAttempted]);

  const getDurationOption = (durationId) => {
    const durationOptions = [
      { id: "LESS_THAN_HOUR", value: { from: 0, to: 3600 } },
      { id: "ONE_TO_TWO_HOURS", value: { from: 3600, to: 7200 } },
      { id: "MORE_THAN_TWO_HOURS", value: { from: 7200, to: Infinity } },
    ];
    return durationOptions.find((opt) => opt.id === durationId);
  };

  useEffect(() => {
    if (!areInitialFiltersLoaded) return;

    let routesToFilter = [...allMyRoutes];

    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      const ignoreWords = [
        "выбрать",
        "место не указано",
        "ошибка загрузки",
        "место не найдено",
        "название недоступно",
      ];

      routesToFilter = routesToFilter.filter((route) => {
        const titleMatch = (route.name || "")
          .toLowerCase()
          .includes(searchLower);
        const pointsMatch = route.pointNames?.some((point) => {
          const pointLower = (point || "").toLowerCase();
          return (
            !ignoreWords.some((word) => pointLower.includes(word)) &&
            pointLower.includes(searchLower)
          );
        });
        return titleMatch || pointsMatch;
      });
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
            durationOption.value.to !== Infinity &&
            routeDuration > durationOption.value.to
          )
            return false;
          return true;
        });
      }
    }
    setDisplayedRoutes(routesToFilter);
  }, [allMyRoutes, searchQuery, filters, areInitialFiltersLoaded]);

  const formatMetrics = (distance, duration) => {
    if (
      distance === null ||
      distance === undefined ||
      duration === null ||
      duration === undefined
    ) {
      return { distance: "N/A", duration: "N/A" };
    }
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    return {
      distance: `${(distance / 1000).toFixed(1)}`,
      duration: `${hours > 0 ? `${hours} ч ` : ""}${minutes} мин`,
    };
  };

  const handlerBackButton = () => {
    navigation.goBack();
  };

  const handleSettingsButton = () => {
    navigation.navigate("FiltersScreen", {
      currentAppliedFilters: filters,
      onApplyFilters: async (newFiltersFromScreen) => {
        setFilters(newFiltersFromScreen);
        try {
          await AsyncStorage.setItem(
            "storedFiltersMyRoutes",
            JSON.stringify(newFiltersFromScreen)
          );
          console.log(
            "Фильтры для 'Мои маршруты' сохранены в AsyncStorage:",
            newFiltersFromScreen
          );
        } catch (e) {
          console.log(
            "Не удалось сохранить фильтры для 'Мои маршруты' в AsyncStorage",
            e
          );
        }
      },
      sourceScreen: "MyRoutesScreen",
    });
  };

  const handleEditRoute = (route) => {
    navigation.navigate("EditRouteScreen", {
      routeData: {
        id: route.id,
        name: route.name,
        rating: parseFloat(route.rating),
        distance: route.distance,
        duration: route.duration,
        pointNames: route.pointNames,
        routePoints: route.routePoints,
        coordinates: route.coordinates,
        tags: route.tags,
      },
    });
  };

  const handlePreviewRoute = (route) => {
    navigation.navigate("PreviewRouteScreen", {
      routeData: {
        id: route.id,
        name: route.name,
        rating: parseFloat(route.rating),
        distance: route.distance,
        duration: route.duration,
        pointNames: route.pointNames,
        routePoints: route.routePoints,
        coordinates: route.coordinates,
        // tags: route.tags,
      },
    });
  };

  const mapRouteToCard = (route) => {
    const metrics = formatMetrics(route.distance, route.duration);
    return {
      id: route.id,
      title: route.name || "Без названия",
      time: metrics.duration,
      distance: metrics.distance,
      points: route.pointNames || [],
      rating: route.rating || 0,
    };
  };

  if (loading && !initialLoadAttempted) {
    return (
      <View style={styles.container}>
        <BackButton onPress={handlerBackButton} />
        <ActivityIndicator size="large" style={styles.loader} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <BackButton onPress={handlerBackButton} />
        <View style={styles.centeredMessageContainer}>
          <Text style={styles.errorText}>
            Что-то пошло не так. Попробуйте позже.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton onPress={handlerBackButton} />
      <Text style={styles.containerTitle}>Мои маршруты</Text>

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

      {loading && initialLoadAttempted && (
        <ActivityIndicator size="small" style={styles.inlineLoader} />
      )}

      <ScrollView
        style={styles.buttonContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {displayedRoutes.length > 0 &&
          displayedRoutes.map((route) => {
            const cardInfo = mapRouteToCard(route);
            if (!cardInfo) return null;
            return (
              <RouteCard
                key={route.id}
                cardInformation={cardInfo}
                functional="edit"
                onEditPress={() => handleEditRoute(route)}
                onPress={() => handlePreviewRoute(route)}
              />
            );
          })}

        {initialLoadAttempted &&
          !loading &&
          !error &&
          displayedRoutes.length === 0 && (
            <View style={styles.centeredMessageContainer}>
              <Text style={styles.noResults}>
                {searchQuery ||
                (filters.tags && filters.tags.length > 0) ||
                filters.duration
                  ? "Маршруты по вашим критериям не найдены"
                  : "У вас пока нет созданных маршрутов"}
              </Text>
            </View>
          )}
      </ScrollView>
    </View>
  );
};

export default MyRoutesScreen;
