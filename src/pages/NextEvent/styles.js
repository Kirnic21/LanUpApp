import dimensions, {
  calcHeight,
  calcWidth,
  adjust,
} from "~/assets/Dimensions/index";
import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center"
  },
  containerTitle: {
    height: calcHeight(35),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: calcWidth(10),
    ...Platform.select({
      ios: {
        top: calcHeight(3),
      },
      android: {
        top: calcHeight(7),
      },
    }),
  },
  containerCircle: {
    justifyContent: "center",
    alignItems: "center",
    height: calcHeight(30),
  },
  borderCircle: {
    width: calcWidth(75),
    height: calcWidth(75),
    borderWidth: dimensions(30),
    borderColor: "#373361",
    borderRadius: dimensions(250),
    justifyContent: "center",
    
    ...Platform.select({
      ios:{
        top: calcHeight(2),
      },
      android:{
        top: calcHeight(6),
      }
    })
  },
  textTitle: {
    fontSize: adjust(21),
    fontFamily: "HelveticaNowMicro-Medium",
    top: "12%",
    paddingBottom: "7%",
    // paddingTop: "5%",
    // left: "-0.3%",
    color: "#d2d0ff",
  },
  TextsubTitle: {
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: adjust(15),
    color: "#FFB72B",
  },

  TextHirer: {
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: adjust(10),
    color: "#FFFFFF",
  },

  containerButtonPulse: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    height: "35%",
    position: "absolute",
    top: "85%",
  },
  containerGroupButton: {
    flexDirection: "row",
    width: calcWidth(78),
    justifyContent: "space-between",
    position: "absolute",
  },
  textBtnPulse: {
    textAlign: "center",
    lineHeight: calcWidth(7),
  },
  btn: {
    borderColor: "#FFFFFF",
    borderWidth: 2,
    alignItems: "center",
    borderRadius: calcWidth(10),
  },
  containerBtn: {
    top: "12%",
  },
  buttonCenter: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: calcWidth(63),
  },
  buttonLeft: {
    position: "absolute",
    left: 0,
    right: calcWidth(55),
    bottom: 0,
    top: calcWidth(40),
  },
  buttonRight: {
    position: "absolute",
    right: 0,
    left: calcWidth(55),
    bottom: 0,
    top: calcWidth(40),
  },
});

export default styles;
