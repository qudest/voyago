import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    cardsContainer: {
        width: 300,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    containerEnable: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '48%',
        aspectRatio: 0.94,
        height: 133,

        marginBottom: 20,

        backgroundColor: '#CAD6FF',

        borderRadius: 23,

        shadowColor: '#000000', 
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, 
    },
    containerDisable: {
        justifyContent: 'center',
        alignItems: 'center',

        width: '48%',
        aspectRatio: 0.94,
        height: 133,

        marginBottom: 20,

        backgroundColor: '#AEAFB2',

        borderRadius: 23,

        shadowColor: '#000000', 
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, 
    },
    imagePreference: {
        width: 61,
        height: 63,
    },
    titlePreference: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: 700,
        color: '#FFFFFF',
    },
});

export default styles;