import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,

    backgroundColor: "#F5F7FF",
    backgroundImage:
      "linear-gradient(135deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%, #FFFFFF), linear-gradient(135deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%, #FFFFFF)",
    backgroundSize: "40px 40px",
    backgroundPosition: "0 0, 20px 20px",
  },
  containerTitle: {
    top: 20,
    fontSize: 23,
    fontWeight: 500,
    color: "#3E3C80",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    top: 45,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginRight: 20,

    width: 259,
    height: 40,

    backgroundColor: "#EFF3FF",

    borderRadius: 22,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  searchIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    height: "100%",
    fontSize: 16,
  },
  settingsContainer: {
    alignItems: "center",
    justifyContent: "center",

    width: 74,
    height: 40,

    backgroundColor: "#EFF3FF",

    borderRadius: 22,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    width: "90%",
    top: 65,
  },

  noResults: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "70%",
    fontSize: 23,
    fontWeight: 500,
    color: "#3E3C80",
  },
  errorText: {
    color: "#3E3C80",
    fontSize: 23,
    fontWeight: 500,
    textAlign: "center",
  },
});

export default styles;
