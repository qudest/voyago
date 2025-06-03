import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F5F7FF",
    backgroundImage:
      "linear-gradient(135deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%, #FFFFFF), linear-gradient(135deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%, #FFFFFF)",
    backgroundSize: "40px 40px",
    backgroundPosition: "0 0, 20px 20px",
    justifyContent: "space-around",
    alignItems: "stretch",
  },
  titleContainer: {
    marginTop: 20,
  },
  titlePremium: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: 600,
    color: "#3E3C80",
  },
  descriptionPremium: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 19,
    fontWeight: 500,
    color: "#3E3C80",
  },
  nameOfRoute: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 50,
  },
  mapContainer: {
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  infoContainer: {
    borderRadius: 22,
    padding: 15,
    width: 310,
    marginTop: 30,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  contentPoints: {
    borderRadius: 22,
    padding: 15,
    fontSize: 16,
    fontWeight: 500,
  },
  pointText: {
    marginVertical: 7,
    fontSize: 16,
  },
  timeDistanceContainer: {
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
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  chooseButton: {
    marginBottom: 40,
    justifyContent: "center",
  },
});

export default styles;
