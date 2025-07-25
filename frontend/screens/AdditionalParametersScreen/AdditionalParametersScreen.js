import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import BackButton from "../../components/BackButton/BackButton";
import SearchCity from "../../components/SearchCity/SearchCity";
import AlertError from "../../components/AlertError/AlertError";
import ProfileButton from "../../components/ProfileButton/ProfileButton";
import { TextInput } from "react-native-gesture-handler";
import AlertChange from "../../components/AlertChange/AlertChange";
import AlertDelete from "../../components/AlertDelete/AlertDelete";
import useAlert from "../../hooks/useAlert";
import {
  putAccountCityAndName,
  deleteAccount,
} from "../../services/accountApi";
import { putAccountInfo } from "../../services/accountApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppMetrica from "@appmetrica/react-native-analytics";

const AdditionalParametersScreen = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [name, setName] = useState("");
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { alert, showAlert, hideAlert } = useAlert();
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [id, setUserId] = useState(null);
  const [initialCity, setInitialCity] = useState("");
  const [initialName, setInitialName] = useState("");
  const [preferences, setPreferences] = useState();
  const [isSubscriptionCancelled, setSubscriptionCancelled] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [isNoSubscriptionFound, setNoSubscriptionFound] = useState(false);

  useEffect(() => {
    const fetchCachedData = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      setAccessToken(accessToken);
    };

    fetchCachedData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem("userData");
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setUserId(parsedData.id);
          setPreferences(parsedData.preferences);
          setInitialCity(parsedData.city || "");
          setInitialName(parsedData.name || "");
          setSelectedCity(parsedData.city || "");
          setName(parsedData.name || "");
          setUserData(JSON.parse(cachedData));
        }
      } catch (error) {
        console.log("Ошибка при получении данных из кэша:", error);
      }
    };
    fetchUserData();
  }, []);

  const citiesData = [
    { id: 1, name: "Москва" },
    { id: 2, name: "Санкт-Петербург" },
    { id: 3, name: "Новосибирск" },
    { id: 4, name: "Екатериакнбург" },
  ];

  useEffect(() => {
    setButtonEnabled(selectedCity.length > 0);
  }, [selectedCity]);

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleSavePress = () => {
    putCity();
  };

  const handleDeletePress = () => {
    showAlert(
      "delete",
      "Удаление аккаунта",
      "Вы точно хотите удалить свой аккаунт?"
    );
  };

  const handleCancelPress = () => {
    if (userData.premium) {
      showAlert(
        "cancel",
        "Отмена подписки",
        "Вы точно хотите отменить подписку?"
      );
    } else {
      setNoSubscriptionFound(true);
    }
  };

  const confirmDelete = () => {
    AppMetrica.reportEvent("Удаление аккаунта", {
      action_type: "Подтверждение удаления аккаунта",
      button_name: "Да",
      screen: "Экран дополнительных параметров",
    });
    hideAlert();
    deleteAccountConfirm();
  };

  const cancelChanges = () => {
    hideAlert();
  };

  const confirmCancellation = async () => {
    AppMetrica.reportEvent("Премиум", {
      action_type: "Отмена подписки",
      button_name: "премиум_подписка_отмена",
      screen: "Экран дополнительных параметров",
    });

    hideAlert();

    try {
      // 1. Получаем и обновляем userData в AsyncStorage
      const cachedData = await AsyncStorage.getItem("userData");
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const updatedUserData = { ...parsedData, premium: false };

        await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));
        setUserData(updatedUserData); // обновляем локальное состояние

        // 2. Отправляем обновлённые данные на сервер
        await putAccountInfo(
          parsedData.id,
          parsedData.name,
          "Russia",
          parsedData.city,
          parsedData.preferences || [],
          null,
          accessToken
        );

        // 3. Показываем уведомление
        setSubscriptionCancelled(true);
      }
    } catch (error) {
      console.log("Ошибка при отмене подписки:", error);
      setErrorMessage("Не удалось отменить подписку");
      setErrorModalVisible(true);
    }
  };

  const handleAlertChangeClose = () => {
    setSubscriptionCancelled(false);
  };

  const handleAlertNoPremium = () => {
    setNoSubscriptionFound(false);
  };

  const putCity = async () => {
    const cityToSend =
      selectedCity !== initialCity ? selectedCity : initialCity;
    const nameToSend = name !== initialName ? name : initialName;

    console.log(id, cityToSend, nameToSend, preferences, accessToken);
    try {
      const response = await putAccountCityAndName(
        id,
        cityToSend,
        nameToSend,
        preferences,
        accessToken
      );
      if (response.status === 200) {
        const cachedData = await AsyncStorage.getItem("userData");
        const parsedData = JSON.parse(cachedData);
        const updatedData = {
          ...parsedData,
          city: cityToSend,
          name: nameToSend,
        };
        await AsyncStorage.setItem("userData", JSON.stringify(updatedData));
      }
    } catch (error) {
      let message = "Что-то пошло не так";
      console.log(error);
      if (error.response) {
        message = "Неверное имя пользователя";
      } else if (error.request) {
        message = "Что-то пошло не так";
      }
      setErrorMessage(message);
      setErrorModalVisible(true);
    }
  };

  const deleteAccountConfirm = async () => {
    try {
      const response = await deleteAccount(id, accessToken);
      if (response.status === 200) {
        await AsyncStorage.removeItem("userData");
        await AsyncStorage.removeItem("accessToken");
        navigation.navigate("AuthorizationScreen");
      }
    } catch (error) {
      let message = "Что-то пошло не так";
      console.log(error);
      if (error.response) {
        message = "Попробуйте позже";
      } else if (error.request) {
        message = "Нет ответа от сервера";
      }
      setErrorMessage(message);
      setErrorModalVisible(true);
    }
  };

  const confirmError = () => {
    setErrorModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={handleBackButton} />
      <AlertError
        isVisible={isErrorModalVisible}
        onConfirm={confirmError}
        title="Ошибка!"
        message={errorMessage}
      />
      <View style={styles.mainContent}>
        <View style={styles.cityContainer}>
          <Text style={styles.cityTitle}>Изменить город</Text>
          <View style={styles.searchWrapper}>
            <SearchCity
              citiesData={citiesData}
              selectedCity={selectedCity}
              onCitySelect={(city) => {
                setSelectedCity(city);
              }}
            />
          </View>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTitle}>
            Изменить имя (от 6 до 24 символов)
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputName}
              cursorColor="#000"
              onChangeText={setName}
              value={name}
              placeholder="Введите имя"
              placeholderTextColor="#888"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
          <Text style={styles.saveButtonText}>Сохранить изменения</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.cancelPremiumButton}>
          <ProfileButton
            title="Отменить подписку"
            onPress={handleCancelPress}
          />
        </View>
        <View style={styles.cancelDeleteButton}>
          <ProfileButton
            title="Удалить аккаунт"
            onPress={handleDeletePress}
            enabled={false}
          />
        </View>
      </View>

      {alert.isVisible && alert.type === "change" && (
        <AlertChange
          isVisible={alert.isVisible}
          onCancel={cancelChanges}
          title={alert.title}
        />
      )}

      {alert.isVisible && alert.type === "delete" && (
        <AlertDelete
          isVisible={alert.isVisible}
          onCancel={hideAlert}
          onConfirm={confirmDelete}
          title={alert.title}
          message={alert.message}
        />
      )}

      {alert.isVisible && alert.type === "cancel" && (
        <AlertDelete
          isVisible={alert.isVisible}
          onCancel={hideAlert}
          onConfirm={confirmCancellation}
          title={alert.title}
          message={alert.message}
        />
      )}

      <AlertChange
        isVisible={isSubscriptionCancelled}
        onCancel={handleAlertChangeClose}
        title="Подписка успешно отменена"
        message=" "
      />

      <AlertChange
        isVisible={isNoSubscriptionFound}
        onCancel={handleAlertNoPremium}
        title="Подписка не найдена"
        message=" "
      />
    </View>
  );
};

export default AdditionalParametersScreen;
