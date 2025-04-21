import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFF',
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  mainImformation: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  mainInformationTitle: {
    color: '#000000',
    fontSize: 23,
    fontWeight: '500',
    marginBottom: 20,
  },
  fixedButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default styles;