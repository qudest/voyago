import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import AddPoint from '../../components/AddPoint/AddPoint';
import PointOfRoute from '../../components/PointOfRoute/PointOfRoute';
import CreateRouteButton from '../../components/CreateRouteButton/CreateRouteButton';
import { TextInput } from 'react-native-gesture-handler';

const CreateRouteScreen = () => {
    const [selectedPoints, setSelectedPoints] = useState([{place_id: '', name: ''}, {place_id: '', name: ''}]);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [showEmptyFieldsWarning, setShowEmptyFieldsWarning] = useState(false);
    const [nameRoute, setName] = useState();
    const navigation = useNavigation();

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

    const handleContinueButton = () => {
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
            destination: `place_id:${selectedPoints[selectedPoints.length-1].place_id}`,
            pointNames: selectedPoints.map(p => p.name)
        };

        navigation.navigate('PreviewRouteScreen', {routeData});
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
                <Text style={styles.createDiscription}>Выберите точки маршрута</Text>
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
        </View>
    );
};

export default CreateRouteScreen;