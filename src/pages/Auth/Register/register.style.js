import { StyleSheet, Dimensions } from "react-native";
import dimensions, { adjust } from "~/assets/Dimensions/index";

const styles = StyleSheet.create({
  btnRegister: {
    backgroundColor: "#46C5F3"
  },
  registerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "space-around"
  },
  textTitle: {
    color: "#FFF",
    fontSize: adjust(24),
    lineHeight: dimensions(30),
    fontFamily: "HelveticaNowMicro-Medium"
  },
  textSubtitle: {
    marginTop: "5%",
    marginBottom: "5%",
    color: "#FFF",
    fontSize: adjust(13),
    fontFamily: "HelveticaNowMicro-Medium"
  },
  TextInput: {
    width: "100%",
    height: dimensions(43),
    paddingLeft: "10%",
    fontSize: adjust(12)
  },
  ImageBackground: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height
  }
});

export default styles;
