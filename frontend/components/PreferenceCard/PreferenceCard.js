import React from 'react';
import styles from './styles';
import { Image, View, TouchableOpacity, Text } from 'react-native';

const PreferenceCard = ({ onPress, condition }) => {
    
    const imageCard = [
        {
            path: require("../../assets/preferenceImages/park.png"),
            title: "Парк"
        },
        {
            path: require("../../assets/preferenceImages/fastfood.png"),
            title: "Фастфуд"  
        },
        {
            path: require("../../assets/preferenceImages/beer.png"),
            title: "Бар"
        },
        {
            path: require("../../assets/preferenceImages/dress.png"),
            title: "Шоппинг"  
        },
        {
            path: require("../../assets/preferenceImages/house.png"),
            title: "Архитектура"
        },
        {
            path: require("../../assets/preferenceImages/sport.png"),
            title: "Спорт"  
        },
        ]
    

  return (
    <View style={styles.cardsContainer}>
        {imageCard.map((card, index) => (
            <TouchableOpacity 
            key={index}
            style={[styles.containerEnable, condition && styles.containerDisable]}
            onPress={onPress} 
            disabled={condition}
            >
            <Image
                source={card.path}
                style={styles.imagePreference}
            />
            <Text style={styles.titlePreference}>{card.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PreferenceCard;