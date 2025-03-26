import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    flexGrow: 1, 

    backgroundColor: '#FCFFFF',
  },
  containerMainInf: {
    alignItems: 'center',
    justifyContent: 'center',

    height: 660,
  },
  imageLogoName: {
    width: 165,
    height: 35,
  },
  textNumberTitle: {
    marginTop: 100,

    fontSize: 19,
  },
  textNumber: {
    fontSize: 16,
    color: '#606265'
  },
  inputNumber: {
    width: 256,


    marginTop:35,
    marginBottom: 0,
    paddingBottom: 8,

    textAlign: 'center',
    fontSize: 16,

    borderBottomWidth: 1, 
    borderBottomColor: 'black', 
  },
  enableRepeatCodeButton: {
    marginBottom: 10,

    color: '#606265',
  },
  disableRepeatCodeButton: {
    marginBottom: 10,

    color: '#3E3C80',
  },
  enableContinueButton: {
    alignSelf: 'center',

    bottom: 70,

    width: 295,
    height: 44,
    paddingTop: 10,

    backgroundColor: '#3E3C80',

    borderRadius: 22,

    shadowColor: '#000BD8', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, 
  },
  disableContinueButton: {
    alignSelf: 'center',

    width: 295,
    height: 44,
    paddingTop: 10,

    backgroundColor: '#CECED1', 
    color: '#3E3C80',

    borderRadius: 22,

    shadowColor: '#000BD8', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, 
  },
  enableContinueText: {
    alignSelf: 'center',
    color: '#FFFFFF',

    fontSize: 16,
    fontWeight: 500,
  },
  disableContinueText: {
    alignSelf: 'center',
    color: '#3E3C80',

    fontSize: 16,
    fontWeight: 500,
  },
  description: {
    textAlign: 'center',
    position: 'absolute',

    fontSize: 10,
    bottom: 10,
  },
});

export default styles;
