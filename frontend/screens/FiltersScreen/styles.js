import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,

    backgroundColor: "#F5F7FF",
    backgroundImage:
      "linear-gradient(135deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%, #FFFFFF), linear-gradient(135deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%, #FFFFFF)",
    backgroundSize: "40px 40px",
    backgroundPosition: "0 0, 20px 20px",
  },
  filtersContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  filtersTitle: {
    marginTop: 25,

    fontSize: 16,
    fontWeight: 500,
  },
  filtersPlaceContainer: {
    width: "100%",
    marginTop: 30,

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
  filtersDurationContainer: {
    flex: 1,
    width: "100%",
    height: 240,
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
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tag: {
    padding: 16,
    fontSize: 16,
  },
  tagLevel: {
    padding: 16,
    marginLeft: 20,
  },
  functionalImage: {
    width: 20,
    height: 20,
  },
  durationTitleContainer: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  durationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  durationTitle: {
    fontSize: 16,
    fontWeight: 500,
  },
  duration: {
    padding: 16,
  },
});

export default styles;
