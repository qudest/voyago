import React, { useState, useEffect } from 'react';
import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import RouteCard from '../../components/RouteCard/RouteCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findAll } from '../../services/routesApi';
const API_KEY = 'AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0';
const MyRoutesScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [userData, setUserData] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [accessToken, setAccessToken] = useState(null);
    const [cityNamesCache, setCityNamesCache] = useState({});

    useEffect(() => {
        const fetchCachedData = async () => {
            try {
                const cachedData = await AsyncStorage.getItem('userData');
                const accessToken = await AsyncStorage.getItem('accessToken');
                setAccessToken(accessToken);
                if (cachedData) {
                    const parsedData = JSON.parse(cachedData);
                    setUserData(parsedData);
                }
            } catch (error) {
                console.error('Ошибка при получении данных из кэша:', error);
            }
        };

        fetchCachedData();
    }, []);

    const getCityName = async (placeId) => {
        const extractCleanPlaceId = (rawId) => {
            if (!rawId) return null;
            if (typeof rawId === 'object') return rawId.place_id || rawId.id || null;
            return String(rawId).replace(/^place_id:/i, '').trim();
        };
    
        const cleanPlaceId = extractCleanPlaceId(placeId);
    
        if (!cleanPlaceId || !cleanPlaceId.startsWith('ChIJ')) {
            return 'Место не указано';
        }
    
        if (cityNamesCache[cleanPlaceId]) {
            return cityNamesCache[cleanPlaceId];
        }
    
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${cleanPlaceId}&fields=name,formatted_address&language=ru&key=${API_KEY}`
            );
            
            const data = await response.json();
            
            if (data.status !== 'OK') {
                return 'Место не найдено';
            }
            
            const name = data.result?.name || 
                         data.result?.formatted_address || 
                         'Название недоступно';
            
            setCityNamesCache(prev => ({ ...prev, [cleanPlaceId]: name }));
            return name;
        } catch (error) {
            return 'Ошибка загрузки';
        }
    };

    const fetchRoutes = async () => {
        if (loading || !hasMore) return; 

        setLoading(true);
        try {
            const response = await findAll(accessToken);
                        
                        const routesWithCityNames = await Promise.all(
                            response.data.map(async (route) => {
                                if (!route.routePoints) return route;
                                
                                const processPoint = async (point) => {
                                    if (!point) return 'Точка не указана';
                                    return await getCityName(point);
                                };
                                
                                const [originName, ...waypointNames] = await Promise.all([
                                    processPoint(route.routePoints.origin),
                                    ...(route.routePoints.waypoints || []).map(processPoint)
                                ]);
                                
                                const destinationName = await processPoint(route.routePoints.destination);
                                
                                return {
                                    ...route,
                                    pointNames: [originName, ...waypointNames, destinationName]
                                };
                            })
                        );
                        
                        setRoutes(routesWithCityNames);
        } catch (err) {
            setError(err.message);
            console.log('Ошибка загрузки маршрутов:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (accessToken && userData && page === 0) { 
            fetchRoutes();
        }
    }, [accessToken, userData, page]); 

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20;
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            if (hasMore && !loading) {
                setPage(prevPage => prevPage + 1);
            }
        }
    };

    const formatMetrics = (distance, duration) => {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        return {
            distance: `${(distance / 1000).toFixed(1)}`,
            duration: `${hours > 0 ? `${hours} ч ` : ''}${minutes} мин`
        };
    };

    const filteredRoutes = routes.filter(route => {
        if (!searchQuery.trim()) return true;
        
        const searchLower = searchQuery.toLowerCase();
        const ignoreWords = ['выбрать']; 
        
        const titleMatch = route.name.toLowerCase().includes(searchLower);
        
        const pointsMatch = route.pointNames?.some(point => {
            const pointLower = point.toLowerCase();
            return !ignoreWords.some(word => pointLower.includes(word)) && 
                   pointLower.includes(searchLower);
        });
        
        return titleMatch || pointsMatch;
    });

    const handlerBackButton = () => {
        navigation.navigate("ProfileScreen");
    };

    const handleFiltersButton = () => {
        navigation.navigate("FiltersScreen");
    };

    const handleEditRoute = (route) => {
        navigation.navigate('EditRouteScreen', { 
            route: {
                ...route,
                title: route.name,
                points: route.pointNames
            } 
        });
    };

    const handlePreviewRoute = (route) => {
        navigation.navigate("PreviewRouteScreen", { 
            routeData: {
                name: route.name,
                rating: parseFloat(route.rating),
                distance: route.distance,
                duration: route.duration,
                pointNames: route.pointNames,
                routePoints: route.routePoints
            }
        });
    };

    const mapRouteToCard = (route) => {
        const metrics = formatMetrics(route.distance, route.duration);
        return {
            id: route.id,
            title: route.name,
            time: metrics.duration,
            distance: metrics.distance,
            points: route.pointNames || [],
            rating: route.rating
        };
    };

    if (loading && page === 0) {
        return (
            <View style={styles.container}>
                <BackButton onPress={handlerBackButton} />
                <ActivityIndicator size="large" style={styles.loader} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <BackButton onPress={handlerBackButton} />
                <Text style={styles.errorText}>Что-то пошло не так. Попробуйте позже.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <BackButton onPress={handlerBackButton} />
            <Text style={styles.containerTitle}>Мои маршруты</Text>
            
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchQuery}
                        placeholder="Поиск маршрутов"
                        onChangeText={setSearchQuery}
                    />
                    <Image
                        source={require('../../assets/search.png')}
                        style={styles.searchIcon}
                    />
                </View>
                <TouchableOpacity style={styles.settingsContainer} onPress={handleFiltersButton}>
                    <Image
                        source={require('../../assets/routeCardImages/settings.png')}
                        style={styles.settingsIcon}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView 
                style={styles.buttonContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 70 }}
                onScroll={handleScroll}
                scrollEventThrottle={400}
            >
                {filteredRoutes.map((route) => (
                    <RouteCard 
                        key={route.id}
                        cardInformation={mapRouteToCard(route)}
                        functional="edit"
                        onEditPress={() => handleEditRoute(route)}
                        onPress={() => handlePreviewRoute(route)}
                    />
                ))}
                
                {loading && page > 0 && (
                    <ActivityIndicator size="small" style={styles.loader} />
                )}
                
                {!loading && filteredRoutes.length === 0 && (
                    <Text style={styles.noResults}>
                        {searchQuery ? "Маршруты не найдены" : "У вас пока нет маршрутов"}
                    </Text>
                )}
            </ScrollView>
        </View>
    );
};

export default MyRoutesScreen;
