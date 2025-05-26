import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FF",
  },
  container: {
    flex: 1,
  },

  fixedTopSection: {
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "ios" ? 0 : 10,
  },
  topContentContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  createTitle: {
    fontSize: 19,
    fontWeight: "600",
    marginBottom: 15,
    marginTop: 10,
    color: "#333",
  },
  inputTitle: {
    marginTop: 10,
    width: "80%",
    textAlign: "left",
    color: "#333",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#B0B0B0",
    paddingBottom: 8,
    paddingHorizontal: 5,
  },

  scrollableSection: {
    flex: 1,
  },
  scrollableContentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    alignItems: "center",
  },
  pointsListContainer: {
    width: "100%",
    alignItems: "center",
  },
  warningText: {
    color: "#606265",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 15,
    textAlign: "center",
  },

  fixedBottomSection: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    borderTopColor: "#E0E0E0",
  },
});

export default styles;
