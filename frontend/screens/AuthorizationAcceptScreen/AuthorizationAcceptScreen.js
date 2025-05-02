import React, { useEffect, useState } from 'react';
import { View, Image, TextInput, Text,  TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import BackButton from "../../components/BackButton/BackButton";
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import { useNavigation, useRoute } from "@react-navigation/native";
import AlertError from '../../components/AlertError/AlertError';
import { getAccountTockens, sendSecurityCode, getAccountInfo } from '../../services/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthorizationAcceptScreen = () => {
    const navigation = useNavigation();
    const [code, setCode] = useState('');
    const [timer, setTimer] = useState(11); 
    const [isTimerActive, setIsTimerActive] = useState(true); 
    const [isErrorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const route = useRoute(); 

    const phoneNumber = route.params.cleanedPhoneNumber;

    const handleBackPress = () => {
        navigation.navigate("AuthorizationScreen");
    };
    
    const fetchCodeAccess = async () => {
      try {
        const response = await getAccountTockens(phoneNumber, code);
        if (response.status === 200){
          const { 
            accessToken,
             refreshToken 
            } = response.data;

            console.log(accessToken, refreshToken)

          await AsyncStorage.setItem('accessToken', accessToken);
          await AsyncStorage.setItem('refreshToken', refreshToken);

          fetchPhoneNumber();
        }
      } catch (error) {
        let message = '';
        if (error.response) {
          message = `Неверный код подтверждения`;
        } else if (error.request) {
          message = 'Что-то пошло не так';
        } else {
          message = 'Что-то пошло не так';
        }
        setErrorMessage(message);
        setErrorModalVisible(true);
      }
    }

    const fetchPhoneNumber = async () => {
      try {
        const response = await getAccountInfo(phoneNumber);
        if (response.status === 200){
          const data = response.data;

          const userData = {
            id: data.id,
            phoneNumber: data.phoneNumber,
            name: data.name,
            role: data.role,
            status: data.status,
            premium: data.premium,
            endDate: data.endDate,
            country: data.country,
            city: data.city,
            preferences: data.preferences,
            creditCard: data.creditCard
          };

          await AsyncStorage.setItem('userData', JSON.stringify(userData));
          if (response.data.city === null ){
            const { id } = response.data;
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            navigation.navigate('ChooseCityScreen', {idAccount: id, phoneNumber})
          } else {
            console.log(phoneNumber, response.data.city, "netuda")
            navigation.navigate('MainScreen')
          }
        }
      } catch (error) {
        let message = '';
        if (error.response) {
          message = 'Что-то пошло не так';
        } else if (error.request) {
          message = 'Нет ответа от сервера. Проверьте подключение к интернету.';
        } else {
          message = 'Что-то пошло не так';
        }
        setErrorMessage(message);
        setErrorModalVisible(true);
      }
    }

    const fetchCode = async () => {
      try {
        const response = await sendSecurityCode(phoneNumber);
        if (response.status === 200){
          console.log("Код отправлен")
        }
      } catch (error) {
        let message = '';
        if (error.response) {
          message = 'Что-то пошло не так';
        } else if (error.request) {
          message = 'Что-то пошло не так';
        } else {
          message = 'Что-то пошло не так';
        }
        setErrorMessage(message);
        setErrorModalVisible(true);
      }
    }

    useEffect(() => {
        let interval;
        if (isTimerActive && timer > 0) {
          interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
          }, 1000);
        } else if (timer === 0) {
          setIsTimerActive(false); 
        }
        return () => clearInterval(interval); 
      }, [isTimerActive, timer]);
    
      const resetTimer = () => {
        setCode('');
        fetchCode()
        setTimer(5); 
        setIsTimerActive(true); 
      };

    const confirmError = () => {
        setErrorModalVisible(false);
    };

    const isButtonDisabled = code.length < 6;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
        <BackButton onPress={handleBackPress} />
        <AlertError
                isVisible={isErrorModalVisible}
                onConfirm={confirmError}
                title = "Ошибка!"
                message = {errorMessage}
            />
        <View style={styles.containerMainInf}>
        <Image
            source={require('../../assets/logoname.png')}
            style={styles.imageLogoName}
            />
            <Text style={styles.textNumberTitle} >Код из смс</Text>
            <Text style={styles.textNumber} >Отправили на {phoneNumber}</Text>
            <TextInput style={styles.inputNumber}
                maxLength={6}
                placeholder="000000"
                cursorColor="#FCFFFF"
                onChangeText={(text) => setCode(text)} 
                value={code} 
                keyboardType="numeric" 
                />
        </View>
        <TouchableOpacity
        onPress={resetTimer} 
        disabled={isTimerActive} >
        <Text style={[
                    styles.enableRepeatCodeButton,
                    !isTimerActive && styles.disableRepeatCodeButton]}>
          {isTimerActive
            ? `Получить новый код можно через ${timer} сек`
            : "Получить новый код"}
        </Text>
      </TouchableOpacity>
      <ContinueButton onPress={fetchCodeAccess} condition={!isButtonDisabled}/>
        </View>
      </TouchableWithoutFeedback>
    );
};

export default AuthorizationAcceptScreen;