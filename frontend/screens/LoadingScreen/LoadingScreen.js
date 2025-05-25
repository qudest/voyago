import React, { useEffect, useRef } from "react";
import { View, Image, Animated, Easing } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoadingScreen = ({ navigation }) => {
  const cloudLeftAnim = useRef(new Animated.Value(0)).current;
  const cloudRightAnim = useRef(new Animated.Value(0)).current;
  const logoAnimX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animateClouds = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(cloudLeftAnim, {
            toValue: -20,
            duration: 4000,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(cloudLeftAnim, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(cloudRightAnim, {
            toValue: 20,
            duration: 4000,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(cloudRightAnim, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ])
      ).start();
    };

    const animateLogo = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(logoAnimX, {
            toValue: 10,
            duration: 2500,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(logoAnimX, {
            toValue: -10,
            duration: 2500,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(logoAnimX, {
            toValue: 0,
            duration: 2500,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start();
    };

    animateClouds();
    animateLogo();

    const bootstrapAsync = async () => {
      let accessToken;
      let userDataString;
      let userData;

      try {
        accessToken = await AsyncStorage.getItem("accessToken");
        userDataString = await AsyncStorage.getItem("userData");

        if (accessToken && userDataString) {
          userData = JSON.parse(userDataString);

          if (userData.role === "ROLE_ADMIN") {
            navigation.replace("AdminScreen");
          } else if (userData.city === null) {
            navigation.replace("ChooseCityScreen", {
              idAccount: userData.id,
              phoneNumber: userData.phoneNumber,
            });
          } else {
            navigation.replace("MainScreen");
          }
        } else {
          navigation.replace("AuthorizationScreen");
        }
      } catch (e) {
        console.log("Error restoring session:", e);
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("userData");
        navigation.replace("AuthorizationScreen");
      }
    };

    bootstrapAsync();
  }, [navigation, cloudLeftAnim, cloudRightAnim, logoAnimX]);

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animated.Image
          source={require("../../assets/logo.png")}
          style={[
            styles.imageLogo,
            {
              transform: [{ translateX: logoAnimX }],
            },
          ]}
        />
        <Image
          source={require("../../assets/logoname.png")}
          style={styles.imageLogoName}
        />
      </View>
      <View style={styles.containerClouds}>
        <Animated.Image
          source={require("../../assets/cloudLeft.png")}
          style={[
            styles.imageCloudLeft,
            { transform: [{ translateX: cloudLeftAnim }] },
          ]}
        />
        <Animated.Image
          source={require("../../assets/cloudRight.png")}
          style={[
            styles.imageCloudRight,
            { transform: [{ translateX: cloudRightAnim }] },
          ]}
        />
      </View>
    </View>
  );
};

export default LoadingScreen;
