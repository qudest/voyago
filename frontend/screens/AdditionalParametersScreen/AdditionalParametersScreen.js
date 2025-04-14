import React, { useState, useEffect } from 'react';
   import { View, Text, Image, TouchableOpacity } from 'react-native';
 import { useNavigation } from "@react-navigation/native";
      import styles from './styles';
      import BackButton from '../../components/BackButton/BackButton';
      import SearchCity from '../../components/SearchCity/SearchCity';
      import ProfileButton from '../../components/ProfileButton/ProfileButton';
      import { TextInput } from 'react-native-gesture-handler';
      import AlertChange from '../../components/AlertChange/AlertChange';
      import AlertDelete from '../../components/AlertDelete/AlertDelete';
      import useAlert from '../../hooks/useAlert';
      
      const AdditionalParametersScreen = () => {
        const [selectedCity, setSelectedCity] = useState('');
        const [buttonEnabled, setButtonEnabled] = useState(false);
        const [name, setName] = useState('');
        
        const { alert, showAlert, hideAlert } = useAlert();
        const navigation = useNavigation();
        const [isSubscriptionCancelled, setSubscriptionCancelled] = useState(false); // Новое состояние
    
          const citiesData = [
            { id: 1, name: 'Москва' },
            { id: 2, name: 'Санкт-Петербург' },
            { id: 3, name: 'Новосибирск' },
            { id: 4, name: 'Екатериакнбург' }
          ];

          useEffect(() => {
            setButtonEnabled(selectedCity.length > 0);
        }, [selectedCity]);
    
        const handleBackButton = () => {
            navigation.goBack(); 
        };
    
        const handleSavePress = () => {
            showAlert('change', 'Имя успешно изменено');
        };
    
        const handleDeletePress = () => {
            showAlert('delete', 'Удаление аккаунта', 'Вы точно хотите удалить свой аккаунт?');
        };
    
        const handleCancelPress = () => {
            showAlert('cancel', 'Отмена подписки', 'Вы точно хотите отменить подписку?');
        };
    
        const confirmDelete = () => {
            hideAlert();
        };
    
        const cancelChanges = () => {
            hideAlert();
            navigation.navigate("ProfileScreen");
        };
    
        const confirmCancellation = () => {
            hideAlert();
            setSubscriptionCancelled(true); 
        };
    
        const handleAlertChangeClose = () => {
            setSubscriptionCancelled(false); 
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
                                onCitySelect={setSelectedCity}
                            />
                        </View>
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTitle}>Изменить имя</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput 
                                style={styles.inputName}
                                cursorColor="#000"
                                onChangeText={setName} 
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
    
                {alert.isVisible && alert.type === 'change' && (
                    <AlertChange
                        isVisible={alert.isVisible}
                        onCancel={cancelChanges}
                        title={alert.title}
                    />
                )}
                
                {alert.isVisible && alert.type === 'delete' && (
                    <AlertDelete
                        isVisible={alert.isVisible}
                        onCancel={hideAlert}
                        onConfirm={confirmDelete}
                        title={alert.title}
                        message={alert.message}
                    />
                )}
    
                {alert.isVisible && alert.type === 'cancel' && (
                    <AlertDelete
                        isVisible={alert.isVisible}
                        onCancel={hideAlert}
                        onConfirm={confirmCancellation}
                        title={alert.title}
                        message={alert.message}
                    />
                )}
    
                <AlertChange
                    isVisible={isSubscriptionCancelled}
                    onCancel={handleAlertChangeClose}
                    title="Подписка успешно отменена"
                    message=""
                />
            </View>
        );
    };
    
    export default AdditionalParametersScreen;