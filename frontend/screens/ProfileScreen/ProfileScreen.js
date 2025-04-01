import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { View, Image, TextInput, Text, TouchableOpacity, Alert,  FlatList, TouchableWithoutFeedback} from 'react-native';
import BackButton from '../../components/BackButton/BackButton';

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
                    source={require('../../assets/logoprofile.png')}
                    style={styles.imageLogo}
                />
            </View>
            <View style={styles.navigationContainer}>
                <View style={styles.navigationRouts}>
                    <Text>Пройденных маршрутов:</Text>
                    <Text>Мои маршруты:</Text>
                    <Text>Избранное</Text>
                    <Text>Создать маршрут</Text>
                    <Text>Премиум</Text>
                </View>
                <View style={styles.navigationSettings}>
                    <Text>Дополнительные параметры</Text>
                </View>
                <View style={styles.navigationExit}>
                    <Text>Выйти</Text>
                </View>
            </View>
        </View>
    );
  };

export default ProfileScreen;