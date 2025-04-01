import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

const GradientBackground = ({ children }) => (
    
    <LinearGradient
        colors={['#3E3C80', '#CAD6FF']}
        style={styles.gradientContainer}
        start={{ x: 0, y: 0}}
        end={{ x: 1, y: 0 }}
    >
        {children}
    </LinearGradient>
  );

const PremiumProfileButton = ({ title, onPress, style }) => {
  return (
        <TouchableOpacity 
        style={[styles.button, style]}
        onPress={onPress}
        >
            <GradientBackground>
                <Text style={styles.text}>{title}</Text>
            </GradientBackground>
        </TouchableOpacity>
  );
};

export default PremiumProfileButton;