import React, { useState } from 'react';
import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import RouteCard from '../../components/RouteCard/RouteCard';
import SettingsButton from '../../components/SettingsButton/SettingsButton';
import PremiunRoutesButton from '../../components/PremiumRoutesButton/PremiumRoutesButton';

const RecommendationsRoutesScreen = () => {
    const navigation = useNavigation();

    const allRoutes = [
        {
            id: 1,
            title: "Весёлый маршрут",
            time: "7:77",
            distance: "5",
            points: ["Точка раз", "Точка двас", "Точка трис"],
        },
        {
            id: 2,
            title: "Невесели маршрут",
            time: "7:77",
            distance: "5",
            points: ["Точка раз", "Точка двас", "Точка трис"],
        },
        {
            id: 3,
            title: "Грустни маршрут",
            time: "7:77",
            distance: "5",
            points: ["Точка раз", "Точка двас", "Точка трис"],
        },
        {
            id: 4,
            title: "Грустни маршрут",
            time: "7:77",
            distance: "5",
            points: ["Точка раз", "Точка двас", "Точка трис"],
        },
        {
            id: 5,
            title: "Грустни маршрут",
            time: "7:77",
            distance: "5",
            points: ["Точка раз", "Точка двас", "Точка трис"],
        },
        {
            id: 6,
            title: "Грустни маршрут",
            time: "7:77",
            distance: "5",
            points: ["Точка раз", "Точка двас", "Точка трис"],
        },
        {
            id: 7,
            title: "Грустни маршрут",
            time: "7:77",
            distance: "5",
            points: ["Точка раз", "Точка двас", "Точка трис"],
        },
    ];

    const handlerBackButton = () => {
        navigation.navigate("MainScreen"); 
    };

    const handleSettingsButton = () => {
        navigation.navigate("FiltersScreen");
    };
    const handleRouteButton = () => {
        navigation.navigate("PreviewRouteScreen")
    }

    const functional = "like";

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
            >
                {allRoutes.map((route) => (
                    <RouteCard 
                        key={route.id}
                        cardInformation={route}
                        functional={functional}
                        onPress={handleRouteButton}
                    />
                ))}
                
                {allRoutes.length === 0 && (
                    <Text style={styles.noResults}>Маршруты не найдены</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default RecommendationsRoutesScreen;