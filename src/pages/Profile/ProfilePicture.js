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

class LoginProfilePicture extends Component {
  state = {
    selected: false
  };

  SelectedInput = () => {
    debugger;
    if (event.selected) {
    }
  };

  goToLoginCropProfilePhoto = () => {
    ImagePicker.openPicker({
      width: 30,
      height: 40,
      cropperCircleOverlay: true,
      cropping: true
    })
      .then(result => this.props.navigation.navigate('LoginPerfil'))
  }

  render() {
    return (
      <CoreTemplate name="Kaori">
        <View style={{ paddingHorizontal: 50 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 15 }}>Adicionar foto de perfil</Text>
          </View>
          <View
            onTouchStart={e => this.props.navigation.navigate('LoginPerfil')}
            style={{ alignItems: "center", margin: 5 }}>
            <Image source={ImageProfile} style={{ width: 110, height: 110 }} />
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.goToLoginCropProfilePhoto}
            >
              <Text style={{ color: "white", fontSize: 13 }}>Adicionar Foto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CoreTemplate>
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
