import React, { Component } from "react";
import ImageBack from "./../../assets/images/backgroud.png";

import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  Text
} from "react-native";

class LoginPage extends Component {

  render() {
    return (
      <ImageBackground
        source={ImageBack}
        style={{ width: "100%", height: "100%" }}
      >
        <Text>Inside</Text>
      </ImageBackground>
    );
  }
}

export default LoginPage;
