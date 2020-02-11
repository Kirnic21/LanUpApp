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
  containerButton: {
    flex: 0.3,
    borderWidth: dimensions(2),
    borderColor: "#FFF"
  },
  buttonCheckin: {
    backgroundColor: "#46C5F3"
  },
  circleCheckin: {
    backgroundColor: "#46c5f35d"
  },
  buttonCheckout: {
    backgroundColor: "#865FC0"
  },
  circleCheckout: {
    backgroundColor: "#865fc069"
  },
  buttonOccurrence: {
    backgroundColor: "#FFB72B"
  },
  circleOccurence: {
    backgroundColor: "#ffb82b80"
  },
  buttonWithoutEvent: {
    backgroundColor: "#4F4D65"
  },
  circleWithoutEvent: {
    backgroundColor: "#70707059"
  },
  heightWidth: {
    height: dimensions(130),
    width: dimensions(130)
  },
  ButtonHeightWidth: {
    top: "-50%",
    height: dimensions(70),
    width: dimensions(70)
  },
  ButtonPulseLeft: {
    backgroundColor: "#46C5F3",
    borderColor: "#46c5f35d",
    borderWidth: 2
  },
  textButtonPulse: {
    color: "#FFF",
    fontFamily: "HelveticaNowMicro-Regular",
    textAlign: "center",
    fontSize: dimensions(18),
    lineHeight: dimensions(28)
  },
  containerGroupButton: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    top: calcHeight(-4),
    width: "100%"
  },
  buttonSmall: {
    height: calcWidth(21),
    width: calcWidth(21)
  },
  containerBtn: {
    height: calcHeight(60),
    marginTop: calcHeight(6),
    alignItems: "center"
  },
  btn: {
    borderColor: "#FFF",
    borderWidth: 2,
    height: dimensions(45),
    width: dimensions(200),
    borderRadius: dimensions(45),
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;
