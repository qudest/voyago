import styles from "./styles";
import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import BackButton from "../../components/BackButton/BackButton";
import PayButton from "../../components/PayButton/PayButton";
import { TextInput } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { getPremium } from "../../services/premiumApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [expiryDate, setExpiryDate] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const cardInputRef = useRef(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const route = useRoute();
  const costOfPremium = route.params?.costOfPremium || "299";

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const data = await AsyncStorage.getItem("userData");
        if (token && data) {
          setAccessToken(token);
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };
    loadUserData();
  }, []);

  const handleBackPress = () => {
    navigation.navigate("PremiumScreen");
  };

  const handleExpiryChange = (text) => {
    const cleanedText = text.replace(/\D/g, "");
    let formattedText = cleanedText;

    if (cleanedText.length > 2) {
      formattedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2, 4)}`;
    }
    setExpiryDate(formattedText);
  };

  const formatCardNumber = (text) => {
    const cleanedText = text.replace(/\s+/g, "").replace(/\D/g, "");

    const chunks = [];
    for (let i = 0; i < cleanedText.length; i += 4) {
      chunks.push(cleanedText.slice(i, i + 4));
    }

    const formattedText = chunks.join(" ");

    setCardNumber(formattedText);

    if (cleanedText.length === 16 && cardInputRef.current) {
      cardInputRef.current.blur();
    }
  };

  const costInformation = {
    cost: costOfPremium,
    number: "1",
  };

  const handleBuyPremium = async () => {
    const phoneNumber = userData.phoneNumber;
    try {
      const request = await getPremium(phoneNumber, accessToken);
      if (request.status === 200) {
        const updatedUserData = {
          ...userData,
          premium: true,
          endDate: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          creditCard: cardNumber.replace(/\s/g, ""),
        };
        await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));
        setUserData(updatedUserData);
        navigation.navigate("MainScreen");
      }
    } catch (error) {
      console.log("Ошибка при покупке премиума:", error);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={handleBackPress}></BackButton>
      <View style={styles.informationContainer}>
        <Text style={styles.nextDebitTitle}>
          Следующее списание через 30 дней, сумма 299 Р
        </Text>
        <Text style={styles.remindTitle}>
          Мы напомним об этом за 3 дня - никаких неожиданностей.
        </Text>
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
      <PayButton
        cost={costInformation.cost}
        onPress={handleBuyPremium}
      ></PayButton>
    </View>
  );
};

export default PaymentScreen;
