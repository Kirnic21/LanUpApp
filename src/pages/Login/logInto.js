import React, { Component } from "react";
import ImageBack from "./../../assets/images/Grupo_518.png";
import ImageLogo from "./../../assets/images/LanUp_logo2.png";

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

class LogIntoPage extends Component {
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
          <View style={{ paddingHorizontal: 50 }}>
            <View>
              <Text style={{ color: "white" }}>E-mail</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.TextInput}>
                <TextInput
                  style={{ height: 50 }}
                  onChangeText={event => setItemText(index, event, card)}
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
                  onChangeText={event => setItemText(index, event, card)}
                />
              </TouchableOpacity>
            </View>
            <View style={{alignItems: "center"}}>
                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: "white" }}>Continuar</Text>
                </TouchableOpacity>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", paddingHorizontal: 50, alignItems: "center", margin: 45 }}
          >
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
    width: "100%",
    height: "100%"
  },
  logoContainer: {
    alignItems: "center",
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
  TextInput: {
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 50
  },
  button: {
    margin:20,
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

export default LogIntoPage;
