import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import Modal from 'react-native-modal';
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
        title: 'Новый маршрут', 
        points: ['', ''] 
    };
    
    const [selectedAddress, setSelectedAddress] = useState(initialRoute.points);
    const [routeTitle, setRouteTitle] = useState(initialRoute.title);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [showEmptyFieldsWarning, setShowEmptyFieldsWarning] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

    const addressData = [
        { id: 1, name: 'ул. Ленина, 10' },
        { id: 2, name: 'пр. Мира, 25' },
        { id: 3, name: 'ул. Гагарина, 42' },
        { id: 4, name: 'ул. Садовая, 7' },
        { id: 5, name: 'ул. Центральная, 15' },
        { id: 6, name: 'ул. Школьная, 3' },
        { id: 7, name: 'ул. Лесная, 18' },
        { id: 8, name: 'ул. Набережная, 5' },
        { id: 9, name: 'ул. Парковая, 12' },
        { id: 10, name: 'ул. Солнечная, 9' }
    ];

    useEffect(() => {
        const allFilled = selectedAddress.every(addr => addr && addr.length > 0);
        const hasMinimum = selectedAddress.length >= 2;
        setButtonEnabled(allFilled && hasMinimum);
        
        if (showEmptyFieldsWarning && allFilled) {
            setShowEmptyFieldsWarning(false);
        }
    }, [selectedAddress]);

    const handleAddPoint = () => {
        if (selectedAddress.length >= 6) {
            Alert.alert('Максимум 6 точек');
            return;
        }
        setSelectedAddress([...selectedAddress, '']);
    };

    const handleRemovePoint = (index) => {
        if (selectedAddress.length <= 2) {
            Alert.alert('Минимум 2 точки');
            return;
        }
        const newAddresses = [...selectedAddress];
        newAddresses.splice(index, 1);
        setSelectedAddress(newAddresses);
    };

    const handleAddressSelect = (index, address) => {
        const newAddresses = [...selectedAddress];
        newAddresses[index] = address;
        setSelectedAddress(newAddresses);
    };

    const handleSave = () => {
        if (!buttonEnabled) {
            setShowEmptyFieldsWarning(true);
            return;
        }      
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
                <Text style={styles.createDiscription}>{routeTitle}</Text>
            </View>
            
            <View style={styles.pointsContainer}>
                {selectedAddress.map((address, index) => (
                    <PointOfRoute 
                        key={index}
                        addressData={addressData}
                        selectedAddress={address}
                        onAddressSelect={(addr) => handleAddressSelect(index, addr)}
                        onRemove={() => handleRemovePoint(index)}
                        showRemoveButton={selectedAddress.length > 2}
                    />
                ))}
            </View>
            
            {showEmptyFieldsWarning && (
                <Text style={styles.warningText}>Заполните все точки маршрута!</Text>
            )}
            
            <AddPoint 
                onPress={handleAddPoint} 
                disabled={selectedAddress.length >= 6}
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
                title = "Удаление маршрута"
                message = "Вы точно хотите удалить маршрут?"
            />
        </View>
    );
};

export default EditRouteScreen;