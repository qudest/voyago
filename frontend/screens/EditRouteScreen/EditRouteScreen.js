import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import AddPoint from '../../components/AddPoint/AddPoint';
import PointOfRoute from '../../components/PointOfRoute/PointOfRoute';
import CreateRouteButton from '../../components/CreateRouteButton/CreateRouteButton';
import DeleteRouteButton from '../../components/DeleteRouteButton/DeleteRouteButton';
import AlertDelete from '../../components/AlertDelete/AlertDelete';
import { RouteUpdate, RouteDelete, RouteCreate } from '../../services/routesApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditRouteScreen = () => {
    const navigation = useNavigation();
    const { params } = useRoute();
    
    const initialRoute = params?.route || { 
        id: null,
        name: 'Новый маршрут',
        points: [{place_id: '', name: ''}, {place_id: '', name: ''}],
        pointNames: ['', ''],
        origin: '',
        destination: '',
        waypoints: [],
        distance: 0,
        duration: 0,
        rating: 0,
        tags: []
    };
    
    const [selectedPoints, setSelectedPoints] = useState(initialRoute.points || [{place_id: '', name: ''}, {place_id: '', name: ''}]);
    const [routeName, setRouteName] = useState(initialRoute.name);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [showEmptyFieldsWarning, setShowEmptyFieldsWarning] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const cachedData = await AsyncStorage.getItem('userData');
                if (cachedData) {
                    const parsedData = JSON.parse(cachedData);
                    setUserId(parsedData.id);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const filledCount = selectedPoints.filter(p => p.place_id && p.name).length;
        setButtonEnabled(filledCount >= 2 && routeName.trim().length > 0);
    }, [selectedPoints, routeName]);

    const handleAddPoint = () => {
        if (selectedPoints.length < 6) {
            setSelectedPoints([...selectedPoints, {place_id: '', name: ''}]);
        }
    };

    const handleRemovePoint = (index) => {
        if (selectedPoints.length > 2) {
            const newPoints = [...selectedPoints];
            newPoints.splice(index, 1);
            setSelectedPoints(newPoints);
        }
    };

    const handleSave = async () => {
        if (!buttonEnabled) {
            setShowEmptyFieldsWarning(true);
            return;
        }

        if (!userId) {
            Alert.alert('Ошибка', 'Не удалось определить пользователя');
            return;
        }

        setIsLoading(true);
        try {
            const routeData = {
                name: routeName,
                createdBy: userId,
                pointNames: selectedPoints.map(p => p.name),
                routePoints: {
                    origin: selectedPoints[0].place_id ? `place_id:${selectedPoints[0].place_id}` : '',
                    destination: selectedPoints[selectedPoints.length-1].place_id ? 
                        `place_id:${selectedPoints[selectedPoints.length-1].place_id}` : '',
                    waypoints: selectedPoints.slice(1, -1)
                        .filter(p => p.place_id)
                        .map(p => `place_id:${p.place_id}`)
                },
                distance: initialRoute.distance || 0,
                duration: initialRoute.duration || 0,
                rating: initialRoute.rating || 0,
                tags: initialRoute.tags || []
            };

            if (initialRoute.id) {
                await RouteUpdate(
                    initialRoute.id,
                    routeData.name,
                    userId,
                    routeData.tags,
                    routeData.routePoints,
                    routeData.distance,
                    routeData.duration
                );
            } else {
                await RouteCreate(
                    routeData.name,
                    userId,
                    routeData.tags,
                    routeData.routePoints,
                    routeData.distance,
                    routeData.duration
                );
            }

            navigation.navigate('PreviewRouteScreen', { 
                routeData 
            });
        } catch (error) {
            console.error('Error saving route:', error);
            Alert.alert('Ошибка', 'Не удалось сохранить маршрут');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = () => {
        setDeleteModalVisible(true);
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

    const cancelDelete = () => {
        setDeleteModalVisible(false);
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <BackButton onPress={() => navigation.goBack()} />
                <ActivityIndicator size="large" style={styles.loader} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.goBack()} />
            
            <View style={styles.topContainer}>
                <Text style={styles.createTitle}>
                    {initialRoute.id ? 'Редактирование маршрута' : 'Создание маршрута'}
                </Text>
                <TextInput
                    style={styles.inputTitle}
                    value={routeName}
                    onChangeText={setRouteName}
                    placeholder="Название маршрута"
                    maxLength={40}
                    placeholderTextColor="#999"
                />
            </View>
            
            <View style={styles.pointsContainer}>
                {selectedPoints.map((point, index) => (
                    <PointOfRoute 
                        key={index}
                        selectedAddress={point.name}
                        onAddressSelect={(selectedPoint) => {
                            const newPoints = [...selectedPoints];
                            newPoints[index] = selectedPoint;
                            setSelectedPoints(newPoints);
                        }}
                        onRemove={() => handleRemovePoint(index)}
                        showRemoveButton={selectedPoints.length > 2}
                    />
                ))}
            </View>
            
            {showEmptyFieldsWarning && (
                <Text style={styles.warningText}>
                    {!routeName ? "Введите название маршрута!" : "Не все точки заполнены!"}
                </Text>
            )}
            
            <AddPoint 
                onPress={handleAddPoint} 
                disabled={selectedPoints.length >= 6}
            />
            
            <View style={styles.actionsContainer}>
                <CreateRouteButton
                    onPress={handleSave}
                    disabled={!buttonEnabled}
                    title={initialRoute.id ? "Сохранить изменения" : "Создать маршрут"}
                />
                {initialRoute.id && <DeleteRouteButton onPress={handleDelete} />}
            </View>

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

export default EditRouteScreen;