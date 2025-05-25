import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import BackButton from "../../components/BackButton/BackButton";
import AddPoint from "../../components/AddPoint/AddPoint";
import PointOfRoute from "../../components/PointOfRoute/PointOfRoute";
import CreateRouteButton from "../../components/CreateRouteButton/CreateRouteButton";
import { RouteCreate } from "../../services/routesApi";
import AlertError from "../../components/AlertError/AlertError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FiltersOnCreate from "../../components/FiltersOnCreate/FiltersOnCreate";

const API_KEY = "AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0";

const CreateRouteScreen = () => {
  const [selectedPoints, setSelectedPoints] = useState([
    { place_id: "", name: "" },
    { place_id: "", name: "" },
  ]);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [showEmptyFieldsWarning, setShowEmptyFieldsWarning] = useState(false);
  const [nameRoute, setName] = useState("");
  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const navigation = useNavigation();
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedRouteTags, setSelectedRouteTags] = useState([]);

  useEffect(() => {
    const fetchCachedData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem("userData");
        const token = await AsyncStorage.getItem("accessToken");
        setAccessToken(token);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setUserData(parsedData);
        }
      } catch (error) {
        console.log("Ошибка при получении данных из кэша:", error);
      }
    };
    fetchCachedData();
  }, []);

  useEffect(() => {
    const filledCount = selectedPoints.filter((p) => p.place_id).length;
    setButtonEnabled(filledCount >= 2 && !!nameRoute);
    setShowEmptyFieldsWarning(false);
  }, [selectedPoints, nameRoute]);

  const handleBackButton = () => {
    navigation.navigate("ProfileScreen");
  };

  const handleAddPoint = () => {
    if (selectedPoints.length < 6) {
      setSelectedPoints([...selectedPoints, { place_id: "", name: "" }]);
    }
  };

  const handleRemovePoint = (index) => {
    if (selectedPoints.length > 2) {
      const newPoints = [...selectedPoints];
      newPoints.splice(index, 1);
      setSelectedPoints(newPoints);
    }
  };

  const handleTagToggle = (tag) => {
    setSelectedRouteTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };
  useEffect(() => {}, [selectedRouteTags]);

  const getCoordinatesFromPlaceId = async (placeId) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId.replace(
          "place_id:",
          ""
        )}&fields=geometry&key=${API_KEY}`
      );
      const data = await response.json();
      if (data.result && data.result.geometry) {
        return data.result.geometry.location;
      }
      return null;
    } catch (error) {
      console.log("Error fetching coordinates:", error);
      return null;
    }
  };
  const confirmError = () => {
    setErrorModalVisible(false);
  };

  const calculateRoute = async (originId, destinationId, waypoints) => {
    try {
      const originCoords = await getCoordinatesFromPlaceId(originId);
      const destinationCoords = await getCoordinatesFromPlaceId(destinationId);
      const waypointsCoordsData = await Promise.all(
        waypoints.map((wp) => getCoordinatesFromPlaceId(wp))
      );

      const waypointsCoords = waypointsCoordsData.filter(
        (coord) => coord !== null
      );

      if (
        !originCoords ||
        !destinationCoords ||
        (waypoints.length > 0 && waypointsCoords.length !== waypoints.length)
      ) {
        console.log("Не удалось получить координаты для всех точек");
        setErrorMessage("Не удалось получить координаты для всех точек.");
        setErrorModalVisible(true);
        return { distance: 0, duration: 0 };
      }

      const waypointsParam = waypointsCoords
        .map((coord) => `${coord.lat},${coord.lng}`)
        .join("|");

      let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originCoords.lat},${originCoords.lng}&destination=${destinationCoords.lat},${destinationCoords.lng}&key=${API_KEY}`;
      if (waypointsParam) {
        url += `&waypoints=optimize:true|${waypointsParam}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const distance = route.legs.reduce(
          (sum, leg) => sum + leg.distance.value,
          0
        );
        const duration = route.legs.reduce(
          (sum, leg) => sum + leg.duration.value,
          0
        );
        return { distance, duration };
      } else {
        console.log("Маршрут не найден", data.status, data.error_message);
        setErrorMessage("Маршрут не найден.");
        setErrorModalVisible(true);
      }
    } catch (error) {
      console.log("Error calculating route:", error);
      setErrorMessage("Ошибка при расчете маршрута.");
      setErrorModalVisible(true);
    }
    return { distance: 0, duration: 0 };
  };

  const handleContinueButton = async () => {
    if (!nameRoute || nameRoute.trim() === "") {
      setErrorMessage("Пожалуйста, введите название маршрута.");
      setErrorModalVisible(true);
      return;
    }
    const hasEmpty = selectedPoints.some((p) => !p.place_id);
    if (hasEmpty) {
      setShowEmptyFieldsWarning(true);
      return;
    }

    if (!userData || !userData.id) {
      setErrorMessage("Ошибка: данные пользователя не загружены.");
      setErrorModalVisible(true);
      return;
    }

    const routeData = {
      origin: `place_id:${selectedPoints[0].place_id}`,
      waypoints: selectedPoints
        .slice(1, -1)
        .map((p) => `place_id:${p.place_id}`),
      destination: `place_id:${
        selectedPoints[selectedPoints.length - 1].place_id
      }`,
      pointNames: selectedPoints.map((p) => p.name),
    };

    const name = nameRoute;
    const createdBy = userData.id;
    const tags = selectedRouteTags.length > 0 ? selectedRouteTags : [];
    const routePoints = {
      origin: routeData.origin,
      waypoints: routeData.waypoints,
      destination: routeData.destination,
    };

    const { distance, duration } = await calculateRoute(
      routeData.origin,
      routeData.destination,
      routeData.waypoints
    );

    if (distance === 0 && duration === 0 && selectedPoints.length >= 2) {
      return;
    }

    try {
      const response = await RouteCreate(
        name,
        createdBy,
        tags,
        routePoints,
        distance,
        duration,
        accessToken
      );
      console.log("ROUR=TE DATA ", routeData);
      navigation.navigate("PreviewRouteScreen", {
        routeData: {
          name,
          rating: 0,
          distance,
          duration,
          pointNames: routeData.pointNames,
          routePoints,
          id: userData.id,
          tags: tags,
          createdBy: { id: userData.id, username: userData.username },
        },
      });
    } catch (error) {
      let message = "Что-то пошло не так при создании маршрута.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message = "Имя маршрута уже занято";
      } else if (error.message) {
        message = "Имя маршрута уже занято";
      }
      setErrorMessage(message);
      setErrorModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.fixedTopSection}>
          <BackButton onPress={handleBackButton} />
          <View style={styles.topContentContainer}>
            <Text style={styles.createTitle}>Создание маршрута</Text>
            <TextInput
              style={styles.inputTitle}
              maxLength={40}
              placeholder="Название маршрута"
              placeholderTextColor="#A0A0A0"
              cursorColor="#3E3C80"
              onChangeText={setName}
              value={nameRoute}
            />
          </View>
        </View>

        <View style={styles.scrollableSection}>
          <View style={styles.pointsListContainer}>
            {selectedPoints.map((point, index) => (
              <PointOfRoute
                key={index}
                selectedAddress={point.name}
                onAddressSelect={(selectedPoint) => {
                  const newPoints = [...selectedPoints];
                  newPoints[index] = selectedPoint;
                  setSelectedPoints(newPoints);
                }}
                onRemove={() => handleRemovePoint(index)}
                showRemoveButton={selectedPoints.length > 2}
              />
            ))}
          </View>

          {showEmptyFieldsWarning && (
            <Text style={styles.warningText}>Не все точки заполнены!</Text>
          )}
        </View>

        <View style={styles.fixedBottomSection}>
          <AddPoint
            onPress={handleAddPoint}
            condition={selectedPoints.length >= 6}
          />
          <FiltersOnCreate
            selectedPreferences={selectedRouteTags}
            onCardPress={handleTagToggle}
          />
          <CreateRouteButton
            onPress={handleContinueButton}
            condition={!buttonEnabled}
          />
        </View>

        <AlertError
          isVisible={isErrorModalVisible}
          onConfirm={confirmError}
          title="Ошибка!"
          message={errorMessage}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateRouteScreen;
