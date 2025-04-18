import React, { useEffect, useState } from 'react';
import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import { View, Text, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import LocationButton from '../../components/LocationButton/LocationButton';
import AlertError from '../../components/AlertError/AlertError';
import BackButton from '../../components/BackButton/BackButton';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import SearchCity from '../../components/SearchCity/SearchCity';
import { putAccountInfo } from '../../services/accountApi';

const ChooseCityScreen = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [isErrorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const citiesData = [
        { id: 1, name: 'Москва' },
        { id: 2, name: 'Санкт-Петербург' },
        { id: 3, name: 'Новосибирск' },
        { id: 4, name: 'Екатериакнбург' }
      ];

    const navigation = useNavigation();

    const handleBackButton = () => {
        navigation.navigate('PremiumScreen')
    };

    const handleLocationButton = () => {
        Alert.alert("Автолокация")
    };
  
    const handleContinueButton = () => {
        navigation.navigate('ChoosePreferencesScreen')
    };

    const confirmError = () => {
        setErrorModalVisible(false);
      };

    useEffect(() => {
        setButtonEnabled(selectedCity.length > 0);
    }, [selectedCity]);

    const fetchPhoneNumber = async () => {
        try {
          const response = await getAccountInfo(cleanedPhoneNumber);
          if (response.status === 200){
            const {city} = response.data;
          }
        } catch (error) {
          let message = '';
          if (error.response) {
            message = 'Что-то пошло не так';
          } else if (error.request) {
            message = 'Нет ответа от сервера. Проверьте подключение к интернету.';
          } else {
            message = 'Ошибка: ' + error.message;
          }
          setErrorMessage(message);
          setErrorModalVisible(true);
        }
      }

    const putCity = async () => {
        try {
          const response = await putAccountInfo(cleanedPhoneNumber);
          if (response.status === 200){
          }
        } catch (error) {
          let message = '';
          if (error.response) {
            message = 'Что-то пошло не так';
          } else if (error.request) {
            message = 'Нет ответа от сервера. Проверьте подключение к интернету.';
          } else {
            message = 'Ошибка: ' + error.message;
          }
          setErrorMessage(message);
          setErrorModalVisible(true);
        }
      }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>   
            <View style={styles.container}>
                <View style={styles.buttonsContainer}>
                    <BackButton onPress={handleBackButton} />
                    <LocationButton onPress={handleLocationButton} />
                </View>

                <AlertError
                    isVisible={isErrorModalVisible}
                    onConfirm={confirmError}
                    title = "Ошибка!"
                    message = {errorMessage}
                />

                <View style={styles.mainImformation}>
                    <Text style={styles.mainInformationTitle}>Введите город</Text>
                    <SearchCity 
                        citiesData={citiesData}
                        selectedCity={selectedCity}
                        onCitySelect={(city) => {
                            setSelectedCity(city);
                        }}
                    />
                </View>
                <View style={styles.fixedButton}>
                    <ContinueButton onPress={handleContinueButton} condition={buttonEnabled}/>
                </View>
                
            </View>
            </TouchableWithoutFeedback>
    );
};

export default ChooseCityScreen;