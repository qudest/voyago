import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
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

  const handleCardPress = (cardId) => {
    setSelectedPreferences(prev => 
      prev.includes(cardId)
        ? prev.filter(item => item !== cardId) 
        : [...prev, cardId] 
    );
  };

  const handleContinueButton = () => {
    console.log('Выбранные предпочтения:', selectedPreferences);
    navigation.navigate('MainScreen');
  };

  const confirmError = () => {
    setErrorModalVisible(false);
  };

  useEffect(() => {
    const fetchCachedData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem('userData');
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
    try {   
      const response = await putAccountInfo(
        userData.id, 
        userData.city,
        selectedPreferences, 
        null 
      );
        if (response.status === 204) {
            await AsyncStorage.setItem('userData', JSON.stringify({
              ...userData,
              preferences: selectedPreferences
            }));
            navigation.navigate("MainScreen")
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
      <AlertError
                    isVisible={isErrorModalVisible}
                    onConfirm={confirmError}
                    title = "Ошибка!"
                    message = {errorMessage}
        />
        <View style={styles.containerMain}>
          <Text style={styles.chooseTitle}>Выберите интересующие вас темы</Text>
          <View style={styles.preference}>
              <PreferenceCard 
                onCardPress={handleCardPress}
                selectedPreferences={selectedPreferences}
              />
          </View>
        </View>
        <View style={styles.containerNav}>
          <ContinueButton onPress={putPreferences} condition={true}/>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChoosePreferencesScreen;