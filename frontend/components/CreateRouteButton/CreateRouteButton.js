import React from 'react';
import styles from './styles';
import { Image, TouchableOpacity, Text } from 'react-native';

const ContinueButton = ({ onPress, condition }) => {
  return (
    
    <TouchableOpacity
    style={[
      styles.enableContinueButton,
      condition && styles.disableContinueButton
    ]}
    onPress={onPress}
    disabled={condition}
  >
    <Text style={[
      styles.enableContinueText,
      condition && styles.disableContinueText
    ]}>
      Сохранить
    </Text>
  </TouchableOpacity>
  );
};

export default ContinueButton;