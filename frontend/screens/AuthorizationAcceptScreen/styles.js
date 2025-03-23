import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#FCFFFF',
    justifyContent: 'space-between', 
    alignItems: 'center', 

    flexGrow: 1, 
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
    textAlign: 'center',

    marginTop:35,
    marginBottom: 0,

    width: 256,

    marginBottom: 0,
    borderBottomWidth: 1, 
    borderBottomColor: 'black', 
    paddingBottom: 8,

    fontSize: 16,
  },
  repeatCodeClickable: {
    marginBottom: 10,
    color: '#606265',
  },
  repeatCodeDisabled: {
    marginBottom: 10,
    color: '#3E3C80',
  },
  loginLinkTextClickable: {
    color: '#606265',
  },
  loginLinkTextClickable: {

    bottom: 70,

    backgroundColor: '#3E3C80',
    borderRadius: 22,

    width: 295,
    height: 44,

    alignSelf: 'center',
    paddingTop: 10,
    shadowColor: '#000BD8', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, 
  },
  disabledButton: {
    backgroundColor: '#CECED1', 
    color: '#3E3C80',
    borderRadius: 22,

    width: 295,
    height: 44,

    alignSelf: 'center',
    paddingTop: 10,
    shadowColor: '#000BD8', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, 
  },
  loginTextClickable: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 500,
  },
  disabledTextClickable: {
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
