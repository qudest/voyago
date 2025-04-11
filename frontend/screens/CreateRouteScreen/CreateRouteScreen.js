import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import AddPoint from '../../components/AddPoint/AddPoint';
import PointOfRoute from '../../components/PointOfRoute/PointOfRoute';
import CreateRouteButton from '../../components/CreateRouteButton/CreateRouteButton';

const CreateRouteScreen = () => {
    const [selectedAddress, setselectedAddress] = useState(['', '']); 
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [showEmptyFieldsWarning, setShowEmptyFieldsWarning] = useState(false);
    const navigation = useNavigation();


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
        const filledCount = selectedAddress.filter(address => address.length > 0).length;
        setButtonEnabled(filledCount >= 2);
        setShowEmptyFieldsWarning(false);
    }, [selectedAddress]);

    const handleBackButton = () => {
        navigation.navigate("ProfileScreen")
    }

    const handleAddPoint = () => {
        setselectedAddress([...selectedAddress, '']); 
    };

    const handleRemovePoint = (index) => {
        const newCities = [...selectedAddress];
        newCities.splice(index, 1);
        setselectedAddress(newCities);
    };

    const handleAddressSelect = (index, address) => {
        const newCities = [...selectedAddress];
        newCities[index] = address;
        setselectedAddress(newCities);
    };

    const handleContinueButton = () => {
        const hasEmptyFields = selectedAddress.some(address => address.length === 0);
        if (hasEmptyFields) setShowEmptyFieldsWarning(true); else navigation.navigate('ProfileScreen');
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
                        addressData={addressData}
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