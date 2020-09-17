import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { login, resetPassword } from "~/shared/services/auth.http";
import { decodeToken } from "~/shared/services/freela.http";
import ImageBack from "~/assets/images/Grupo_518.png";
import Logo from "~/assets/images/logoLanUp.png";
import InputField from "~/shared/components/InputField";
import { Field, reduxForm } from "redux-form";
import FormValidator from "~/shared/services/validator";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container } from "native-base";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions/index";
import ModalForgotPassword from "./ModalForgotPassword";
import ButtonLoading from "~/shared/components/Button";

const formRules = FormValidator.make(
  {
    email:"required|email",
    password: "required",
  },
  {
    email: ("E-mail é obrigatório", "Digite um endereço de email válido!"),
    password: "Senha é obrigatória",
  }
);

class LoginEmail extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      icon: "visibility-off",
      password: true,
      disabled: true,
      visible: false,
      email: "",
      spinner: false,
    };

    this.changeIcon = this.changeIcon.bind(this);
  }

  goToLoginPerfil = async (form) => {
    const { email, password } = form;
    const deviceId = await AsyncStorage.getItem("DEVICE_ID");
    this.setState({ spinner: true }, () => {
      login({
        login: email,
        password,
        deviceId,
      })
        .then(async ({ data }) => {
          const token = decodeToken(data.result.token);
          if (token.userType === "1") {
            await AsyncStorage.setItem("API_TOKEN", data.result.token);
            this.props.navigation.navigate("UserProfile");
          } else {
            AlertHelper.show(
              "error",
              "Erro",
              "Somente freelas podem acessar o App."
            );
          }
        })
        .catch((error) => {
          error.response.data.errorMessage;
          AlertHelper.show("error", "Erro", error.response.data.errorMessage);
        })
        .finally(() => {
          this.setState({ spinner: false });
        });
    });
  };

  changeIcon() {
    this.setState((prevState) => ({
      icon: prevState.icon === "visibility" ? "visibility-off" : "visibility",
      password: !prevState.password,
    }));
  }

  resetPassword = () => {
    const { email } = this.state;
    this.setState({ loading: true });
    resetPassword(email)
      .then(() => {
        this.setState({ visible: false });
        AlertHelper.show("success", "Sucesso", "Email enviado com sucesso!");
      })
      .catch(() => {
        this.setState({ titleError: "Este e-mail não está cadastrado." });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { width, height } = Dimensions.get("screen");
    const { handleSubmit, invalid } = this.props;
    const { spinner, visible, loading, disabled, titleError } = this.state;
    return (
      <ImageBackground source={ImageBack} style={{ width, height, flex: 1 }}>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <Container
            style={{
              backgroundColor: "transparent",
              height: height - dimensions(90),
            }}
          >
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image
                  source={Logo}
                  style={{ width: dimensions(220), height: dimensions(65) }}
                />
              </View>
              <View style={styles.containerForm}>
                <View style={{ alignContent: "stretch", width: "90%" }}>
                  <Field
                    style={{ width: "100%" }}
                    title="E-mail"
                    keyboardType="email-address"
                    component={InputField}
                    name={"email"}
                    isfocused={"#A893F2"}
                    autoCapitalize="none"
                  />

                  <View
                    style={{
                      alignContent: "stretch",
                      width: "100%",
                    }}
                  >
                    <Field
                      style={[{ width: "100%" }]}
                      title="Senha"
                      secureTextEntry={this.state.password}
                      component={InputField}
                      name={"password"}
                      isfocused={"#A893F2"}
                      autoCapitalize="none"
                    />
                    <Icon
                      style={styles.icon}
                      name={this.state.icon}
                      size={dimensions(24)}
                      color="#fff"
                      onPress={() => this.changeIcon()}
                    />
                  </View>
                </View>
                <View style={{ width: "60%", marginTop: calcWidth(5) }}>
                  <ButtonLoading
                    disabled={invalid}
                    loading={!spinner}
                    color="#7541bf"
                    cliclButtonColor="#EB4886"
                    name="Entrar"
                    size="small"
                    onPress={handleSubmit((data) => this.goToLoginPerfil(data))}
                  />
                </View>
              </View>
            </View>
            <ModalForgotPassword
              visible={visible}
              loading={loading}
              disabledButton={disabled}
              titleError={titleError}
              onPress={() => this.resetPassword()}
              onChangeText={(email) =>
                this.setState({ email, disabled: !email, titleError: "" })
              }
              onClose={() =>
                this.setState({
                  visible: false,
                  titleError: "",
                  disabled: true,
                })
              }
            />
          </Container>
          <View style={{ width: "100%" }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ visible: true });
              }}
            >
              <Text style={styles.textForgot}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logoContainer: {
    width: "100%",
    height: "37%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  containerForm: {
    width: "80%",
    marginHorizontal: "10%",
    alignItems: "center",
    height: "50%",
  },
  Btn: {
    backgroundColor: "#7541bf",
  },
  textBtn: {
    color: "#FFF",
    fontSize: adjust(13),
    textAlign: "center",
    padding: "15%",
  },
  textForgot: {
    color: "#483D8B",
    textDecorationLine: "underline",
    textAlign: "center",
    fontSize: adjust(13),
    letterSpacing: 0.5,
  },
  icon: {
    left: "80%",
    top: dimensions(27),
    position: "absolute",
  },
  inputModal: {
    height: dimensions(43),
    borderColor: "#865FC0",
  },
});

export default LoginEmail = reduxForm({
  form: "LoginEmail",
  validate: formRules,
  enableReinitialize: true,
})(LoginEmail);
