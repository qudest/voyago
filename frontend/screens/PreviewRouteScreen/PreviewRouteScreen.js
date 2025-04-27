import React, {useState, useEffect} from 'react';
import BackButton from "../../components/BackButton/BackButton";
import styles from "./styles";
import ChooseButton from "../../components/ChooseButton/ChooseButton";
import { View, Image, ActivityIndicator, Text, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker, Polyline } from 'react-native-maps';
import polyline from '@mapbox/polyline';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PreviewRouteScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [routeInfo, setRouteInfo] = useState({
        name: "",
        coordinates: [],
        origin: [],
        destination: [],
        waypoints: [],
        markers: [],
        region: null,
        distance: 0,
        duration: 0,
        points: []
    });
    
    const API_KEY = 'AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0';

    const formatMetrics = (distance, duration) => {
        return {
            distance: `${(distance / 1000).toFixed(1)} км`,
            duration: `${Math.floor(duration / 3600)} ч ${Math.round((duration % 3600) / 60)} мин`
        };
    };

    useEffect(() => {
        const fetchCachedData = async () => {
          try {
            const cachedData = await AsyncStorage.getItem('userData');
            if (cachedData) {
              const parsedData = JSON.parse(cachedData);
              setUserData(parsedData);
              console.log('Данные из кэша:', parsedData);
            }
          } catch (error) {
            console.error('Ошибка при получении данных из кэша:', error);
          }
        };
        
        fetchCachedData();
      }, []);

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

    const fetchRouteData = async (routeParams) => {
        try {
            const { origin, destination, waypoints } = routeParams;
            
            const originCoords = await getCoordinatesFromPlaceId(origin);
            const destinationCoords = await getCoordinatesFromPlaceId(destination);
            const waypointsCoords = await Promise.all(
                waypoints.map(wp => getCoordinatesFromPlaceId(wp))
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
                const coordinates = points.map(point => ({
                    latitude: point[0],
                    longitude: point[1]
                }));
                
                const markers = [
                    {
                        coordinate: {
                            latitude: originCoords.lat,
                            longitude: originCoords.lng
                          },
                        title: "Старт",
                        icon: require('../../assets/markers/default.png')
                    },
                    ...waypointsCoords.map((coord, index) => ({
                        coordinate: {
                            latitude: waypointsCoords.lat,
                            longitude: waypointsCoords.lng
                          },
                        title: `Точка ${index + 1}`,
                        icon: require('../../assets/markers/default.png')
                    })),
                    {
                        coordinate: {
                            latitude: destinationCoords.lat,
                            longitude: destinationCoords.lng
                          },
                        title: "Финиш",
                        icon: require('../../assets/markers/default.png')
                    }
                ];

                console.log('Markers data:', routeInfo.markers);

                const latitudes = coordinates.map(c => c.latitude);
                const longitudes = coordinates.map(c => c.longitude);
                const region = {
                    latitude: (Math.min(...latitudes) + Math.max(...latitudes)) / 2,
                    longitude: (Math.min(...longitudes) + Math.max(...longitudes)) / 2,
                    latitudeDelta: Math.abs(Math.max(...latitudes) - Math.min(...latitudes)) * 1.5,
                    longitudeDelta: Math.abs(Math.max(...longitudes) - Math.min(...longitudes)) * 1.5
                };

                const distance = route.legs.reduce((sum, leg) => sum + leg.distance.value, 0);
                const duration = route.legs.reduce((sum, leg) => sum + leg.duration.value, 0);

                return {
                    coordinates,
                    origin,
                    destination,
                    waypoints,
                    markers,
                    region,
                    distance,
                    duration,
                    points: routeParams.pointNames || []
                };
            }
        } catch (error) {
            console.error('Error fetching route:', error);
            throw error;
        }
    };

    useEffect(() => {
        if (route.params?.routeData) {
            fetchRouteData(route.params.routeData)
                .then(data => {
                    setRouteInfo(data);
                    setLoading(false);
                })
                .catch(error => {
                    Alert.alert('Ошибка', 'Не удалось построить маршрут');
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [route.params]);

    const handleBackButton = () => {
        navigation.goBack(); 
    };

    const handleChooseButton = () => {
        navigation.navigate("MainScreen", {
            selectedRoute: {
                id: 1,
                time: formatMetrics(routeInfo.distance, routeInfo.duration).duration,
                distance: formatMetrics(routeInfo.distance, routeInfo.duration).distance,
                rating: 4.5,
                points: routeInfo.points,
                coordinates: routeInfo.coordinates,
                origin: routeInfo.origin,
                destination: routeInfo.destination,
                waypoints: routeInfo.waypoints,
                markers: routeInfo.markers
            },
        });
    };
    

    const { distance, duration } = formatMetrics(routeInfo.distance, routeInfo.duration);


    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <BackButton onPress={handleBackButton}/>
                
                <View style={styles.headerContainer}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                        {route.params.routeData.name}
                    </Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.mapContainer}>
                        {loading ? (
                            <ActivityIndicator size="large" style={styles.loader} />
                        ) : routeInfo.region && (
                            <MapView
                                style={styles.map}
                                initialRegion={routeInfo.region}
                                region={routeInfo.region}
                            >
                                {routeInfo.markers
                                    .filter(marker => marker.coordinate && marker.coordinate.latitude != null && marker.coordinate.longitude != null)
                                    .map((marker, index) => (
                                        <Marker
                                            key={index}
                                            coordinate={marker.coordinate}
                                            title={marker.title}
                                            image={marker.icon}
                                        />
                                    ))
                                }
                                <Polyline
                                    coordinates={routeInfo.coordinates}
                                    strokeColor="#464BDC"
                                    strokeWidth={3}
                                />
                            </MapView>
                        )}
                    </View>
                    
                    <View style={styles.contentPoints}>
                        {routeInfo.points.map((point, index) => (
                            <Text key={index} style={styles.pointText}>{point}</Text>
                        ))}
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.timeDistanceContainer}>
                            <View style={styles.timeContainer}>
                                <Image 
                                    source={require('../../assets/routeCardImages/clock.png')}
                                    style={styles.timeImage}
                                />
                                <Text style={styles.time}>{duration}</Text>
                            </View>
                            
                            <Text style={styles.distance}>{distance}</Text>
                            
                            <View style={styles.ratingContainer}>
                                <Image 
                                    source={require('../../assets/routeCardImages/rating.png')}
                                    style={styles.ratingImage}
                                />
                                <Text style={styles.rating}>4.5</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <ChooseButton style={styles.chooseButton} onPress={handleChooseButton}/>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default PreviewRouteScreen;