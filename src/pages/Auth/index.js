import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";
import RoundButton from "~/shared/components/RoundButton";
import ImageBack from "../../assets/images/Grupo_518.png";
import Logo from "../../assets/images/logoLanUp.png";
import FBSDK from "react-native-fbsdk";
import AsyncStorage from "@react-native-community/async-storage";
import { loginWithFacebook } from "~/shared/services/auth.http";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions/index";

const { LoginManager, AccessToken } = FBSDK;
class HomePage extends Component {
  goToLoginEmail = () => this.props.navigation.navigate("LoginEmail");

  goRegister = () => this.props.navigation.navigate("RegisterStageOne");

  goToLoginFacebook = () => {
    LoginManager.logOut();
    LoginManager.logInWithPermissions([
      "public_profile",
      "user_birthday",
      "email",
    ]).then(async (result) => {
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
                facebookToken: data.accessToken,
              },
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
                marginLeft: "4%",
              }}
            >
              <Text allowFontScaling={false} style={styles.title}>
                Sua primeira vez aqui?
              </Text>
              <Text style={styles.subTitle}>Cadastre-se com o seu e-mail</Text>
            </View>
          </View>
          <View style={[styles.formContainer, { width, height: "45%" }]}>
            <RoundButton
              width={calcWidth(73)}
              style={[styles.Btn, styles.btnRegister]}
              name="Cadastrar"
              onPress={this.goRegister}
            />
            {/* <Text
              style={{
                color: "#FFF",
                textAlign: "center",
                fontSize: adjust(12),
                fontFamily: "HelveticaNowMicro-Medium",
              }}
            >
              ou
            </Text>
            <RoundButton
              width={calcWidth(73)}
              style={[styles.Btn, styles.btnFacebook]}
              name="Entrar com Facebook"
              onPress={this.goToLoginFacebook}
            /> */}
          </View>
          <View style={{ width, height: "10%" }}>
            <Text
              style={{
                color: "#FFF",
                textAlign: "center",
                fontSize: adjust(10),
                fontFamily: "HelveticaNowMicro-Regular",
              }}
            >
              Já tem uma conta?{" "}
              <Text
                onPress={this.goToLoginEmail}
                style={{ color: "#FFF", textDecorationLine: "underline" }}
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
    justifyContent: "space-between",
  },
  formContainer: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    color: "#FFF",
    fontSize: dimensions(19.5),
    fontFamily: "HelveticaNowMicro-Bold",
  },
  subTitle: {
    color: "#FFF",
    fontSize: dimensions(14),
    fontFamily: "HelveticaNowMicro-Bold",
  },
  btnFacebook: {
    backgroundColor: "#141364",
  },
  btnRegister: {
    marginTop: 25,
    backgroundColor: "#06a2cd",
  },
  Btn: {
    width: calcWidth(40),
    borderColor: "#FFFFFF",
    borderWidth: 1.5,
    borderRadius: 50,
  },
});

export default HomePage;
