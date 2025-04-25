import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import AddPoint from '../../components/AddPoint/AddPoint';
import PointOfRoute from '../../components/PointOfRoute/PointOfRoute';
import CreateRouteButton from '../../components/CreateRouteButton/CreateRouteButton';
import axios from 'axios';


const CreateRouteScreen = () => {
    const [selectedAddress, setSelectedAddress] = useState(['', '']); 
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [showEmptyFieldsWarning, setShowEmptyFieldsWarning] = useState(false);
    const navigation = useNavigation();
    const [selectedPoints, setSelectedPoints] = useState([{place_id: '', name: ''}, {place_id: '', name: ''}]);
    const API_KEY = 'AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0';
    useEffect(() => {
        const filledCount = selectedAddress.filter(address => address.length > 0).length;
        setButtonEnabled(filledCount >= 2);
        setShowEmptyFieldsWarning(false);
    }, [selectedAddress]);

    const handleBackButton = () => {
        navigation.navigate("ProfileScreen")
    }

    const handleAddPoint = () => {
        setSelectedAddress([...selectedAddress, '']); 
    };

    const handleRemovePoint = (index) => {
        const newCities = [...selectedAddress];
        newCities.splice(index, 1);
        setSelectedAddress(newCities);
    };

    const handleAddressSelect = (index, point) => {
        const newPoints = [...selectedPoints];
        newPoints[index] = point;
        setSelectedPoints(newPoints);
    };
    const formatMetrics = (routeData) => {
        return {
            distance: `${(routeData.distance / 1000).toFixed(1)} км`,
            duration: `${Math.floor(routeData.duration / 3600)} ч ${Math.round((routeData.duration % 3600) / 60)} мин`
        };
    };

    const handleContinueButton = async () => {
        try {
            const hasEmpty = selectedPoints.some(p => !p.place_id);
            if (hasEmpty) {
                setShowEmptyFieldsWarning(true);
                return;
            }

            const directions = await fetchRoute(selectedPoints);

            const routeData = {
                origin: `place_id:${selectedPoints[0].place_id}`,
                waypoints: selectedPoints.slice(1, -1).map(p => `place_id:${p.place_id}`),
                destination: `place_id:${selectedPoints[selectedPoints.length-1].place_id}`,
                distance: directions.distance,
                duration: directions.duration,
            };

            console.log(routeData)
            const { distance, duration } = formatMetrics(routeData);
            console.log( distance, duration )

            navigation.navigate('PreviewRouteScreen', {routeData});
        } catch (error) {
            Alert.alert('Ошибка', error.message);
        }
    };

    const fetchRoute = async (points) => {
        try {
            const response = await axios.get(
                'https://maps.googleapis.com/maps/api/directions/json',
                {
                    params: {
                        origin: `place_id:${points[0].place_id}`,
                        destination: `place_id:${points[points.length-1].place_id}`,
                        waypoints: points.slice(1, -1).map(p => `place_id:${p.place_id}`).join('|'),
                        key: API_KEY,
                        language: 'ru'
                    }
                }
            );
    
            const route = response.data.routes[0];
            return {
                polyline: route.overview_polyline.points,
                distance: route.legs.reduce((sum, leg) => sum + leg.distance.value, 0),
                duration: route.legs.reduce((sum, leg) => sum + leg.duration.value, 0)
            };
        } catch (error) {
            throw new Error('Ошибка получения данных маршрута');
        }
    };
    return (
        <View style={styles.container}>
            <BackButton onPress={handleBackButton}/>
            
            <View style={styles.topContainer}> 
                <Text style={styles.createTitle}>Создание маршрута</Text>
                <Text style={styles.createDiscription}>Выберите от 2 до 6 точек</Text>
            </View>   
            
            <View style={styles.pointsContainer}>
                {selectedAddress.map((address, index) => (
                    <PointOfRoute 
                        key={index}
                        selectedAddress={address}
                        onAddressSelect={(selectedAddress) => handleAddressSelect(index, selectedAddress)}
                        onRemove={() => handleRemovePoint(index)}
                        showRemoveButton={selectedAddress.length > 2}
                    />
                ))}
            </View>
            
            {showEmptyFieldsWarning && (
                <Text style={styles.warningText}>Не все точки заполнены!</Text>
            )}
            
            <AddPoint 
                onPress={handleAddPoint} 
                condition={selectedAddress.length >= 6}
            />
            
            <CreateRouteButton
                onPress={handleContinueButton}
                condition={buttonEnabled}
            />
        </View>
    );
};

export default CreateRouteScreen;