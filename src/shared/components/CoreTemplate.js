import React, { Fragment } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground
} from 'react-native';
import ImageBack from "./../../assets/images/Grupo_518.png";
import ImageNickname from "./../../assets/images/Grupo_529.png";
import ImageLogo from "./../../assets/images/LanUp_logo2.png";

export default CoreTemplate = props => (
  <View style={styles.logoContainer}>
    <ImageBackground
      source={ImageBack}
      style={styles.ImageBackgroundContainer}
    >
      {props.name && <ImageBackground
        source={ImageNickname}
        style={styles.ImageBackgroundNickName}
      >
        <View style={{ margin: 30, width: 300, marginHorizontal: 10 }}>
          <Text style={{ color: "white", fontSize: 36 }}>Kaori</Text>
        </View>
      </ImageBackground>}


      {!props.name && <View style={styles.logoImage}>
        <Image source={props.logo || ImageLogo} style={{ width: 200, height: 100 }} />
      </View>}
      {props.children}
    </ImageBackground>


  </View>
)


const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  ImageBackgroundNickName: {
    margin: 50,
    width: 100,
    height: 95
  },
  logoContainer: {
    alignItems: "center",
    height: height,
    width: width
  },
  logoNickName: {
    margin: 60
  },
  logoImage: {
    margin: 60
  },
  ImageBackgroundContainer: {
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
});