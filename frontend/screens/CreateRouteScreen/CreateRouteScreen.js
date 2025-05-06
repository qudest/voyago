import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import AddPoint from '../../components/AddPoint/AddPoint';
import PointOfRoute from '../../components/PointOfRoute/PointOfRoute';
import CreateRouteButton from '../../components/CreateRouteButton/CreateRouteButton';
import { TextInput } from 'react-native-gesture-handler';
import { RouteCreate } from '../../services/routesApi';
import AlertError from '../../components/AlertError/AlertError';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_KEY = 'AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0';
const CreateRouteScreen = () => {
    const [selectedPoints, setSelectedPoints] = useState([{place_id: '', name: ''}, {place_id: '', name: ''}]);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [showEmptyFieldsWarning, setShowEmptyFieldsWarning] = useState(false);
    const [nameRoute, setName] = useState();
    const [userData, setUserData] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const navigation = useNavigation();
    const [isErrorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const fetchCachedData = async () => {
          try {
            const cachedData = await AsyncStorage.getItem('userData');
            const accessToken = await AsyncStorage.getItem('accessToken');
            setAccessToken(accessToken)
            if (cachedData) {
              const parsedData = JSON.parse(cachedData);
              setUserData(parsedData);
              console.log('Данные из кэша:', parsedData);
            }
          } catch (error) {
            console.error('Ошибка при получении данных из кэша:', error);
          }
        };
        
        fetchCachedData();
      }, []);

    useEffect(() => {
        const filledCount = selectedPoints.filter(p => p.place_id).length;
        setButtonEnabled(filledCount >= 2);
        setShowEmptyFieldsWarning(false);
    }, [selectedPoints]);

    const handleBackButton = () => {
        navigation.navigate("ProfileScreen");
    };

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

    const getCoordinatesFromPlaceId = async (placeId) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId.replace('place_id:', '')}&fields=geometry&key=${API_KEY}`
            );
            const data = await response.json();
            return data.result.geometry.location;
        } catch (error) {
            return null;
        }
    };
    const confirmError = () => {
        setErrorModalVisible(false);
      };
    
    const calculateRoute = async (originId, destinationId, waypoints) => {
        try {
            const originCoords = await getCoordinatesFromPlaceId(originId);
            const destinationCoords = await getCoordinatesFromPlaceId(destinationId);
            const waypointsCoords = await Promise.all(
                waypoints.map(wp => getCoordinatesFromPlaceId(wp))
            );

            const waypointsParam = waypointsCoords
                .map(coord => `${coord.lat},${coord.lng}`)
                .join('|');
    
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${originCoords.lat},${originCoords.lng}&destination=${destinationCoords.lat},${destinationCoords.lng}&waypoints=optimize:true|${waypointsParam}&key=${API_KEY}`
            );
            
            const data = await response.json();
            
            if (data.routes.length > 0) {
                const route = data.routes[0];
                

                const distance = route.legs.reduce((sum, leg) => sum + leg.distance.value, 0);
                const duration = route.legs.reduce((sum, leg) => sum + leg.duration.value, 0);
                
                return { distance, duration };
            }
        } catch (error) {
            console.error('Error calculating route:', error);
        }
        return { distance: 0, duration: 0 };
    };

    const handleContinueButton = async () => {
        const hasEmpty = selectedPoints.some(p => !p.place_id);
        if (hasEmpty) {
            setShowEmptyFieldsWarning(true);
            return;
        }
    
        const routeData = {
            name: nameRoute,
            points: selectedPoints,
            origin: `place_id:${selectedPoints[0].place_id}`,
            waypoints: selectedPoints.slice(1, -1).map(p => `place_id:${p.place_id}`),
            destination: `place_id:${selectedPoints[selectedPoints.length - 1].place_id}`,
            pointNames: selectedPoints.map(p => p.name)
        };
    
        const name = nameRoute;
        const createdBy = userData.id;
        const tags = ["PARK"];
        const routePoints = {
            origin: routeData.origin,
            waypoints: routeData.waypoints,
            destination: routeData.destination
        };
    
        const { distance, duration } = await calculateRoute(
            routeData.origin,
            routeData.destination,
            routeData.waypoints
        );
    
        try {
            const response = await RouteCreate(name, createdBy, tags, routePoints, distance, duration, accessToken);
            if (response.status === 200) {
                navigation.navigate('PreviewRouteScreen', {
                    routeData: {
                        name,
                        rating: 0,
                        distance,
                        duration,
                        pointNames: routeData.pointNames,
                        routePoints,
                    }
                });
            }
        }catch (error) {
            let message = 'Что-то пошло не так';
            if (error.response) {
                message = 'Ошибка сервера';
            } else if (error.request) {
                message = 'Такое название уже существует!';
            }
            setErrorMessage(message);
            setErrorModalVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <BackButton onPress={handleBackButton}/>
            
            <View style={styles.topContainer}> 
                <Text style={styles.createTitle}>Создание маршрута</Text>
                <TextInput
                  style={styles.inputTitle}
                  maxLength={40}
                  placeholder="Название маршрута"
                  cursorColor="#FCFFFF"
                  onChangeText={setName}
                  value={nameRoute} 
                ></TextInput>
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
                <Text style={styles.warningText}>Не все точки заполнены!</Text>
            )}
            
            <AddPoint 
                onPress={handleAddPoint} 
                condition={selectedPoints.length >= 6}
            />
            
            <CreateRouteButton
                onPress={handleContinueButton}
                condition={!buttonEnabled}
            />

            <AlertError
                    isVisible={isErrorModalVisible}
                    onConfirm={confirmError}
                    title = "Ошибка!"
                    message = {errorMessage}
            />
        </View>
    );
};

export default CreateRouteScreen;