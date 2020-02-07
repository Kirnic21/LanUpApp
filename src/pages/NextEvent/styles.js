import dimensions from "~/assets/Dimensions/index";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  containerTitle: {
    width: "100%",
    height: "27%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  containerCircle: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  borderCircle: {
    width: dimensions(250),
    height: dimensions(250),
    borderWidth: dimensions(30),
    borderColor: "#373361",
    borderRadius: dimensions(250) / 2,
    justifyContent: "center"
  },
  textTitle: {
    fontSize: dimensions(30),
    fontFamily: "HelveticaNowMicro-Medium",
    top: "12%",
    left: "-0.3%",
    color: "#FFF"
  },
  TextsubTitle: {
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: dimensions(20),
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
    backgroundColor: "#03DAC6"
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
  }
});

export default styles;
