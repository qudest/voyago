import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import styles from './styles';


const ProfileButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, style]}
      onPress={onPress}
    >
    <View style={styles.battonContainer}>
    <Text style={styles.text}>{title}</Text>
        <Image
            source={require('../../assets/profileImages/nagivation.png')}
            style={styles.imageNavigation}
        />
    </View>
    </TouchableOpacity>
  );
};

export default ProfileButton;