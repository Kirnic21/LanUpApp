import React, { Component } from "react";
import CoreTemplate from "~/shared/components/CoreTemplate";
import InputLabel from "../../shared/components/InputLabel";
// import Button from "../../shared/components/Button";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from "react-native";

class LoginEmailPassword extends Component {

  goToLoginNickName = () => this.props.navigation.navigate('LoginNickName')

  render() {
    return (
      <CoreTemplate>
        <View>
          <InputLabel title={"E-mail"} />
          <InputLabel title={"Senha"} />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={this.goToLoginNickName}>
            <Text style={{ color: "white", fontSize: 13 }}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </CoreTemplate>
    );
  }
}

export default LoginEmailPassword;

const styles = StyleSheet.create({
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
})

