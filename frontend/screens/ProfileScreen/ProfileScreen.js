import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, Alert,  FlatList, TouchableWithoutFeedback} from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import ProfileButton from '../../components/ProfileButton/ProfileButton';
import PremiumProfileButton from '../../components/PremiumProfileButton/PremiumProfileButton';

import AsyncStorage from '@react-native-async-storage/async-storage';

  const ProfileScreen = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);

    const handleBackPress = () => {
        navigation.navigate("MainScreen")
    }
    const handleDoneRoutesPress = () => {
        navigation.navigate("DoneRoutesScreen")
    }
    const handleMyRoutesPress = () => {
        navigation.navigate("MyRoutesScreen")
    }
    const handleLikeRoutesPress = () => {
        navigation.navigate("LikeRoutesScreen")
    }
    const handlePremiumRoutesPress = () => {
        navigation.navigate("RecommendationsRoutesScreen")
    }
    const handleCreatePress = () => {
        navigation.navigate("CreateRouteScreen")
    }
    const handleSettingsPress = () => {
        navigation.navigate("AdditionalParametersScreen")
    }
    const handleExitPress = () => {
        Alert.alert("Выход")
    }

    useEffect(() => {
    const fetchUserData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem('userData');
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setUserData(parsedData);
      }
        } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        }
    };
    fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            <BackButton onPress={handleBackPress}></BackButton>
            <View style={styles.mainInfContainer}>
                <Text style={styles.mainInfTitle}>Привет,{' '}
                {userData?.name || ''}!</Text>
                <Image
                    source={require('../../assets/profileImages/logoprofile.png')}
                    style={styles.imageLogo}
                />
            </View>
            <View style={styles.navigationContainer}>
                <View style={styles.navigationRouts}>
                    <ProfileButton title="Пройденные маршруты" 
                        onPress={handleDoneRoutesPress}
                    ></ProfileButton>
                    <ProfileButton title="Мои маршруты" 
                        onPress={handleMyRoutesPress}
                    ></ProfileButton>
                    <ProfileButton title="Избранное" 
                        onPress={handleLikeRoutesPress}
                    ></ProfileButton>
                    <ProfileButton title="Создать маршрут" 
                        onPress={handleCreatePress}
                    ></ProfileButton>
                    <PremiumProfileButton title="Премиум" 
                        onPress={handlePremiumRoutesPress}
                    ></PremiumProfileButton>
                </View>
                <View style={styles.navigationSettings}>
                    <ProfileButton title="Дополнительные параметры" 
                        onPress={handleSettingsPress}
                    ></ProfileButton>
                </View>
                <View style={styles.navigationExit}>
                    <ProfileButton title="Выйти" 
                        onPress={handleExitPress}
                    ></ProfileButton>
                </View>
            </View>
        </View>
    );
  };

export default ProfileScreen;