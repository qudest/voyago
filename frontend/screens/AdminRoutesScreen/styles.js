import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F7FF",
  },
  list: {
    marginTop: 70,
  },
  emptyContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 300,
    backgroundColor: "#F5F7FF",
  },
  emptyText: {
    textAlign: "center",
    color: "#3E3C80",
    fontSize: 23,
    fontWeight: 500,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    top: 55,
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
    height: "100%",
    fontSize: 23,
    fontWeight: 500,
    color: "#F5F7FF",
  },
  loader: {
    flex: 1,
    backgroundColor: "#F5F7FF",
  },
});

export default styles;
