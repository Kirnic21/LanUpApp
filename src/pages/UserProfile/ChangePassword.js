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
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import Icon from "react-native-vector-icons/MaterialIcons";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container } from "native-base";

import dimensions, { adjust } from "~/assets/Dimensions/index";
import SpinnerComponent from "~/shared/components/SpinnerComponent";

const stylePage = {
  ...styles,
  icon: {
    left: "80%",
    top: dimensions(28),
    position: "absolute"
  }
};

const formRules = FormValidator.make(
  {
    newPassword: "required|min:6",
    confirmPassword: "required|min:6",
    password: "required"
  },
  {
    newPassword: "A nova senha deve conter no mínimo 6 caracteres",
    confirmPassword: "Confirmação de senha é obrigatória",
    password: "Senha atual é obrigatória"
  }
);

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "visibility-off",
      password: true,
      spinner: false
    };
    this.changeIcon = this.changeIcon.bind(this);
  }

  changeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === "visibility" ? "visibility-off" : "visibility",
      password: !prevState.password
    }));
  }

  goToLoginPerfil = form => {
    const { password, newPassword, confirmPassword } = form;
    this.setState({ spinner: true });
    changePassword({
      password,
      newPassword,
      confirmPassword
    })
      .then(({ data }) => {
        if (data.isSuccess) {
          AsyncStorage.setItem(JSON.stringify(data));
          if (password === newPassword) {
            AlertHelper.show("error", "Erro", "Nova senha é igual a atual!");
          } else {
            this.props.navigation.navigate("UserProfile");
            AlertHelper.show(
              "success",
              "Sucesso",
              "Senha alterada com sucesso."
            );
          }
        }
      })
      .catch(error => {
        if (newPassword !== confirmPassword) {
          AlertHelper.show("error", "Erro", "Nova senha não confere!");
        }
        AlertHelper.show("error", "Erro", "Senha atual não confere!");
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  };

  render() {
    const { handleSubmit, invalid } = this.props;
    const { spinner } = this.state;
    return (
      <ImageBackground
        source={ImageBack}
        style={{
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
          flex: 1
        }}
      >
        <KeyboardAwareScrollView style={{}}>
          <StatusBar translucent backgroundColor="transparent" />
          <SpinnerComponent loading={spinner} />
          <Container
            style={{
              backgroundColor: "transparent",
              height: Dimensions.get("screen").height - dimensions(85)
            }}
          >
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
                  <View style={[styles.ContainerLogo, { top: "-16%" }]}>
                    <Image
                      source={Logo}
                      style={{
                        width: dimensions(210),
                        height: dimensions(70)
                      }}
                    />
                  </View>
                  <View style={{ top: "-11%" }}>
                    <Text
                      style={[
                        styles.textTitle,
                        {
                          textAlign: "center",
                          lineHeight: dimensions(35),
                          fontSize: adjust(18)
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
                    width: "70%",
                    top: "-2%"
                  }}
                >
                  <View
                    style={{
                      alignContent: "stretch",
                      width: "100%"
                    }}
                  >
                    <Field
                      style={styles.TextInput}
                      title="Senha Atual"
                      secureTextEntry
                      component={InputField}
                      secureTextEntry={this.state.password}
                      name={"password"}
                      isfocused={"#46C5F3"}
                      autoCapitalize="none"
                    />
                    <Icon
                      style={stylePage.icon}
                      name={this.state.icon}
                      size={dimensions(22)}
                      color="#fff"
                      onPress={() => this.changeIcon()}
                    />
                  </View>

                  <Field
                    style={styles.TextInput}
                    title="Nova Senha"
                    secureTextEntry
                    component={InputField}
                    secureTextEntry={this.state.password}
                    name={"newPassword"}
                    autoCapitalize="none"
                    isfocused={"#46C5F3"}
                  />
                  <Field
                    style={styles.TextInput}
                    title="Confirmar sua Nova senha"
                    secureTextEntry
                    name={"confirmPassword"}
                    secureTextEntry={this.state.password}
                    component={InputField}
                    autoCapitalize="none"
                    isfocused={"#46C5F3"}
                  />
                  <RoundButton
                    disabled={invalid}
                    style={[stylePage.btnRegister, { width: "70%", top: "5%" }]}
                    name="Salvar"
                    onPress={handleSubmit(data => this.goToLoginPerfil(data))}
                  />
                </View>
              </View>
            </View>
          </Container>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

export default ChangePassword = reduxForm({
  form: "ChangePassword",
  validate: formRules,
  enableReinitialize: true
})(ChangePassword);
