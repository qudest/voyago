import React, { useState, useEffect } from 'react';
import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import RouteCard from '../../components/RouteCard/RouteCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findRoutesByUser } from '../../services/routesApi';

const MyRoutesScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [userData, setUserData] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const mockFindRoutesByUser = async (userId) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    data: [
                        {
                            id: 1,
                            name: "Весёлый маршрут",
                            createdBy: userId,
                            distance: 5000,
                            duration: 7200,
                            rating: 4.5,
                            routePoints: {
                                origin: "place_id:ChIJN1t_tDeuEmsRUsoyG83frY4",
                                destination: "place_id:ChIJ7cv00DwsDogRAMDACa2m4K8",
                                waypoints: ["place_id:ChIJW-T2Wt7Gt4kRKl2I1CJFUsI"]
                            },
                            pointNames: ["Точка раз", "Точка двас", "Точка трис"],
                            tags: ["PARK", "CAFE"]
                        },
                        {
                            id: 2,
                            name: "Культурный тур",
                            createdBy: userId,
                            distance: 4000,
                            duration: 5400,
                            rating: 4.2,
                            routePoints: {
                                origin: "place_id:ChIJW-T2Wt7Gt4kRKl2I1CJFUsI",
                                destination: "place_id:ChIJN1t_tDeuEmsRUsoyG83frY4",
                                waypoints: []
                            },
                            pointNames: ["Музей искусств", "Театр драмы", "Концертный зал"],
                            tags: ["ARCHITECTURE"]
                        }
                    ]
                });
            }, 800);
        });
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const cachedData = await AsyncStorage.getItem('userData');
                if (cachedData) {
                    const parsedData = JSON.parse(cachedData);
                    setUserData(parsedData);
                    return parsedData.id;
                }
                return null;
            } catch (error) {
                console.error('Ошибка при получении данных из кэша:', error);
                return null;
            }
        };

        const fetchRoutes = async () => {
            setLoading(true);
            try {
                const userId = await fetchUserData();
                if (!userId) {
                    throw new Error('User ID not found');
                }

                const response = await mockFindRoutesByUser(userId);
                // const response = await findRoutesByUser(userId);
                
                setRoutes(response.data);
            } catch (err) {
                setError(err.message);
                console.error('Ошибка загрузки маршрутов:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRoutes();
    }, []);

    const formatMetrics = (distance, duration) => {
        return {
            distance: `${(distance / 1000).toFixed(1)}`,
            duration: `${Math.floor(duration / 3600)} ${Math.round((duration % 3600) / 60)}`
        };
    };

    const filteredRoutes = routes.filter(route => {
        if (!searchQuery.trim()) return true;
        
        const searchLower = searchQuery.toLowerCase();
        const ignoreWords = ['выбрать']; 
        
        const titleMatch = route.name.toLowerCase().includes(searchLower);
        
        const pointsMatch = route.pointNames.some(point => {
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
            route: {
                ...route,
                title: route.name,
                points: route.pointNames
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
            points: route.pointNames,
            rating: route.rating
        };
    };

    if (loading) {
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
                <Text style={styles.errorText}>{error}</Text>
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