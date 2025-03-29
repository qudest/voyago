import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFFF',
    position: 'relative',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainImformation: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainInformationTitle: {
    color: '#000000',
    fontSize: 23,
    fontWeight: 500,
  },
  flexGrow: 1
});

export default styles;