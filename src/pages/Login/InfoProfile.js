import React, { Component } from "react";
import CoreTemplate from "../../shared/components/CoreTemplate"

import {
  StyleSheet,
  View,
  Text
} from "react-native";

class InfoProfile extends Component {

  goToLoginEmailPassword = () => this.props.navigation.navigate('LoginEmailPassword')

  render() {
    return (
      <View>
        <Text>TESTE</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: "row",
    width: 280,
    margin: 20
  },
  buttonFacebook: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141364",
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 50,
    height: 55
  },
  buttonEmail: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 50,
    height: 55
  }
});

export default InfoProfile;
