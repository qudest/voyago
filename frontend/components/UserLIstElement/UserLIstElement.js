import React, {useState, useRef, useEffect} from 'react';
import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import { Image, View, TouchableOpacity, Animated, Text, Alert  } from 'react-native';
import ChooseButton from '../../components/ChooseButton/ChooseButton';

const UserLIstElement = ({ cardInformation = {}, onPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.userInformation}>
                <Text style={styles.userName}>{cardInformation.name}</Text>
                <Text style={styles.userNumber}>{cardInformation.phoneNumber}</Text>
            </View>
            <TouchableOpacity onPress={onPress}>
                 <Image 
                    source={require('../../assets/trash.png')}
                        style={styles.trashImage}
                />
            </TouchableOpacity>
        </View>
    );
};

export default UserLIstElement;