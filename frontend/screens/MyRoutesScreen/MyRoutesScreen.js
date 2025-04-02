import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { View, Image, ScrollView, Text, Alert} from 'react-native';
import BuyButton from '../../components/BuyButton/BuyButton';
import ExitButton from '../../components/ExitButton/ExitButton';
import BackButton from '../../components/BackButton/BackButton';
import RouteCard from '../../components/RouteCard/RouteCard';

const MyRoutesScreen = () => {
    const navigation = useNavigation();

    const handlerBacjButton = () => {
        navigation.navigate("ProfileScreen")
    }
    const cardInformation = {
        title: "Весёлый маршрут",
        time: "7:77",
        distance: "5",
        points: ["Точка раз", "Точка двас", "Точка трис"],
    }
    
    return (
        <View style={styles.container}>
            <BackButton onPress={handlerBacjButton}></BackButton>

            <ScrollView style={styles.buttonContainer}>
                <RouteCard cardInformation={cardInformation}/>
                <RouteCard />
                <RouteCard />
            </ScrollView>
        </View>
    )
}

export default MyRoutesScreen;