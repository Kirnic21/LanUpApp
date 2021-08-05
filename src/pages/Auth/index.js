import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import RoundButton from "~/shared/components/RoundButton";
import ImageBack from "../../assets/images/Grupo_518.png";
import Logo from "../../assets/images/logoLanUp.png";
import imgTerms from "../../assets/images/terms-and-conditions.png";
// import FBSDK from "react-native-fbsdk";
// import AsyncStorage from "@react-native-community/async-storage";
// import { loginWithFacebook } from "~/shared/services/auth.http";
import dimensions, {
  calcWidth,
  adjust,
  calcHeight,
} from "~/assets/Dimensions/index";

import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialIcons";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";

// const { LoginManager, AccessToken } = FBSDK;

const file = "terms/termos-e-condicoes.pdf";
const dest = `${RNFS.DocumentDirectoryPath}/termos-e-condições-lanup.pdf`;

const HomePage = ({ navigation }) => {
  const [terms, setTerms] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const { width, height } = Dimensions.get("screen");

  const goRegister = useCallback(() => {
    setVisibleModal(false);
    navigation.navigate("RegisterStageOne");
  }, [setVisibleModal, navigation]);

  openTerms = () => {
    RNFS.copyFileAssets(file, dest)
      .then(() => FileViewer.open(dest))
      .catch((error) => {
        AlertHelper.show("error", "Erro", error.response.data.errorMessage);
      });
  };

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
            style={[styles.Btn, styles.btnRegister]}
            name="Criar conta"
            onPress={() => setVisibleModal(true)}
          />
          <Text
            style={{
              color: "#FFF",
              textAlign: "center",
              fontSize: adjust(12),
              marginBottom: "-3%",
              fontFamily: "HelveticaNowMicro-Medium",
            }}
          >
            Já tem uma conta?
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
                style={{ color: "#483D8B", textDecorationLine: "underline" }}
              >
                Entrar
              </Text>
            </Text>
          </View> */}
      </View>

      <Modal
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={500}
        animationOutTiming={500}
        backdropOpacity={0.6}
        deviceHeight={Dimensions.get("screen").height}
        isVisible={visibleModal}
      >
        <View style={styles.content}>
          <View style={{ position: "absolute", right: "6%", top: "5%" }}>
            <TouchableOpacity onPress={() => setVisibleModal(false)}>
              <Icon name={"close"} size={calcWidth(12)} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Image
            source={imgTerms}
            style={{ width: calcWidth(20), height: calcHeight(10) }}
          />
          <View style={{ alignItems: "center", marginTop: "10%" }}>
            <Text style={styles.title}>Termos e Condições</Text>
            <Text
              style={[
                styles.subTitle,
                {
                  fontFamily: "HelveticaNowMicro-Regular",
                  textAlign: "center",
                  marginTop: "5%",
                  lineHeight: calcWidth(5),
                },
              ]}
            >
              Por favor, leia e aceite os Termos e Condições para continua.
            </Text>
            <View style={styles.containerCheckbox}>
              <TouchableOpacity onPress={() => setTerms((prev) => !prev)}>
                <Icon
                  name={terms ? "check-box" : "check-box-outline-blank"}
                  size={calcWidth(8)}
                  color="#46C5F3"
                />
              </TouchableOpacity>
              <Text
                onPress={() => setTerms((prev) => !prev)}
                style={styles.titleCheckbox}
              >
                Declaro que li e concordo com os termos.
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <RoundButton
                width={calcWidth(35)}
                style={[styles.Btn, styles.btnRegister]}
                name="Ver Termos"
                onPress={() => openTerms()}
              />
              <RoundButton
                width={calcWidth(35)}
                style={[styles.Btn, styles.btnFacebook]}
                name="Continuar"
                disabled={!terms}
                onPress={() => goRegister()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: "10%",
    paddingTop: "25%",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.1)",
    flex: 0.6,
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
  },
});

export default HomePage;
