import styles from "./styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import BackButton from "../../components/BackButton/BackButton";
import ProfileButton from "../../components/ProfileButton/ProfileButton";
import PremiumProfileButton from "../../components/PremiumProfileButton/PremiumProfileButton";
import { findPremiumUser } from "../../services/premiumApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [premium, setPremium] = useState(false);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const cachedData = await AsyncStorage.getItem("userData");
      if (cachedData && token) {
        const parsedData = JSON.parse(cachedData);
        setUserData(parsedData);
        setAccessToken(token);
        await checkPremium(parsedData.phoneNumber, token);
      }
    } catch (error) {
      console.log("Ошибка при загрузке данных:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
      return () => {};
    }, [])
  );

  const handleBackPress = () => {
    navigation.navigate("MainScreen");
  };
  const handleDoneRoutesPress = () => {
    navigation.navigate("DoneRoutesScreen");
  };
  const handleMyRoutesPress = () => {
    navigation.navigate("MyRoutesScreen");
  };
  const handleLikeRoutesPress = () => {
    navigation.navigate("LikeRoutesScreen");
  };
  const handlePremiumRoutesPress = () => {
    if (premium) {
      console.log(premium);
      navigation.navigate("PremiumCreateRouteScreen");
    } else {
      navigation.navigate("PremiumScreen");
    }
  };
  const handleCreatePress = () => {
    navigation.navigate("CreateRouteScreen");
  };
  const handleSettingsPress = () => {
    navigation.navigate("AdditionalParametersScreen");
  };
  const handleExitPress = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("userData");
      setUserData(null);
      setPremium(false);
      navigation.replace("AuthorizationScreen");
    } catch (e) {
      console.log("Ошибка при очистке AsyncStorage:", e);
      Alert.alert(
        "Ошибка",
        "Не удалось выйти из аккаунта. Пожалуйста, попробуйте еще раз."
      );
      navigation.replace("AuthorizationScreen");
    }
  };

  const checkPremium = async (phoneNumber, token) => {
    console.log(phoneNumber, token);
    try {
      const request = await findPremiumUser(phoneNumber, token);
      if (request.status === 200) {
        setPremium(request.data.premium);
      }
    } catch (error) {
      console.log("Error", error.request);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={handleBackPress}></BackButton>
      <View style={styles.mainInfContainer}>
        <Text style={styles.mainInfTitle}>Привет, {userData?.name || ""}!</Text>
        <Image
          source={require("../../assets/profileImages/logoprofile.png")}
          style={styles.imageLogo}
        />
      </View>
      <View style={styles.navigationContainer}>
        <View style={styles.navigationRouts}>
          <ProfileButton
            title="Пройденные маршруты"
            onPress={handleDoneRoutesPress}
          ></ProfileButton>
          <ProfileButton
            title="Мои маршруты"
            onPress={handleMyRoutesPress}
          ></ProfileButton>
          <ProfileButton
            title="Избранное"
            onPress={handleLikeRoutesPress}
          ></ProfileButton>
          <ProfileButton
            title="Создать маршрут"
            onPress={handleCreatePress}
          ></ProfileButton>
          <PremiumProfileButton
            title="Премиум"
            onPress={handlePremiumRoutesPress}
          ></PremiumProfileButton>
        </View>
        <View style={styles.navigationSettings}>
          <ProfileButton
            title="Дополнительные параметры"
            onPress={handleSettingsPress}
          ></ProfileButton>
        </View>
        <View style={styles.navigationExit}>
          <ProfileButton
            title="Выйти"
            onPress={handleExitPress}
          ></ProfileButton>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
