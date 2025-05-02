import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

const AlertDeleteRoute = ({ 
  isVisible, 
  onConfirm, 
  title = "Ошибка!", 
  message = "Попробуйте ещё раз"
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onConfirm}
      backdropOpacity={0.5}
      useNativeDriver={true} 
      hideModalContentWhileAnimating={true} 
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.modalContainer}>
        <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>{title}</Text>
            <Text style={styles.alertMessage}>{message}</Text>
        </View>
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={onConfirm}
            activeOpacity={0.7} 
          >
            <Image  
                source={require('../../assets/alertImages/exit.png')}
                style={styles.exitIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlertDeleteRoute;