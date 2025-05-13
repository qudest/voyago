import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        padding: 10,

        marginBottom: 20,
        backgroundColor: '#EFF3FF',
        width: 350,
        height: 73,  

        borderRadius: 22,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        
        elevation: 3,
      },
    userInformation: {
        flexDirection: 'column',
        marginLeft: 5,
    },
    userNumber: {
        color: '#606265',  
    },
    userName: {
        fontWeight: 500, 
        marginBottom: 5,
    }
});

export default styles;