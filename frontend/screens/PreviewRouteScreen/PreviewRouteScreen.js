import React, { useState, useEffect, useRef } from "react"; // Добавил useRef
import {
  View,
  Image,
  ActivityIndicator,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import polyline from "@mapbox/polyline";
import axios from "axios";
import styles from "./styles";
import BackButton from "../../components/BackButton/BackButton";
import ChooseButton from "../../components/ChooseButton/ChooseButton";
import { getRating } from "../../services/ratingApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppMetrica from "@appmetrica/react-native-analytics";

const PreviewRouteScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [routeInfo, setRouteInfo] = useState({
    id: null,
    name: "",
    coordinates: [],
    markers: [],
    region: null,
    distance: 0,
    duration: 0,
    points: [],
  });
  const [accessToken, setAccessToken] = useState(null);
  const [rating, setRating] = useState(null);
  const isMountedRef = useRef(true);

  const API_KEY = "AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0";

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (isMountedRef.current) {
          setAccessToken(token);
        }
      } catch (error) {
        console.log("Ошибка загрузки accessToken:", error);
        if (isMountedRef.current) {
          setAccessToken(null);
        }
      }
    };
    fetchUserToken();
  }, []);

  const formatMetrics = (distance, duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    return {
      distance: `${(distance / 1000).toFixed(1)} км`,
      duration: `${hours > 0 ? `${hours} ч ` : ""}${minutes} мин`,
    };
  };

  const getCoordinatesFromPlaceId = async (placeId) => {
    try {
      const cleanPlaceId = String(placeId).replace("place_id:", "");
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/place/details/json",
        {
          params: {
            place_id: cleanPlaceId,
            fields: "geometry",
            key: API_KEY,
            language: "ru",
          },
        }
      );
      return response.data.result.geometry.location;
    } catch (error) {
      console.log("Ошибка getCoordinatesFromPlaceId для:", placeId, error);
      return null;
    }
  };

  const fetchRouteData = async (routeParams) => {
    try {
      const { id, routePoints, distance, duration, pointNames, name } =
        routeParams;

      console.log("fetchRouteData для ID:", id);

      if (!routePoints || !routePoints.origin || !routePoints.destination) {
        console.log("routePoints некорректны или отсутствуют:", routePoints);
      }

      const originCoordsPromise = getCoordinatesFromPlaceId(routePoints.origin);
      const waypointsCoordsPromises = (routePoints.waypoints || []).map((wp) =>
        getCoordinatesFromPlaceId(wp)
      );
      const destinationCoordsPromise = getCoordinatesFromPlaceId(
        routePoints.destination
      );

      const [originCoords, ...waypointsCoords] = await Promise.all([
        originCoordsPromise,
        ...waypointsCoordsPromises,
      ]);
      const destinationCoords = await destinationCoordsPromise;

      if (
        !originCoords ||
        !destinationCoords ||
        waypointsCoords.some((c) => !c)
      ) {
        console.log("Не удалось получить координаты для всех точек:", {
          originCoords,
          waypointsCoords,
          destinationCoords,
        });
      }

      const waypointsParam =
        (routePoints.waypoints || []).length > 0
          ? `optimize:true|${routePoints.waypoints
              .map((wp) => {
                const wpId = String(wp).replace("place_id:", "");
                return `place_id:${wpId}`;
              })
              .join("|")}`
          : "";

      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/directions/json",
        {
          params: {
            origin: `place_id:${String(routePoints.origin).replace(
              "place_id:",
              ""
            )}`,
            destination: `place_id:${String(routePoints.destination).replace(
              "place_id:",
              ""
            )}`,
            waypoints: waypointsParam,
            mode: "walking",
            alternatives: false, // Добавить для пешего режима
            key: API_KEY,
            language: "ru",
          },
        }
      );

      if (response.data.routes.length > 0) {
        const route = response.data.routes[0];
        const points = polyline.decode(route.overview_polyline.points);
        const coordinates = points.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));

        const markers = [
          {
            coordinate: {
              latitude: originCoords.lat,
              longitude: originCoords.lng,
            },
            title: pointNames?.[0] || "Старт",
            description: "Начальная точка маршрута",
            icon: require("../../assets/markers/defaultdarkmini2.png"),
          },
          ...waypointsCoords.map((coord, index) => ({
            coordinate: {
              latitude: coord.lat,
              longitude: coord.lng,
            },
            title: pointNames?.[index + 1] || `Точка ${index + 1}`,
            description: "Промежуточная точка",
            icon: require("../../assets/markers/defaultdarkmini2.png"),
          })),
          {
            coordinate: {
              latitude: destinationCoords.lat,
              longitude: destinationCoords.lng,
            },
            title: pointNames?.[pointNames.length - 1] || "Финиш",
            description: "Конечная точка маршрута",
            icon: require("../../assets/markers/defaultdarkmini2.png"),
          },
        ];

        const latitudes = coordinates.map((c) => c.latitude);
        const longitudes = coordinates.map((c) => c.longitude);

        const region = {
          latitude: (Math.min(...latitudes) + Math.max(...latitudes)) / 2,
          longitude: (Math.min(...longitudes) + Math.max(...longitudes)) / 2,
          latitudeDelta:
            Math.abs(Math.max(...latitudes) - Math.min(...latitudes)) * 1.5 +
            0.01,
          longitudeDelta:
            Math.abs(Math.max(...longitudes) - Math.min(...longitudes)) * 1.5 +
            0.01,
        };

        return {
          id,
          name,
          coordinates,
          markers,
          region,
          distance:
            distance ||
            route.legs.reduce((sum, leg) => sum + leg.distance.value, 0),
          duration:
            duration ||
            route.legs.reduce((sum, leg) => sum + leg.duration.value, 0),
          points: pointNames || [],
        };
      }
    } catch (error) {
      console.log(
        "Ошибка в fetchRouteData для ID",
        routeParams?.id,
        ":",
        error
      );
    }
  };

  const fetchRouteRating = async (routeId, token) => {
    if (!token) {
      if (isMountedRef.current) setRating(null);
      return;
    }
    try {
      const response = await getRating(routeId, token);
      if (isMountedRef.current) {
        setRating(response.data.averageRating);
      }
    } catch (error) {
      console.log("Ошибка при получении рейтинга для ID:", routeId);
      if (isMountedRef.current) {
        setRating(null);
      }
    }
  };

  useEffect(() => {
    const currentRouteParamsData = route.params?.routeData;

    if (currentRouteParamsData && accessToken !== null) {
      setLoading(true);
      setRating(null);

      fetchRouteData(currentRouteParamsData)
        .then((data) => {
          if (isMountedRef.current) {
            setRouteInfo(data);
            if (accessToken) {
              fetchRouteRating(data.id, accessToken);
            } else {
              console.log(
                "Токен отсутствует после fetchRouteData, рейтинг не будет загружен."
              );
              setRating(null);
            }
          }
        })
        .catch((error) => {
          console.error("Основная ошибка загрузки данных маршрута:", error);
          if (isMountedRef.current) {
            setRouteInfo({
              id: null,
              name: "Ошибка загрузки",
              coordinates: [],
              markers: [],
              region: null,
              distance: 0,
              duration: 0,
              points: [],
            });
            setRating(null);
          }
        })
        .finally(() => {
          if (isMountedRef.current) {
            setLoading(false);
          }
        });
    } else if (currentRouteParamsData && accessToken === null) {
      setLoading(true);
    } else if (!currentRouteParamsData) {
      setLoading(false);
    }
  }, [route.params?.routeData, accessToken]);

  const { distance, duration } = formatMetrics(
    routeInfo.distance,
    routeInfo.duration
  );

  const handleMainScreen = () => {
    AppMetrica.reportEvent("Прохождение маршрута", {
      action_type: "Начало маршрута",
      button_name: "выбрать",
      screen: "Экран предпросмотра маршрута",
    });
    console.log("Переход на MainScreen с routeInfo:", routeInfo);
    if (routeInfo && routeInfo.id) {
      navigation.navigate("MainScreen", { selectedRoute: routeInfo });
    } else {
      console.log(
        "Попытка перейти на MainScreen без корректных данных маршрута."
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />

        <View style={styles.headerContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {loading && !routeInfo.name
              ? "Загрузка..."
              : routeInfo.name || route.params?.routeData?.name || "Маршрут"}
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.mapContainer}>
            {loading ? (
              <ActivityIndicator size="large" style={styles.loader} />
            ) : routeInfo.region && routeInfo.coordinates.length > 0 ? (
              <MapView style={styles.map} initialRegion={routeInfo.region}>
                {routeInfo.markers.map((marker, index) => (
                  <Marker
                    key={`marker-${index}-${
                      marker.title?.replace(/\s/g, "-") || index
                    }`}
                    coordinate={marker.coordinate}
                    title={marker.title}
                    description={marker.description}
                    image={marker.icon}
                  />
                ))}
                {routeInfo.coordinates.length > 0 && (
                  <Polyline
                    coordinates={routeInfo.coordinates}
                    strokeColor="#464BDC"
                    strokeWidth={4}
                  />
                )}
              </MapView>
            ) : (
              <Text style={styles.errorText}>
                {routeInfo.name === "Ошибка загрузки"
                  ? "Не удалось загрузить данные маршрута"
                  : "Карта не доступна"}
              </Text>
            )}
          </View>

          <View style={styles.contentPoints}>
            {(routeInfo.points || []).map((point, index) => (
              <Text key={`point-${index}`} style={styles.pointText}>
                {point}
              </Text>
            ))}
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.timeDistanceContainer}>
              <View style={styles.timeContainer}>
                <Image
                  source={require("../../assets/routeCardImages/clock.png")}
                  style={styles.timeImage}
                />
                <Text style={styles.time}>
                  {routeInfo.id && !loading ? duration : "--"}
                </Text>
              </View>

              <Text style={styles.distance}>
                {routeInfo.id && !loading ? distance : "--"}
              </Text>

              <View style={styles.ratingContainer}>
                <Image
                  source={require("../../assets/routeCardImages/rating.png")}
                  style={styles.ratingImage}
                />
                <Text style={styles.rating}>
                  {loading && rating === null
                    ? "..."
                    : typeof rating === "number"
                    ? rating.toFixed(1)
                    : rating === null && routeInfo.id
                    ? "N/A"
                    : routeInfo.id
                    ? "0.0"
                    : "--"}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <ChooseButton
            style={styles.chooseButton}
            onPress={handleMainScreen}
            disabled={loading || !routeInfo.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PreviewRouteScreen;
