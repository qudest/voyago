import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import styles from "./styles";
import BackButton from "../../components/BackButton/BackButton";
import UserLIstElement from "../../components/UserLIstElement/UserLIstElement";
import AlertDelete from "../../components/AlertDelete/AlertDelete";
import { useNavigation } from "@react-navigation/native";
import { findAllUsers, deleteUser } from "../../services/adminApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminUsersScreen = () => {
  const navigation = useNavigation();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const data = await AsyncStorage.getItem("userData");
        if (token && data) {
          const user = JSON.parse(data);
          setAccessToken(token);
          setCurrentUserId(user.id?.toString());
          await handleUserList(token, user.id?.toString());
        }
      } catch (error) {
        console.log("Ошибка загрузки данных:", error);
      }
    };
    loadUserData();
  }, []);

  const handleBackPress = () => {
    navigation.navigate("AdminScreen");
  };

  const handleDelete = (userId) => {
    setSelectedUserId(userId);
    setDeleteModalVisible(true);
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setSelectedUserId(null);
  };

  const confirmDelete = async () => {
    if (!selectedUserId) {
      setDeleteModalVisible(false);
      return;
    }
    setIsLoading(true);
    try {
      console.log(selectedUserId, accessToken);
      await deleteUser(selectedUserId, accessToken);
      await handleUserList(accessToken);
    } catch (error) {
      console.log("Ошибка при удалении пользователя", error);
    } finally {
      setIsLoading(false);
      setDeleteModalVisible(false);
      setSelectedUserId(null);
    }
  };

  const renderUserItem = ({ item }) => {
    return (
      <UserLIstElement
        cardInformation={item}
        onPress={() => handleDelete(item.id)}
      />
    );
  };

  const handleUserList = async (token, excludeUserId) => {
    try {
      setIsLoading(true);
      const response = await findAllUsers(token);
      const usersData = response.data?.data || [];

      if (Array.isArray(usersData)) {
        const formattedUsers = usersData
          .filter((user) => user.id?.toString() !== excludeUserId)
          .map((user) => ({
            id: user.id?.toString(),
            name: user.name || "Без имени",
            phoneNumber: user.phoneNumber || "Нет телефона",
            role: user.role,
            status: user.status,
            city: user.city,
            preferences: user.preferences || [],
          }));

        setUsers(formattedUsers);
      } else {
        console.log("Полученные данные не являются массивом:", usersData);
        setUsers([]);
      }
    } catch (error) {
      console.log("Ошибка при загрузке пользователей:", error);
      Alert.alert("Ошибка", "Не удалось загрузить список пользователей");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={handleBackPress} />

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : users.length > 0 ? (
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Пользователи не найдены. Попробуйте позже.
          </Text>
        </View>
      )}

      <AlertDelete
        isVisible={isDeleteModalVisible}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title="Удаление пользователя"
        message="Вы точно хотите удалить пользователя?"
        isLoading={isLoading}
      />
    </View>
  );
};

export default AdminUsersScreen;
