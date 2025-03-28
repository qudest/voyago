import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imageContainer: {
    bottom: 175,
  },
  premiumImage: {
    margin: 0,
  },
  mainInformationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainInformation: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, 
    marginBottom: 10, 

    width: 300,
    height: 177,

    backgroundColor: 'rgba(0, 0, 0, 0.12)',

    borderRadius: 22,

  },

  mainInformationTitle: {
    alignItems: 'center',

    fontSize: 16,
    color: '#FFFFFF',
  },
  mainInformationCost: {
    alignItems: 'center',

    fontSize: 32,
    color: '#FFFFFF',
  },
  buyContainer: {
    alignItems: 'center',
    top: 230,
  },
});

export default styles;