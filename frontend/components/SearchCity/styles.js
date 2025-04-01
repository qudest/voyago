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
        right: 35,
        bottom: 15,
      },
      searchInput: {
        height: 45,
        width: 323,
        borderWidth: 1,
        borderColor: 'rgba(96, 98, 101, 1)',
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        paddingHorizontal: 10,
        marginBottom: 10,
      },
      dropdown: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        width: 323,
        backgroundColor: 'rgba(202, 214, 255, 0.25)',
        borderRadius: 8,
        maxHeight: 200,
        zIndex: -1,
      },
      dropdownItem: {
        padding: 10,
      },
});

export default styles;