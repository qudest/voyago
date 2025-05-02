import React from 'react';
import styles from './styles';
import { View, Image, TouchableOpacity, Text } from 'react-native';

const NavRouteButton = ({ onPressLeft, onPressRight, currentPoint }) => {
  return (
    <View style={styles.navRouteContainer}>
      <TouchableOpacity
        style={styles.leftNav}
        onPress={onPressLeft}
      >
        <Image
          source={require('../../assets/mainImages/left.png')}
          style={styles.leftIcon}
        />
      </TouchableOpacity>
      
      <Text
        style={styles.routePointText}
        numberOfLines={1} 
        ellipsizeMode="tail" 
      >
        {currentPoint.split(',')[0]}
      </Text>
      
      <TouchableOpacity
        style={styles.rightNav}
        onPress={onPressRight}
      >
        <Image
          source={require('../../assets/mainImages/right.png')}
          style={styles.rightIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavRouteButton;
