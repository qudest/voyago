import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TextInput, Text,  TouchableOpacity, Alert,  Keyboard, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import BackButton from "../../components/BackButton/BackButton";
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import {API_URL} from '../../variables/ip';

const AuthorizationAcceptScreen = () => {
    const navigation = useNavigation();
    const [code, setCode] = useState('');
    const [timer, setTimer] = useState(11); 
    const [isTimerActive, setIsTimerActive] = useState(true); 
    const route = useRoute(); 

    const phoneNumber = route.params.cleanedPhoneNumber;

    const handleRegistrationPress = () => {
      navigation.navigate("PremiumScreen");
    };

    const handleBackPress = () => {
        navigation.navigate("AuthorizationScreen");
    };
    
    const fetchCodeAccess = async () => {
      try {
        const response = await axios.post(`http://${API_URL}:8090/api/security`, 
          {
            "phoneNumber": phoneNumber,
            "code": code
        }
        );

  
        if (response.status === 200){
          const {
            accessToken,
            refreshToken
          } = response.data;
  
          navigation.navigate("PremiumScreen");
        }
      } catch (error) {
        console.log('Ошибка при запросе:', error);
        console.log(phoneNumber, code);
        if (error.response) {
          console.log("Ошибка статус:", error.response.status);
        } else if (error.request) {
          console.log("Ошибка: Нет ответа от сервера");
        } else {
          console.log("Ошибка:", error.message);
        }
      }
    }

    const fetchCode = async () => {
      try {
        const response = await axios.post(`http://${API_URL}:8090/api/security/send`, 
          {
            "phoneNumber": phoneNumber
        }
        );

        if (response.status === 200){

        }

      } catch (error) {
        console.log('Ошибка при запросе:', error);
        if (error.response) {
          console.log("Ошибка статус:", error.response.status);
        } else if (error.request) {
          console.log("Ошибка: Нет ответа от сервера");
        } else {
          console.log("Ошибка:", error.message);
        }
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
        Alert.alert(
            "Код отправлен"
            );
        setTimer(5); 
        setIsTimerActive(true); 
      };

    const isButtonDisabled = code.length < 6;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
        <BackButton onPress={handleBackPress} />
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