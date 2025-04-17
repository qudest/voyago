import React, { useState } from 'react';
import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import RouteCard from '../../components/RouteCard/RouteCard';

const MyRoutesScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    const allRoutes = [
        {
            id: 1,
            title: "Весёлый маршрут",
            time: "7:77",
            distance: "5",
            points: ["Точка раз", "Точка двас", "Точка трис"],
        },
    ];

    const filteredRoutes = allRoutes.filter(route => {
        if (!searchQuery.trim()) return true;
        
        const searchLower = searchQuery.toLowerCase();
        const ignoreWords = ['выбрать']; 
        
        const titleMatch = route.title.toLowerCase().includes(searchLower);
        
        const pointsMatch = route.points.some(point => {
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
    const functional = "like";

    return (
        <View style={styles.container}>
            <BackButton onPress={handlerBackButton} />
            <Text style={styles.containerTitle}>Избранные маршруты</Text>
            
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchQuery}
                        placeholder=""
                        onChangeText={setSearchQuery}
                    />
                    <Image
                        source={require('../../assets/search.png')}
                        style={styles.searchIcon}
                    />
                </View>
                <TouchableOpacity  style={styles.settingsContainer} onPress={handleFiltersButton}>
                    <Image
                            source={require('../../assets/routeCardImages/settings.png')}
                            style={styles.settingsIcon}
                    />
                </TouchableOpacity >
            </View>

            <ScrollView 
                style={styles.buttonContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 70 }} 
            >
                {filteredRoutes.map((route) => (
                    <RouteCard 
                        key={route.id}
                        cardInformation={route}
                        functional={functional}
                    />
                ))}
                
                {filteredRoutes.length === 0 && searchQuery && (
                    <Text style={styles.noResults}>Маршруты не найдены</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default MyRoutesScreen;