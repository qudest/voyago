import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FF",
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FF",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },

  fixedTopSection: {
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "ios" ? 0 : 10,
  },
  titleInputContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  inputRouteName: {
    width: "90%",
    textAlign: "left",
    color: "#333",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#B0B0B0",
    paddingBottom: 8,
    paddingHorizontal: 5,
    borderRadius: 5,
  },

  scrollableSection: {
    marginTop: 20,
    alignItems: "center",
    flex: 1,
  },
  scrollableContentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
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
  },
  actionsContainer: {
    width: "100%",
    marginTop: 10,
  },
});

export default styles;
