import { StyleSheet, Dimensions } from "react-native";

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
    height: 50
  },
  textTitle: {
    color: "#FFF",
    fontSize: 36,
    fontFamily: "Helvetica Now Micro",
    fontWeight: "600",
    top: "5%"
  },
  textSubtitle: {
    marginTop: "5%",
    marginBottom: "5%",
    color: "#FFF",
    fontSize: 22,
    fontFamily: "Helvetica Now Micro",
    fontWeight: "500"
  },
  TextInput: {
    width: "100%",
    height: 51,
    paddingLeft: "10%",
    fontSize: 15
  }
});

export default styles;
