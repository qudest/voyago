import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  Animated,
  PanResponder,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import RoutesButton from "../../components/RoutesButton/RoutesButton";
import ProfileIconButton from "../../components/ProfileIconButton/ProfileIconButton";
import styles from "./styles";
import NavRouteButton from "../../components/NavRouteButton/NavRouteButton";
import Rating from "../../components/Rating/Rating";
import MapView, { Marker, Polyline } from "react-native-maps";
import polyline from "@mapbox/polyline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { postRating } from "../../services/ratingApi";
import { getRatingByUser } from "../../services/ratingApi";
import AppMetrica from "@appmetrica/react-native-analytics";
import { addRoutesByUser } from "../../services/routesApi";

const { height } = Dimensions.get("window");

const MainScreen = () => {
  const [coordinates, setCoordinates] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [userData, setUserData] = useState(null);
  const [cityCoordinates, setCityCoordinates] = useState(null);
  const pan = useRef(new Animated.Value(height / 3)).current;
  const [isDragging, setIsDragging] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingPrompt, setRatingPrompt] = useState("Оцените маршрут:");
  const [isRatingEnabled, setIsRatingEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [region, setRegion] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [nearbyCafes, setNearbyCafes] = useState([]);
  const routeParams = useRoute().params;
  const API_KEY = "AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem("userData");
        const accessToken = await AsyncStorage.getItem("accessToken");
        setAccessToken(accessToken);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setUserData(parsedData);

          if (parsedData.city) {
            fetchCityCoordinates(parsedData.city);
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const fetchUserRatingForCurrentRoute = async (
    routeIdToFetch,
    currentUserId
  ) => {
    if (!routeIdToFetch || !currentUserId) return;

    console.log(
      `Запрос оценки для маршрута ${routeIdToFetch} пользователем ${currentUserId}`
    );
    console.log(routeIdToFetch, currentUserId, accessToken);
    try {
      const response = await getRatingByUser(
        routeIdToFetch,
        currentUserId,
        accessToken
      );

      if (response && response.data) {
        let fetchedRatingValue = null;

        if (typeof response.data === "number") {
          fetchedRatingValue = response.data;
        } else if (
          response.data.rating &&
          typeof response.data.rating === "number"
        ) {
          fetchedRatingValue = response.data.rating;
        } else if (
          response.data.score &&
          typeof response.data.score === "number"
        ) {
          fetchedRatingValue = response.data.score;
        }

        if (
          fetchedRatingValue !== null &&
          fetchedRatingValue > 0 &&
          fetchedRatingValue <= 5
        ) {
          console.log(`Найдена предыдущая оценка: ${fetchedRatingValue}`);
          setRating(fetchedRatingValue);
          setRatingPrompt("Ваша оценка:");
          setIsRatingEnabled(true);
        } else {
          console.log(
            "Предыдущая оценка не найдена или некорректна в ответе:",
            response.data
          );
        }
      } else if (response === null) {
        console.log(
          `Предыдущая оценка для маршрута ${routeIdToFetch} не найдена (API вернул null/404).`
        );
      }
    } catch (error) {
      console.log(
        `Ошибка при загрузке оценки пользователя для маршрута ${routeIdToFetch}:`,
        error.message,
        error.response
      );
    }
  };

  useEffect(() => {
    const currentRouteData = routeParams?.selectedRoute;
    if (currentRouteData) {
      if (!currentRouteData.id) {
        console.log(
          "КРИТИЧЕСКАЯ ОШИБКА: ID маршрута (selectedRoute.id) отсутствует!"
        );
      }

      setSelectedRoute(currentRouteData);

      setCurrentIndex(0);
      setRating(0);
      setRatingPrompt("Оцените маршрут:");
      setIsRatingEnabled(false);
      setNearbyCafes([]);

      const setupRouteAndPotentiallyFetchRating = async () => {
        const {
          origin,
          destination,
          waypoints,
          coordinates: preloadedCoords,
          markers: preloadedMarkers,
          region: preloadedRegion,
        } = currentRouteData;

        if (
          preloadedCoords &&
          preloadedCoords.length > 0 &&
          preloadedMarkers &&
          preloadedMarkers.length > 0
        ) {
          console.log("Используются предзагруженные координаты и маркеры.");
          setCoordinates(preloadedCoords);
          setMarkers(preloadedMarkers);
          if (preloadedRegion) setRegion(preloadedRegion);
          else if (preloadedCoords.length > 0) {
            const latitudes = preloadedCoords.map((c) => c.latitude);
            const longitudes = preloadedCoords.map((c) => c.longitude);
            setRegion({
              latitude: (Math.min(...latitudes) + Math.max(...latitudes)) / 2,
              longitude:
                (Math.min(...longitudes) + Math.max(...longitudes)) / 2,
              latitudeDelta: Math.max(
                0.01,
                Math.abs(Math.max(...latitudes) - Math.min(...latitudes)) * 1.6
              ),
              longitudeDelta: Math.max(
                0.01,
                Math.abs(Math.max(...longitudes) - Math.min(...longitudes)) *
                  1.6
              ),
            });
          }
          setLoading(false);
        } else if (origin && destination) {
          console.log("Запрос маршрута по ID точек origin/destination.");
          await fetchRoute(origin, destination, waypoints || []);
        } else {
          console.warn(
            "selectedRoute не содержит достаточно информации для отображения."
          );
          if (cityCoordinates) setRegion(cityCoordinates);
          setLoading(false);
        }

        if (userData && userData.id && currentRouteData.id && accessToken) {
          await fetchUserRatingForCurrentRoute(
            currentRouteData.id,
            userData.id,
            accessToken
          );
        }
      };

      setupRouteAndPotentiallyFetchRating();

      Animated.spring(pan, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else if (!selectedRoute && cityCoordinates && !loading) {
      setRegion(cityCoordinates);
    }
  }, [routeParams?.selectedRoute]);

  useEffect(() => {
    if (
      selectedRoute &&
      selectedRoute.id &&
      userData &&
      userData.id &&
      accessToken
    ) {
      fetchUserRatingForCurrentRoute(
        selectedRoute.id,
        userData.id,
        accessToken
      );
    }
  }, [selectedRoute, userData, accessToken]);

  const fetchNearbyCafes = async (routeCoords) => {
    if (!routeCoords || routeCoords.length === 0) {
      console.log("Нет координат маршрута для поиска кафе.");
      setNearbyCafes([]);
      return;
    }

    const searchPoints = [];
    if (routeCoords.length > 0) {
      searchPoints.push(routeCoords[0]);
    }
    if (routeCoords.length > 2) {
      searchPoints.push(routeCoords[Math.floor(routeCoords.length / 2)]);
    }
    if (routeCoords.length > 1) {
      const endPoint = routeCoords[routeCoords.length - 1];
      if (
        !searchPoints.some(
          (p) =>
            p.latitude === endPoint.latitude &&
            p.longitude === endPoint.longitude
        )
      ) {
        searchPoints.push(endPoint);
      }
    }

    const allCafes = [];
    const cafeIds = new Set();

    try {
      console.log(`Поиск кафе вокруг ${searchPoints.length} точек маршрута.`);
      for (const point of searchPoints) {
        if (allCafes.length >= 6) break;
        const response = await axios.get(
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
          {
            params: {
              location: `${point.latitude},${point.longitude}`,
              radius: 1500,
              type: "cafe",
              key: API_KEY,
              language: "ru",
            },
          }
        );

        if (response.data.results && response.data.results.length > 0) {
          console.log(
            `Найдено ${response.data.results.length} кафе для точки.`
          );
          response.data.results.forEach((cafe) => {
            if (!cafeIds.has(cafe.place_id) && allCafes.length < 6) {
              allCafes.push({
                id: cafe.place_id,
                name: cafe.name,
                coordinate: {
                  latitude: cafe.geometry.location.lat,
                  longitude: cafe.geometry.location.lng,
                },
                rating: cafe.rating || "N/A",
                icon: require("../../assets/markers/current.png"),
              });
              cafeIds.add(cafe.place_id);
            }
          });
        } else {
          console.log(
            `Кафе не найдены для точки: ${point.latitude},${point.longitude} или ошибка: ${response.data.status}`
          );
        }
      }
      console.log(`Всего найдено ${allCafes.length} уникальных кафе.`);
      setNearbyCafes(allCafes);
    } catch (error) {
      console.error(
        "Ошибка при поиске кафе:",
        error.response ? error.response.data : error.message
      );
      setNearbyCafes([]);
    }
  };

  const fetchCityCoordinates = async (cityName) => {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: cityName,
            key: API_KEY,
            language: "ru",
          },
        }
      );

      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        setCityCoordinates({
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      console.error("Ошибка получения координат:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCoordinatesFromPlaceId = async (placeId) => {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/place/details/json",
        {
          params: {
            place_id: placeId.replace("place_id:", ""),
            fields: "geometry",
            key: API_KEY,
          },
        }
      );
      return response.data.result.geometry.location;
    } catch (error) {
      console.log("Error fetching coordinates:", error);
      return null;
    }
  };

  const fetchRoute = async (originId, destinationId, waypointIds) => {
    try {
      setLoading(true);
      const originCoords = await getCoordinatesFromPlaceId(originId);
      const destinationCoords = await getCoordinatesFromPlaceId(destinationId);
      const waypointsCoords = await Promise.all(
        waypointIds.map((wp) => getCoordinatesFromPlaceId(wp))
      );

      const waypointsParam = waypointsCoords
        .map((coord) => `${coord.lat},${coord.lng}`)
        .join("|");

      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/directions/json",
        {
          params: {
            origin: `${originCoords.lat},${originCoords.lng}`,
            destination: `${destinationCoords.lat},${destinationCoords.lng}`,
            waypoints: `optimize:true|${waypointsParam}`,
            key: API_KEY,
            language: "ru",
          },
        }
      );

      if (response.data.routes.length) {
        const route = response.data.routes[0];
        const points = polyline.decode(route.overview_polyline.points);
        const coords = points.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));
        setCoordinates(coords);
        const newMarkers = [
          {
            coordinate: {
              latitude: originCoords.lat,
              longitude: originCoords.lng,
            },
            title: "Старт",
            type: "start",
            icon: require("../../assets/markers/default.png"),
          },
          ...waypointsCoords.map((coord, index) => ({
            coordinate: {
              latitude: coord.lat,
              longitude: coord.lng,
            },
            title: `Точка ${index + 1}`,
            type: "waypoint",
            icon: require("../../assets/markers/default.png"),
          })),
          {
            coordinate: {
              latitude: destinationCoords.lat,
              longitude: destinationCoords.lng,
            },
            title: "Финиш",
            type: "end",
            icon: require("../../assets/markers/default.png"),
          },
        ];
        setMarkers(newMarkers);

        const latitudes = coords.map((c) => c.latitude);
        const longitudes = coords.map((c) => c.longitude);
        const newRegion = {
          latitude: (Math.min(...latitudes) + Math.max(...latitudes)) / 2,
          longitude: (Math.min(...longitudes) + Math.max(...longitudes)) / 2,
          latitudeDelta:
            Math.abs(Math.max(...latitudes) - Math.min(...latitudes)) * 1.5,
          longitudeDelta:
            Math.abs(Math.max(...longitudes) - Math.min(...longitudes)) * 1.5,
        };
        setRegion(newRegion);
      }
    } catch (error) {
      console.log("Error fetching directions:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0 мин";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    let result = "";
    if (hours > 0) {
      result += `${hours} ч `;
    }
    result += `${minutes} мин`;

    return result;
  };

  const formatDistance = (meters) => {
    if (!meters || isNaN(meters)) return "0 км";

    const kilometers = meters / 1000;

    return `${kilometers.toFixed(1)} км`;
  };

  useEffect(() => {
    if (route.params?.selectedRoute) {
      const { origin, destination, waypoints, coordinates, markers, region } =
        route.params.selectedRoute;

      if (coordinates && markers) {
        setSelectedRoute(route.params.selectedRoute);
        setCoordinates(coordinates);
        setMarkers(markers);
        if (region) setRegion(region);
      } else if (origin && destination) {
        fetchRoute(origin, destination, waypoints || []);
        setSelectedRoute(route.params.selectedRoute);
      }

      setCurrentIndex(0);
      Animated.spring(pan, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [route.params]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (route.params?.selectedRoute) {
      console.log("Получен маршрут:", route.params.selectedRoute);
    }
  }, [route.params]);

  useEffect(() => {
    if (coordinates.length > 0) {
      fetchNearbyCafes(coordinates);
    }
  }, [coordinates]);

  const handleNext = () => {
    const isLastPoint = currentIndex === selectedRoute.points.length - 2;
    const isPreLastPoint = currentIndex === selectedRoute.points.length - 2;

    if (isLastPoint && accessToken && userData?.id) {
      markRouteAsCompleted(route.params.selectedRoute.id);
    }

    if (selectedRoute && currentIndex < selectedRoute.points.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }

    if (selectedRoute && currentIndex === selectedRoute.points.length - 2) {
      setIsRatingEnabled(true);
    }
  };

  const markRouteAsCompleted = async (routeId) => {
    try {
      console.log(routeId, userData.id, accessToken);
      const response = await addRoutesByUser(routeId, userData.id, accessToken);

      if (response.status === 200) {
        console.log("Маршрут добавлен в пройденные");
      } else {
        console.log("Не удалось добавить маршрут");
      }
    } catch (error) {
      console.log("Ошибка при добавлении маршрута:", error);
    }
  };

  const handleRatingSelected = async (newRating) => {
    setRating(newRating);
    setRatingPrompt("Ваша оценка:");
    if (selectedRoute && accessToken) {
      handleRate(route.params.selectedRoute.id, parseInt(newRating));
    }
    console.log("Selected rating:", newRating);
  };

  const handleRoutesPress = () => {
    navigation.navigate("RecommendationsRoutesScreen");
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy !== 0;
      },
      onPanResponderGrant: () => {
        setIsDragging(true);
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0 && gestureState.dy < height / 3) {
          pan.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          Animated.spring(pan, {
            toValue: height / 3,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
        setIsDragging(false);
      },
    })
  ).current;

  const handleRate = async (routeId, rating) => {
    const userId = userData.id;
    try {
      const response = await postRating(routeId, rating, userId, accessToken);
      AppMetrica.reportEvent("Прохождение маршрута", {
        action_type: "Оценивание пройденного маршрута",
        button_name: "Оценить",
        screen: "Экран просмотра маршрута",
      });
      console.log("Оценка отправлена:", response.data);
    } catch (error) {
      console.log(routeId, rating, accessToken);
      console.log(
        "Ошибка при отправке оценки:",
        error.response?.data,
        error.message,
        error.config
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerMap}>
        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : (
          <MapView
            style={styles.map}
            initialRegion={cityCoordinates}
            region={region || cityCoordinates}
          >
            {markers.map((marker, index) => (
              <Marker
                style={styles.marker}
                key={`marker-${index}`}
                coordinate={marker.coordinate}
                title={marker.title}
                image={marker.icon}
              />
            ))}

            {nearbyCafes.map((cafe, index) => (
              <Marker
                key={`cafe-${index}`}
                coordinate={cafe.coordinate}
                title={cafe.name}
                description={`Рейтинг: ${cafe.rating}`}
                image={cafe.icon}
              />
            ))}

            <Polyline
              coordinates={coordinates}
              strokeColor="#464BDC"
              strokeWidth={4}
            />
          </MapView>
        )}
      </View>
      <View style={styles.topElement}>
        <RoutesButton onPress={handleRoutesPress} />
        <ProfileIconButton
          onPress={() => navigation.navigate("ProfileScreen")}
        />
      </View>

      {selectedRoute && (
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.bouncingElement, { transform: [{ translateY: pan }] }]}
        >
          <View style={styles.routeInfo}>
            <View style={styles.topInfo}>
              <Text style={styles.counterText}>
                {currentIndex + 1}/{selectedRoute.points.length}
              </Text>
              <View style={styles.settingsIconContainer}>
                <Image
                  source={require("../../assets/mainImages/line.png")}
                  style={styles.settingsIcon}
                />
              </View>
              <View style={{ flex: 1 }} />
            </View>
            <View style={styles.ratingContainer}>
              {isRatingEnabled && (
                <>
                  <Text style={styles.ratingPrompt}>{ratingPrompt}</Text>
                  <Rating
                    rating={rating}
                    onRatingSelected={handleRatingSelected}
                  />
                </>
              )}
            </View>
            <NavRouteButton
              style={styles.navRoute}
              onPressLeft={handlePrevious}
              onPressRight={handleNext}
              currentPoint={selectedRoute.points[currentIndex]}
              isLastPoint={currentIndex === selectedRoute.points.length - 1}
            />
            <ScrollView>
              <View style={styles.routePointsContainer}>
                <View style={styles.routePoints}>
                  {selectedRoute.points.map((point, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.pointText,
                        index === currentIndex && styles.activePoint,
                      ]}
                    >
                      {point}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={styles.timeDistanceContainer}>
                <View style={styles.timeContainer}>
                  <Image
                    source={require("../../assets/routeCardImages/clock.png")}
                    style={styles.timeImage}
                  />
                  <Text style={styles.time}>
                    {formatDuration(selectedRoute.duration)}
                  </Text>
                </View>
                <Text style={styles.distance}>
                  {formatDistance(selectedRoute.distance)}
                </Text>
              </View>
            </ScrollView>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default MainScreen;
