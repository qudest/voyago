import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import ContinueButton from '../ContinueButton/ContinueButton';

const AlertChange = ({ 
  isVisible, 
  onCancel, 
  title = "Изменения сохранены", 
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
        <View style={styles.modalButton}>
          <ContinueButton onPress={onCancel} condition={true}/>
        </View>
      </View>
    </Modal>
  );
};

export default AlertChange;