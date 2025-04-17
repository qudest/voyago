import React from 'react';
import styles from './styles';
import { Image, TouchableOpacity, View, Text } from 'react-native';

const Rating = ({ rating, onRatingSelected }) => {
  return (
    <View style={styles.ratingContainer}>
      {Array.from({ length: 5 }, (_, index) => (
        <TouchableOpacity key={index} onPress={() => onRatingSelected(index + 1)} disabled={rating > 0}>
          <Image
            source={index < rating ? require('../../assets/ratingYes.png') : require('../../assets/ratingNone.png')}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Rating;