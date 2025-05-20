import React, { useState, useEffect } from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import BackButton from "../../components/BackButton/BackButton";
import RouteCard from "../../components/RouteCard/RouteCard";
import SettingsButton from "../../components/SettingsButton/SettingsButton";
import PremiunRoutesButton from "../../components/PremiumRoutesButton/PremiumRoutesButton";
import { findAll } from "../../services/routesApi";
import { postRating } from "../../services/ratingApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppMetrica from "@appmetrica/react-native-analytics";

const API_KEY = "AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0";

const RecommendationsRoutesScreen = () => {
  const navigation = useNavigation();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [cityNamesCache, setCityNamesCache] = useState({});

  const handlePremiumCreateRoutesButton = () => {
    AppMetrica.reportEvent("Премиум", {
      action_type: "Просмотр экрана премиум маршрутов",
      button_name: "премиум_маршруты",
      screen: "Экран просмотра маршрутов",
    });
    navigation.navigate("PremiumCreateRouteScreen");
  };

  useEffect(() => {
    const fetchCachedData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem("userData");
        const accessToken = await AsyncStorage.getItem("accessToken");
        setAccessToken(accessToken);
        setTokenLoaded(true);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setUserData(parsedData);
          console.log("Данные из кэша:", parsedData);
        }
      } catch (error) {
        console.error("Ошибка при получении данных из кэша:", error);
        setTokenLoaded(true);
      }
    };

    fetchCachedData();
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

  const loadRoutes = async (reset = false) => {
    if (!tokenLoaded || (loading && !reset)) return;
    if (!accessToken) return;

    setLoading(true);
    try {
      const response = await findAll(accessToken);

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
          };
        })
      );

      setRoutes(routesWithCityNames);
    } catch (error) {
      console.log("Ошибка загрузки маршрутов:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tokenLoaded) {
      loadRoutes(true);
    }
  }, [filter, tokenLoaded]);

  const handlerBackButton = () => navigation.navigate("MainScreen");
  const handleSettingsButton = () =>
    navigation.navigate("FiltersScreen", {
      onApplyFilters: (newFilters) => setFilter(newFilters),
    });
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

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      if (hasMore && !loading) loadRoutes();
    }
  };

  const mapRouteToCard = (route) => {
    if (!route.routePoints) {
      console.error("Отсутствуют routePoints в маршруте:", route);
      return null;
    }

    return {
      id: route.id,
      title: route.name || "Без названия",
      time: formatDuration(route.duration || 0),
      distance: `${((route.distance || 0) / 1000).toFixed(1)}`,
      points: route.pointNames || [
        "Загрузка...",
        ...(route.routePoints.waypoints || []).map(() => "Загрузка..."),
        "Загрузка...",
      ],
      rating: route.rating || 0,
    };
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours > 0 ? `${hours} ч ` : ""}${minutes} мин`;
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={handlerBackButton} />
      <View style={styles.header}>
        <PremiunRoutesButton onPress={handlePremiumCreateRoutesButton} />
        <SettingsButton onPress={handleSettingsButton} />
      </View>

      <ScrollView
        style={styles.buttonContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        {loading && page === 0 ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : (
          routes.map((route) => (
            <RouteCard
              key={route.id}
              cardInformation={mapRouteToCard(route)}
              functional="like"
              onPress={() => handleRoutePress(route)}
            />
          ))
        )}

        {!loading && routes.length === 0 && (
          <Text style={styles.noResults}>Маршруты не найдены</Text>
        )}

        {loading && page > 0 && (
          <ActivityIndicator size="small" style={styles.loader} />
        )}
      </ScrollView>
    </View>
  );
};

export default RecommendationsRoutesScreen;
