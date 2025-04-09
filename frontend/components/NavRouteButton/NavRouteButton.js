import React from 'react';
import styles from './styles';
import { View, Image, TouchableOpacity, Text } from 'react-native';

const NavRouteButton = ({onPress}) => {
  return (
    <View style={styles.navRouteContainer}>
        <TouchableOpacity
             style={styles.leftNav}
             onPress={onPress}>
            <Image
                    source={require('../../assets/mainImages/left.png')}
                    style={styles.leftIcon}
            />
        </TouchableOpacity >
        <Text style={styles.routePointText}>Концертный зал</Text>
        <TouchableOpacity
             style={styles.rightNav}
             onPress={onPress}>
                <Image
                        source={require('../../assets/mainImages/right.png')}
                        style={styles.rightIcon}
                />
            </TouchableOpacity >
    </View>
  );
};

export default NavRouteButton;