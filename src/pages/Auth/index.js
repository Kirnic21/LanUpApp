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
import dimensions from "~/assets/Dimensions/index";
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
      const user = await loginWithFacebook(data.accessToken);
      const token = user.result.accessToken.token;
      await AsyncStorage.setItem("API_TOKEN", token);
      if (user) {
        const { path, user: userData } = user.result.isRegistered
          ? { path: "UserProfile", user }
          : {
              path: "RegisterStageOne",
              user: {
                ...user,
                isFacebook: true,
                facebookToken: data.accessToken
              }
            };

        this.props.navigation.navigate(path, { user: userData });
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
            <View style={{ alignItems: "center", top: "-15%" }}>
              <Image
                source={Logo}
                style={{ width: dimensions(215), height: dimensions(90) }}
              />
            </View>

            <View
              style={{
                alignItems: "flex-start",
                top: "-7%",
                marginLeft: "4%"
              }}
            >
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
                fontSize: dimensions(14),
                marginVertical: "-1%",
                fontFamily: "HelveticaNowMicro-Medium"
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
                fontSize: dimensions(12),
                fontFamily: "HelveticaNowMicro-Regular"
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
    fontSize: dimensions(20),
    fontFamily: "HelveticaNowMicro-Bold"
  },
  subTitle: {
    color: "#FFF",
    fontSize: dimensions(15),
    fontFamily: "HelveticaNowMicro-Bold"
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
    height: dimensions(45)
  }
});

export default HomePage;
