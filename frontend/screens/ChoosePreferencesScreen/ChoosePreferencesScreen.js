import React, { useEffect, useState } from 'react';
import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import { View, Text, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import LocationButton from '../../components/LocationButton/LocationButton';
import BackButton from '../../components/BackButton/BackButton';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import SearchCity from '../../components/SearchCity/SearchCity';


const ChoosePreferencesScreen = () => {
    const navigation = useNavigation();

    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>   
            <View style={styles.container}>
                
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ChoosePreferencesScreen;