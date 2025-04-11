import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { View, Image, TextInput, Text, TouchableOpacity, Alert,  FlatList, TouchableWithoutFeedback} from 'react-native';
import BuyButton from '../../components/BuyButton/BuyButton';
import ExitButton from '../../components/ExitButton/ExitButton'

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


  const PremiumScreen = () => {
    const navigation = useNavigation();
  
    const textItems = [
      "Персонализированные маршруты",
      "Экономия времени",
      "Легкость использования",
      "Уникальные места",
    ];
  
    const handleBuyPress = () => {
      navigation.navigate("PaymentScreen", { costOfPremium: "299" })
    }
    const handleExitPress = () => {
      navigation.navigate("PremiumFreeScreen");
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
                    <FlatList
                    data={textItems}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                        <Text style={styles.listText}>{item}</Text>
                        </View>
                    )}
                    scrollEnabled={false}
                    contentContainerStyle={styles.listContainer} 
                    />
                </View>
            </View>
            <View style={styles.buyContainer}>
                <Text style={styles.costText}>299 р/месяц</Text>
                <BuyButton onPress={handleBuyPress} ></BuyButton>
            </View>
        </View>
    </GradientBackground>
    );
  };

export default PremiumScreen;