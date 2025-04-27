import React, { useState} from 'react';
import { View, Image, TextInput, Text, Keyboard, TouchableWithoutFeedback} from 'react-native';
import styles from './styles';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import AlertError from '../../components/AlertError/AlertError';
import { useNavigation } from "@react-navigation/native";
import { getAccountInfo, sendSecurityCode } from '../../services/authApi';


const AutorizationScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('+7'); 
  const [cleanedPhoneNumber, setCleanedPhoneNumber] = useState('');
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchCode = async () => {
    try {
      const response = await sendSecurityCode(cleanedPhoneNumber);
      if (response.status === 200){
        navigation.navigate("AuthorizationAcceptScreen", {cleanedPhoneNumber});
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

  const handlePhoneNumberChange = (text) => {
    if (text.startsWith('+7')) {
      const cleanedText = text.replace(/[^0-9]/g, ''); 
      const formattedText = `+7${cleanedText.slice(1, 11)}`; 
      setPhoneNumber(formattedText);
      setCleanedPhoneNumber(cleanedText);
    } else {
      setPhoneNumber('+7');
      setCleanedPhoneNumber('');
    }
  };

  const confirmError = () => {
    setErrorModalVisible(false);
  };
  
  const isButtonDisabled = phoneNumber.length < 12; 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
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
      <ContinueButton onPress={() => { fetchCode(); }} condition={!isButtonDisabled}/>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default AutorizationScreen;