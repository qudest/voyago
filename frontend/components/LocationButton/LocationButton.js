import React from 'react';
import styles from './styles';
import { Image, TouchableOpacity,  } from 'react-native';

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Image source={require('../../assets/location.png')} style={styles.image} />
    </TouchableOpacity>
  );
};

export default BackButton;