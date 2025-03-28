import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imageContainer: {
    bottom: 80,
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
    padding: 20, 
    marginBottom: 10, 

    width: 300,
    height: 307,

    backgroundColor: 'rgba(0, 0, 0, 0.12)',

    borderRadius: 22,
  },
  listContainer: { 
    flex: 1,
    justifyContent: 'center', 
  },
  listItem: {
    marginBottom: 12, 
    paddingVertical: 6, 
  },
  listText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
  costText: {
    marginBottom: 30,
    fontSize: 23,
    color: '#FFFFFF',
  },
  buyContainer: {
    alignItems: 'center',
    top: 135,
  },
});

export default styles;