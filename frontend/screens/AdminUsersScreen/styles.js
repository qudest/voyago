import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F7FF",
    backgroundImage:
      "linear-gradient(135deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%, #FFFFFF), linear-gradient(135deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%, #FFFFFF)",
    backgroundSize: "40px 40px",
    backgroundPosition: "0 0, 20px 20px",
    height: "100%",
  },
  list: {
    marginTop: 70,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 300,
    height: "100%",
  },
  emptyText: {
    textAlign: "center",
    color: "#3E3C80",
    fontSize: 23,
    fontWeight: 500,
  },
});

export default styles;
