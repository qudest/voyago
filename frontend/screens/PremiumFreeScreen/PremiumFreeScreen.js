import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, Alert} from 'react-native';
import BuyButton from '../../components/BuyButton/BuyButton';
import ExitButton from '../../components/ExitButton/ExitButton';


const GradientBackground = ({ children }) => (
    
    <LinearGradient
      colors={['#3E3C80', '#CAD6FF']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0}}
      end={{ x: 1, y: 0 }}
    >
      {children}
    </LinearGradient>
  );


const PremiumFreeScreen = () => {
    const navigation = useNavigation();
  
    const handleBuyPress = () => {
      navigation.navigate("PaymentScreen", { costOfPremium: "0" })
    }

    const handleExitPress = () => {
      navigation.navigate("ChooseCityScreen");
    }
    
    return (
      <GradientBackground>
        <View style={styles.container}>
            <ExitButton onPress={handleExitPress}></ExitButton>
            <View style={styles.mainInformationContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/premium.png')}
                    style={styles.premiumImage}>
                    </Image>
                </View>
                <View style={styles.mainInformation}>
                    <Text style={styles.mainInformationTitle}>БЕСПЛАТНЫЙ ПРОБНЫЙ ПЕРИОД</Text>
                    <Text style={styles.mainInformationCost}>0 р/месяц</Text>
                </View>
            </View>
            <View style={styles.buyContainer}>
                <BuyButton onPress={handleBuyPress} ></BuyButton>
            </View>
        </View>
    </GradientBackground>
    );
  };

export default PremiumFreeScreen;