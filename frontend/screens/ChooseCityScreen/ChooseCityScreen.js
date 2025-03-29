import React, { useState } from 'react';
import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import { View, Text, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import LocationButton from '../../components/LocationButton/LocationButton';
import BackButton from '../../components/BackButton/BackButton';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import SearchCity from '../../components/SearchCity/SearchCity';


const ChooseCityScreen = () => {
    const citiesData = [
        { id: 1, name: 'Москва' },
        { id: 2, name: 'Санкт-Петербург' },
        { id: 3, name: 'Новосибирск' },
        { id: 4, name: 'Екатеринбург' },
        { id: 5, name: 'Казань' },
      ];

    const navigation = useNavigation();

    const handleBackButton = () => {
        navigation.navigate('PremiumScreen')
    };

    const handleLocationButton = () => {
        Alert.alert("There will be location auto")
    };
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>   
            <View style={styles.container}>
                <View style={styles.buttonsContainer}>
                    <BackButton onPress={handleBackButton} />
                    <LocationButton onPress={handleLocationButton} />
                </View>
                
                <View style={styles.mainImformation}>
                    <Text style={styles.mainInformationTitle}>Введите город</Text>
                    <SearchCity citiesData={citiesData}></SearchCity>
                </View>
                <View style={styles.fixedButton}>
                    <ContinueButton />
                </View>
                
            </View>
            </TouchableWithoutFeedback>
    );
};

export default ChooseCityScreen;