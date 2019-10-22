import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar,
  Image
} from "react-native";
import RoundButton from "~/shared/components/RoundButton";
import ImageBack from "~/assets/images/Grupo_518.png";
import InputField from "~/shared/components/InputField";
import styles from "./register.style";
import Logo from "../../../assets/images/logoLanUp.png";
import { changePassword } from "~/shared/services/auth.http";

import { Field, reduxForm } from "redux-form";
import FormValidator from "~/shared/services/validator";
import AsyncStorage from "@react-native-community/async-storage";

const stylePage = {
  ...styles,
  icon: {
    left: "62%",
    top: "-18.2%",
    position: "relative"
  }
};

const formRules = FormValidator.make(
  {
    newPassword: "required",
    confirmPassword: "required",
    password: "required"
  },
  {}
);

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: true
    };
  }

  goToLoginPerfil = form => {
    const { password, newPassword, confirmPassword } = form;
    changePassword({
      password,
      newPassword,
      confirmPassword
    })
      .then(({ data }) => {
        if (data.isSuccess) {
          AsyncStorage.setItem(JSON.stringify(data));
          this.props.navigation.navigate("LoginPerfil");
          alert("Senha Alterada com sucesso!!!");
        }
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <ImageBackground
        source={ImageBack}
        style={{
          width: Dimensions.get("window").width,
          flex: 1
        }}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <View style={styles.registerContainer}>
            <View
              style={{
                flex: 0.8,
                width: Dimensions.get("window").width - 100,
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <View style={[styles.ContainerLogo, { top: "-15%" }]}>
                <Image
                  source={Logo}
                  style={{
                    width: Dimensions.get("window").width - 120,
                    height: Dimensions.get("window").height - 710
                  }}
                />
              </View>
              <View style={{ top: "-10%" }}>
                <Text
                  style={[
                    styles.textTitle,
                    {
                      textAlign: "center",
                      lineHeight: 45,
                      fontSize: 27
                    }
                  ]}
                >
                  Você está alterando{"\n"}
                  sua senha
                </Text>
              </View>
            </View>

            <View style={{ flex: 1.2 }}>
              <Field
                style={styles.TextInput}
                title="Senha Atual"
                secureTextEntry
                component={InputField}
                name={"password"}
              />
              <Field
                style={styles.TextInput}
                title="Nova Senha"
                secureTextEntry
                component={InputField}
                name={"newPassword"}
              />
              <Field
                style={styles.TextInput}
                title="Confirmar sua Nova senha"
                secureTextEntry
                name={"confirmPassword"}
                component={InputField}
              />
              <RoundButton
                style={[stylePage.Btn, stylePage.btnRegister, { width: 200 }]}
                name="Salvar"
                onPress={handleSubmit(data => this.goToLoginPerfil(data))}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default ForgotPassword = reduxForm({
  form: "ForgotPassword",
  validate: formRules,
  enableReinitialize: true
})(ForgotPassword);
