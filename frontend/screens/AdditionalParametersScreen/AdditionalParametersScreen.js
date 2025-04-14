import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import SearchCity from '../../components/SearchCity/SearchCity';
import ProfileButton from '../../components/ProfileButton/ProfileButton';
import { TextInput } from 'react-native-gesture-handler';
import AlertChange from '../../components/AlertChange/AlertChange';
import AlertDelete from '../../components/AlertDelete/AlertDelete';

const AdditionalParametersScreen = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [name, setName] = useState('');
    const [isChangeModalVisible, setChangeModalVisible] = useState(false);
    const [isDeleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
    const [isCancellationConfirmModalVisible, setCancellationConfirmModalVisible] = useState(false);
    const [isCancellationModalVisible, setCancellationModalVisible] = useState(false);

    const citiesData = [
        { id: 1, name: 'Москва' },
        { id: 2, name: 'Санкт-Петербург' },
        { id: 3, name: 'Новосибирск' },
        { id: 4, name: 'Екатериакнбург' }
      ];
    
    useEffect(() => {
        setButtonEnabled(selectedCity.length > 0);
    }, [selectedCity]);

    const navigation = useNavigation();

    const handleBackButton = () => {
        navigation.goBack(); 
    };
    const handleSavePress = () => {
        setChangeModalVisible(true);
    };
    
    const cancelChanges = () => {
        setChangeModalVisible(false);
        setCancellationConfirmModalVisible(false);
        navigation.navigate("ProfileScreen");
    };

    const handleDeletePress = () => {
        setDeleteAccountModalVisible(true);
    };
    const handleCancelPress = () => {
       setCancellationModalVisible(true);
    };

    const cancelDelete = () => {
        setDeleteAccountModalVisible(false);
        setCancellationModalVisible(false);
    };
    const confirmDelete = () => {
        setDeleteAccountModalVisible(false);
    };

    const confirmCancellation = () => {
        setCancellationModalVisible(false);
        setCancellationConfirmModalVisible(true);
    };


    return (
        <View style={styles.container}>
            <BackButton onPress={handleBackButton}/>
            
            <View style={styles.mainContent}>
                <View style={styles.cityContainer}>
                    <Text style={styles.cityTitle}>Изменить город</Text>
                    <View style={styles.searchWrapper}>
                        <SearchCity 
                                citiesData={citiesData}
                                selectedCity={selectedCity}
                                onCitySelect={(city) => {
                                setSelectedCity(city);
                            }}
                        />
                    </View>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTitle}>Изменить имя</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput 
                            style={styles.inputName}
                            cursorColor="#000"
                            onChangeText={(text) => setName(text)} 
                            value={name}
                            placeholder="Введите имя"
                            placeholderTextColor="#888"
                        />
                        <TouchableOpacity onPress={handleSavePress}>
                            <Image
                                source={require('../../assets/save.png')}
                                style={styles.imageSave}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.buttonsContainer}> 
                <View style={styles.cancelPremiumButton}>
                    <ProfileButton 
                        title="Отменить подписку" 
                        onPress={handleCancelPress}
                    />
                </View>
                <View style={styles.cancelDeleteButton}>
                    <ProfileButton 
                        title="Удалить аккаунт" 
                        onPress={handleDeletePress}
                        enabled={false}
                    />
                </View>
            </View>
            <AlertChange
                isVisible={isChangeModalVisible}
                onCancel={cancelChanges}
            />
            
            <AlertDelete
                isVisible={isDeleteAccountModalVisible}
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
                title="Удаление аккаунта"
                message='Вы точно хотите удалить свой аккаунт?'
            />

            <AlertDelete
                isVisible={isCancellationModalVisible}
                onCancel={cancelDelete}
                onConfirm={confirmCancellation}
                title="Отмена подписки"
                message='Вы точно хотите отменить подписку?'
            />

            <AlertChange
                isVisible={isCancellationConfirmModalVisible}
                onCancel={cancelChanges}
            />
            
        </View>
    );
};

export default AdditionalParametersScreen;