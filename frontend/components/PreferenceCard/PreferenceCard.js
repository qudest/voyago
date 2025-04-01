import React from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const PreferenceCard = ({ onCardPress, selectedPreferences }) => {
  const imageCard = [
    { id: 'park', path: require("../../assets/preferenceImages/park.png"), title: "Парк" },
    { id: 'fastfood', path: require("../../assets/preferenceImages/fastfood.png"), title: "Фастфуд" },
    { id: 'bar', path: require("../../assets/preferenceImages/beer.png"), title: "Бар" },
    { id: 'shopping', path: require("../../assets/preferenceImages/dress.png"), title: "Шоппинг" },
    { id: 'architecture', path: require("../../assets/preferenceImages/house.png"), title: "Архитектура" },
    { id: 'sport', path: require("../../assets/preferenceImages/sport.png"), title: "Спорт" },
  ];

  return (
    <View style={styles.cardsContainer}>
      {imageCard.map((card) => (
        <TouchableOpacity 
          key={card.id}
          style={[
            styles.containerDisable, 
            selectedPreferences.includes(card.id) && styles.containerEnable
          ]}
          onPress={() => onCardPress(card.id)}
        >
          <Image source={card.path} style={styles.imagePreference} />
          <Text style={styles.titlePreference}>{card.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PreferenceCard;