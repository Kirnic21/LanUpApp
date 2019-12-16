import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  StatusBar
} from "react-native";
import BackgroundTimer from "react-native-background-timer";
// import Geolocation from '@react-native-community/geolocation';
import RoundButton from "~/shared/components/RoundButton";
import ImageBack from "../../assets/images/Grupo_518.png";
import Logo from "../../assets/images/logoLanUp.png";
import FBSDK from "react-native-fbsdk";
import AsyncStorage from "@react-native-community/async-storage";
import { login, loginWithFacebook } from "~/shared/services/auth.http";
import normalize from "~/assets/FontSize/index";
// import Text from "~/assets/Text/Text";

const { LoginManager, AccessToken } = FBSDK;
// BackgroundTimer.runBackgroundTimer(() => {
//   Geolocation.getCurrentPosition((position) => {
//     console.log(new Date(), position);
//   });
// }, 30000);

class HomePage extends Component {
  async componentDidMount() {
    const token = await AsyncStorage.getItem("API_TOKEN");
    if (token !== null) {
      this.props.navigation.navigate("UserProfile");
    }
  }

  goToLoginEmail = () => this.props.navigation.navigate("LoginEmail");

  goRegister = () => this.props.navigation.navigate("RegisterStageOne");

  goToLoginFacebook = () => {
    LoginManager.logOut();
    LoginManager.logInWithPermissions([
      "public_profile",
      "user_birthday",
      "email"
    ]).then(async result => {
      if (result.isCancelled) return;
      const data = await AccessToken.getCurrentAccessToken();
      const user = await loginWithFacebook(data);
      if (user) {
        if (user.registered)
          this.props.navigation.navigate("UserProfile", { user });

        user.isFacebook = true;
        this.props.navigation.navigate("RegisterStageOne", { user });
      }
    });
  };

  render() {
    const { width, height } = Dimensions.get("screen");
    return (
      <ImageBackground
        source={ImageBack}
        style={{ width, height: "100%", flexGrow: 1 }}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.container}>
          <View
            style={{ width: "80%", height: "50%", justifyContent: "flex-end" }}
          >
            <View style={{ alignItems: "center", top: "10%" }}>
              <Image source={Logo} style={{ width: "90%", height: "50%" }} />
            </View>

            <View style={{ alignItems: "center", top: "-7%" }}>
              <Text allowFontScaling={false} style={styles.title}>
                Sua primeira vez aqui?
              </Text>
              <Text style={styles.subTitle}>Cadastre-se com o seu e-mail</Text>
            </View>
          </View>
          <View style={{ width, height: "45%" }}>
            <RoundButton
              style={[styles.Btn, styles.btnRegister]}
              name="Cadastrar"
              onPress={this.goRegister}
            />
            <Text
              style={{
                color: "#FFF",
                textAlign: "center",
                fontSize: normalize(14)
              }}
            >
              ou
            </Text>
            <RoundButton
              style={[styles.Btn, styles.btnFacebook]}
              name="Entrar com Facebook"
              onPress={this.goToLoginFacebook}
            />
          </View>
          <View style={{ width, height: "10%" }}>
            <Text
              style={{
                color: "#FFF",
                textAlign: "center",
                fontSize: normalize(15)
              }}
            >
              Já tem uma conta?{" "}
              <Text
                onPress={this.goToLoginEmail}
                style={{ color: "#483D8B", textDecorationLine: "underline" }}
              >
                Entrar
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    color: "#FFF",
    fontSize: normalize(25),
    fontWeight: "700"
  },
  subTitle: {
    color: "#FFF",
    fontSize: normalize(18.5),
    letterSpacing: 0.5,
    fontWeight: "700",
    fontFamily: "Helvetica Now Micro"
  },
  btnFacebook: {
    backgroundColor: "#141364"
  },
  btnRegister: {
    backgroundColor: "#06a2cd"
  },
  Btn: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 50,
    height: 55
  }
});

export default HomePage;
