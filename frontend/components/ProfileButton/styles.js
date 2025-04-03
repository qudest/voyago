import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
      },
      battonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      text: {
        textAlignVertical: 'center',
        paddingLeft: 16,           
        textAlign: 'left',       
        lineHeight: 44,       

        width: 270,
        height: 44,
        backgroundColor: '#CAD6FF',
        fontSize: 16,
        fontWeight: 400,
        color: '#000000',

        borderRadius: 16,
      },
      imageNavigation: {
        right: 5,
      },
});

export default styles;