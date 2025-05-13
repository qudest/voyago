import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, TextInput, TouchableOpacity, FlatList, Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import styles from "./styles";
import BackButton from '../../components/BackButton/BackButton';
import UserLIstElement from '../../components/UserLIstElement/UserLIstElement';
import AlertDelete from '../../components/AlertDelete/AlertDelete';
import { useNavigation } from "@react-navigation/native";
import AdminRouteCard from '../../components/AdminRouteCard/AdminRouteCard';

const AdminRoutesScreen = () => {
    const navigation = useNavigation();
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [routes, setRoutes] = useState([
        { id: '1', title: 'Route 1', time: '20', distance: '20', points: ['point', 'point', 'point'] },
        { id: '2', title: 'Route 1', time: '20', distance: '20', points: ['point', 'point', 'point'] },
        { id: '3', title: 'Route 1', time: '20', distance: '20', points: ['point', 'point', 'point'] },
        { id: '4', title: 'Route 1', time: '20', distance: '20', points: ['point', 'point', 'point'] },
        { id: '5', title: 'Route 1', time: '20', distance: '20', points: ['point', 'point', 'point'] },
        { id: '6', title: 'Route 1', time: '20', distance: '20', points: ['point', 'point', 'point'] },
        { id: '7', title: 'Route 1', time: '20', distance: '20', points: ['point', 'point', 'point'] },
        { id: '8', title: 'Route 1', time: '20', distance: '20', points: ['point', 'point', 'point'] },
        { id: '9', title: 'Route 1', time: '20', distance: '20', points: ['point', 'point', 'point'] },
    ]); 

    const handleBackPress = () => {
        navigation.navigate("AdminScreen")
    };

    
    const handleFiltersButton = () => {
        navigation.navigate("FiltersScreen");
    };

    const handleDelete = () => {
        setDeleteModalVisible(true);
    };

    const cancelDelete = () => {
        setDeleteModalVisible(false);
    };

    

    const confirmDelete = async () => {
            if (!initialRoute.id) {
                navigation.navigate('MyRoutesScreen');
                return;
            }
    
            setIsLoading(true);
            try {
                await RouteDelete(initialRoute.id);
                navigation.navigate('MyRoutesScreen');
            } catch (error) {
                console.error('Error deleting route:', error);
                Alert.alert('Ошибка', 'Не удалось удалить маршрут');
            } finally {
                setIsLoading(false);
                setDeleteModalVisible(false);
            }
    };

    const renderUserItem = ({ item }) => (
        <AdminRouteCard 
            cardInformation={{...item}} 
            onPress={() => handleDelete(item.id)} 
        />
    );

    const filteredRoutes = routes.filter(route => {
        if (!searchQuery.trim()) return true;
        
        const searchLower = searchQuery.toLowerCase();
        const ignoreWords = ['выбрать']; 
        
        const titleMatch = route.title.toLowerCase().includes(searchLower);
        
        const pointsMatch = route.pointNames?.some(point => {
            const pointLower = point.toLowerCase();
            return !ignoreWords.some(word => pointLower.includes(word)) && 
                   pointLower.includes(searchLower);
        });
        
        return titleMatch || pointsMatch;
    });

    return (
        <View style={styles.container}>
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
            <BackButton onPress={handleBackPress}/>
            {filteredRoutes.length > 0 ? (
                <FlatList
                    data={filteredRoutes}
                    renderItem={renderUserItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={styles.list}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Пользователи не найдены. Попробуйте позже.</Text>
                </View>
            )}

            <AlertDelete
                isVisible={isDeleteModalVisible}
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
                title="Удаление маршрута"
                message="Вы точно хотите удалить маршрут?"
            />
        </View>
    );
};
export default AdminRoutesScreen;