import React from 'react';
import { View, Image, TextInput, Text,  TouchableOpacity, Alert } from 'react-native';
import styles from './styles';

const AutorizationScreen = () => {

  const handleRegistrationPress = () => {
    Alert.alert(
      "Подтверждение", 
      "Вы уверены, что хотите продолжить?", 
      [
        {
          text: "Отмена",
          onPress: () => console.log("Действие отменено"),
          style: "cancel",
        },
        {
          text: "Продолжить", 
          onPress: () => {
            console.log("Пользователь продолжил");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerMainInf}>
      <Image
          source={require('../../assets/logoname.png')}
          style={styles.imageLogoName}
        />
         <Text style={styles.textNumber} >Вход или регистрация</Text>
          <TextInput style={styles.inputNumber}
              maxLength={64}
              placeholder="Номер телефона"
              cursorColor="#606265"
            />
      </View>
        <TouchableOpacity  style={styles.loginLinkTextClickable} onPress={handleRegistrationPress}>
          <Text style={styles.loginTextClickable}>
          Продолжить
          </Text>
        </TouchableOpacity>
      <Text style={styles.description} >Используя Voyago вы соглашаетесь с нашими Условиями и Политикой конфиденциальности</Text>
     
    </View>
  );
};

export default AutorizationScreen;