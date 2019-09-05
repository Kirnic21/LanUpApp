import React, { Component } from "react";
import Box from "../../shared/components/Box"
import ImagePicture from "./../../assets/images/Grupo_586.png"
import ImageOutline from "./../../assets/images/outline.png"

import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  ScrollView
} from "react-native";

class Midia extends Component {
  state = {
    selected: false
  };

  SelectedInput = () => {
    if (event.selected) {
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: "90%",
          backgroundColor: "#18142F",
          marginLeft: "5%",
          marginRight: "10%"
        }}
      />
    );
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.Container}>
        <View style={{ marginTop: '25%', margin: 20 }}>
          <Box icon={ImagePicture} />
        </View>
        <Text style={{ color: 'white', fontSize: 15, textAlign: "center", marginTop: 20 }}>
          Não temos nenhuma
        </Text>
        <Text style={{ color: 'white', fontSize: 15, textAlign: "center" }}>
          mídia para mostrar
        </Text>
        <View style={{ marginHorizontal: 105, marginTop: 20 }}>
          <Image source={ImageOutline} style={{ height: 150, width: 150 }} />
        </View>
        <View>
          <Text style={{ color: 'gray', fontSize: 13, textAlign: "center", marginTop: 20 }}>
            Adicione as suas fotos
        </Text>
          <Text style={{ color: 'gray', fontSize: 13, textAlign: "center", marginTop: 5 }}>
            e divulgue seu trabalho
        </Text>
        </View>
      </ScrollView>
    );
  }
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  Container: {
    width: width,
    height: height,
    backgroundColor: "#18142F"
  }
});

export default Midia;