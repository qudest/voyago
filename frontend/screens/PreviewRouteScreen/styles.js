import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    backgroundImage:
      "linear-gradient(135deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%, #FFFFFF), linear-gradient(135deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%, #FFFFFF)",
    backgroundSize: "40px 40px",
    backgroundPosition: "0 0, 20px 20px",
    position: "relative",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: "relative",
  },
  headerContainer: {
    marginTop: 25,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  locationImage: {
    width: 29,
    height: 29,
    marginRight: 5,
  },
  location: {
    fontSize: 16,
    fontWeight: "400",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    borderRadius: 22,
    padding: 15,
    backgroundColor: "#EFF3FF",

    marginBottom: 20,
  },
  mapContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  contentPoints: {},
  pointText: {
    marginVertical: 7,
    fontSize: 16,
  },
  timeDistanceContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontSize: 16,
    fontWeight: "400",
  },
  distance: {
    fontSize: 16,
    fontWeight: "400",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingImage: {
    width: 22,
    height: 21,
    marginRight: 5,
  },
  rating: {
    fontSize: 16,
    fontWeight: "400",
  },
  timeImage: {
    width: 24,
    height: 26,
    marginRight: 5,
    marginBottom: 2,
  },
  footer: {
    marginTop: 40,
    bottom: 50,
    zIndex: 10,
  },
  chooseButton: {
    width: "100%",
    height: 50,
  },
});

export default styles;
