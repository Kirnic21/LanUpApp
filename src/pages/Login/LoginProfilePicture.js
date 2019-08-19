import React, { Component } from "react";
import ImageBack from "./../../assets/images/Grupo_518.png";
import ImageNickname from "./../../assets/images/Grupo_529.png";
import ImageProfile from "./../../assets/images/Grupo_528.png";

import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  TextInput
} from "react-native";

class LoginProfilePicture extends Component {
  state = {
    selected: false
  };

  SelectedInput = () => {
    debugger;
    if (event.selected) {
    }
  };

  goToLoginCropProfilePhoto = () => this.props.navigation.navigate('LoginCropProfilePhoto') 

  render() {
    return (
      <View style={styles.logoContainer}>
        <ImageBackground
          source={ImageBack}
          style={styles.ImageBackgroundContainer}
        >
          <View style={styles.logoNickName}>
            <ImageBackground
              source={ImageNickname}
              style={styles.ImageBackgroundNickName}
            >
              <View style={{margin:30, width:300, marginHorizontal:10}}>
                <Text style={{ color: "white", fontSize:36 }}>Kaori</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ paddingHorizontal: 50 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20}}>Adicionar foto de perfil</Text>
            </View>
            <View style={{ alignItems: "center", margin:5}}>
                <Image source={ImageProfile} style={{ width: 110, height: 110 }} />
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.goToLoginCropProfilePhoto} 
              >
                <Text style={{ color: "white" }}>Tirar foto</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  ImageBackgroundContainer: {
    width: "100%",
    height: "100%"
  },
  ImageBackgroundNickName: {
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
  buttonContent: {
    flexDirection: "row",
    width: 280,
    margin: 20
  },
  TextInput: {
    borderColor: "white",
    borderWidth: 1.8,
    borderRadius: 50
  },
  TextInputSelected: {
    borderColor: "#F13567",
    borderWidth: 1.8,
    borderRadius: 50,
    height: 56
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

export default LoginProfilePicture;
