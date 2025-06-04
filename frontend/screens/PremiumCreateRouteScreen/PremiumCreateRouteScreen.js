import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios";
import polyline from "@mapbox/polyline";
import BackButton from "../../components/BackButton/BackButton";
import ChooseButton from "../../components/ChooseButton/ChooseButton";
import { useNavigation } from "@react-navigation/native";
import GenerateRoute from "../../components/GenerateRoute/GenerateRoute";
import { aiRoute } from "../../services/premiumApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addToFavorites, deleteFavorites } from "../../services/routesApi";
import { RouteCreate } from "../../services/routesApi";

const PremiumCreateRouteScreen = () => {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likeRoute, setLikeRoute] = useState(false);

  const API_KEY = "AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0";

  useEffect(() => {
    if (userData && accessToken && !routeData) {
      handleGenerateButton();
    }
  }, [userData, accessToken]);

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
        console.log("Ошибка загрузки данных:", error);
      }
    };
    loadUserData();
  }, []);

  const getPlaceDetails = async (placeId) => {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/place/details/json",
        {
          params: {
            place_id: placeId.replace("place_id:", ""),
            fields: "geometry,name",
            key: API_KEY,
            language: "ru",
          },
        }
      );
      const { location } = response.data.result.geometry;
      const name = response.data.result.name;
      return { lat: location.lat, lng: location.lng, name };
    } catch (error) {
      console.log("Ошибка получения места:", placeId, error);
      return null;
    }
  };

  const handleGenerateButton = async () => {
    try {
      setLoading(true);
      const phoneNumber = userData.phoneNumber;
      const country = "Россия";
      const city = userData.city;
      const response = await aiRoute(phoneNumber, country, city, accessToken);

      const { routePoints } = response.data;

      const uniquePlaceIds = Array.from(
        new Set([
          routePoints.origin,
          ...(routePoints.waypoints || []),
          routePoints.destination,
        ])
      );

      const placeDetails = await Promise.all(
        uniquePlaceIds.map(getPlaceDetails)
      );
      const origin = placeDetails[0];
      const destination = placeDetails[placeDetails.length - 1];
      const waypoints = placeDetails.slice(1, -1);

      const allPoints = [origin, ...waypoints, destination];

      const markers = allPoints.map((point, index) => ({
        coordinate: {
          latitude: point.lat,
          longitude: point.lng,
        },
        title: point.name || `Точка ${index + 1}`,
        image: require("../../assets/markers/defaultdarkmini2.png"),
      }));

      const pointNames = allPoints.map((p) => p.name);

      const directionsResponse = await axios.get(
        "https://maps.googleapis.com/maps/api/directions/json",
        {
          params: {
            origin: `place_id:${routePoints.origin.replace("place_id:", "")}`,
            destination: `place_id:${routePoints.destination.replace(
              "place_id:",
              ""
            )}`,
            waypoints: (routePoints.waypoints || [])
              .map((wp) => `place_id:${wp.replace("place_id:", "")}`)
              .join("|"),
            mode: "walking",
            key: API_KEY,
            language: "ru",
          },
        }
      );

      let totalDistance = 0;
      let totalDuration = 0;
      let routeCoordinates = [];

      if (
        directionsResponse.data &&
        directionsResponse.data.routes &&
        directionsResponse.data.routes.length > 0
      ) {
        const route = directionsResponse.data.routes[0];
        route.legs.forEach((leg) => {
          totalDistance += leg.distance.value;
          totalDuration += leg.duration.value;
        });
        const points = polyline.decode(route.overview_polyline.points);
        routeCoordinates = points.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));
      }

      setCoordinates(routeCoordinates);
      setRouteData({
        ...response.data,
        name: response.data.name || "Случайный маршрут",
        distance: totalDistance,
        duration: totalDuration,
        markers,
        pointNames,
        coordinates: routeCoordinates,
        routePoints: {
          origin: routePoints.origin,
          destination: routePoints.destination,
          waypoints: routePoints.waypoints || [],
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const defaultRegion = {
    latitude: 55.751244,
    longitude: 37.618423,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const formatMetrics = (distance, duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    return {
      distance: `${(distance / 1000).toFixed(1)} км`,
      duration: `${hours > 0 ? `${hours} ч ` : ""}${minutes} мин`,
    };
  };

  const { distance, duration } = routeData
    ? formatMetrics(routeData.distance, routeData.duration)
    : { distance: "--", duration: "--" };

  const handleBackButton = () => {
<<<<<<< HEAD
    navigation.navigate("ProfileScreen");
=======
    navigation.navigate("RecommendationsRoutesScreen");
>>>>>>> 49c8e3ef83e0059942e37c5441610f100e7ea6b5
  };

  const handleChooseRoute = async () => {
    if (!routeData) {
      return;
    }

    const routeInfo = {
      id: routeData.id || Date.now().toString(),
      name: routeData.name,
      coordinates: routeData.coordinates,
      markers: routeData.markers,
      distance: routeData.distance,
      duration: routeData.duration,
      points: routeData.pointNames,
      routePoints: routeData.routePoints,
    };

    const latitudes = routeData.coordinates.map((c) => c.latitude);
    const longitudes = routeData.coordinates.map((c) => c.longitude);

    routeInfo.region = {
      latitude: (Math.min(...latitudes) + Math.max(...latitudes)) / 2,
      longitude: (Math.min(...longitudes) + Math.max(...longitudes)) / 2,
      latitudeDelta:
        Math.abs(Math.max(...latitudes) - Math.min(...latitudes)) * 1.5 + 0.01,
      longitudeDelta:
        Math.abs(Math.max(...longitudes) - Math.min(...longitudes)) * 1.5 +
        0.01,
    };

    const cleanRoutePoints = {
      origin:
        typeof routeData.routePoints.origin === "string"
          ? routeData.routePoints.origin
          : routeData.routePoints.origin.place_id ||
            routeData.routePoints.origin.id,

      destination:
        typeof routeData.routePoints.destination === "string"
          ? routeData.routePoints.destination
          : routeData.routePoints.destination.place_id ||
            routeData.routePoints.destination.id,

      waypoints: (routeData.routePoints.waypoints || []).map((wp) =>
        typeof wp === "string" ? wp : wp.place_id || wp.id
      ),
    };

    try {
      const response = await RouteCreate(
        routeData.name || "Без названия",
        Number(userData.id),
        userData.preferences || [],
        cleanRoutePoints,
        routeData.distance,
        routeData.duration,
        accessToken
      );

      if (response?.data?.id) {
        const routeId = response.data.id;
        setRouteData((prev) => ({ ...prev, id: routeId }));
        routeInfo.id = routeId;
      } else {
        console.log("Не удалось сохранить маршрут");
      }

      navigation.navigate("MainScreen", { selectedRoute: routeInfo });
    } catch (error) {
      console.log("Ошибка при сохранении маршрута:", error);
    }
  };

  const handleLikePress = async () => {
    const newLikeState = !likeRoute;
    setLikeRoute(newLikeState);

    if (!routeData || !userData || !accessToken) {
      console.log("Нет данных для выполнения действия");
      return;
    }

    if (newLikeState) {
      try {
        let routeId = routeData.id;

        if (!routeId) {
          const cleanRoutePoints = {
            origin:
              typeof routeData.routePoints.origin === "string"
                ? routeData.routePoints.origin
                : routeData.routePoints.origin.place_id ||
                  routeData.routePoints.origin.id,

            destination:
              typeof routeData.routePoints.destination === "string"
                ? routeData.routePoints.destination
                : routeData.routePoints.destination.place_id ||
                  routeData.routePoints.destination.id,

            waypoints: (routeData.routePoints.waypoints || []).map((wp) =>
              typeof wp === "string" ? wp : wp.place_id || wp.id
            ),
          };

          console.log(
            routeData.name,
            Number(userData.id),
            userData.preferences,
            cleanRoutePoints,
            routeData.distance,
            routeData.duration,
            accessToken
          );
          const response = await RouteCreate(
            routeData.name || "Без названия",
            Number(userData.id),
            userData.preferences || [],
            cleanRoutePoints,
            routeData.distance,
            routeData.duration,
            accessToken
          );

          console.log(response);
          if (response?.data?.id) {
            routeId = response.data.id;
            setRouteData((prev) => ({ ...prev, id: routeId }));
          } else {
            console.log("Не удалось сохранить маршрут");
          }
        }

        await addToFavorites(routeId, userData.id, accessToken);
        console.log("Маршрут успешно добавлен в избранное");
      } catch (error) {
        console.log(
          "Ошибка при добавлении маршрута в избранное:",
          error?.response?.data || error
        );
      }
    } else {
      try {
        if (!routeData?.id) {
          console.log("Невозможно удалить из избранного: нет ID маршрута");
          return;
        }

        await deleteFavorites(routeData.id, userData.id, accessToken);
        console.log("Маршрут успешно удалён из избранного");
      } catch (error) {
        console.log("Ошибка при удалении маршрута из избранного:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={handleBackButton} />
      <View style={styles.titleContainer}>
        <Text style={styles.titlePremium}>Премиум</Text>
        <Text style={styles.descriptionPremium}>
          Маршрут по вашим предпочтениям
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GenerateRoute onPress={handleGenerateButton} />
        <View>
          <View style={styles.infoContainer}>
            <TouchableOpacity
              style={styles.functionalImage}
              onPress={handleLikePress}
            >
              <Image
                source={
                  likeRoute
                    ? require("../../assets/routeCardImages/likecolor.png")
                    : require("../../assets/routeCardImages/like.png")
                }
              />
            </TouchableOpacity>
            <Text style={styles.nameOfRoute}>
              {routeData ? routeData.name : "Загрузка..."}
            </Text>
            <View style={styles.contentPoints}>
              {routeData?.pointNames?.map((point, index) => (
                <Text key={`point-${index}`} style={styles.pointText}>
                  {point}
                </Text>
              ))}
            </View>
            <View style={styles.timeDistanceContainer}>
              <View style={styles.timeContainer}>
                <Image
                  source={require("../../assets/routeCardImages/clock.png")}
                  style={styles.timeImage}
                />
                <Text style={styles.time}>{duration}</Text>
              </View>
              <Text style={styles.distance}>{distance}</Text>
            </View>
            <View style={styles.mapContainer}>
              {loading ? (
                <ActivityIndicator size="large" style={styles.loader} />
              ) : (
                <MapView
                  style={styles.map}
                  initialRegion={defaultRegion}
                  region={defaultRegion}
                >
                  {routeData?.markers?.map((marker, index) => (
                    <Marker
                      key={`marker-${index}`}
                      coordinate={marker.coordinate}
                      title={marker.title}
                      image={require("../../assets/markers/defaultdarkmini2.png")}
                    />
                  ))}
                  {coordinates.length > 0 && (
                    <Polyline
                      coordinates={coordinates}
                      strokeColor="#464BDC"
                      strokeWidth={4}
                    />
                  )}
                </MapView>
              )}
            </View>
            <ChooseButton onPress={handleChooseRoute} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PremiumCreateRouteScreen;
