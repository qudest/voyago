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

    height: 650,
  },
  imageLogoName: {
    width: 165,
    height: 35,
  },
  textNumber: {
    marginTop: 100,

    fontSize: 19,
    fontFamily: 'Roboto-Regular',
    
  },
  inputNumber: {
    marginTop: 50,
    marginBottom: 0,

    width: 256,

    textAlign: 'left',
    color: '#606265',
    fontSize: 16,


    borderBottomWidth: 1, 
    borderBottomColor: 'black', 
    paddingBottom: 8,
  },
  enableContinueButton: {
    bottom: 70,
    alignSelf: 'center',

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
    bottom: 10,

    position: 'absolute',

    textAlign: 'center',
    fontSize: 10,
  },
});

export default styles;
