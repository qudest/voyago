import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TextInput, Text,  TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import BackButton from "../../components/BackButton/BackButton";
import { useNavigation, useRoute } from "@react-navigation/native";

const AuthorizationAcceptScreen = () => {
    const navigation = useNavigation();
    const [code, setCode] = useState('');
    const [timer, setTimer] = useState(11); 
    const [isTimerActive, setIsTimerActive] = useState(true); 
    const route = useRoute(); 

    const phoneNumber = route.params.phoneNumber;

    const handleRegistrationPress = () => {
        if (code == 6666){
            Alert.alert(
                "Проходишь дальше"
                );
        } else {
            Alert.alert(
                "Код неверный"
                );
        }
    };

    const handleBackPress = () => {
        navigation.navigate("AuthorizationScreen");
    };

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
        Alert.alert(
            "Код отправлен"
            );
        setTimer(5); 
        setIsTimerActive(true); 
      };

    const isButtonDisabled = code.length < 4;

    return (
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
                maxLength={4}
                placeholder="0000"
                cursorColor="#FCFFFF"
                onChangeText={(text) => setCode(text)} 
                value={code} 
                keyboardType="numeric" 
                />
        </View>
        <TouchableOpacity
        onPress={resetTimer} 
        disabled={isTimerActive} 
      >
        <Text style={[
                    styles.repeatCodeClickable,
                    !isTimerActive && styles.repeatCodeDisabled]}>
          {isTimerActive
            ? `Получить новый код можно через ${timer} сек`
            : "Получить новый код"}
        </Text>
      </TouchableOpacity>
            <TouchableOpacity style={[
                    styles.loginLinkTextClickable,
                    isButtonDisabled && styles.disabledButton
                ]}
                 onPress={handleRegistrationPress}
                 disabled={isButtonDisabled}>
            <Text style={[
                    styles.loginTextClickable,
                    isButtonDisabled && styles.disabledTextClickable]}>
            Продолжить
            </Text>
            </TouchableOpacity>
        
        </View>
    );
};

export default AuthorizationAcceptScreen;