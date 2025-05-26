import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, Alert } from "react-native";
import BuyButton from "../../components/BuyButton/BuyButton";
import ExitButton from "../../components/ExitButton/ExitButton";
import React, { useState, useEffect, useRef } from "react";
import AppMetrica from "@appmetrica/react-native-analytics";

const hexToRgb = (hex) => {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
};

const rgbToHex = (r, g, b) => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16).padStart(2, "0");
        return hex;
      })
      .join("")
  );
};

const interpolateColor = (startColor, endColor, progress) => {
  const start = hexToRgb(startColor);
  const end = hexToRgb(endColor);
  const r = start.r + (end.r - start.r) * progress;
  const g = start.g + (end.g - start.g) * progress;
  const b = start.b + (end.b - start.b) * progress;
  return rgbToHex(Math.round(r), Math.round(g), Math.round(b));
};

const GradientBackground = ({ children }) => {
  const [colors, setColors] = useState(["#3E3C80", "#CAD6FF"]);
  const [endX, setEndX] = useState(1);
  const progress = useRef(0);
  const direction = useRef(1);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const animateColors = () => {
      progress.current += direction.current * 0.002;
      const easedProgress = Math.sin(progress.current * Math.PI * 0.5);

      if (progress.current >= 1) {
        direction.current = -1;
      } else if (progress.current <= 0) {
        direction.current = 1;
      }

      const newColor1 = interpolateColor("#3E3C80", "#CAD6FF", easedProgress);
      const newColor2 = interpolateColor("#CAD6FF", "#3E3C80", easedProgress);
      setColors([newColor1, newColor2]);

      animationFrameId.current = requestAnimationFrame(animateColors);
    };

    animationFrameId.current = requestAnimationFrame(animateColors);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, []);

  useEffect(() => {
    let x = 1;
    let dir = 1;
    let lastUpdate = Date.now();

    const animatePosition = () => {
      const now = Date.now();
      const deltaTime = now - lastUpdate;

      if (deltaTime > 30) {
        x += dir * 0.0015;
        if (x >= 1.2) dir = -1;
        else if (x <= 0.8) dir = 1;
        setEndX(x);
        lastUpdate = now;
      }
      animationFrameId.current = requestAnimationFrame(animatePosition);
    };

    animationFrameId.current = requestAnimationFrame(animatePosition);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, []);

  return (
    <LinearGradient
      colors={colors}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: endX, y: 0 }}
    >
      {children}
    </LinearGradient>
  );
};

const PremiumFreeScreen = () => {
  const navigation = useNavigation();

  const handleBuyPress = () => {
    AppMetrica.reportEvent("Премиум", {
      action_type: "Покупка подписки",
      button_name: "премиум_подписка",
      screen: "Экран рекламы бесплатного премиума",
    });
    navigation.navigate("PaymentScreen", { costOfPremium: "0" });
  };

  const handleExitPress = () => {
    AppMetrica.reportEvent("Премиум", {
      action_type: "Отмена покупки подписки",
      button_name: "премиум_подписк_закрыта",
      screen: "Экран рекламы бесплатного премиума",
    });
    navigation.navigate("MainScreen");
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <ExitButton onPress={handleExitPress}></ExitButton>
        <View style={styles.mainInformationContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/premium.png")}
              style={styles.premiumImage}
            ></Image>
          </View>
          <View style={styles.mainInformation}>
            <Text style={styles.mainInformationTitle}>
              БЕСПЛАТНЫЙ ПРОБНЫЙ ПЕРИОД
            </Text>
            <Text style={styles.mainInformationCost}>0 р/месяц</Text>
          </View>
        </View>
        <View style={styles.buyContainer}>
          <BuyButton onPress={handleBuyPress}></BuyButton>
        </View>
      </View>
    </GradientBackground>
  );
};

export default PremiumFreeScreen;
