import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  topElement: {
    marginTop: 50,
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  bouncingElement: {
    position: 'absolute',
    bottom: 0, 
    height: 400, 
    width: '100%',
    backgroundColor: '#FCFCFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    borderColor: 'rgba(62, 60, 128, 0.38)',
    borderWidth: 5,
    
    borderRadius: 22,
    borderColor: 'rgba(62, 60, 128, 0.38)',
    borderWidth: 5,
  },
  routeInfo: {
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  topInfo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  routeText: {
    fontSize: 16,
    color: 'black',
  },
  routePoints: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "rgba(202, 214, 255, 0.25)",
    borderRadius: 16,
  },
  pointText: {
    fontSize: 16,
    fontWeight: 400,
    padding: 10,
  },
  timeDistanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    top: 15,
  },
  timeContainer: {
      flexDirection: 'row',
  },
  time: {
      padding: 4,
      fontSize: 16,
      fontWeight: 400,
      color: '#000000',
  },
  distance: {
      fontSize: 16,
      fontWeight: 400,
  },
});

export default styles;
