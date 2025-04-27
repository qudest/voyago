import React, { useState, useEffect } from 'react';
import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import RouteCard from '../../components/RouteCard/RouteCard';
import SettingsButton from '../../components/SettingsButton/SettingsButton';
import PremiunRoutesButton from '../../components/PremiumRoutesButton/PremiumRoutesButton';
import { findAll } from '../../services/routesApi';

const RecommendationsRoutesScreen = () => {
    const navigation = useNavigation();
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [filter, setFilter] = useState(null);

    // const loadRoutes = async (reset = false) => {
    //     if (loading && !reset) return;
        
    //     const currentPage = reset ? 0 : page;
    //     setLoading(true);
        
    //     try {
    //         const response = await findAll(
    //             { page: currentPage, size: 10 }, 
    //             filter 
    //         );
            
    //         setRoutes(prev => reset ? response.data : [...prev, ...response.data]);
    //         setHasMore(response.data.length > 0);
    //         if (reset) setPage(0);
    //         else setPage(currentPage + 1);
    //     } catch (error) {
    //         console.error('Ошибка загрузки маршрутов:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const generateMockRoutes = () => {
        const mockRoutes = [];
        const tagsOptions = ['PARK', 'CAFE', 'BAR', 'SHOPPING', 'ARCHITECTURE', 'SPORT'];
        const pointNames = [
            "Центральный парк", 
            "Кофейня 'Уют'", 
            "Торговый центр 'Галерея'",
            "Площадь Победы",
            "Музей искусств",
            "Спортивный комплекс",
            "Набережная реки",
            "Пивной ресторан 'Хмель'",
            "Ботанический сад",
            "Кинотеатр 'Современник'"
        ];

        for (let i = 1; i <= 14; i++) {
            const pointsCount = 2 + Math.floor(Math.random() * 4); // 2-5 точек
            const points = [];
            for (let j = 0; j < pointsCount; j++) {
                points.push(pointNames[Math.floor(Math.random() * pointNames.length)]);
            }

            const randomTags = [];
            const tagsCount = Math.floor(Math.random() * 3); // 0-2 тега
            for (let k = 0; k < tagsCount; k++) {
                const tag = tagsOptions[Math.floor(Math.random() * tagsOptions.length)];
                if (!randomTags.includes(tag)) {
                    randomTags.push(tag);
                }
            }

            mockRoutes.push({
                id: i,
                name: `Маршрут ${i}${randomTags.length > 0 ? ` (${randomTags.join(', ')})` : ''}`,
                routePoints: {
                    origin: `place_id:${Math.floor(Math.random() * 1000)}`,
                    waypoints: Array.from({length: pointsCount - 2}, () => 
                        `place_id:${Math.floor(Math.random() * 1000)}`),
                    destination: `place_id:${Math.floor(Math.random() * 1000)}`
                },
                distance: 500 + Math.floor(Math.random() * 10000), 
                duration: 300 + Math.floor(Math.random() * 7200), 
                rating: (Math.random() * 5).toFixed(1),
                pointNames: points
            });
        }
        return mockRoutes;
    };

    // useEffect(() => {
    //     loadRoutes(true);
    // }, [filter]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setRoutes(generateMockRoutes());
            setLoading(false);
        }, 500);
    }, []);


    const handlerBackButton = () => navigation.navigate("MainScreen");
    const handleSettingsButton = () => navigation.navigate("FiltersScreen", {
        onApplyFilters: (newFilters) => setFilter(newFilters)
    });
    const handleRoutePress = (route) => {
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

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20;
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            if (hasMore && !loading) loadRoutes();
        }
    };

    const mapRouteToCard = (route) => ({
        id: route.id,
        title: route.name,
        time: formatDuration(route.duration),
        distance: `${(route.distance / 1000).toFixed(1)} км`,
        points: [
            route.routePoints.origin.split(':')[1],
            ...route.routePoints.waypoints.map(wp => wp.split(':')[1]),
            route.routePoints.destination.split(':')[1]
        ],
        rating: route.rating
    });

    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours > 0 ? `${hours} ч ` : ''}${minutes} мин`;
    };

    return (
        <View style={styles.container}>
            <BackButton onPress={handlerBackButton} />
            
            <View style={styles.header}>
                <PremiunRoutesButton/>
                <SettingsButton onPress={handleSettingsButton}/>
            </View>

            <ScrollView 
                style={styles.buttonContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 70 }}
                onScroll={handleScroll}
                scrollEventThrottle={400}
            >
                
                {loading ? (
                    <ActivityIndicator size="large" style={styles.loader} />
                ) : (
                    routes.map(route => (
                        <RouteCard 
                            key={route.id}
                            cardInformation={mapRouteToCard(route)}
                            functional="like"
                            onPress={() => handleRoutePress(route)}
                        />
                    ))
                )}
                
                {!loading && routes.length === 0 && (
                    <Text style={styles.noResults}>Маршруты не найдены</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default RecommendationsRoutesScreen;