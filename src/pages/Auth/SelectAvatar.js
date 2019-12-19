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
import ImageProfile from "../../assets/images/Grupo_528.png";
import { create } from "../../shared/services/freela.http";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import DropdownAlert from "react-native-dropdownalert";
import AsyncStorage from "@react-native-community/async-storage";
import ImageSelector from "~/shared/components/ImageSelector";

import normalize from "~/assets/FontSize/index";

class SelectAvatar extends Component {
  state = {
    selected: false
  };

  onPictureAdd = picture => {
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
          this.dropDownAlertRef.alertWithType(
            "success",
            "Sucesso",
            "Freela criado com sucesso!"
          );
          await AsyncStorage.setItem("API_TOKEN", data.result.token);
          this.props.navigation.navigate("UserProfile");
        } else alert(data.result.errorMessage);
      })
      .catch(error => {
        this.dropDownAlertRef.alertWithType(
          "error",
          "Erro",
          error.response.data.errorMessage
        );
        console.log(error.response.data);
      });
  };

  handleOnPictureAdd = () => {
    this.ImageSelector.ActionSheet.show();
  };

  render() {
    const { nickname } = this.props;
    return (
      <ImageBackground source={ImageBack} style={styles.ImageBack}>
        <StatusBar translucent backgroundColor="transparent" />
        <View
          style={{
            width: "100%",
            top: "-1%",
            alignItems: "center",
            position: "absolute"
          }}
        >
          <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        </View>
        <View style={styles.container}>
          <View style={styles.containerText}>
            <Text style={styles.titleNickname}>{nickname}</Text>
            <Text style={styles.textAdd}>Adicionar foto de perfil</Text>
          </View>
          <View style={styles.border} />
          <View style={styles.containerImg}>
            <Image source={ImageProfile} style={{ height: 110, width: 110 }} />
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleOnPictureAdd}
            >
              <Text style={{ color: "white", fontSize: normalize(12) }}>
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
    fontSize: normalize(35),
    fontFamily: "Helvetica Now Micro",
    fontWeight: "300",
    left: "7.5%",
    textAlign: "left",
    top: "-10%"
  },
  textAdd: {
    fontSize: normalize(21.5),
    color: "#FFF",
    letterSpacing: 0.8,
    textAlign: "center"
  },
  border: {
    width: "13%",
    borderBottomColor: "#F2D74C",
    borderBottomWidth: 2,
    top: "-9%",
    left: "-27.5%",
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
