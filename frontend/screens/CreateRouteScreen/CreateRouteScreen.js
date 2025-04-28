import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import AddPoint from '../../components/AddPoint/AddPoint';
import PointOfRoute from '../../components/PointOfRoute/PointOfRoute';
import AlertError from '../../components/AlertError/AlertError';
import CreateRouteButton from '../../components/CreateRouteButton/CreateRouteButton';
import AlertChange from '../../components/AlertChange/AlertChange';
import { TextInput } from 'react-native-gesture-handler';
import { RouteCreate } from '../../services/routesApi';

const CreateRouteScreen = () => {
    const [selectedPoints, setSelectedPoints] = useState([{place_id: '', name: ''}, {place_id: '', name: ''}]);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [showEmptyFieldsWarning, setShowEmptyFieldsWarning] = useState(false);
    const [nameRoute, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigation = useNavigation();
    const [isErrorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    

    useEffect(() => {
        const filledCount = selectedPoints.filter(p => p.place_id).length;
        setButtonEnabled(filledCount >= 2);
        setShowEmptyFieldsWarning(false);
    }, [selectedPoints]);

    const handleBackButton = () => {
        navigation.navigate("ProfileScreen");
    };

    const handlePreview = (routeData) => {
        navigation.navigate("PreviewRouteScreen", { routeData });
    };

    const confirmError = () => {
        setErrorModalVisible(false);
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

    const simulateApiCall = async (routeData) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // return RouteCreate(
        //     routeData.name,
        //     1, // createdBy 
        //     [], // tags 
        //     {
        //         origin: routeData.origin,
        //         waypoints: routeData.waypoints,
        //         destination: routeData.destination
        //     },
        //     1000, 
        //     3600 
        // );
        
        return Promise.resolve({
            data: {
                id: Math.floor(Math.random() * 1000),
                ...routeData,
                rating: 5,
                createdBy: 1
            }
        });
    };

    const handleContinueButton = async () => {
        const hasEmpty = selectedPoints.some(p => !p.place_id) || !nameRoute;
        if (hasEmpty) {
            setShowEmptyFieldsWarning(true);
            return;
        }

        setIsSubmitting(true);
        
        const routeData = {
            name: nameRoute,
            points: selectedPoints,
            origin: `place_id:${selectedPoints[0].place_id}`,
            waypoints: selectedPoints.slice(1, -1).map(p => `place_id:${p.place_id}`),
            destination: `place_id:${selectedPoints[selectedPoints.length-1].place_id}`,
            pointNames: selectedPoints.map(p => p.name)
        };
        console.log(routeData);

        try {
            const response = await simulateApiCall(routeData);
            // const response = await RouteCreate(
            //     nameRoute,
            //     1, // createdBy 
            //     [], // tags
            //     {
            //         origin: routeData.origin,
            //         waypoints: routeData.waypoints,
            //         destination: routeData.destination
            //     },
            //     1000, // distance 
            //     3600 // duration 
            // );

            handlePreview(response.data);
        } catch (error) {
            let message = 'Не удалось создать маршрут.';
            setErrorMessage(message);
            setErrorModalVisible(true);
        } finally {
            setIsSubmitting(false);
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
                    placeholder="Введите название"
                    placeholderTextColor="#999"
                    cursorColor="#FCFFFF"
                    onChangeText={setName}
                    value={nameRoute}
                />
            </View>   
            <AlertError
                    isVisible={isErrorModalVisible}
                    onConfirm={confirmError}
                    title="Ошибка!"
                    message={errorMessage}
            />

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
                    {!nameRoute ? "Введите название маршрута!" : "Не все точки заполнены!"}
                </Text>
            )}
            
            <AddPoint 
                onPress={handleAddPoint} 
                condition={selectedPoints.length >= 6}
            />
            
            <CreateRouteButton
                onPress={handleContinueButton}
                condition={!buttonEnabled || !nameRoute || isSubmitting}
                isLoading={isSubmitting}
            />
        </View>
    );
};

export default CreateRouteScreen;