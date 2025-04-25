import React, {useState, useEffect} from 'react';
import BackButton from "../../components/BackButton/BackButton";
import styles from "./styles";
import ChooseButton from "../../components/ChooseButton/ChooseButton";
import { View, Image, ActivityIndicator, Text, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker, Polyline } from 'react-native-maps';
import polyline from '@mapbox/polyline';
import axios from 'axios';

const PreviewRouteScreen = () => {
    const navigation = useNavigation();
    const [coordinates, setCoordinates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [markers, setMarkers] = useState([]);
    const [region, setRegion] = useState(null);
    
    const route = useRoute(); 
    const handleBackButton = () => {
        navigation.goBack(); 
    }

    const handleChooseButton = () => {
        navigation.navigate("MainScreen", {
            selectedRoute: {
                id: 1,
                title: "Маршрут 2",
                location: "Воронеж",
                time: "2",
                distance: "2",
                rating: 4.5,
                points: ["Точка раз", "Точка двас", "Точка трис"],
            },
        });
    }
    const API_KEY = 'AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0';

    const { origin, destination, waypoints } = route.params.routeData;
    
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

    useEffect(() => {
        const fetchRoute = async () => {
            try {
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
                    const points = polyline.decode(response.data.routes[0].overview_polyline.points);
                    const coords = points.map(point => ({
                        latitude: point[0],
                        longitude: point[1]
                    }));
                    
                    setCoordinates(coords);
                    
                    const newMarkers = [
                        {
                            coordinate: originCoords,
                            title: "Старт",
                            icon:  require('../../assets/markers/default.png')
                        },
                        ...waypointsCoords.map((coord, index) => ({
                            coordinate: coord,
                            title: `Точка ${index + 1}`,
                            icon:  require('../../assets/markers/default.png')
                        })),
                        {
                            coordinate: destinationCoords,
                            title: "Финиш",

                            icon:  require('../../assets/markers/default.png')
                        }
                    ];
                    setMarkers(newMarkers);

                    const latitudes = coords.map(c => c.latitude);
                    const longitudes = coords.map(c => c.longitude);
                    setRegion({
                        latitude: (Math.min(...latitudes) + Math.max(...latitudes)) / 2,
                        longitude: (Math.min(...longitudes) + Math.max(...longitudes)) / 2,
                        latitudeDelta: Math.abs(Math.max(...latitudes) - Math.min(...latitudes)) * 1.5,
                        longitudeDelta: Math.abs(Math.max(...longitudes) - Math.min(...longitudes)) * 1.5
                    });
                }
            } catch (error) {
                Alert.alert('Ошибка', 'Не удалось построить маршрут');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoute();
    }, []);
    const points = ["Точка раз", "Точка двас", "Точка трис"];
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <BackButton onPress={handleBackButton}/>
                
                <View style={styles.headerContainer}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                        Маршрут 2
                    </Text>

                    <View style={styles.locationContainer}>
                        <Image 
                            source={require('../../assets/routeCardImages/map.png')}
                            style={styles.locationImage}
                        />
                        <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
                            Воронеж
                        </Text>
                    </View>
                </View>

                <ScrollView 
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                >
                        <View style={styles.mapContainer}>
                        {loading ? (
                            <ActivityIndicator size="large" style={styles.loader} />
                        ) : region && (
                            <MapView
                                style={styles.map}
                                initialRegion={region}
                                region={region}
                            >
                                {markers.map((marker, index) => (
                                    <Marker
                                        key={index}
                                        coordinate={{
                                            latitude: marker.coordinate.lat,
                                            longitude: marker.coordinate.lng
                                        }}
                                        title={marker.title}
                                        image={marker.icon}
                                    />
                                ))}
                                <Polyline
                                    coordinates={coordinates}
                                    strokeColor="#464BDC"
                                    strokeWidth={3}
                                />
                            </MapView>
                        )}
                    </View>
                    
                    <View style={styles.contentPoints}>
                        {points.map((point, index) => (
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
                                <Text style={styles.time}>2 ч.</Text>
                            </View>
                            
                            <Text style={styles.distance}>2 км</Text>
                            
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
}

export default PreviewRouteScreen;