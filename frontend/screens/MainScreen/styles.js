import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',

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
  scrollContent: {
    paddingBottom: 40,
  },
  routeInfo: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 22,
  },
  topInfo: {
    marginTop: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
  },
  counterText: {
    flex: 1, 
  },
  settingsIconContainer: {
    flex: 1, 
    alignItems: 'center', 
  },
  settingsIcon: {

  },
  ratingContainer: {
    alignItems: 'center',
    width: '100%',
  },
  ratingPrompt: {
    fontSize: 19,
    marginBottom: 5,
  },
  containerMap: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    width: 40,
    height: 50,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeText: {
    fontSize: 16,
    color: 'black',
  },
  routePoints: {
    minHeight: 150,
    marginTop: 30,
    padding: 20,
    backgroundColor: "rgba(202, 214, 255, 0.25)",
    borderRadius: 16,
  },
  routePointsContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  pointText: {
    fontSize: 16,
    fontWeight: 400,
    padding: 10,
  },
  activePoint: {
    color: '#006CCC',
    fontWeight: 'bold',
    fontWeight: 400,
    padding: 10,
  },
  timeDistanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    top: 0,
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
