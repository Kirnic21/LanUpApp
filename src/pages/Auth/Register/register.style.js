import { StyleSheet, Dimensions } from "react-native";
import dimensions from "~/assets/Dimensions/index";

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
  Btn: {
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: dimensions(40)
  },
  textTitle: {
    color: "#FFF",
    fontSize: dimensions(26),
    lineHeight: dimensions(30),
    fontFamily: "HelveticaNowMicro-Medium"
  },
  textSubtitle: {
    marginTop: "5%",
    marginBottom: "5%",
    color: "#FFF",
    fontSize: dimensions(15),
    fontFamily: "HelveticaNowMicro-Medium"
  },
  TextInput: {
    width: "100%",
    height: dimensions(43),
    paddingLeft: "10%",
    fontSize: dimensions(14)
  },
  ImageBackground: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height
  }
});

export default styles;
