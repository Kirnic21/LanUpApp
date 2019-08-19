import React, { Component } from "react";
import ImageBack from "./../../assets/images/Grupo_518.png";
import ImageNickname from "./../../assets/images/Grupo_529.png";
import ImageProfile from "./../../assets/images/Grupo_528.png";

import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Text
} from "react-native";

class LoginCropProfilePhoto extends Component {
  state = {
    selected: false
  };

  SelectedInput = () => {
    debugger;
    if (event.selected) {
    }
  };

  render() {
    return (
      <View style={styles.Container}>
        
      </View>
    );
  }
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  ImageBackgroundContainer: {
    width: "100%",
    height: "100%"
  },
  ImageBackgroundNickName: {
    width: 100,
    height: 95
  },
  Container: {
    alignItems: "center",
    height: height,
    width: width,
    backgroundColor: "#2B274D" 
  },
  logoNickName: {
    margin: 60
  },
  buttonContent: {
    flexDirection: "row",
    width: 280,
    margin: 20
  },
  TextInput: {
    borderColor: "white",
    borderWidth: 1.8,
    borderRadius: 50
  },
  TextInputSelected: {
    borderColor: "#F13567",
    borderWidth: 1.8,
    borderRadius: 50,
    height: 56
  },
  button: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#483D8B",
    borderColor: "#483D8B",
    borderWidth: 1.5,
    borderRadius: 50,
    height: 55,
    width: 150
  }
});

export default LoginCropProfilePhoto;
