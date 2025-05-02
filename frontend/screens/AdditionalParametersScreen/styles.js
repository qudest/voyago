import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFFFF',
        padding: 45,
      },
      mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      cityContainer:{
        marginBottom: 60,
      },
      cityTitle: {
        fontSize: 16,
        marginBottom: 10,
      },
      nameContainer: {
        width: '100%',
        marginTop: 5,
    },
    searchWrapper: {
        zIndex: 1000,
        elevation: 1000,
    },
    nameTitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingVertical: 8,
    },
    inputName: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    saveButton:{
      alignSelf: 'center',
      marginTop: 40,
      width: 295,
      height: 44,
      paddingTop: 10,

      backgroundColor: '#3E3C80',
      borderRadius: 22,

      shadowColor: '#000BD8', 
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5, 
    },
    saveButtonText: {
      alignSelf: 'center',

      color: '#FFFFFF',

      fontSize: 16,
      fontWeight: 500,
    },
      buttonsContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      },
      cancelPremiumButton: {
        width: 292,
        backgroundColor: "#CAD6FF",
        borderRadius: 16,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        marginBottom: 15,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
      },
      cancelDeleteButton: {
        width: 292,
        backgroundColor: "#AEAFB2",
        borderRadius: 16,
        borderColor: '#FFFFFF',
        borderWidth: 2,
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