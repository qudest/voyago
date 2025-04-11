import React from 'react';
import styles from './styles';
import { Image, TouchableOpacity } from 'react-native';

const ProfileIconButton = ({onPress}) => {
  return (
    <TouchableOpacity
     style={styles.settingsContainer}
     onPress={onPress}>
        <Image
                source={require('../../assets/mainImages/user.png')}
                style={styles.settingsIcon}
        />
    </TouchableOpacity >
  );
};

export default ProfileIconButton;