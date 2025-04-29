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

    const generateMockRoutes = () => {
        const mockRoutes = [];
        const tagsOptions = ['PARK', 'CAFE', 'BAR', 'SHOPPING', 'ARCHITECTURE', 'SPORT'];

        const moscowAddresses = [
            "Красная площадь, Москва",
            "Парк Горького, Крымский Вал, 9, Москва",
            "ВДНХ, проспект Мира, 119, Москва",
            "Арбат, Москва",
            "ГУМ, Красная площадь, 3, Москва",
            "ЦУМ, Петровка, 2, Москва",
            "Кофейня Starbucks, Тверская, 10, Москва",
            "Ресторан White Rabbit, Смоленская площадь, 3, Москва",
            "Музей изобразительных искусств им. Пушкина, Волхонка, 12, Москва",
            "Третьяковская галерея, Лаврушинский переулок, 10, Москва",
            "Зоопарк Москвы, Большая Грузинская, 1, Москва",
            "Парк Зарядье, Варварка, 6, Москва",
            "Останкинская телебашня, Академика Королёва, 15, Москва",
            "Стадион Лужники, Лужники, 24, Москва",
            "Кремль в Измайлово, Измайловское шоссе, 73Ж, Москва",
            "Библиотека им. Ленина, Воздвиженка, 3/5, Москва"
        ];

        for (let i = 1; i <= 14; i++) {
            const pointsCount = 2 + Math.floor(Math.random() * 4);
            const shuffled = [...moscowAddresses].sort(() => 0.5 - Math.random());
            const selectedPoints = shuffled.slice(0, pointsCount);

            const routePoints = {
                origin: selectedPoints[0].split(',').slice(0, 2).join(','),
                waypoints: selectedPoints.slice(1, -1),
                destination: selectedPoints[selectedPoints.length - 1].split(',').slice(0, 2).join(',')
            };
            const randomTags = [];
            const tagsCount = Math.floor(Math.random() * 3); 
            for (let k = 0; k < tagsCount; k++) {
                const tag = tagsOptions[Math.floor(Math.random() * tagsOptions.length)];
                if (!randomTags.includes(tag)) {
                    randomTags.push(tag);
                }
            }
            const routeTypes = [
                "Исторический тур",
                "Гастрономическое путешествие",
                "Архитектурный маршрут",
                "Парковая прогулка",
                "Шопинг-тур",
                "Культурный экспресс"
            ];

            mockRoutes.push({
                id: i,
                name: routeTypes[Math.floor(Math.random() * routeTypes.length)],
                routePoints: routePoints,
                distance: 500 + Math.floor(Math.random() * 10000), 
                duration: 300 + Math.floor(Math.random() * 7200), 
                rating: (Math.random() * 5).toFixed(1),
                pointNames: selectedPoints
            });
        }
        return mockRoutes;
    };

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
        distance: `${(route.distance / 1000).toFixed(1)}`,
        points: [
            route.routePoints.origin,
            ...route.routePoints.waypoints,
            route.routePoints.destination
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