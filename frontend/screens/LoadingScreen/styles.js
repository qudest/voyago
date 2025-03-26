import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFFF',
    position: 'relative',
  },
  containerLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  imageLogo: {
    width: 211,
    height: 282,
  },
  imageLogoName: {
    marginTop: 200,
    width: 164,
    height: 35,
  },
  containerClouds: {
    height: '100%',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',  
    left: 0, 
    right: 0, 

  },
  imageCloudLeft: {
    marginTop: 500,
  },
  imageCloudRight: {
    marginTop: 100,
  },
  flexGrow: 1
});

export default styles;