import React from 'react';
import styles from './styles';
import { Image, TouchableOpacity } from 'react-native';

const SettingsButton = () => {
  return (
    <TouchableOpacity  style={styles.settingsContainer}>
    <Image
            source={require('../../assets/routeCardImages/settings.png')}
            style={styles.settingsIcon}
    />
    </TouchableOpacity >
  );
};

export default SettingsButton;