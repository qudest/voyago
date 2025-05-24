import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native"; // Добавлен ScrollView
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles"; // Убедитесь, что стили подходят
import BackButton from "../../components/BackButton/BackButton";
import AddPoint from "../../components/AddPoint/AddPoint";
import PointOfRoute from "../../components/PointOfRoute/PointOfRoute";
import CreateRouteButton from "../../components/CreateRouteButton/CreateRouteButton";
import DeleteRouteButton from "../../components/DeleteRouteButton/DeleteRouteButton";
import AlertDelete from "../../components/AlertDelete/AlertDelete";
import AlertError from "../../components/AlertError/AlertError"; // Добавлен AlertError
import { RouteUpdate, RouteDelete } from "../../services/routesApi"; // RouteCreate здесь не нужен, если только для создания нового из этого экрана (но логика на обновление)
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0"; // Ваш API ключ Google

const EditRouteScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const routeDataFromParams = params?.routeData;

  // Вспомогательная функция для извлечения чистого place_id
  const extractActualPlaceId = (placeIdWithPrefix) => {
    if (!placeIdWithPrefix) return "";
    return String(placeIdWithPrefix)
      .replace(/^place_id:/i, "")
      .trim();
  };

  // Функция для получения точек по умолчанию
  const getDefaultPoints = () => [
    { place_id: "", name: "" },
    { place_id: "", name: "" },
  ];

  // Инициализация начальных точек
  let initialPointsForState;
  if (
    routeDataFromParams &&
    routeDataFromParams.pointNames &&
    routeDataFromParams.pointNames.length > 0 &&
    routeDataFromParams.routePoints
  ) {
    const names = routeDataFromParams.pointNames;
    const {
      origin,
      destination,
      waypoints = [],
    } = routeDataFromParams.routePoints;

    initialPointsForState = names.map((name, index) => {
      let place_id = "";
      if (names.length === 1) {
        place_id = extractActualPlaceId(origin);
      } else {
        if (index === 0) {
          place_id = extractActualPlaceId(origin);
        } else if (index === names.length - 1) {
          place_id = extractActualPlaceId(destination);
        } else {
          if (waypoints[index - 1]) {
            place_id = extractActualPlaceId(waypoints[index - 1]);
          }
        }
      }
      return { name: name || "", place_id }; // Убедимся, что name не undefined
    });

    if (initialPointsForState.length < 2) {
      while (initialPointsForState.length < 2) {
        initialPointsForState.push({ place_id: "", name: "" });
      }
    }
  } else {
    initialPointsForState = getDefaultPoints();
  }

  const [selectedPoints, setSelectedPoints] = useState(initialPointsForState);
  const [routeName, setRouteName] = useState(
    routeDataFromParams?.name || "Новый маршрут"
  );

  // Сохраняем исходные данные для сравнения и использования
  const [routeId, setRouteId] = useState(routeDataFromParams?.id || null);
  const [initialDistance, setInitialDistance] = useState(
    routeDataFromParams?.distance || 0
  );
  const [initialDuration, setInitialDuration] = useState(
    routeDataFromParams?.duration || 0
  );
  const [initialRating, setInitialRating] = useState(
    routeDataFromParams?.rating || 0
  );
  const [initialTags, setInitialTags] = useState(
    routeDataFromParams?.tags || []
  );
  // Координаты могут понадобиться для Preview, если они были
  const [initialCoordinates, setInitialCoordinates] = useState(
    routeDataFromParams?.coordinates || null
  );

  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [showEmptyFieldsWarning, setShowEmptyFieldsWarning] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null); // Для API вызовов, если требуется

  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Флаг, что точки были изменены
  const [pointsChanged, setPointsChanged] = useState(false);

  useEffect(() => {
    const fetchUserDataAndToken = async () => {
      try {
        const cachedData = await AsyncStorage.getItem("userData");
        const token = await AsyncStorage.getItem("accessToken");
        setAccessToken(token);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setUserId(parsedData.id);
        }
      } catch (error) {
        console.error("Error fetching user data and token:", error);
      }
    };
    fetchUserDataAndToken();
  }, []);

  useEffect(() => {
    const filledCount = selectedPoints.filter(
      (p) => p.place_id && p.name // Убедимся, что и имя и ID есть
    ).length;
    // Кнопка активна, если минимум 2 точки заполнены и есть название маршрута
    setButtonEnabled(filledCount >= 2 && routeName.trim().length > 0);
    setShowEmptyFieldsWarning(false); // Сбрасываем предупреждение при изменении
  }, [selectedPoints, routeName]);

  // Отслеживание изменений в точках
  useEffect(() => {
    if (
      JSON.stringify(selectedPoints) !== JSON.stringify(initialPointsForState)
    ) {
      setPointsChanged(true);
    } else {
      setPointsChanged(false);
    }
  }, [selectedPoints, initialPointsForState]);

  const getCoordinatesFromPlaceId = async (placeId) => {
    if (!placeId) return null;
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
      console.error("Error getting coordinates:", error);
      return null;
    }
  };

  const calculateRoute = async (originId, destinationId, waypointsIds) => {
    if (!originId || !destinationId)
      return { distance: initialDistance, duration: initialDuration }; // Возвращаем старые, если нет ключевых точек

    const originCoords = await getCoordinatesFromPlaceId(originId);
    const destinationCoords = await getCoordinatesFromPlaceId(destinationId);

    if (!originCoords || !destinationCoords) {
      setErrorMessage(
        "Не удалось получить координаты для начальной или конечной точки."
      );
      setErrorModalVisible(true);
      return { distance: initialDistance, duration: initialDuration };
    }

    const waypointsCoords = await Promise.all(
      (waypointsIds || []).map((wp) => getCoordinatesFromPlaceId(wp))
    );

    // Фильтруем null значения, если какие-то waypoints не удалось разрешить
    const validWaypointsCoords = waypointsCoords.filter(
      (coord) => coord !== null
    );

    const waypointsParam = validWaypointsCoords
      .map((coord) => `${coord.lat},${coord.lng}`)
      .join("|");

    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${
      originCoords.lat
    },${originCoords.lng}&destination=${destinationCoords.lat},${
      destinationCoords.lng
    }${
      waypointsParam ? `&waypoints=optimize:true|${waypointsParam}` : ""
    }&key=${API_KEY}`;

    try {
      const response = await fetch(apiUrl);
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
        setErrorMessage(
          data.error_message || "Маршрут не найден или превышено число точек."
        );
        setErrorModalVisible(true);
        return { distance: initialDistance, duration: initialDuration }; // Возвращаем старые значения при ошибке API
      }
    } catch (error) {
      console.error("Error calculating route:", error);
      setErrorMessage(
        "Ошибка при расчете маршрута. Проверьте интернет-соединение."
      );
      setErrorModalVisible(true);
      return { distance: initialDistance, duration: initialDuration };
    }
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

  const handleSave = async () => {
    if (!buttonEnabled) {
      setShowEmptyFieldsWarning(true);
      return;
    }

    if (!userId) {
      setErrorMessage("ID пользователя не найден. Попробуйте перезайти.");
      setErrorModalVisible(true);
      return;
    }
    if (!routeId) {
      // Это должно быть редактирование, ID должен быть
      setErrorMessage("Ошибка: ID маршрута отсутствует. Невозможно обновить.");
      setErrorModalVisible(true);
      return;
    }

    setIsLoading(true);

    let currentDistance = initialDistance;
    let currentDuration = initialDuration;

    const originPoint = selectedPoints[0];
    const destinationPoint = selectedPoints[selectedPoints.length - 1];
    const waypoints = selectedPoints.slice(1, -1);

    if (pointsChanged && originPoint?.place_id && destinationPoint?.place_id) {
      const calculationResult = await calculateRoute(
        originPoint.place_id,
        destinationPoint.place_id,
        waypoints.filter((p) => p.place_id).map((p) => p.place_id)
      );
      currentDistance = calculationResult.distance;
      currentDuration = calculationResult.duration;
    }

    const routePayload = {
      name: routeName,
      createdBy: userId, // В RouteUpdate это может быть не нужно, уточните API
      routePoints: {
        origin: originPoint?.place_id ? `place_id:${originPoint.place_id}` : "",
        destination: destinationPoint?.place_id
          ? `place_id:${destinationPoint.place_id}`
          : "",
        waypoints: waypoints
          .filter((p) => p.place_id)
          .map((p) => `place_id:${p.place_id}`),
      },
      distance: currentDistance,
      duration: currentDuration,
      // rating и tags пока берем исходные, если их нельзя редактировать на этом экране
      rating: initialRating,
      tags: initialTags,
    };

    try {
      // Для RouteUpdate могут требоваться другие параметры или accessToken
      await RouteUpdate(
        routeId,
        routePayload.name,
        userId, // или accessToken, уточните сигнатуру функции RouteUpdate
        routePayload.tags,
        routePayload.routePoints,
        routePayload.distance,
        routePayload.duration
        // accessToken // если он нужен
      );

      // Обновляем "initial" значения после успешного сохранения
      setInitialDistance(currentDistance);
      setInitialDuration(currentDuration);
      // initialPointsForState нужно обновить, чтобы pointsChanged сбросился
      setInitialPointsForState(JSON.parse(JSON.stringify(selectedPoints))); // Глубокое копирование
      setPointsChanged(false);

      Alert.alert("Успех", "Маршрут успешно обновлен!", [
        { text: "OK", onPress: () => navigation.navigate("MyRoutesScreen") }, // или PreviewRouteScreen
      ]);
      // Или навигация на Preview с обновленными данными:
      // navigation.navigate("PreviewRouteScreen", {
      //   routeData: {
      //       id: routeId,
      //       name: routePayload.name,
      //       rating: routePayload.rating,
      //       distance: routePayload.distance,
      //       duration: routePayload.duration,
      //       pointNames: selectedPoints.map(p => p.name),
      //       routePoints: routePayload.routePoints,
      //       coordinates: initialCoordinates,
      //       tags: routePayload.tags
      //   },
      // });
    } catch (error) {
      console.error("Error updating route:", error);
      let message = "Что-то пошло не так при обновлении.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message.includes("already exists")
      ) {
        message = "Маршрут с таким названием уже существует.";
      }
      setErrorMessage(message);
      setErrorModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    if (!routeId) return; // Нечего удалять, если это новый несохраненный
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!routeId) return;
    setDeleteModalVisible(false);
    setIsLoading(true);
    try {
      await RouteDelete(routeId, accessToken); // Передаем accessToken, если нужен
      navigation.navigate("MyRoutesScreen");
    } catch (error) {
      console.log("Error deleting route:", error);
      setErrorMessage("Ошибка при удалении маршрута. " + (error.message || ""));
      setErrorModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const confirmError = () => {
    setErrorModalVisible(false);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <ActivityIndicator
          size="large"
          style={
            styles.loader || {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }
          }
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Отступ для кнопок внизу
      >
        <View style={styles.topContainer}>
          <Text style={styles.createTitle}>{"Редактирование маршрута"}</Text>
          <TextInput
            style={styles.inputTitle}
            value={routeName}
            onChangeText={setRouteName}
            placeholder="Название маршрута"
            maxLength={40}
            placeholderTextColor="#999"
            cursorColor="#FCFFFF" // из CreateRouteScreen
          />
        </View>

        <View style={styles.pointsContainer}>
          {selectedPoints.map((point, index) => (
            <PointOfRoute
              key={index}
              selectedAddress={point.name}
              // Передаем place_id, если PointOfRoute его использует для инициализации поиска или отображения
              // initialPlaceId={point.place_id}
              onAddressSelect={(selectedPointData) => {
                const newPoints = [...selectedPoints];
                newPoints[index] = selectedPointData; // {name: '...', place_id: '...'}
                setSelectedPoints(newPoints);
              }}
              onRemove={() => handleRemovePoint(index)}
              showRemoveButton={selectedPoints.length > 2}
              // placeholder={`Точка ${index + 1}`} // Можно добавить плейсхолдер
            />
          ))}
        </View>

        {showEmptyFieldsWarning && (
          <Text style={styles.warningText}>
            {!routeName.trim()
              ? "Введите название маршрута!"
              : "Минимум 2 точки должны быть заполнены (начальная и конечная)!"}
          </Text>
        )}

        <AddPoint
          onPress={handleAddPoint}
          disabled={selectedPoints.length >= 6} // condition из CreateRouteScreen
        />
      </ScrollView>

      <View style={styles.actionsContainer}>
        <CreateRouteButton
          onPress={handleSave}
          disabled={!buttonEnabled || isLoading} // condition из CreateRouteScreen
          title={"Сохранить изменения"}
        />
        {routeId && (
          <DeleteRouteButton onPress={handleDelete} disabled={isLoading} />
        )}
      </View>

      <AlertDelete
        isVisible={isDeleteModalVisible}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title="Удаление маршрута"
        message="Вы точно хотите удалить маршрут?"
      />
      <AlertError
        isVisible={isErrorModalVisible}
        onConfirm={confirmError}
        title="Ошибка!"
        message={errorMessage}
      />
    </View>
  );
};

export default EditRouteScreen;
