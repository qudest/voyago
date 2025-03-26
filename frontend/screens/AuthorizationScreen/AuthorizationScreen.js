import React, { useState} from 'react';
import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import { useNavigation } from "@react-navigation/native";

const AutorizationScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('+7'); 
  
  const handleRegistrationAccessPress = () => {
    navigation.navigate("AuthorizationAcceptScreen", {phoneNumber});
  };

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
      <ContinueButton onPress={handleRegistrationAccessPress} condition={isButtonDisabled}/>
    </View>
  );
};

export default AutorizationScreen;