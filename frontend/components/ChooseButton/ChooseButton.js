import React from 'react';
import styles from './styles';
import { Image, TouchableOpacity, Text } from 'react-native';

const ContinueButton = ({ onPress }) => {
  return (  
    <TouchableOpacity
    style={[
      styles.enableContinueButton
    ]}
    onPress={onPress}
  >
    <Text style={[
      styles.enableContinueText,
    ]}>
      Выбрать
    </Text>
  </TouchableOpacity>
  );
};

export default ContinueButton;