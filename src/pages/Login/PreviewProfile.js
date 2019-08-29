import React, { Component } from "react";
import Circle from "../../assets/images/circulo.png";
import Girl from "../../assets/images/girlFest.jpg";
// import Down from "../../assets/images/icon_down.png"

import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ImageBackground,
  Text
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class PreviewProfile extends Component {
  render() {
    return (
      <View>
        <ImageBackground
          source={Girl}
          style={styles.ImageBackgroundContainer}
        >
          <View style={{ flexDirection: "row-reverse" }}>
            <ImageBackground style={{ height: 380, width: 380, marginLeft: 100, marginTop: 150 }} source={Circle}>
              <View style={{ marginLeft: 230, marginTop: 40 }}>
                <Text style={{ color: "white", fontSize: 30 }}>Milor</Text>
                <Text style={{ color: '#8979F3', fontSize: 15, marginLeft: -75 }}>Dj, Animador de festa</Text>
                <Text style={{ color: 'white', fontSize: 20, marginLeft: -50, marginTop: 50 }}>12 Trabalhos</Text>
                <Text style={{ color: 'white', fontSize: 20, marginLeft: -58 }}>12 Avaliações</Text>
                <Text style={{ color: 'white', fontSize: 20, marginLeft: -110 }}>12 Recomendações</Text>


              </View>
            </ImageBackground>
          </View>
          {/* <View style={{ marginLeft: 100 }}>
            <Image source={Down} />
          </View> */}
        </ImageBackground>
      </View >
    );
  }
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  Container: {
    alignItems: "center",
    width: width,
    height: height,
    backgroundColor: "#18142F"
  },
  ImageBackgroundContainer: {
    alignItems: "center",
    width: "100%",
    height: "100%"
  }
});

export default PreviewProfile;
