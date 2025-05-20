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
import { findAllFavorites, deleteFavorites } from "../../services/routesApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0";

const MyRoutesScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [cityNamesCache, setCityNamesCache] = useState({});

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const data = await AsyncStorage.getItem("userData");
        if (token && data) {
          setAccessToken(token);
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };
    loadUserData();
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
      loadFavorites();
    }
  }, [accessToken, userData]);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const response = await findAllFavorites(userData.id, accessToken);
      const favoriteIds = response.data.map((route) => route.id);
      const routesWithCityNames = await Promise.all(
        response.data.map(async (route) => {
          if (!route.routePoints) return route;

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
            time: formatDuration(route.duration),
            distance: (route.distance / 1000).toFixed(1),
          };
        })
      );

      setRoutes(routesWithCityNames);
    } catch (error) {
      console.error("Ошибка загрузки избранных маршрутов:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours > 0 ? `${hours} ч ` : ""}${minutes} мин`;
  };

  const filteredRoutes = routes.filter((route) => {
    if (!searchQuery.trim()) return true;
    const searchLower = searchQuery.toLowerCase();
    return route.title.toLowerCase().includes(searchLower);
  });

  const handlerBackButton = () => navigation.navigate("ProfileScreen");
  const handleFiltersButton = () => navigation.navigate("FiltersScreen");

  const handleLikePress = async (route, isLiked) => {
    try {
      if (!isLiked) {
        console.log(route.id, userData.id, accessToken);
        await deleteFavorites(route.id, userData.id, accessToken);
        setRoutes((prev) => prev.filter((r) => r.id !== route.id));
      }
    } catch (error) {
      console.error("Ошибка при обновлении избранного:", error);
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

  return (
    <View style={styles.container}>
      <BackButton onPress={handlerBackButton} />
      <Text style={styles.containerTitle}>Избранные маршруты</Text>

      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            placeholder="Поиск маршрутов"
            onChangeText={setSearchQuery}
          />
          <Image
            source={require("../../assets/search.png")}
            style={styles.searchIcon}
          />
        </View>
        <TouchableOpacity
          style={styles.settingsContainer}
          onPress={handleFiltersButton}
        >
          <Image
            source={require("../../assets/routeCardImages/settings.png")}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.buttonContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : (
          <>
            {filteredRoutes.map((route) => (
              <RouteCard
                key={route.id}
                cardInformation={{
                  id: route.id,
                  title: route.name || route.title,
                  time: route.time,
                  distance: route.distance,
                  points: route.pointNames,
                  rating: route.rating,
                }}
                functional="like"
                onPress={() => handleRoutePress(route)}
                onLikePress={(isLiked) => handleLikePress(route, isLiked)}
                isLiked={true}
              />
            ))}

            {filteredRoutes.length === 0 && !loading && (
              <Text style={styles.noResults}>
                {searchQuery
                  ? "Маршруты не найдены"
                  : "У вас нет избранных маршрутов"}
              </Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default MyRoutesScreen;
