import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    enableContinueButton: {
        alignSelf: 'center',
        justifyContent: 'center', 

        marginTop: 10,
        width: 295,
        height: 44,
        backgroundColor: '#FCFCFF',
        borderRadius: 22,
        borderWidth: 4,
        borderColor: '#3E3C80',

        shadowColor: '#000BD8', 
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, 
      },
      disableContinueButton: {
        alignSelf: 'center',
        justifyContent: 'center', 
    
        width: 295,
        height: 44,

        
        color: '#606265',
        borderRadius: 22,
        borderWidth: 4,
        borderColor: '#606265',

        shadowColor: '#000000', 
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, 
      },
      enableContinueText: {
        alignSelf: 'center',
        justifyContent: 'center', 

        color: '#3E3C80',

        fontSize: 16,
        fontWeight: 500,
      },
      disableContinueText: {
        alignSelf: 'center',

        color: '#606265',
        
        fontSize: 16,
        fontWeight: 500,
      },
    });
    
export default styles;