import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import CoreTemplate from "~/shared/components/CoreTemplate";

class NextEvent extends Component {
  static navigationOptions = {
    title: 'Proximo Evento',
    navigationOptions: {
      headerTintColor: 'white'
    }
  };

  openCheckList = () => {
    this.props.navigation.navigate('CheckList')
  }

  render() {
    return (
      <CoreTemplate name="Kaori">
        <View style={styles.border}>
          <TouchableOpacity onPress={this.openCheckList}
            style={{ alignItems: "center", margin: 5 }}>
            <Text style={styles.circle}>1min para fazer Check-in</Text>
          </TouchableOpacity>
        </View>
      </CoreTemplate >
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    borderWidth: 8,
    borderColor: '#352F4D',
    borderRadius: 80,
    width: 150,
    height: 150,
    backgroundColor: '#656565',
    color: 'white',
    padding: 40,
  },
  border: {
    borderWidth: 25,
    borderRadius: 150,
    width: 280,
    height: 280,
    backgroundColor: 'transparent',
    padding: 32,
    paddingHorizontal: 50,
    borderColor: '#352F4D'
  }
});

export default NextEvent;
