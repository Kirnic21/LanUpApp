import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import ImageBack from "../../assets/images/Grupo_518.png";

import ImageProfile from "../../assets/images/Grupo_528.png";

import { create } from "../../shared/services/freela.http";

import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import DropdownAlert from "react-native-dropdownalert";
import AsyncStorage from "@react-native-community/async-storage";
import ImageSelector from "~/shared/components/ImageSelector";

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
    const newFreela = {
      name: fullName,
      nickname,
      cpf,
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
      <ImageBackground
        source={ImageBack}
        style={{
          width: Dimensions.get("window").width,
          flex: 1
        }}
      >
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
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 0.7,
              width: "80%",
              justifyContent: "flex-end"
            }}
          >
            <Text
              style={{
                color: "#FFF",
                fontSize: 39,
                fontFamily: "Helvetica Now Micro",
                fontWeight: "300",
                left: "7.5%",
                textAlign: "left",

                top: "-10%"
              }}
            >
              {nickname}
            </Text>
            <Text
              style={{
                fontSize: 24,
                color: "#FFF",
                letterSpacing: 0.8,
                textAlign: "center"
              }}
            >
              Adicionar foto de perfil
            </Text>
          </View>
          <View
            style={{
              width: "15%",
              height: 1,
              borderBottomColor: "#F2D74C",
              borderBottomWidth: 3,
              top: "-8%",
              left: "-25.5%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          />
          <View
            style={{
              flex: 1,
              width: Dimensions.get("window").width - 100,
              alignItems: "center",
              top: "5%"
            }}
          >
            <Image source={ImageProfile} style={{ height: 130, width: 130 }} />
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleOnPictureAdd}
            >
              <Text style={{ color: "white", fontSize: 14 }}>Tirar Foto</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ImageSelector
          onImageSelected={this.onPictureAdd}
          width={1280}
          height={720}
          ref={o => (this.ImageSelector = o)}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 50,
    backgroundColor: "#46C5F3",
    borderRadius: 50,
    top: "8%",
    justifyContent: "center",
    alignItems: "center"
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
