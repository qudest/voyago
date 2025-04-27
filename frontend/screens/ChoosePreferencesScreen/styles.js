import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFF',
    justifyContent: 'space-between', 
    paddingVertical: 20,
  },

  header: {
    marginTop: 20,
    alignItems: 'center', 
  },

  chooseTitle: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '500',
    color: '#3E3C80',
    maxWidth: 280,
  },

  preferenceContainer: {
    flex: 1,
    marginBottom: 50,
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  footer: {
    paddingHorizontal: 20,
  },
});
export default styles;