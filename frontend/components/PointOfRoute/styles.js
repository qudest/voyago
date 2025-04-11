import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    searchContainer: {
        width: 290,
        position: 'relative',
        marginBottom: 10,
    },
    searchMain: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    mapIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        left: 15,
        top: '50%',
        marginTop: -12,
        zIndex: 1,
    },
    searchInput: {
        height: 44,
        width: '100%',
        paddingLeft: 45,
        paddingRight: 45,
        backgroundColor: 'rgba(202, 214, 255, 0.25)',
        borderWidth: 2,
        borderColor: '#3E3C80',
        borderRadius: 22,
    },
    deleteButton: {
        position: 'absolute',
        right: 15,
        top: '50%', 
        marginTop: -10, 
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteIcon: {
        width: 20,
        height: 20,
    },
    dropdown: {
        position: 'absolute',
        top: 42,
        left: 0,
        right: 0,
        width: 290,
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 22,
        borderWidth: 2,
        borderColor: '#3E3C80',
        maxHeight: 200,
        zIndex: 60,
    },
    dropdownItem: {
        padding: 10,
    },
});

export default styles;