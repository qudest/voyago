import React, { useEffect, useState } from 'react';
import styles from './styles';
import { useNavigation, useRoute} from "@react-navigation/native";
import { View, Text, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import LocationButton from '../../components/LocationButton/LocationButton';
import AlertError from '../../components/AlertError/AlertError';
import BackButton from '../../components/BackButton/BackButton';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import SearchCity from '../../components/SearchCity/SearchCity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { putAccountInfo } from '../../services/accountApi';
import { getAccountInfo } from '../../services/authApi';

const ChooseCityScreen = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [isErrorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const route = useRoute(); 

    const id = route.params.idAccount;
    const phoneNumber = route.params.phoneNumber;

    console.log(id);

    console.log(phoneNumber);

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

    const checkPreferencesAndNavigate = async () => {
      try {
          const response = await getAccountInfo(phoneNumber);
          
          if (response.status === 200) {
              const { preferences } = response.data;
              console.log('Preferences:', preferences);

              if (!preferences || preferences.length === 0) {
                  navigation.replace('ChoosePreferencesScreen');
              } else {
                  navigation.replace('MainScreen');
              }
          }
      } catch (error) {
          let message = 'Что-то пошло не так';
          if (error.response) {
              message = 'Произошла ошибка. Мы уже исправляем!';
          } else if (error.request) {
              message = 'Что-то пошло не так. Попробуйте позже!';
          }
          setErrorMessage(message);
          setErrorModalVisible(true);
      }
  };

  const putCity = async () => {
      try {
          const response = await putAccountInfo(id, selectedCity);
          if (response.status === 204) {
              await AsyncStorage.setItem('userData', JSON.stringify({
                  id,
                  phoneNumber,
                  city: selectedCity,
                  preferences: []
              }));
              await checkPreferencesAndNavigate();
          }
      } catch (error) {
          let message = 'Что-то пошло не так';
          if (error.response) {
              message = error.response.data.message || 'Ошибка сервера';
          } else if (error.request) {
              message = 'Нет ответа от сервера';
          }
          setErrorMessage(message);
          setErrorModalVisible(true);
      }
  };

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
                    <ContinueButton onPress={putCity} condition={buttonEnabled}/>
                </View>
                
            </View>
            </TouchableWithoutFeedback>
    );
};

export default ChooseCityScreen;