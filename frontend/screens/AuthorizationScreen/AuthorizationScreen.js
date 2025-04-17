import React, { useState} from 'react';
import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity, Alert,  Keyboard, TouchableWithoutFeedback} from 'react-native';
import styles from './styles';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {API_URL} from '../../variables/ip';

const AutorizationScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('+7'); 
  
  const handleRegistrationAccessPress = () => {
    console.log(cleanedPhoneNumber)
  };

  const fetchPhoneNumber = async () => {
    try {
      const cleanedPhoneNumber = phoneNumber.replace('+', '');
      const response = await axios.get(`http://${API_URL}:8091/api/account/${cleanedPhoneNumber}`);
      
      console.log('Ответ сервера:', response);

      if (response.status === 200){
        fetchCode(cleanedPhoneNumber);
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

  const fetchCode = async (cleanedPhoneNumber) => {
    try {
      const response = await axios.post(`http://${API_URL}:8090/api/security/send`, 
        {
          "phoneNumber": cleanedPhoneNumber
      }
      );

      if (response.status === 200){
        navigation.navigate("AuthorizationAcceptScreen", {cleanedPhoneNumber});
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

  const handlePhoneNumberChange = (text) => {
    if (text.startsWith('+7')) {
      const cleanedText = text.replace(/[^0-9]/g, ''); 
      const formattedText = `+7${cleanedText.slice(1, 11)}`; 
      setPhoneNumber(formattedText);
    } else {
      setPhoneNumber('+7');
    }
  };

  const isButtonDisabled = phoneNumber.length < 12; 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <View style={styles.containerMainInf}>
        <Image
          source={require('../../assets/logoname.png')}
          style={styles.imageLogoName}
        />
          <Text style={styles.textNumber}>
          Вход или регистрация
        </Text>
        <TextInput
          style={styles.inputNumber}
          maxLength={12}
          placeholder="+7XXXXXXXXXX"
          cursorColor="#FCFFFF"
          onChangeText={handlePhoneNumberChange}
          value={phoneNumber}
          keyboardType="phone-pad" 
        />
      </View>
      <ContinueButton onPress={() => { console.log('Кнопка нажата'); fetchPhoneNumber(); }} condition={!isButtonDisabled}/>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default AutorizationScreen;