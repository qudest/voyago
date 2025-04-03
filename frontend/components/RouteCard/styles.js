import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFF3FF',
        borderRadius: 22,
        padding: 15,
        marginVertical: 10,
        overflow: 'hidden', 
        
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    timeDistanceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        top: 15,
    },
    timeContainer: {
        flexDirection: 'row',
    },
    time: {
        padding: 4,
        fontSize: 16,
        fontWeight: 400,
        color: '#000000',
    },
    distance: {
        fontSize: 16,
        fontWeight: 400,
    },
    navigationBottomImage: {
        marginTop: 15,
        marginLeft: 150,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
    },
    title: {
        marginRight: 10,
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1, 
        overflow: 'hidden',
    },
 
    contentPoints: {
        top: 5,
        left: 20,
    },
    pointText: {
        marginVertical: 7,

        fontSize: 16,
    },
    chooseButton: {
        marginTop: 15,
    },
    footer: {
        alignItems: 'center',
        marginTop: 28,
        zIndex: 2, 
    },
    navigationImage: {
        top: 5,
        zIndex: 10, 
        resizeMode: 'contain',
    },
});

export default styles;