import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput
} from "react-native";

class LoginNickName extends Component {

  state = {
    selected: false
  }


  SelectedInput = () => {
    debugger;
    if (event.selected) {

    }
  }

  goToLoginProfilePicture = () => this.props.navigation.navigate('LoginProfilePicture')

  render() {
    return (
      <CoreTemplate>
        <View style={{ paddingHorizontal: 50 }}>
          <View>
            <Text style={{ color: "white" }}>Nome Completo</Text>
          </View>
          <View>
            <TouchableOpacity style={this.state.selected == false ? styles.TextInput : styles.TextInputSelected} onPress={this.SelectedInput}>
              <TextInput
                style={{ height: 56, color: 'white', fontSize: 18, paddingHorizontal: 20 }}
              // onChangeText={event => setItemText(index, event, card)}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text style={{ color: "white" }}>Apelido</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.TextInputSelected}>
              <TextInput
                style={{ height: 56, color: 'white', fontSize: 18, paddingHorizontal: 20 }}
                // onChangeText={event => setItemText(index, event, card)}
                value={'Millor'}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: "#F13567", fontSize: 10, margin: 5 }}>Este Apelido já existe</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.button} onPress={this.goToLoginProfilePicture}>
              <Text style={{ color: "white" }}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CoreTemplate>
    );
  }
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  TextInput: {
    borderColor: "white",
    borderWidth: 1.8,
    borderRadius: 50
  },
  TextInputSelected: {
    borderColor: "#F13567",
    borderWidth: 1.8,
    borderRadius: 50,
    height: 56,
    width: 333
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

export default LoginNickName;
