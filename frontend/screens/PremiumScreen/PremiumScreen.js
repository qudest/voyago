import styles from './styles';
import React, { useState, useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { View, Image, TextInput, Text, TouchableOpacity, Alert,  FlatList, TouchableWithoutFeedback} from 'react-native';
import BuyButton from '../../components/BuyButton/BuyButton';
import ExitButton from '../../components/ExitButton/ExitButton'


const hexToRgb = (hex) => {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
};

const rgbToHex = (r, g, b) => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16).padStart(2, '0');
    return hex;
  }).join('');
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
  const [colors, setColors] = useState(['#3E3C80', '#CAD6FF']);
  const [endX, setEndX] = useState(1);
  const progress = useRef(0);
  const direction = useRef(1);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const animateColors = () => {
      progress.current += direction.current * 0.005; 
      if (progress.current >= 1) {
        direction.current = -1;
      } else if (progress.current <= 0) {
        direction.current = 1;
      }

      const newColor1 = interpolateColor('#3E3C80', '#CAD6FF', progress.current);
      const newColor2 = interpolateColor('#CAD6FF', '#3E3C80', progress.current);
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
        x += dir * 0.003; 
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


  const PremiumScreen = () => {
    const navigation = useNavigation();
  
    const textItems = [
      "Персонализированные маршруты",
      "Экономия времени",
      "Легкость использования",
      "Уникальные места",
    ];
  
    const handleBuyPress = () => {
      navigation.navigate("PaymentScreen", { costOfPremium: "299" })
    }
    const handleExitPress = () => {
      navigation.navigate("PremiumFreeScreen");
    }
    
    return (
      <GradientBackground>
        <View style={styles.container}>
            <ExitButton onPress={handleExitPress}></ExitButton>
            <View style={styles.mainInformationContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/premium.png')}
                    style={styles.premiumImage}>
                    </Image>
                </View>
                  <View style={styles.mainInformation}>
                      <FlatList
                      data={textItems}
                      renderItem={({ item }) => (
                          <View style={styles.listItem}>
                          <Text style={styles.listText}>{item}</Text>
                          </View>
                      )}
                      scrollEnabled={false}
                      contentContainerStyle={styles.listContainer} 
                      />
                  </View>
            </View>
            <View style={styles.buyContainer}>
                <Text style={styles.costText}>299 р/месяц</Text>
                <BuyButton onPress={handleBuyPress} ></BuyButton>
            </View>    
        </View>
    </GradientBackground>
    );
  };

export default PremiumScreen;