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

    height: 650,
  },
  imageLogoName: {

  },
  textNumber: {
    marginTop: 100,
    fontSize: 19,
  },
  inputNumber: {
    textAlign: 'center',

    marginTop: 50,
    marginBottom: 0,

    width: 256,

    borderBottomWidth: 1,
    borderBottomColor: 'black', 
    paddingBottom: 8,

    fontSize: 16,
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
  loginTextClickable: {
    alignSelf: 'center',
    color: '#FFFFFF',
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
