import React, { Component } from "react";
import ImageProfile from "./../../assets/images/Grupo_528.png";

import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import CoreTemplate from "~/shared/components/CoreTemplate";
import ImagePicker from 'react-native-image-crop-picker'

class NextEvent extends Component {
  static navigationOptions = {
    title: 'Proximo Evento',
    navigationOptions: {
      headerTintColor: 'white'
    }
  };

  render() {
    return (
      <CoreTemplate name="Kaori">
        <View style={styles.border}>
          <View
            style={{ alignItems: "center", margin: 5 }}>
            <Text style={styles.circle}>1min para fazer Check-in</Text>
          </View>
        </View>
      </CoreTemplate >
    );
  }
}

const { height, width } = Dimensions.get("window");

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
