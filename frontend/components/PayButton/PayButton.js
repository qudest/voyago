import React from 'react';
import styles from './styles';
import { Image, TouchableOpacity, Text } from 'react-native';

const BuyButton = ({ onPress, cost = "6666" }) => {
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
      Оплатить {cost}.00 ₽
    </Text>
  </TouchableOpacity>
  );
};

export default BuyButton;