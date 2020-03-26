import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar
} from "react-native";
import ImageBack from "../../assets/images/Grupo_518.png";
import ImageProfile from "../../assets/images/icon_profile.png";
import { create } from "../../shared/services/freela.http";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import AsyncStorage from "@react-native-community/async-storage";
import ImageSelector from "~/shared/components/ImageSelector";
import dimensions from "~/assets/Dimensions/index";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import Analytics from "appcenter-analytics";

class SelectAvatar extends Component {
  state = {
    selected: false,
    spinner: false
  };
  onPictureAdd = picture => {
    this.setState({ spinner: true });
    const {
      fullName,
      nickname,
      cpf,
      email,
      password,
      confirmPassword
    } = this.props;
    const CPF = cpf.replace(/[\(\)\.\s-]+/g, "");
    const newFreela = {
      name: fullName,
      nickname,
      cpf: CPF,
      email,
      password,
      confirmPassword,
      avatar: picture.data
    };
    create(newFreela)
      .then(async ({ data }) => {
        if (data.isSuccess) {
          await AsyncStorage.setItem("API_TOKEN", data.result.token);
          this.props.navigation.navigate("UserProfile");
        } else alert(data.result.errorMessage);
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  };

  handleOnPictureAdd = () => {
    this.ImageSelector.ActionSheet.show();
  };

  render() {
    const { nickname } = this.props;
    const { spinner } = this.state;
    return (
      <ImageBackground source={ImageBack} style={styles.ImageBack}>
        <SpinnerComponent loading={spinner} />
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.container}>
          <View style={styles.containerText}>
            <Text style={styles.titleNickname}>{nickname}</Text>
            <Text style={styles.textAdd}>Adicionar foto de perfil</Text>
          </View>
          <View style={styles.border} />
          <View style={styles.containerImg}>
            <TouchableOpacity
              onPress={() => {
                this.handleOnPictureAdd(),
                  Analytics.trackEvent("Clique na imagem.");
              }}
            >
              <Image
                source={ImageProfile}
                style={{ height: dimensions(100), width: dimensions(100) }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.handleOnPictureAdd(),
                  Analytics.trackEvent("Clique no botão.");
              }}
            >
              <Text style={{ color: "white", fontSize: dimensions(12) }}>
                Tirar Foto
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ImageSelector
          onImageSelected={this.onPictureAdd}
          cropperCircleOverlay={true}
          width={1500}
          height={1500}
          ref={o => (this.ImageSelector = o)}
        />
      </ImageBackground>
    );
  }
}

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  ImageBack: {
    width,
    height
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  containerText: {
    flex: 0.7,
    width: "80%",
    justifyContent: "flex-end"
  },
  titleNickname: {
    color: "#FFF",
    fontSize: dimensions(40),
    fontFamily: "HelveticaNowMicro-Medium",
    left: "7%",
    textAlign: "left",
    top: dimensions(-22)
  },
  textAdd: {
    fontSize: dimensions(20),
    color: "#FFF",
    fontFamily: "HelveticaNowMicro-Regular",
    textAlign: "center"
  },
  border: {
    width: "13%",
    borderBottomColor: "#F2D74C",
    borderBottomWidth: 2,
    top: dimensions(-60),
    left: "-27%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: "35%",
    height: "10%",
    backgroundColor: "#46C5F3",
    borderRadius: 50,
    top: "8%",
    justifyContent: "center",
    alignItems: "center"
  },
  containerImg: {
    flex: 1,

    height,
    width: "100%",
    alignItems: "center",
    top: "5%"
  }
});

const selectorStapOne = formValueSelector("RegisterStageOne");
const selectorStapTwo = formValueSelector("RegisterStageTwo");

export default SelectAvatar = connect(state => {
  const { fullName, nickname, cpf } = selectorStapOne(
    state,
    "fullName",
    "nickname",
    "cpf"
  );

  const { email, password, confirmPassword } = selectorStapTwo(
    state,
    "email",
    "password",
    "confirmPassword"
  );

  return {
    fullName,
    nickname,
    cpf,
    email,
    password,
    confirmPassword
  };
})(SelectAvatar);
