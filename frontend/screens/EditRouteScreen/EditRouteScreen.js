import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import AddPoint from '../../components/AddPoint/AddPoint';
import PointOfRoute from '../../components/PointOfRoute/PointOfRoute';
import CreateRouteButton from '../../components/CreateRouteButton/CreateRouteButton';
import DeleteRouteButton from '../../components/DeleteRouteButton/DeleteRouteButton';
import AlertDelete from '../../components/AlertDelete/AlertDelete';

const EditRouteScreen = () => {
    const navigation = useNavigation();
    const { params } = useRoute();
    
    const initialRoute = params?.route || { 
        name: 'Новый маршрут',
        points: [{place_id: '', name: ''}, {place_id: '', name: ''}],
        pointNames: ['', ''],
        origin: '',
        destination: '',
        waypoints: [],
        distance: 0,
        duration: 0,
        rating: 0
    };
    
    const [selectedPoints, setSelectedPoints] = useState(initialRoute.points || 
        [{place_id: '', name: ''}, {place_id: '', name: ''}]);
    const [routeName, setRouteName] = useState(initialRoute.name);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [showEmptyFieldsWarning, setShowEmptyFieldsWarning] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

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

    const handleSave = () => {
        if (!buttonEnabled) {
            setShowEmptyFieldsWarning(true);
            return;
        }

        const routeData = {
            name: routeName,
            points: selectedPoints,
            pointNames: selectedPoints.map(p => p.name),
            origin: selectedPoints[0].place_id ? `place_id:${selectedPoints[0].place_id}` : '',
            destination: selectedPoints[selectedPoints.length-1].place_id ? 
                `place_id:${selectedPoints[selectedPoints.length-1].place_id}` : '',
            waypoints: selectedPoints.slice(1, -1)
                .filter(p => p.place_id)
                .map(p => `place_id:${p.place_id}`),
            distance: initialRoute.distance || 0,
            duration: initialRoute.duration || 0,
            rating: initialRoute.rating || 0
        };

        navigation.navigate('PreviewRouteScreen', { 
            routeData 
        });
    };

    const handleDelete = () => {
        setDeleteModalVisible(true);
    };

    const confirmDelete = () => {
        setDeleteModalVisible(false);
        navigation.navigate('MyRoutesScreen');
    };

    const cancelDelete = () => {
        setDeleteModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.goBack()} />
            
            <View style={styles.topContainer}>
                <Text style={styles.createTitle}>Редактирование маршрута</Text>
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
                    title="Сохранить изменения"
                />
                <DeleteRouteButton onPress={handleDelete} />
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