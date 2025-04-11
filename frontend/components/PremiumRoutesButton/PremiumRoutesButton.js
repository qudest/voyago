import React from 'react';
import styles from './styles';
import { Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientBackground = ({ children }) => (
    
    <LinearGradient
      colors={['#3E3C80', '#CAD6FF']}
      style={{ flex: 1,   width: '100%', borderRadius: 22,  justifyContent: 'center', alignItems: 'center'} }
      start={{ x: 0, y: 0}}
      end={{ x: 1, y: 0 }}
    >
      {children}
    </LinearGradient>
  );

const PremiumRoutesButton = () => {
  return (
        <TouchableOpacity  style={styles.settingsContainer}>
            <GradientBackground >
                <Image
                        source={require('../../assets/routeCardImages/sparkle.png')}
                        style={styles.settingsIcon}
                />
            </GradientBackground>
        </TouchableOpacity >
  );
};

export default PremiumRoutesButton;