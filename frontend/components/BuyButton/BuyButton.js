import React from 'react';
import styles from './styles';
import { Image, TouchableOpacity, Text } from 'react-native';

const BuyButton = ({ onPress }) => {
  return (
    <TouchableOpacity
    style={[
      styles.enableContinueButton
    ]}
    onPress={onPress}
  >
    <Text style={
      styles.enableContinueText
    }>
      Оформить
    </Text>
  </TouchableOpacity>
  );
};

export default BuyButton;