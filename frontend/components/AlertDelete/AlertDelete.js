import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

const AlertDeleteRoute = ({ 
  isVisible, 
  onCancel, 
  onConfirm, 
  title = "Удаление", 
  message = "Вы точно хотите удалить?"
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      backdropOpacity={0.5}
      useNativeDriver={true} 
      hideModalContentWhileAnimating={true} 
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalMessage}>{message}</Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={[styles.modalButton, styles.deleteButton]}
            onPress={onConfirm}
            activeOpacity={0.7} 
          >
            <Text style={styles.deleteButtonText}>Да</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onCancel}
            activeOpacity={0.7} 
          >
            <Text style={styles.cancelButtonText}>Нет</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlertDeleteRoute;