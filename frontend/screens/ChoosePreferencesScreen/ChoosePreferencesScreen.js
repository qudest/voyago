import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, SafeAreaView  } from 'react-native';
import PreferenceCard from '../../components/PreferenceCard/PreferenceCard';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertError from '../../components/AlertError/AlertError';
import { putAccountInfo } from '../../services/accountApi';
import { getAccountInfo } from '../../services/authApi';

const ChoosePreferencesScreen = ({ navigation }) => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [accessToken, setAccessToken] = useState(null);

  const handleCardPress = (cardId) => {
    setSelectedPreferences(prev => 
      prev.includes(cardId)
        ? prev.filter(item => item !== cardId) 
        : [...prev, cardId] 
    );
  };

  const confirmError = () => {
    setErrorModalVisible(false);
  };

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


  const putPreferences = async () => {
    const id = userData.id;
    const selectedCity = userData.city;
    const userName = userData.name;
    const userCountry = userData.country;
    const creditCard = null;
    try {   
      const response = await putAccountInfo(
        id, userName, userCountry, selectedCity, selectedPreferences, creditCard, accessToken
      );
        if (response.status === 200) {
          const fullUserDataResponce = await getAccountInfo(userData.phoneNumber, accessToken);
          const fullUserData = fullUserDataResponce.data;
          const cachedData = {
            id: fullUserData.id,
            phoneNumber: fullUserData.phoneNumber,
            name: fullUserData.name,
            role: fullUserData.role,
            status: fullUserData.status,
            premium: fullUserData.premium,
            endDate: fullUserData.endDate,
            country: fullUserData.country,
            city: fullUserData.city,
            preferences: fullUserData.preferences,
            creditCard: fullUserData.creditCard
          };
          
          await AsyncStorage.setItem('userData', JSON.stringify(cachedData));
          
          console.log('Обновленные данные:', cachedData); 
            
          navigation.navigate("PremiumScreen");
          }
    } catch (error) {
        let message = 'Что-то пошло не так';
        if (error.response) {
            message = 'Ошибка сервера';
        } else if (error.request) {
            message = 'Нет ответа от сервера';
        }
        setErrorMessage(message);
        setErrorModalVisible(true);
    }
};


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
      <AlertError
                    isVisible={isErrorModalVisible}
                    onConfirm={confirmError}
                    title = "Ошибка!"
                    message = {errorMessage}
        />
        <View style={styles.header}>
      <Text style={styles.chooseTitle}>Выберите интересующие вас темы</Text>
        </View>

        <View style={styles.preferenceContainer}>
          <View style={styles.preference}>
            <PreferenceCard 
              onCardPress={handleCardPress}
              selectedPreferences={selectedPreferences}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <ContinueButton onPress={putPreferences} condition={true}/>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ChoosePreferencesScreen;