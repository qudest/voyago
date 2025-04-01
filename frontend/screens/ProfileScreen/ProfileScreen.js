import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { View, Image, TextInput, Text, TouchableOpacity, Alert,  FlatList, TouchableWithoutFeedback} from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import ProfileButton from '../../components/ProfileButton/ProfileButton';
import PremiumProfileButton from '../../components/PremiumProfileButton/PremiumProfileButton';

  const ProfileScreen = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
      navigation.navigate("ChoosePreferencesScreen");
    }

    const handleDoneRoutesPress = () => {
        Alert.alert("Пройднные")
    }
    const handleMyRoutesPress = () => {
        Alert.alert("Мои")
    }
    const handleLikeRoutesPress = () => {
        Alert.alert("Избранные")
    }
    const handlePremiumRoutesPress = () => {
        Alert.alert("Создать")
    }
    const handleCreatePress = () => {
        Alert.alert("Премиум")
    }
    const handleSettingsPress = () => {
        Alert.alert("Настроечки")
    }
    const handleExitPress = () => {
        Alert.alert("Выход")
    }


    const profile = {
        name: ' Uliana',
        doneRouts: '22',
        myRouts: '3',
    };
    
    return (
        <View style={styles.container}>
            <BackButton onPress={handleBackPress}></BackButton>
            <View style={styles.mainInfContainer}>
                <Text style={styles.mainInfTitle}>Привет, 
                {profile.name}!</Text>
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