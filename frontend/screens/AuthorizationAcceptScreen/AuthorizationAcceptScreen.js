import React, { useEffect, useState } from 'react';
import { View, Image, TextInput, Text,  TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import BackButton from "../../components/BackButton/BackButton";
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import { useNavigation, useRoute } from "@react-navigation/native";
import AlertError from '../../components/AlertError/AlertError';
import { getAccountTockens, sendSecurityCode } from '../../services/authApi';


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
          navigation.navigate("PremiumScreen");
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