import React, { Component } from "react";
import CoreTemplate from "~/shared/components/CoreTemplate";

import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  TextInput
} from "react-native";

class LoginEmailPassword extends Component {

  goToLoginNickName = () => this.props.navigation.navigate('LoginNickName')

  SelectedInput = (event) => {
    debugger;
  }

  render() {
    return (

      <CoreTemplate>
        <View>
          <View>
            <Text style={{ color: "white" }}>E-mail</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.TextInput} onPress={(event) => this.SelectedInput(event)}>
              <TextInput
                style={{ height: 50 }}
              // onChangeText={event => setItemText(index, event, card)}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text style={{ color: "white" }}>Senha</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.TextInput}>
              <TextInput
                style={{ height: 50 }}
              // onChangeText={event => setItemText(index, event, card)}
              />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.button} onPress={this.goToLoginNickName}>
              <Text style={{ color: "white" }}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CoreTemplate>
    );
  }
}

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: "row",
    width: 280,
    margin: 20
  },
  TextInput: {
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 50
  },
  TextInputSelected: {
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 50
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

export default LoginEmailPassword;
