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
import styles from "~/pages/Auth/Register/register.style";
import Logo from "~/assets/images/logoLanUp.png";
import { changePassword } from "~/shared/services/auth.http";

import { Field, reduxForm } from "redux-form";
import FormValidator from "~/shared/services/validator";
import AsyncStorage from "@react-native-community/async-storage";
import DropdownAlert from "react-native-dropdownalert";

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
  {
    newPassword: "Nova senha é obrigatória",
    confirmPassword: "Confirmação de senha é obrigatória",
    password: "Senha atual é obrigatória"
  }
);

class ChangePassword extends Component {
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
          if (password === newPassword) {
            this.dropDownAlertRef.alertWithType(
              "error",
              "Erro",
              "Nova senha é igual a atual!"
            );
          } else {
            this.props.navigation.navigate("UserProfile");
            this.dropDownAlertRef.alertWithType(
              "success",
              "Sucesso",
              "Senha alterada com sucesso."
            );
          }
        }
      })
      .catch(error => {
        if (newPassword !== confirmPassword) {
          this.dropDownAlertRef.alertWithType(
            "error",
            "Erro",
            "Nova senha não confere!"
          );
        }

        this.dropDownAlertRef.alertWithType(
          "error",
          "Erro",
          "Senha atual não confere!"
        );
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
            width: "100%",
            top: "-1%",
            alignItems: "center"
          }}
        >
          <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <View style={[styles.registerContainer, { width: "100%" }]}>
            <View
              style={{
                flex: 1,
                width: "100%",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <View style={[styles.ContainerLogo, { top: "-15%" }]}>
                <Image
                  source={Logo}
                  style={{
                    width: 280,
                    height: 140
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

            <View
              style={{
                flex: 1.2,
                width: "70%"
              }}
            >
              <Field
                style={styles.TextInput}
                title="Senha Atual"
                secureTextEntry
                component={InputField}
                name={"password"}
                autoCapitalize="none"
              />
              <Field
                style={styles.TextInput}
                title="Nova Senha"
                secureTextEntry
                component={InputField}
                name={"newPassword"}
                autoCapitalize="none"
              />
              <Field
                style={styles.TextInput}
                title="Confirmar sua Nova senha"
                secureTextEntry
                name={"confirmPassword"}
                component={InputField}
                autoCapitalize="none"
              />
              <RoundButton
                style={[stylePage.Btn, stylePage.btnRegister, { width: "70%" }]}
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

export default ChangePassword = reduxForm({
  form: "ChangePassword",
  validate: formRules,
  enableReinitialize: true
})(ChangePassword);
