import React, { useEffect, useState, useRef } from 'react';
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
const API_KEY = 'AIzaSyBRLV9UQ_6w-HUHZmNH5J_xDDW-OLoh0q0';

const ChooseCityScreen = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [isErrorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const route = useRoute(); 
    const [citiesData, setCitiesData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const id = route.params.idAccount;
    const phoneNumber = route.params.phoneNumber;
    const timerRef = useRef(null);
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


      useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const fetchCities = async (query) => {
        try {
            const response = await axios.get(
                'https://maps.googleapis.com/maps/api/place/autocomplete/json',
                {
                    params: {
                        input: query,
                        types: '(cities)',
                        language: 'ru',
                        key: API_KEY,
                        components: 'country:ru' 
                    }
                }
            );

            const cities = response.data.predictions.map(prediction => ({
                id: prediction.place_id,
                name: prediction.description
            }));

            setCitiesData(cities);
        } catch (error) {
            console.error('Error fetching cities:', error);
            setCitiesData([]);
        }
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text.length > 2) { 
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            
            timerRef.current = setTimeout(() => {
                fetchCities(text);
            }, 500); 
        } else {
            setCitiesData([]);
        }
    };

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
    const userName = userData.name;
    const userCountry = userData.country;

      try {
        console.log(selectedCity);
          const response = await putAccountInfo(id, userName, userCountry, selectedCity);
          if (response.status === 204) {
            const cachedData = await AsyncStorage.getItem('userData');
            const parsedData = JSON.parse(cachedData);
            const updatedData = {
              ...parsedData,
              city: selectedCity
            };
      
            await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
            await checkPreferencesAndNavigate();
          }
      } catch (error) {
        console.log(error)
          let message = 'Что-то пошло не так';
          if (error.response) {
              message =  'Попробуйте позже!';
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
                    title="Ошибка!"
                    message={errorMessage}
                />

                <View style={styles.mainImformation}>
                    <Text style={styles.mainInformationTitle}>Введите город</Text>
                    <SearchCity 
                        citiesData={citiesData}
                        selectedCity={selectedCity}
                        searchQuery={searchQuery}
                        onSearchChange={handleSearch}
                        onCitySelect={(city) => {
                            setSelectedCity(city);
                        }}
                    />
                </View>
                <View style={styles.fixedButton}>
                    <ContinueButton onPress={putCity} condition={!buttonEnabled}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ChooseCityScreen;