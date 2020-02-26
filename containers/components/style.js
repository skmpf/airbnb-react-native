import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // MAIN
  container: {
    backgroundColor: "#F14F55",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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

  //   CARDS
  card: {
    width: 330,
    paddingBottom: 20,
    marginBottom: 21,
    borderBottomColor: "#BBBBBB",
    borderBottomWidth: 1
  },
  picture: {
    width: 330,
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
    backgroundColor: "black",
    width: 70,
    height: 45,
    position: "absolute",
    bottom: 110
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
  reviews: { marginLeft: 18, fontSize: 17, color: "#BBBBBB" }
});

export default styles;
