import React, { useState, useRef, useEffect } from 'react';
import { View, ActivityIndicator, Text, Animated, PanResponder, Image, Dimensions } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import RoutesButton from '../../components/RoutesButton/RoutesButton';
import ProfileIconButton from '../../components/ProfileIconButton/ProfileIconButton';
import styles from './styles';
import NavRouteButton from '../../components/NavRouteButton/NavRouteButton';
import Rating from '../../components/Rating/Rating'; 
import MapView, { Marker, Polyline } from 'react-native-maps';
import polyline from '@mapbox/polyline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { height } = Dimensions.get('window');

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

  const API_KEY = 'AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem('userData');
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
        console.error('Ошибка загрузки данных:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const fetchCityCoordinates = async (cityName) => {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            address: cityName,
            key: API_KEY,
            language: 'ru'
          }
        }
      );

      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        setCityCoordinates({
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        });
      }
    } catch (error) {
      console.error('Ошибка получения координат:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCoordinatesFromPlaceId = async (placeId) => {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/place/details/json',
        {
          params: {
            place_id: placeId.replace('place_id:', ''),
            fields: 'geometry',
            key: API_KEY
          }
        }
      );
      return response.data.result.geometry.location;
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  };

  const fetchRoute = async (originId, destinationId, waypointIds) => {
    try {
      setLoading(true);
      const originCoords = await getCoordinatesFromPlaceId(originId);
      const destinationCoords = await getCoordinatesFromPlaceId(destinationId);
      const waypointsCoords = await Promise.all(
        waypointIds.map(wp => getCoordinatesFromPlaceId(wp))
      );

      const waypointsParam = waypointsCoords
        .map(coord => `${coord.lat},${coord.lng}`)
        .join('|');

      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/directions/json',
        {
          params: {
            origin: `${originCoords.lat},${originCoords.lng}`,
            destination: `${destinationCoords.lat},${destinationCoords.lng}`,
            waypoints: `optimize:true|${waypointsParam}`,
            key: API_KEY,
            language: 'ru'
          }
        }
      );

      if (response.data.routes.length) {
        const route = response.data.routes[0];
        const points = polyline.decode(route.overview_polyline.points);
        const coords = points.map(point => ({
          latitude: point[0],
          longitude: point[1]
        }));
        setCoordinates(coords);
        const newMarkers = [
          {
            coordinate: {
              latitude: originCoords.lat,
              longitude: originCoords.lng
            },
            title: "Старт",
            type: 'start',
            icon: require('../../assets/markers/default.png')
          },
          ...waypointsCoords.map((coord, index) => ({
            coordinate: {
              latitude: coord.lat,
              longitude: coord.lng
            },
            title: `Точка ${index + 1}`,
            type: 'waypoint',
            icon: require('../../assets/markers/default.png')
          })),
          {
            coordinate: {
              latitude: destinationCoords.lat,
              longitude: destinationCoords.lng
            },
            title: "Финиш",
            type: 'end',
            icon: require('../../assets/markers/default.png')
          }
        ];
        setMarkers(newMarkers);

        const latitudes = coords.map(c => c.latitude);
        const longitudes = coords.map(c => c.longitude);
        const newRegion = {
          latitude: (Math.min(...latitudes) + Math.max(...latitudes)) / 2,
          longitude: (Math.min(...longitudes) + Math.max(...longitudes)) / 2,
          latitudeDelta: Math.abs(Math.max(...latitudes) - Math.min(...latitudes)) * 1.5,
          longitudeDelta: Math.abs(Math.max(...longitudes) - Math.min(...longitudes)) * 1.5
        };
        setRegion(newRegion);
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (route.params?.selectedRoute) {
      const { origin, destination, waypoints, coordinates, markers, region } = route.params.selectedRoute;
      
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
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (selectedRoute && currentIndex < selectedRoute.points.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }

    if (selectedRoute && currentIndex === selectedRoute.points.length - 2) {
      setIsRatingEnabled(true); 
    }
  };

  const handleRatingSelected = (newRating) => {
    setRating(newRating); 
    setRatingPrompt("Ваша оценка:"); 
    console.log('Selected rating:', newRating);
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

            <Polyline
              coordinates={coordinates}
              strokeColor="#70BCFF"
              strokeWidth={4}
            />
          </MapView>
        )}
      </View>
      
      <View style={styles.topElement}>
        <RoutesButton onPress={handleRoutesPress} />
        <ProfileIconButton onPress={() => navigation.navigate("ProfileScreen")} />
      </View>

      {selectedRoute && (
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.bouncingElement, { transform: [{ translateY: pan }] }]}
        >
          <View style={styles.routeInfo}>
            <View style={styles.topInfo}>
              <Text style={styles.counterText}>{currentIndex + 1}/{selectedRoute.points.length}</Text>
              <View style={styles.settingsIconContainer}>
                <Image
                  source={require('../../assets/mainImages/line.png')}
                  style={styles.settingsIcon}
                />
              </View>
              <View style={{ flex: 1 }} /> 
            </View>
            <View style={styles.ratingContainer}>
                {isRatingEnabled && (
                  <>
                    <Text style={styles.ratingPrompt}>{ratingPrompt}</Text>
                    <Rating rating={rating} onRatingSelected={handleRatingSelected} /> 
                  </>
                )}
            </View>
            <NavRouteButton 
              style={styles.navRoute}         
              onPressLeft={handlePrevious}
              onPressRight={handleNext} 
              currentPoint={selectedRoute.points[currentIndex]}
            />
            <View style={styles.routePointsContainer}>
              <View style={styles.routePoints}>
                {selectedRoute.points.map((point, index) => (
                  <Text key={index} style={[styles.pointText, index === currentIndex && styles.activePoint]}>
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
                <Text style={styles.time}>{selectedRoute.time}</Text>
              </View>
              <Text style={styles.distance}>{selectedRoute.distance}</Text>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default MainScreen;