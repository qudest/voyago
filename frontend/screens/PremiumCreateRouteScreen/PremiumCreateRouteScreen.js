import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import styles from "./styles";
import MapView from "react-native-maps";
import BackButton from "../../components/BackButton/BackButton";
import ChooseButton from "../../components/ChooseButton/ChooseButton";
import { useNavigation } from "@react-navigation/native";
import GenerateRoute from "../../components/GenerateRoute/GenerateRoute";
import { aiRoute } from "../../services/premiumApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PremiumCreateRouteScreen = () => {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [routeData, setRouteData] = useState(null);

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

  const handleGenerateButton = async () => {
    try {
      const phoneNumber = userData.phoneNumber;
      const country = "Россия";
      const city = userData.city;
      const response = await aiRoute(phoneNumber, country, city, accessToken);
      if (response && response.data) {
        setRouteData({
          ...response.data,
          name: response.data.name || "Мой маршрут",
          distance: response.data.distance || 0,
          duration: response.data.duration || 0,
        });
      }
      console.log(routeData);
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось сгенерировать маршрут");
      console.log(error);
    }
  };
  const defaultRegion = {
    latitude: 55.751244,
    longitude: 37.618423,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleBackButton = () => {
    navigation.navigate("RecommendationsRoutesScreen");
  };

  const points = ["Точка 1", "Точка 2", "Точка 3"];

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
            <Text>f</Text>
            <View style={styles.contentPoints}>
              {points.map((point, index) => (
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
                <Text style={styles.time}>10 мин</Text>
              </View>
              <Text style={styles.distance}>1.5 км</Text>
            </View>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={defaultRegion}
                region={defaultRegion}
              />
            </View>
            <ChooseButton />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PremiumCreateRouteScreen;
