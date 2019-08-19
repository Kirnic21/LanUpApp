import React, { Component } from "react";
import ImageBack from "./../../assets/images/Grupo_518.png";
import ImageLogo from "./../../assets/images/LanUp_logo2.png";

import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  Button,
  TouchableOpacity,
  Text
} from "react-native";

class LoginPage extends Component {

  goToLoginEmailPassword = () => this.props.navigation.navigate('LoginEmailPassword') 

  render() {
    return (
      <View style={styles.logoContainer}>
        <ImageBackground
          source={ImageBack}
          style={styles.ImageBackgroundContainer}
        >
          <View style={styles.logoImage}>
            <Image source={ImageLogo} style={{ width: 200, height: 100 }} />
          </View>
          <View style={styles.buttonContent}>
            <TouchableOpacity style={styles.buttonFacebook}>
              <Text style={{ color: "white" }}>Conectar com facebook </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Text style={{ color: "white" }}>ou</Text>
          </View>
          <View style={styles.buttonContent}>
            <TouchableOpacity style={styles.buttonEmail} onPress={this.goToLoginEmailPassword}>
              <Text style={{ color: "white" }}>Conectar com e-mail </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", margin: 50 }}>
            <View>
              <Text style={{ color: "white" }}>Já tem uma conta?</Text>
            </View>
            <View>
              <Text
                style={{ color: "#6A5ACD" }}
                onPress={() => Linking.openURL("#")}
              >
                Entrar
              </Text>
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
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  logoContainer: {
    height: height,
    width: width
  },
  logoImage: {
    margin: 60
  },
  buttonContent: {
    flexDirection: "row",
    width: 280,
    margin: 20
  },
  buttonFacebook: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141364",
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 50,
    height: 55
  },
  buttonEmail: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 50,
    height: 55
  }
});

export default LoginPage;
