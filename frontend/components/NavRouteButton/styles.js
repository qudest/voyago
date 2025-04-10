import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    navRouteContainer: {
        alignItems: 'center',
        justifyContent: 'center',

        flexDirection: 'row',
        
        width: 314,
        height: 44,

        marginTop: 5,
        marginLeft: 40,

        backgroundColor: '#FFFFFF',

        borderRadius: 22,
        borderColor: 'rgba(62, 60, 128, 0.38)',
        borderWidth: 1,

        shadowColor: '#000000', 
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, 
    },
    routePointText: {
        fontSize: 19,
        fontWeight: 400,
    },
    leftNav: {
        marginRight: 20,
    },
    rightNav: {
        marginLeft: 20,
    },
});

export default styles;