import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',

        width: 310,
        zIndex: 9999,
        top: 50, 
        marginHorizontal: 20,
        paddingHorizontal: 10,
        backgroundColor: '#CAD6FF',
        borderRadius: 22,
        },
    alertContainer: {
        flexDirection: 'column', 
        marginLeft: 5,
    },
    alertTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3E3C80',
    },
        alertMessage: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
        lineHeight: 22,
    },
        modalButtons: {
        justifyContent: 'center',
    },
    modalButton: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 22,
        marginLeft: 10,
    },
        deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});
    
export default styles;