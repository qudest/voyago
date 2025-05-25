import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardsContainer: {
    width: 340,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignSelf: "center",
    marginBottom: 10,
  },
  containerEnable: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 30,

    marginBottom: 10,

    backgroundColor: "#3E3C80",
    borderRadius: 15,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  containerDisable: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 30,

    marginBottom: 10,

    backgroundColor: "#AEAFB2",
    borderRadius: 15,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  titlePreference: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default styles;
