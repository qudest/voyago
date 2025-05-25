import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, ScrollView, Text } from "react-native";
import styles from "./styles";
import BackButton from "../../components/BackButton/BackButton";
import AdminRouteCard from "../../components/AdminRouteCard/AdminRouteCard";
import { useNavigation } from "@react-navigation/native";
import { findAllRoutes, deleteRoute } from "../../services/adminApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertDelete from "../../components/AlertDelete/AlertDelete";

const API_KEY = "AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0";

const AdminRoutesScreen = () => {
  const navigation = useNavigation();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [cityNamesCache, setCityNamesCache] = useState({});
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  useEffect(() => {
    const fetchCachedData = async () => {
      try {
        const cachedUserData = await AsyncStorage.getItem("userData");
        const storedAccessToken = await AsyncStorage.getItem("accessToken");
        setAccessToken(storedAccessToken);
        setTokenLoaded(true);
        if (cachedUserData) {
          setUserData(JSON.parse(cachedUserData));
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
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
      const name =
        data.result?.name ||
        data.result?.formatted_address ||
        "Название недоступно";
      setCityNamesCache((prev) => ({ ...prev, [cleanPlaceId]: name }));
      return name;
    } catch (error) {
      console.log("Ошибка загрузки");
    }
  };

  const loadRoutes = async () => {
    if (!tokenLoaded || !accessToken) return;

    setLoading(true);
    try {
      const response = await findAllRoutes(accessToken);
      const allRoutesArray = response?.data?.data || [];

      const routesWithCityNames = await Promise.all(
        allRoutesArray.map(async (route) => {
          if (!route.routePoints) return route;

          const processPoint = async (point) => {
            return point ? await getCityName(point) : "Точка не указана";
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
    if (tokenLoaded && userData) {
      loadRoutes();
    }
  }, [tokenLoaded, userData]);

  const handleBackPress = () => navigation.navigate("AdminScreen");

  const handleDelete = (routeId) => {
    setSelectedRouteId(routeId);
    setDeleteModalVisible(true);
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setSelectedRouteId(null);
  };

  const confirmDelete = async () => {
    if (!selectedRouteId) return;

    setIsLoadingDelete(true);
    try {
      await deleteRoute(selectedRouteId, accessToken);
      await loadRoutes();
    } catch (error) {
      console.log("Ошибка при удалении маршрута:", error);
    } finally {
      setIsLoadingDelete(false);
      setDeleteModalVisible(false);
      setSelectedRouteId(null);
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours > 0 ? `${hours} ч ` : ""}${minutes} мин`;
  };

  const mapRouteToCard = (route) => ({
    id: route.id,
    title: route.name || "Без названия",
    time: formatDuration(route.duration || 0),
    distance: `${((route.distance || 0) / 1000).toFixed(1)}`,
    points: route.pointNames || ["Загрузка..."],
    rating: route.rating || 0,
  });

  return (
    <View style={styles.container}>
      <BackButton onPress={handleBackPress} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : (
          routes.map((route) => (
            <AdminRouteCard
              key={route.id}
              cardInformation={mapRouteToCard(route)}
              onPress={() => handleDelete(route.id)}
            />
          ))
        )}

        {!loading && routes.length === 0 && (
          <Text style={styles.noResults}>Маршруты не найдены</Text>
        )}
      </ScrollView>

      <AlertDelete
        isVisible={isDeleteModalVisible}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title="Удаление маршрута"
        message="Вы точно хотите удалить маршрут?"
        isLoading={isLoadingDelete}
      />
    </View>
  );
};

export default AdminRoutesScreen;
