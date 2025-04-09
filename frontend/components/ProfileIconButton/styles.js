import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    settingsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        
        width: 44,
        height: 44,

        backgroundColor: '#FFFFFF',

        borderRadius: 22,
        borderColor: 'rgba(62, 60, 128, 0.38)',
        borderWidth: 7,

        shadowColor: '#000000', 
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, 
    },
});

export default styles;