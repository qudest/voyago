import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,

        backgroundColor: '#FCFCFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',      
        width: '100%',  
        marginRight: 40,   

        top: 17,
    },
    settingsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        
        width: 74,
        height: 40,

        backgroundColor: '#EFF3FF',

        borderRadius: 22,

        shadowColor: '#000000', 
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, 
    },
    buttonContainer: {
        width: '90%',
        top: 65,
    },

    noResults: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '70%',
        fontSize: 23,
        fontWeight: 500,
        color: '#3E3C80',
    },
});

export default styles;