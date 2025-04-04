import styles from './styles';
import React, { useState, useRef} from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text} from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import PayButton from '../../components/PayButton/PayButton';
import { TextInput } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

const PaymentScreen = () => {
    const navigation = useNavigation();
    const [expiryDate, setExpiryDate] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const cardInputRef = useRef(null);

    const route = useRoute();
    const costOfPremium = route.params?.costOfPremium || "299"; 

    const handleBackPress = () => {
        navigation.navigate("PremiumScreen")
      }

    const handleExpiryChange = (text) => {
        const cleanedText = text.replace(/\D/g, '');
        let formattedText = cleanedText;
        
        if (cleanedText.length > 2) {
            formattedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2, 4)}`;
        }
        setExpiryDate(formattedText);
    };
  
    const formatCardNumber = (text) => {
      const cleanedText = text.replace(/\s+/g, '').replace(/\D/g, '');
      
      const chunks = [];
      for (let i = 0; i < cleanedText.length; i += 4) {
        chunks.push(cleanedText.slice(i, i + 4));
      }
      
      const formattedText = chunks.join(' ');
      
      setCardNumber(formattedText);
      
      if (cleanedText.length === 16 && cardInputRef.current) {
        cardInputRef.current.blur();
      }
    };

    const costInformation = {
        cost: costOfPremium,
        number: '1',
    }

    return (
        <View style={styles.container}>
            <BackButton onPress={handleBackPress}></BackButton>
            <View style={styles.informationContainer}>
                <Text style={styles.nextDebitTitle}>Следующее списание через 30 дней, сумма 299 Р</Text>
                <Text style={styles.remindTitle}>Мы напомним об этом за 3 дня - никаких неожиданностей.</Text>
            </View>
            <View style={styles.paymentContainer}>
                <View style={styles.cardContainer}>
                    <View style={styles.requisitesContainer}>
                        <Text style={styles.requisitesTitle}>Номер карты</Text>
                        <TextInput 
                            style={styles.requisitesInput}
                            placeholder="0000 0000 0000 0000"
                            keyboardType="numeric"
                            value={cardNumber}
                            onChangeText={formatCardNumber}
                            maxLength={19}
                        ></TextInput>
                    </View>
                    <View style={styles.requisitesBottom}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateTitle}>Месяц / год</Text>
                            <TextInput 
                                style={styles.dateInput}
                                placeholder="01/25"
                                keyboardType="numeric"
                                value={expiryDate}
                                onChangeText={handleExpiryChange}
                                maxLength={5}
                            ></TextInput>
                        </View>
                        <View style={styles.cvcCodeContainer}>
                            <Text style={styles.cvcCodeTitle}>CVC код</Text>
                            <TextInput 
                                style={styles.cvcCodeInput}                 
                                placeholder="000"
                                keyboardType="numeric"
                                maxLength={3}
                                secureTextEntry
                            ></TextInput>
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
                        <Text style={styles.number}>#{costInformation.number}</Text>
                    </View>
                </View>
            </View>
            <PayButton cost={costInformation.cost}></PayButton>
        </View>
    );
  };

export default PaymentScreen;