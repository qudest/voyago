import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFFFF',
    justifyContent: 'space-around', 
    alignItems: 'center', 
  },
  pointsContainer: {
    width: '100%',
    marginTop: '30%',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  topContainer: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20, 
  },
  createTitle: {
    fontSize: 19,
    fontWeight: 500,
    marginBottom: 4, 
  },
  createDiscription: {
    fontSize: 19,
    fontWeight: 400,
    marginBottom: 16, 
  },
  warningText:{
    color: '#3E3C80',
    fontSize: 19,
    fontWeight: 400,
  },
});

export default styles;