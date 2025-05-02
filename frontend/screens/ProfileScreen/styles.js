import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,

    backgroundColor: '#FCFCFF',
  },
  mainInfContainer: {
    flexDirection: 'row',
    top: 110,
    marginBottom: 20,
  },
  mainInfTitle:{
    width: 200,
    top: 30,

    color: '#3E3C80',
    fontSize: 23,
    fontWeight: 500,
  },
  navigationContainer: {
    justifyContent: 'space-around',
    marginTop: 30,
    bottom: 50,
  },
  navigationRouts: {
    width: 292,
    height: 225,
    bottom: 150,
    
    backgroundColor: "#CAD6FF",

    borderRadius: 16,
    borderColor: '#FFFFFF',
    borderWidth: 2,

    shadowColor: '#000000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, 
  },
  navigationSettings: {
    width: 292,
    height: 48,

    marginTop: 10,

    borderRadius: 16,
    borderColor: '#FFFFFF',
    borderWidth: 2,

    backgroundColor: "#CAD6FF",

    shadowColor: '#000000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, 
  },

  navigationExit: {

    width: 292,
    height: 48,

    marginTop: 20,

    backgroundColor: "#CAD6FF",

    borderRadius: 16,
    borderColor: '#FFFFFF',
    borderWidth: 2,

    backgroundColor: "#CAD6FF",

    shadowColor: '#000000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, 
  },
});

export default styles;