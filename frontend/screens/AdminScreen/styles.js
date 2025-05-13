import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,

        backgroundColor: '#FCFCFF',
        padding: 45,
      },
    mainInformation: {
        flexDirection: 'row',
        marginTop: 40,
    },
    mainText: {
        fontSize: 23,
        fontWeight: 500,
        color: '#3E3C80',

        marginRight: 30,
        marginTop: 30,
    },
    buttons: {
        height: 450,
        justifyContent: 'space-between',
    },
    navigationButton: {

        width: 292,
        height: 48,

        marginTop: 20,

        backgroundColor: "#CAD6FF",

        borderRadius: 16,
        borderColor: '#FFFFFF',
        borderWidth: 2,

        backgroundColor: "#CAD6FF",

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