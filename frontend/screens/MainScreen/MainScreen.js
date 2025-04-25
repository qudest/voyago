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

const { height } = Dimensions.get('window');

const MainScreen = () => {
  const [coordinates, setCoordinates] = useState([]);
  const navigation = useNavigation();
  const route = useRoute(); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState(null); 
  const pan = useRef(new Animated.Value(height / 3)).current; 
  const [isDragging, setIsDragging] = useState(false);
  const [rating, setRating] = useState(0); 
  const [ratingPrompt, setRatingPrompt] = useState("Оцените маршрут:");
  const [isRatingEnabled, setIsRatingEnabled] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);

  const API_KEY = 'AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0';
  const origin = '37.78825,-122.4324';
  const destination = '37.7749,-122.4194'; 
  const waypoints = [
    '37.7857,-122.4011', 
    '37.7699,-122.4667'
  ];

  const markerImages = {
    start: require('../../assets/markers/default.png'),
    waypoint: require('../../assets/markers/current.png'),
    end: require('../../assets/markers/default.png')
};

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const waypointsParam = waypoints.join('|');
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypointsParam}&key=${API_KEY}`
        );
        
        const data = await response.json();
        console.log(data.routes);
        if (data.routes.length) {
          const points = polyline.decode(data.routes[0].overview_polyline.points);
          const coords = points.map(point => ({
            latitude: point[0],
            longitude: point[1]
          }));
          setCoordinates(coords);
        }

        const newMarkers = [
          {
            coordinate: { latitude: 37.78825, longitude: -122.4324 },
            title: "Start",
            type: 'start',
            icon: markerImages.start
          },
          ...waypoints.map((wp, index) => {
            const [lat, lng] = wp.split(',');
            return {
              coordinate: { latitude: parseFloat(lat), longitude: parseFloat(lng) },
              title: `Waypoint ${index + 1}`,
              type: 'waypoint',
              icon: markerImages.waypoint
            };
          }),
          {
            coordinate: { latitude: 37.7749, longitude: -122.4194 },
            title: "End",
            type: 'end',
            icon: markerImages.end
          }
        ];

        setMarkers(newMarkers);

      } catch (error) {
        console.error('Error fetching directions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, []);


  useEffect(() => {
    if (route.params?.selectedRoute) {
      setSelectedRoute(route.params.selectedRoute); 
      setCurrentIndex(0); 
      Animated.spring(pan, {
        toValue: 0, 
        useNativeDriver: true,
      }).start();
    }
  }, [route.params]);

  const handleRoutesPress = () => {
    navigation.navigate("RecommendationsRoutesScreen");
  };

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

  const mokRoute = ['точка раз', 'точка двас', 'Точка раз', 'точка двас'];

  return (
    <View style={styles.container}>
        <View style={styles.containerMap}>
        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
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
              <Text style={styles.counterText}>{currentIndex + 1}/{mokRoute.length - 1}</Text>
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
                    <Text style={styles.ratingPrompt}>Ваша оценка:</Text>
                    <Rating rating={rating} onRatingSelected={handleRatingSelected} /> 
                  </>
                )}
            </View>
            <NavRouteButton 
              style={styles.navRoute}         
              onPressLeft={handlePrevious}
              onPressRight={handleNext} 
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
                <Text style={styles.time}>{selectedRoute.time} ч</Text>
              </View>
              <Text style={styles.distance}>{selectedRoute.distance} км</Text>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default MainScreen;