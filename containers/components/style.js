import { StatusBar, StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  // MAIN
  container: {
    backgroundColor: "#F14F55",
    flex: 1
  },
  wrapper: {
    width: Dimensions.get("window").width - 80,
    marginHorizontal: 40,
    justifyContent: "center"
  },
  input: {
    width: Dimensions.get("window").width - 80
  },
  button: {
    height: 65,
    width: 190,
    borderRadius: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  txtPink: {
    color: "#F14F55",
    fontSize: 16
  },
  txtWhite: {
    color: "white",
    fontSize: 16
  },
  under: {
    paddingBottom: 15,
    borderBottomColor: "white",
    borderBottomWidth: 1
  },
  txtBox: {
    borderColor: "white",
    borderWidth: 1,
    width: 318,
    height: 117
  },

  // HOMESCREEN
  home: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight
  },
  rooms: {
    width: Dimensions.get("window").width,
    alignItems: "center"
  },

  //   CARDS
  card: {
    paddingBottom: 20,
    marginBottom: 21,
    borderBottomColor: "#BBBBBB",
    borderBottomWidth: 1
  },
  picture: {
    width: Dimensions.get("window").width - 40,
    height: 215
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  price: {
    fontSize: 18,
    lineHeight: 45,
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.8)",
    width: 70,
    height: 45,
    position: "absolute",
    top: 160
  },
  overview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  reviews: { marginLeft: 18, fontSize: 17, color: "#BBBBBB" },

  //   ROOM
  room: { width: Dimensions.get("window").width - 40, marginHorizontal: 20 },
  roomPic: {
    width: Dimensions.get("window").width,
    height: 244
  },
  roomPrice: {
    fontSize: 18,
    lineHeight: 45,
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.8)",
    width: 70,
    height: 45,
    position: "absolute",
    top: 190
  },
  roomDesc: {
    fontSize: 16,
    marginTop: 36
  },
  map: {
    width: Dimensions.get("window").width - 40,
    paddingHorizontal: 20,
    height: 150,
    marginTop: 35
  }
});

export default styles;
