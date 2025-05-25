import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    backgroundImage:
      "linear-gradient(135deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%, #FFFFFF), linear-gradient(135deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%, #FFFFFF)",
    backgroundSize: "40px 40px",
    backgroundPosition: "0 0, 20px 20px",
    justifyContent: "space-around",
    alignItems: "center",
  },
  pointsContainer: {
    width: "100%",
    marginTop: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  topContainer: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  createTitle: {
    fontSize: 19,
    fontWeight: 500,
    marginBottom: 4,
  },
  inputTitle: {
    marginTop: 5,
    fontSize: 19,
  },
  createDiscription: {
    fontSize: 19,
    fontWeight: 400,
    marginBottom: 16,
  },
  warningText: {
    color: "#3E3C80",
    fontSize: 19,
    fontWeight: 400,
  },
});

export default styles;
