import dimensions, { calcHeight, calcWidth } from "~/assets/Dimensions/index";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  containerTitle: {
    height: calcHeight(35),
    alignItems: "center",
    justifyContent: "center",
    top: calcHeight(4)
  },
  containerCircle: {
    justifyContent: "center",
    alignItems: "center",
    height: calcHeight(45)
  },
  borderCircle: {
    width: calcWidth(75),
    height: calcWidth(75),
    borderWidth: dimensions(30),
    borderColor: "#373361",
    borderRadius: dimensions(250),
    justifyContent: "center"
  },
  textTitle: {
    fontSize: calcWidth(9),
    fontFamily: "HelveticaNowMicro-Medium",
    top: "12%",
    left: "-0.3%",
    color: "#FFF"
  },
  TextsubTitle: {
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: calcWidth(6),
    color: "#FFB72B"
  },

  containerButtonPulse: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    height: "35%",
    position: "absolute",
    top: "85%"
  },
  containerGroupButton: {
    flexDirection: "row",
    width: calcWidth(78),
    justifyContent: "space-between",
    position: "absolute"
  },
  textBtnPulse: {
    textAlign: "center",
    lineHeight: calcWidth(7)
  },
  btn: {
    borderColor: "#FFFFFF",
    borderWidth: 2,
    padding: calcWidth(4),
    alignItems: "center",
    width: calcWidth(50),
    borderRadius: calcWidth(10)
  }
});

export default styles;
