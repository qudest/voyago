import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    enableContinueButton: {
        alignSelf: 'center',
        
        bottom: 70,

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
      disableContinueButton: {
        alignSelf: 'center',
    
        width: 295,
        height: 44,
        paddingTop: 10,

        backgroundColor: '#CECED1', 
        color: '#3E3C80',
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
      enableContinueText: {
        alignSelf: 'center',

        color: '#FFFFFF',

        fontSize: 16,
        fontWeight: 500,
      },
      disableContinueText: {
        alignSelf: 'center',

        color: '#3E3C80',
        
        fontSize: 16,
        fontWeight: 500,
      },
    });
    
export default styles;