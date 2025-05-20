import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  Text,
  ScrollView,
  SafeAreaView,
  Alert,
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
    id: 1,
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

  const API_KEY = "AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        setAccessToken(accessToken);
      } catch (error) {
        console.log("Ошибка загрузки данных:", error);
      }
    };

    fetchUserData();
  }, []);

  const formatMetrics = (distance, duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.round((duration % 3600) / 60);
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
      return null;
    }
  };

  const fetchRouteData = async (routeParams) => {
    try {
      const { id, routePoints, distance, duration, pointNames, name } =
        routeParams;

      console.log(id);

      const [originCoords, ...waypointsCoords] = await Promise.all([
        getCoordinatesFromPlaceId(routePoints.origin),
        ...routePoints.waypoints.map((wp) => getCoordinatesFromPlaceId(wp)),
      ]);

      const destinationCoords = await getCoordinatesFromPlaceId(
        routePoints.destination
      );

      const waypointsParam =
        routePoints.waypoints.length > 0
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
            title: pointNames[0] || "Старт",
            description: "Начальная точка маршрута",
            icon: require("../../assets/markers/default.png"),
          },
          ...waypointsCoords.map((coord, index) => ({
            coordinate: {
              latitude: coord.lat,
              longitude: coord.lng,
            },
            title: pointNames[index + 1] || `Точка ${index + 1}`,
            description: "Промежуточная точка",
            icon: require("../../assets/markers/default.png"),
          })),
          {
            coordinate: {
              latitude: destinationCoords.lat,
              longitude: destinationCoords.lng,
            },
            title: pointNames[pointNames.length - 1] || "Финиш",
            description: "Конечная точка маршрута",
            icon: require("../../assets/markers/default.png"),
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
          points: pointNames,
        };
      }
      throw new Error("Маршрут не найден");
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (route.params?.routeData) {
      setLoading(true);
      fetchRouteData(route.params.routeData)
        .then((data) => {
          setRouteInfo(data);
          fetchRouteRating(data.id);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [route.params]);

  const { distance, duration } = formatMetrics(
    routeInfo.distance,
    routeInfo.duration
  );

  const fetchRouteRating = async (routeId) => {
    try {
      const response = await getRating(routeId, accessToken);
      setRating(response.data.averageRating);
      console.log("отправилось", response.data.averageRating);
    } catch (error) {
      console.log(routeId, response.data.averageRating);
      console.log(
        "Ошибка при отправке оценки:",
        error.response?.data || error.message
      );
      setRating(null);
    }
  };

  const handleMainScreen = () => {
    AppMetrica.reportEvent("Прохождение маршрута", {
      action_type: "Начало маршрута",
      button_name: "выбрать",
      screen: "Экран предпросмотра маршрута",
    });
    navigation.navigate("MainScreen", { selectedRoute: routeInfo });
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />

        <View style={styles.headerContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {routeInfo.name || route.params?.routeData?.name || "Маршрут"}
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.mapContainer}>
            {loading ? (
              <ActivityIndicator size="large" style={styles.loader} />
            ) : routeInfo.region ? (
              <MapView
                style={styles.map}
                initialRegion={routeInfo.region}
                region={routeInfo.region}
              >
                {routeInfo.markers.map((marker, index) => (
                  <Marker
                    key={`marker-${index}`}
                    coordinate={marker.coordinate}
                    title={marker.title}
                    description={marker.description}
                    image={marker.icon}
                  />
                ))}
                <Polyline
                  coordinates={routeInfo.coordinates}
                  strokeColor="#464BDC"
                  strokeWidth={4}
                />
              </MapView>
            ) : (
              <Text style={styles.errorText}>Не удалось загрузить карту</Text>
            )}
          </View>

          <View style={styles.contentPoints}>
            {routeInfo.points?.map((point, index) => (
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
                <Text style={styles.time}>{duration}</Text>
              </View>

              <Text style={styles.distance}>{distance}</Text>

              <View style={styles.ratingContainer}>
                <Image
                  source={require("../../assets/routeCardImages/rating.png")}
                  style={styles.ratingImage}
                />
                <Text style={styles.rating}>{rating || "0.0"}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <ChooseButton
            style={styles.chooseButton}
            onPress={handleMainScreen}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PreviewRouteScreen;
