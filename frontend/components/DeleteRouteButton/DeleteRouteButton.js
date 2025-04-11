import React from 'react';
import styles from './styles';
import { Image, TouchableOpacity, Text } from 'react-native';


const DeleteRouteButton = ({ onPress }) => {
    return (
      <TouchableOpacity
        style={styles.enableContinueButton}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.enableContinueText}>
          Удалить маршрут
        </Text>
      </TouchableOpacity>
    );
  };

export default DeleteRouteButton;