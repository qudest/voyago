import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, TouchableOpacity, FlatList, Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import styles from "./styles";
import BackButton from '../../components/BackButton/BackButton';
import UserLIstElement from '../../components/UserLIstElement/UserLIstElement';
import AlertDelete from '../../components/AlertDelete/AlertDelete';
import { useNavigation } from "@react-navigation/native";

const AdminUsersScreen = () => {
    const navigation = useNavigation();
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([
        { id: '1', name: 'User 1', phoneNumber: '+1234567890' },
        { id: '2', name: 'User 2', phoneNumber: '+0987654321' },
        { id: '3', name: 'User 3', phoneNumber: '+1112223333' },
        { id: '4', name: 'User 1', phoneNumber: '+1234567890' },
        { id: '5', name: 'User 2', phoneNumber: '+0987654321' },
        { id: '6', name: 'User 3', phoneNumber: '+1112223333' },
        { id: '7', name: 'User 1', phoneNumber: '+1234567890' },
        { id: '8', name: 'User 2', phoneNumber: '+0987654321' },
        { id: '9', name: 'User 3', phoneNumber: '+1112223333' },
    ]); 

    const handleBackPress = () => {
        navigation.navigate("AdminScreen")
    };

    const handleDelete = () => {
        setDeleteModalVisible(true);
    };

    const cancelDelete = () => {
        setDeleteModalVisible(false);
    };

    const confirmDelete = async () => {
            if (!initialRoute.id) {
                navigation.navigate('MyRoutesScreen');
                return;
            }
    
            setIsLoading(true);
            try {
                await RouteDelete(initialRoute.id);
                navigation.navigate('MyRoutesScreen');
            } catch (error) {
                console.error('Error deleting route:', error);
                Alert.alert('Ошибка', 'Не удалось удалить маршрут');
            } finally {
                setIsLoading(false);
                setDeleteModalVisible(false);
            }
    };

    const renderUserItem = ({ item }) => (
        <UserLIstElement 
            cardInformation={item} 
            onPress={() => handleDelete(item.id)} 
        />
    );

    return (
        <View style={styles.container}>
            <BackButton onPress={handleBackPress}/>
            {users.length > 0 ? (
                <FlatList
                    data={users}
                    renderItem={renderUserItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={styles.list}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Пользователи не найдены. Попробуйте позже.</Text>
                </View>
            )}

            <AlertDelete
                isVisible={isDeleteModalVisible}
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
                title="Удаление пользователя"
                message="Вы точно хотите удалить пользователя?"
            />
        </View>
    );
};
export default AdminUsersScreen;