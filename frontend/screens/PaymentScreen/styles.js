import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: "#FCFCFF",
  },
  paymentContainer: {
    width: 320,
    height: 307,
    borderWidth: 2,
    borderColor: "#3E3C80",
    borderRadius: 22,
  },
  nextDebitTitle: {
    textAlign: 'center',
    marginBottom: 20,
    width: 250,
    fontSize: 19,
    fontWeight: 500,
    color: "#3E3C80",
  },
  remindTitle: {
    textAlign: 'center',
    width: 300,
    fontSize: 19,
    fontWeight: 500,
    color: "#606265",
  },
  cardContainer: {
    width: 320,
    height: 154,
    borderRadius: 22,
    backgroundColor: "#EFF3FF",
    borderBottomWidth: 2,
    borderStartWidth: 2,
    borderEndWidth: 2,
    borderBottomColor: "#3E3C80",
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
  requisitesBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  payInformationTitle: {
    fontSize: 16,
    color: "#606265",
  },
  shopInformation: {
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