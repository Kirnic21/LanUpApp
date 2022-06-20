import React from "react";
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
// import FBSDK from "react-native-fbsdk";
// import AsyncStorage from "@react-native-community/async-storage";
// import { loginWithFacebook } from "~/shared/services/auth.http";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions/index";

// const { LoginManager, AccessToken } = FBSDK;

const HomePage = ({ navigation }) => {
  const { width, height } = Dimensions.get("screen");

  // goToLoginFacebook = () => {
  //   LoginManager.logOut();
  //   LoginManager.logInWithPermissions([
  //     "public_profile",
  //     "user_birthday",
  //     "email",
  //   ]).then(async (result) => {
  //     if (result.isCancelled) return;

  //     const data = await AccessToken.getCurrentAccessToken();
  //     const user = await loginWithFacebook(data.accessToken);
  //     const token = user.result.accessToken.token;
  //     await AsyncStorage.setItem("API_TOKEN", token);
  //     if (user) {
  //       const { path, user: userData } = user.result.isRegistered
  //         ? { path: "UserProfile", user }
  //         : {
  //             path: "RegisterStageOne",
  //             user: {
  //               ...user,
  //               isFacebook: true,
  //               facebookToken: data.accessToken,
  //             },
  //           };

  //       this.props.navigation.navigate(path, { user: userData });
  //     }
  //   });
  // };

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
              alignItems: "center",
              top: "-10%",
              // marginLeft: "4%",
            }}
          >
            <Text allowFontScaling={false} style={styles.title}>
              Sua primeira vez aqui?
            </Text>
            <Text style={styles.subTitle}>Cadastre-se com o seu e-mail</Text>
          </View>
        </View>
        <View style={{ width, height: "50%" }}>
          <RoundButton
            width={calcWidth(73)}
            style={[styles.Btn, styles.btnRegister, { marginTop: 25 }]}
            name="Criar conta"
            onPress={() => navigation.navigate("Terms")}
          />
          <Text
            style={{
              color: "#FFF",
              textAlign: "center",
              fontSize: adjust(12),
              // marginBottom: "-3%",
              fontFamily: "HelveticaNowMicro-Medium",
            }}
          >
            {/* Já tem uma conta? */}
          </Text>
          <RoundButton
            width={calcWidth(73)}
            style={[styles.Btn, styles.btnFacebook]}
            name="Entrar"
            onPress={() => navigation.navigate("LoginEmail")}
          />
        </View>
        {/* <View style={{ width, height: "10%" }}>
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
          </View> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: "10%",
    paddingVertical: "20%",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.1)",
    // flex: 0.6,
    backgroundColor: "#23203F",
    position: "relative",
  },
  containerCheckbox: {
    flexDirection: "row",
    marginVertical: "10%",
    alignItems: "center",
    flexDirection: "row",
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleCheckbox: {
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: adjust(13),
    paddingLeft: "4%",
    color: "#FFFFFF",
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
    backgroundColor: "#7541bf",
  },
  btnRegister: {
    backgroundColor: "#06a2cd",
  },
  Btn: {
    width: calcWidth(40),
    borderColor: "#FFFFFF",
    borderWidth: 1.5,
    borderRadius: 50,
    marginHorizontal: "5%",
  },
});

export default HomePage;
