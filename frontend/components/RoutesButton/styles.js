import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    settingsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        
        width: 151,
        height: 40,

        backgroundColor: '#FFFFFF',

        borderRadius: 22,
        borderColor: 'rgba(62, 60, 128, 0.38)',
        borderWidth: 5,

        shadowColor: '#000000', 
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, 
    },
    settingsText: {
        fontSize: 19,
        fontWeight: 400,
    },
});

export default styles;