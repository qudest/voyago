import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#F1F5FF',
        borderRadius: 12,
        padding: 20,
        marginHorizontal: 20,
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
            color: '#3E3C80',
        },
        modalMessage: {
            fontSize: 16,
            marginBottom: 20,
            textAlign: 'center',
            color: '#555',
            lineHeight: 22,
        },
        modalButtons: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
        },
        modalButton: {
            alignItems: 'center',
            width: 128,
            height: 44,
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 22,
            marginLeft: 10,
        },
        cancelButton: {
            backgroundColor: '#3E3C80',
            color: "#fff",
        },
        deleteButton: {
            backgroundColor: '#CAD6FF',
        },
        cancelButtonText: {
            color: 'white',
            fontSize: 16,
            fontWeight: '500',
        },
        deleteButtonText: {
            color: 'white',
            fontSize: 16,
            fontWeight: '500',
        },

    });
    
export default styles;