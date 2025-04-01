import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import PreferenceCard from '../../components/PreferenceCard/PreferenceCard';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import styles from './styles';

const ChoosePreferencesScreen = ({ navigation }) => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const handleCardPress = (cardId) => {
    setSelectedPreferences(prev => 
      prev.includes(cardId)
        ? prev.filter(item => item !== cardId) 
        : [...prev, cardId] 
    );
  };

  const handleContinueButton = () => {
    console.log('Выбранные предпочтения:', selectedPreferences);
    navigation.navigate('ProfileScreen');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.containerMain}>
          <Text style={styles.chooseTitle}>Выберите интересующие вас темы</Text>
          <PreferenceCard 
            onCardPress={handleCardPress}
            selectedPreferences={selectedPreferences}
          />
        </View>
        <View style={styles.containerNav}>
          <ContinueButton onPress={handleContinueButton} condition={true}/>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChoosePreferencesScreen;