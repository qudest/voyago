import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, Alert} from 'react-native';
import LocationButton from '../../components/LocationButton/LocationButton';
import BackButton from '../../components/BackButton/BackButton';
import ContinueButton from '../../components/ContinueButton/ContinueButton';

const ChooseCityScreen = () => {
    const navigation = useNavigation();
    
    const handleBackButton = () => {
        navigation.navigate('PremiumScreen')
    }
    const handleLocationButton = () => {
        Alert.alert("There will be location auto")
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <BackButton onPress={handleBackButton}></BackButton>
                <LocationButton onPress={handleLocationButton}></LocationButton>
            </View>
            <View style={styles.mainImformation}>
                <Text style={styles.mainInformationTitle}>Введите город</Text>
            </View>
            <ContinueButton></ContinueButton>

        </View>
    );
  };

export default ChooseCityScreen;