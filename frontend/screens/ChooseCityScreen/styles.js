import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFFF',
    position: 'relative',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  mainImformation: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  mainInformationTitle: {
    color: '#000000',
    fontSize: 23,
    fontWeight: '500',
    marginBottom: 20,
  },
  fixedButton: {
    position: 'absolute',
    marginTop: 'auto', 
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
});

export default styles;