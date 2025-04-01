import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { View, Image, TextInput, Text, TouchableOpacity, Alert,  FlatList, TouchableWithoutFeedback} from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import ProfileButton from '../../components/ProfileButton/ProfileButton';

  const ProfileScreen = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
      navigation.navigate("ChoosePreferencesScreen");
    }

    const profileName = ' Uliana';
    
    return (
        <View style={styles.container}>
            <BackButton onPress={handleBackPress}></BackButton>
            <View style={styles.mainInfContainer}>
                <Text style={styles.mainInfTitle}>Привет, 
                {profileName}!</Text>
                <Image
                    source={require('../../assets/profileImages/logoprofile.png')}
                    style={styles.imageLogo}
                />
            </View>
            <View style={styles.navigationContainer}>
                <View style={styles.navigationRouts}>
                    <ProfileButton title="Пройденных маршрутов:" 
                        onPress={() => Alert.alert("Dop parametri")}
                    ></ProfileButton>
                    <ProfileButton title="Мои маршруты:" 
                        onPress={() => Alert.alert("Dop parametri")}
                    ></ProfileButton>
                    <ProfileButton title="Избранное" 
                        onPress={() => Alert.alert("Dop parametri")}
                    ></ProfileButton>
                    <ProfileButton title="Создать маршрут" 
                        onPress={() => Alert.alert("Dop parametri")}
                    ></ProfileButton>
                    <ProfileButton title="Премиум" 
                        onPress={() => Alert.alert("Dop parametri")}
                    ></ProfileButton>
                </View>
                <View style={styles.navigationSettings}>
                    <ProfileButton title="Дополнительные параметры" 
                        onPress={() => Alert.alert("Dop parametri")}
                    ></ProfileButton>
                </View>
                <View style={styles.navigationExit}>
                    <ProfileButton title="Выйти" 
                        onPress={() => Alert.alert("Dop parametri")}
                    ></ProfileButton>
                </View>
            </View>
        </View>
    );
  };

export default ProfileScreen;