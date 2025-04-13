import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    searchContainer: {
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
      },
      imageSearch: {
        flexGrow: 1, 
        position: 'absolute',
        right: 10,
        bottom: 7,
      },
      searchInput: {
        height: 45,
        width: 323,
        paddingLeft: 10,
        paddingRight: 30,
        borderWidth: 1,
        borderColor: 'rgba(96, 98, 101, 1)',
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
      },
      dropdown: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        width: 323,
        backgroundColor: '#EFF3FF',
        borderRadius: 8,
        maxHeight: 200,
        zIndex: -1,
      },
      dropdownItem: {
        padding: 10,
      },
});

export default styles;