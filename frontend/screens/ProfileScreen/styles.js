import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  mainInfContainer: {
    flexDirection: 'row',

    top: 100,
  },
  mainInfTitle:{
    width: 200,
    color: '#3E3C80',
    fontSize: 23,
    fontWeight: 500,
  },
  navigationContainer: {
    justifyContent: 'space-around',

    bottom: 50,
  },
  navigationRouts: {
    width: 292,
    height: 240,
    bottom: 150,
    backgroundColor: "#CAD6FF",
    borderRadius: 16,
  },
  navigationSettings: {
    width: 292,
    height: 48,

    marginTop: 10,

    borderRadius: 16,

    backgroundColor: "#CAD6FF",
  },

  navigationExit: {

    width: 292,
    height: 48,

    marginTop: 10,

    borderRadius: 16,

    backgroundColor: "#CAD6FF",
  },
});

export default styles;