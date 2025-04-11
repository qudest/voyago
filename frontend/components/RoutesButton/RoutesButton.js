import React from 'react';
import styles from './styles';
import { Image, TouchableOpacity, Text } from 'react-native';

const RoutesButton = ({onPress}) => {
  return (
    <TouchableOpacity
     style={styles.settingsContainer}
     onPress={onPress}>
        <Text style={styles.settingsText}>Маршруты</Text>
    </TouchableOpacity >
  );
};

export default RoutesButton;