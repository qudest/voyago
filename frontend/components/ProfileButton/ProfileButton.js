import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import styles from './styles';


const ProfileButton = ({ title, onPress, enabled=true}) => {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
    >
    <View style={styles.battonContainer}>
    <Text style={enabled ? styles.text : styles.disabledText}>{title}</Text>
        <Image
            source={require('../../assets/profileImages/nagivation.png')}
            style={styles.imageNavigation}
        />
    </View>
    </TouchableOpacity>
  );
};

export default ProfileButton;