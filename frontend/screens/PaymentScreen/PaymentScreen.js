import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, Alert} from 'react-native';
import BuyButton from '../../components/BuyButton/BuyButton';
import ExitButton from '../../components/ExitButton/ExitButton';
import BackButton from '../../components/BackButton/BackButton';
import { TextInput } from 'react-native-gesture-handler';

const PremiumFreeScreen = () => {
    const navigation = useNavigation();
  
    const handleBuyPress = () => {
      Alert.alert("rrrr")
    }
    const handleExitPress = () => {
      navigation.navigate("ChooseCityScreen");
    }
    
    return (
        <View style={styles.container}>
            <BackButton></BackButton>
            <View style={styles.informationContainer}>
                <Text style={styles.nextDebitTitle}>Следующее списание через 30 дней, сумма 299 Р</Text>
                <Text style={styles.remindTitle}>Мы напомним об этом за 3 дня - никаких неожиданностей.</Text>
            </View>
            <View style={styles.paymentContainer}>
                <View style={styles.cardContainer}>
                    <View style={styles.requisitesContainer}>
                        <Text style={styles.requisitesTitle}>Номер карты</Text>
                        <TextInput style={styles.requisitesInput}></TextInput>
                    </View>
                    <View style={styles.requisitesBottom}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateTitle}>Месяц / год</Text>
                            <TextInput style={styles.dateInput}></TextInput>
                        </View>
                        <View style={styles.cvcCodeContainer}>
                            <Text style={styles.cvcCodeTitle}>CVC код</Text>
                            <TextInput style={styles.cvcCodeInput}></TextInput>
                        </View>
                    </View>
                </View>
                <View style={styles.payInformationContainer}>
                    <Text style={styles.payInformationTitle}>Информация о платеже</Text>
                    <View style={styles.shopInformation}>
                        <Text style={styles.shopTitle}>Магазин</Text>
                        <Text style={styles.shopName}>VOYAGO</Text>
                    </View>
                    <View style={styles.numberInformation}>
                        <Text style={styles.numberTitle}>Номер заказа</Text>
                        <Text style={styles.number}>#1</Text>
                    </View>
                </View>
            </View>
        </View>
    );
  };

export default PremiumFreeScreen;