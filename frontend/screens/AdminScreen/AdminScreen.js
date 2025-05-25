import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import styles from "./styles";
import BackButton from "../../components/BackButton/BackButton";
import ChooseButton from "../../components/ChooseButton/ChooseButton";
import ProfileButton from "../../components/ProfileButton/ProfileButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminScreen = () => {
  const navigation = useNavigation();

  const handleUserPress = () => {
    navigation.navigate("AdminUsersScreen");
  };
  const handleRoutePress = () => {
    navigation.navigate("AdminRoutesScreen");
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

  return (
    <View style={styles.container}>
      <View style={styles.mainInformation}>
        <Text style={styles.mainText}>Привет, @admin2!</Text>
        <Image
          source={require("../../assets/profileImages/logoprofile.png")}
          style={styles.imageLogo}
        />
      </View>
      <View style={styles.buttons}>
        <View style={styles.listsButton}>
          <View style={styles.navigationButton}>
            <ProfileButton
              title="Пользователи"
              onPress={handleUserPress}
            ></ProfileButton>
          </View>
          <View style={styles.navigationButton}>
            <ProfileButton
              title="Маршруты"
              onPress={handleRoutePress}
            ></ProfileButton>
          </View>
        </View>
        <View style={styles.navigationButton}>
          <ProfileButton
            title="Выйти"
            onPress={handleExitPress}
          ></ProfileButton>
        </View>
      </View>
    </View>
  );
};
export default AdminScreen;
