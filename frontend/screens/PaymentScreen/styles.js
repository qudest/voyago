import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: "#FCFCFF",
    justifyContent: 'space-around',
  },
  paymentContainer: {
    width: 320,
    height: 347,
    borderWidth: 2,
    borderColor: "#3E3C80",
    borderRadius: 22,
    overflow: 'hidden',  
  },
  nextDebitTitle: {
    marginTop: 20,
    textAlign: 'center',
    width: 270,
    fontSize: 19,
    fontWeight: 500,
    color: "#3E3C80",
  },
  remindTitle: {
    marginTop: 40,
    textAlign: 'center',
    width: 300,
    fontSize: 19,
    fontWeight: 500,
    color: "#606265",
  },
  cardContainer: { 
    width: 316,
    height: 185,
    borderRadius: 20,
    padding: 20,   
    backgroundColor: "#EFF3FF",
    borderBottomWidth: 2,
    borderStartWidth: 2,
    borderEndWidth: 2,
    borderColor: "#3E3C80",
  },
  requisitesTitle: {
    fontSize: 16,
    color: "#3E3C80",
  },
  dateTitle: {
    fontSize: 16,
    color: "#3E3C80",
  },
  cvcCodeTitle: {
    fontSize: 16,
    color: "#3E3C80",
  },
  requisitesInput: {
    marginTop: -4,
    color: '#606265',
    fontSize: 16,
    borderBottomWidth: 1, 
    borderBottomColor: 'black', 
  },
  dateInput: {
    marginTop: -4,
    color: '#606265',
    textAlign: 'left',
    fontSize: 16,
    borderBottomWidth: 1, 
    borderBottomColor: 'black', 
  },
  cvcCodeInput: {
    marginTop: -4,
    color: '#606265',
    textAlign: 'left',
    fontSize: 16,
    borderBottomWidth: 1, 
    borderBottomColor: 'black', 
  },
  requisitesBottom: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  payInformationContainer: {
    paddingBlock: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  payInformationTitle: {
    fontSize: 16,
    color: "#606265",
  },
  shopInformation: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shopTitle: {
    fontSize: 16,
    color: "#606265",
  },
  shopName: {
    fontSize: 16,
    color: "#606265",
  },
  numberInformation: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numberTitle: {
    fontSize: 16,
    color: "#606265",
  },
  number: {
    fontSize: 16,
    color: "#606265",
  },
});

export default styles;