import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    backgroundImage:
      "linear-gradient(135deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%, #FFFFFF), linear-gradient(135deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%, #FFFFFF)",
    backgroundSize: "40px 40px",
    backgroundPosition: "0 0, 20px 20px",
    justifyContent: "space-between",
    paddingVertical: 20,
  },

  header: {
    marginTop: 20,
    alignItems: "center",
  },

  chooseTitle: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "500",
    color: "#3E3C80",
    maxWidth: 280,
  },

  preferenceContainer: {
    flex: 1,
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    paddingHorizontal: 20,
  },
});
export default styles;
