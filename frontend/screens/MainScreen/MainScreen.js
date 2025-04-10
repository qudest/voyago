import React, { useState, useRef } from 'react';
import { View, Text, Animated, PanResponder, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import RoutesButton from '../../components/RoutesButton/RoutesButton';
import ProfileIconButton from '../../components/ProfileIconButton/ProfileIconButton';
import styles from './styles';
import NavRouteButton from '../../components/NavRouteButton/NavRouteButton';
import YaMap from 'react-native-yamap';

const { height } = Dimensions.get('window');

const MainScreen = () => {
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState(true); // Установите true по умолчанию
  const pan = useRef(new Animated.Value(0)).current; // Начальная позиция 0
  const mokRoute = ['точка раз', 'точка двас', 'Точка раз', 'точка двас'];

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy !== 0;
      },
      onPanResponderMove: (evt, gestureState) => {
        pan.setValue(gestureState.dy); // Движение на основе жеста
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < -50 && !isVisible) {
          setIsVisible(true);
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        } else if (gestureState.dy > 50 && isVisible) {
          setIsVisible(false);
          Animated.spring(pan, {
            toValue: height / 3,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(pan, {
            toValue: isVisible ? 0 : height / 3,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleRoutesPress = () => {
    navigation.navigate("RecommendationsRoutesScreen");
  }

  const handleProfilePress = () => {
    navigation.navigate("ProfileScreen");
  }

  return (
    <View style={styles.container}>
        <YaMap
        userLocationIcon={{ uri: 'https://www.clipartmax.com/png/middle/180-1801760_pin-png.png' }}
        initialRegion={{
          lat: 50,
          lon: 50,
          zoom: 10,
          azimuth: 80,
          tilt: 100
        }}
        style={{ flex: 1 }}
      />
      <View style={styles.topElement}>
        <RoutesButton onPress={handleRoutesPress} />
        <ProfileIconButton onPress={handleProfilePress} />
      </View>

      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.bouncingElement, { transform: [{ translateY: pan }] }]}
      >
        {/* Элементы будут видны сразу при загрузке */}
        <View style={styles.routeInfo}>
          <View style={styles.topInfo}>
            <Image
              source={require('../../assets/mainImages/line.png')}
              style={styles.settingsIcon}
            />
            <Text>2/4</Text>
          </View>
          <NavRouteButton style={styles.navRoute}></NavRouteButton>
          <View style={styles.routePointsContainer}>
            <View style={styles.routePoints}>
              {mokRoute.map((point, index) => (
                <Text key={index} style={styles.pointText}>
                  {point}
                </Text>
              ))}
          </View>
          </View>
          <View style={styles.timeDistanceContainer}>
            <View style={styles.timeContainer}>
              <Image 
                source={require('../../assets/routeCardImages/clock.png')}
                style={styles.timeImage}
              />
              <Text style={styles.time}>44 ч</Text>
            </View>
            <Text style={styles.distance}>44 км</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default MainScreen;
