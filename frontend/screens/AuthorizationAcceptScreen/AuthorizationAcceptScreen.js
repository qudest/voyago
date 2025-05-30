import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./styles";
import BackButton from "../../components/BackButton/BackButton";
import ContinueButton from "../../components/ContinueButton/ContinueButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import AlertError from "../../components/AlertError/AlertError";
import {
  getAccountTockens,
  sendSecurityCode,
  getAccountInfo,
} from "../../services/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppMetrica from "@appmetrica/react-native-analytics";

const AuthorizationAcceptScreen = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(11);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const route = useRoute();

  const phoneNumber = route.params.cleanedPhoneNumber;

  const handleBackPress = () => {
    navigation.navigate("AuthorizationScreen");
  };

  const fetchCodeAccess = async () => {
    try {
      const response = await getAccountTockens(phoneNumber, code);

      if (response.status === 200) {
        const { accessToken } = response.data;

        await AsyncStorage.setItem("accessToken", accessToken);

        fetchPhoneNumber();
      }
    } catch (error) {
      console.log("Error details:", {
        response: error.response,
        request: error.request,
        message: error.message,
        config: error.config,
      });

      let message = "";
      if (error.response) {
        message = `Неверный код подтверждения`;
      } else if (error.request) {
        message = "Что-то пошло не так";
      } else {
        message = "Что-то пошло не так";
      }
      setErrorMessage(message);
      setErrorModalVisible(true);
    }
  };

  const fetchPhoneNumber = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await getAccountInfo(phoneNumber, accessToken);
      if (response.status === 200) {
        const data = response.data;
        console.log("Account info received:", data);

        const userData = {
          id: data.id,
          phoneNumber: data.phoneNumber,
          name: data.name,
          role: data.role,
          status: data.status,
          premium: data.premium,
          endDate: data.endDate,
          country: data.country,
          city: data.city,
          preferences: data.preferences,
          creditCard: data.creditCard,
        };

        AppMetrica.reportEvent("Авторизация", {
          action_type: "Успешный вход по смс",
          button_name: "продолжить",
          screen: "Экран подтверждения кода из смс",
        });

        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        if (userData.role === "ROLE_ADMIN") {
          navigation.navigate("AdminScreen");
        } else {
          if (response.data.city === null) {
            const { id } = response.data;
            await AsyncStorage.setItem("userData", JSON.stringify(userData));
            navigation.navigate("ChooseCityScreen", {
              idAccount: id,
              phoneNumber,
            });
          } else {
            console.log(
              "Navigating to MainScreen with:",
              phoneNumber,
              response.data.city
            );
            navigation.navigate("MainScreen");
          }
        }
      }
    } catch (error) {
      console.log("Error details:", {
        response: error.response,
        request: error.request,
        message: error.message,
        config: error.config,
      });

      let message = "";
      if (error.response) {
        message = "Что-то пошло не так";
      } else if (error.request) {
        message = "Нет ответа от сервера. Проверьте подключение к интернету.";
      } else {
        message = "Что-то пошло не так";
      }
      setErrorMessage(message);
      setErrorModalVisible(true);
    }
  };

  const fetchCode = async () => {
    try {
      const response = await sendSecurityCode(phoneNumber);
      if (response.status === 200) {
        console.log("Код отправлен успешно");
      }
    } catch (error) {
      console.error("Error in fetchCode:", error);
      console.log("Error details:", {
        response: error.response,
        request: error.request,
        message: error.message,
        config: error.config,
      });

      let message = "";
      if (error.response) {
        message = `Ошибка сервера: ${error.response.status}`;
      } else if (error.request) {
        message = "Не удалось отправить запрос";
      } else {
        message = "Ошибка при отправке кода";
      }
      setErrorMessage(message);
      setErrorModalVisible(true);
    }
  };

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const resetTimer = () => {
    setCode("");
    fetchCode();
    setTimer(5);
    setIsTimerActive(true);
  };

  const confirmError = () => {
    setErrorModalVisible(false);
  };

  const isButtonDisabled = code.length < 6;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <BackButton onPress={handleBackPress} />
        <AlertError
          isVisible={isErrorModalVisible}
          onConfirm={confirmError}
          title="Ошибка!"
          message={errorMessage}
        />

        <View style={styles.containerMainInf}>
          <Image
            source={require("../../assets/logoname.png")}
            style={styles.imageLogoName}
          />
          <Text style={styles.textNumberTitle}>Код из смс</Text>
          <Text style={styles.textNumber}>Отправили на +{phoneNumber}</Text>
          <TextInput
            style={styles.inputNumber}
            maxLength={6}
            placeholder="000000"
            cursorColor="#FCFFFF"
            onChangeText={(text) => setCode(text)}
            value={code}
            keyboardType="numeric"
          />

          <TouchableOpacity onPress={resetTimer} disabled={isTimerActive}>
            <Text
              style={[
                styles.enableRepeatCodeButton,
                !isTimerActive && styles.disableRepeatCodeButton,
              ]}
            >
              {isTimerActive
                ? `Получить новый код можно через ${timer} сек`
                : "Получить новый код"}
            </Text>
          </TouchableOpacity>
        </View>
        <ContinueButton
          onPress={fetchCodeAccess}
          condition={!isButtonDisabled}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AuthorizationAcceptScreen;
