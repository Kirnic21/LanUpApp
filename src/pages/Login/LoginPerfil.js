import React, { Component } from "react";
import ImageBack from "./../../assets/images/Grupo_518.png";
import ImageNickname from "./../../assets/images/Grupo_529.png";
import ImageProfile from "./../../assets/images/backgroud.png";

import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  Divider
} from "react-native";

class LoginPerfil extends Component {
  state = {
    selected: false
  };

  SelectedInput = () => {
    debugger;
    if (event.selected) {
    }
  };

  render() {
    return (
      <View style={styles.Container}>
        <View style={{ alignItems: "center", marginTop: '25%' }}>
          <Image source={ImageProfile} style={styles.TextInput} />
        </View>
        <Text style={styles.submitText}>Pré-visualizar o perfil</Text>
        <View style={styles.list}>
          <View style={styles.item}>
            <Text style={{ color: 'white', fontSize: 18 }}>
              Sobre mim
            </Text>
            <Text style={{ color: 'gray', fontSize: 15, marginTop: 7 }}>
              Sua foto de perfil, apresentação e mais
            </Text>
            <Divider style={{ backgroundColor: 'white' }} />
          </View>
        </View>
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
  Container: {
    alignItems: "center",
    height: height,
    width: width,
    backgroundColor: "#18142F"
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
    borderRadius: 50,
    width: 110,
    height: 110
  },
  TextInputSelected: {
    borderColor: "#F13567",
    borderWidth: 1.8,
    borderRadius: 50,
    height: 60
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
  },
  submitText: {
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#46C5F3',
    textAlign: 'center',
    backgroundColor: '#24203B',
    borderRadius: 20,
    fontSize: 18,
    width: '70%'
  },
  list: {
    marginTop: 20,
    backgroundColor: '#24203B',
    height: '50%',
    width: '90%',
    borderRadius: 20,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});

export default LoginPerfil;
