import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFF',
  },
  containerMain: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  chooseTitle: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 23,
    fontWeight: '500',
    color: '#3E3C80',
    maxWidth: 280,
  },
  preference: {
    marginTop: 20,
    marginBottom: 20,
  },
  containerNav: {
    padding: 20,
    backgroundColor: '#FCFCFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default styles;