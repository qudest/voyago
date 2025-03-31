import React, { useEffect, useState } from 'react';
import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import { View, Text, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import LocationButton from '../../components/LocationButton/LocationButton';
import BackButton from '../../components/BackButton/BackButton';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import SearchCity from '../../components/SearchCity/SearchCity';
import PreferenceCard from '../../components/PreferenceCard/PreferenceCard';

const ChoosePreferencesScreen = () => {
    const navigation = useNavigation();
  const [chosePreference, setChosePreference] = useState(false); 
    

    const handleContinueButton = () => {
        navigation.navigate('PremiumScreen')
    }

    const handleChoseButton = () => {
        Alert.alert("Выбрано")
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>   
            <View style={styles.container}>
                <View style={styles.containerMain}>
                    <Text style={styles.chooseTitle}>Выберите интересующие вас темы</Text>
                    <PreferenceCard onPress={handleChoseButton} condition={true}></PreferenceCard>
                </View>
                <View style={styles.containerNav}>
                    <ContinueButton onPress={handleContinueButton} ></ContinueButton>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ChoosePreferencesScreen;