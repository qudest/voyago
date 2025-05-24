import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    marginTop: 5,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    overflow: "hidden", // важно для корректного отображения закругленных углов
    width: 290,
    height: 50,
  },
  text: {
    textAlign: "center",
    lineHeight: 42,
    fontSize: 19,
    fontWeight: 400,
    color: "#FFFFFF",
  },
});

export default styles;
