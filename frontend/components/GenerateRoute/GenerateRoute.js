import React from 'react';
import styles from './styles';
import { Image, TouchableOpacity, Text } from 'react-native';

const GenerateRoute = ({ onPress, condition }) => {
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
        Сгенерировать
    </Text>
    </TouchableOpacity>
  );
};

export default GenerateRoute;