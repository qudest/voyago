import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(202, 214, 255, 0.25)',
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
    editImage: {
        left: 80,
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
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    content: {
        paddingTop: 10,
    },
    pointText: {
        marginVertical: 5,
    },
    chooseButton: {
        marginTop: 15,
    },
    footer: {
        alignItems: 'center',
        marginTop: 28,
    },
    navigationImage: {
        top: 5,
        zIndex: 10, 
    },
});

export default styles;