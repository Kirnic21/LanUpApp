import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { login, resetPassword } from "../../shared/services/auth.http";
import ImageBack from "../../assets/images/Grupo_518.png";
import Logo from "../../assets/images/logoLanUp.png";
import InputField from "../../shared/components/InputField";
import Modal from "../../shared/components/ModalComponent";

import { Field, reduxForm } from "redux-form";
import FormValidator from "~/shared/services/validator";
import Spinner from "react-native-loading-spinner-overlay";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import InputModal from "~/shared/components/InputModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container } from "native-base";

import dimensions from "~/assets/Dimensions/index";

const formRules = FormValidator.make(
  {
    email: ("required", "email"),
    password: "required"
  },
  {
    email: ("E-mail é obrigatório", "Digite um endereço de email válido!"),
    password: "Senha é obrigatória"
  }
);

class LoginEmail extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      icon: "visibility-off",
      password: true,
      visible: false,
      email: "",
      bottomModalAndTitle: true
    };

    this.changeIcon = this.changeIcon.bind(this);
  }

  doSignup = () => {
    this.showLoader();
  };

  goToLoginPerfil = form => {
    const { email, password } = form;
    this.setState({ spinner: true });
    login({
      login: email,
      password
    })
      .then(async ({ data }) => {
        if (data.isSuccess) {
          await AsyncStorage.setItem("API_TOKEN", data.result.token);

          this.props.navigation.navigate("UserProfile");
        }
      })
      .catch(error => {
        this.setState({ spinner: false });
        AlertHelper.show("error", "Erro", "Usuário ou senha inválidos");
        console.log(error.response.data);
      });
  };

  changeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === "visibility" ? "visibility-off" : "visibility",
      password: !prevState.password
    }));
  }

  handleEmail = text => {
    this.setState({ email: text });
  };

  reset = email => {
    resetPassword(email)
      .then(({ data }) => {
        if (data.isSuccess) {
          console.log(data);
          AlertHelper.show("success", "Sucesso", "Email enviado com sucesso!");
        }
      })
      .catch(error => {
        AlertHelper.show(
          "error",
          "Erro",
          "Este endereço de email não está cadastrado."
        );
        console.log(error.response.data);
      });
  };

  render() {
    const { width, height } = Dimensions.get("screen");
    const { handleSubmit, invalid } = this.props;
    return (
      <ImageBackground source={ImageBack} style={{ width, height, flex: 1 }}>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <Spinner
            visible={this.state.spinner}
            size="large"
            animation="fade"
            color="#7541BF"
            overlayColor="rgba(0, 0, 0, 0.9)"
          />
          <Container
            style={{
              backgroundColor: "transparent",
              height: height - dimensions(90)
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
                      width: "100%"
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
                <View style={{ width: "60%" }}>
                  <RoundButton
                    disabled={invalid}
                    style={[styles.Btn]}
                    name="Entrar"
                    onPress={handleSubmit(data => this.goToLoginPerfil(data))}
                  />
                </View>
              </View>
            </View>
            <Modal
              onClose={() => {
                this.setState({ visible: false });
              }}
              onTouchOutside={() => {
                this.setState({ visible: false });
              }}
              onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
              visible={this.state.visible}
            >
              <Text style={styles.titleModal}>Esqueci a senha</Text>
              <Text style={styles.subtitleModal}>
                Escreva o seu e-mail e enviaremos{`\n`}a senha provisória
              </Text>
              <View style={styles.containerInputModal}>
                <InputModal
                  isfocused={"#865FC0"}
                  onChangeText={this.handleEmail}
                  title="E-mail"
                  style={{
                    width: "90%",
                    height: dimensions(43),
                    borderColor: "#865FC0"
                  }}
                />
              </View>
              <View style={{ alignItems: "center", top: "1%" }}>
                <RoundButton
                  style={styles.buttonModal}
                  name="Mandar"
                  onPress={() =>
                    this.reset(
                      this.state.email,
                      this.setState({ visible: false })
                    )
                  }
                />
              </View>
            </Modal>
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
    justifyContent: "space-between"
  },
  logoContainer: {
    width: "100%",
    height: "37%",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  containerForm: {
    width: "80%",
    marginHorizontal: "10%",
    alignItems: "center",
    height: "50%"
  },
  titleModal: {
    color: "#FFF",
    paddingHorizontal: "5%",
    top: "-6%",
    fontSize: dimensions(24),
    fontFamily: "HelveticaNowMicro-Medium"
  },
  subtitleModal: {
    color: "#FFF",
    fontSize: dimensions(13),
    lineHeight: 25,
    paddingHorizontal: "5%",
    top: "-1%",
    fontFamily: "HelveticaNowMicro-Medium"
  },
  containerInputModal: {
    justifyContent: "center",
    alignItems: "flex-start",
    left: "5%",
    top: "5%"
  },
  buttonModal: {
    backgroundColor: "#865FC0",
    width: "50%",
    height: dimensions(45),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50
  },
  Btn: {
    backgroundColor: "#7541bf",
    width: "100%",
    height: dimensions(40),
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  BtnDisabled: {
    backgroundColor: "#6C757D"
  },
  textBtn: {
    color: "#FFF",
    fontSize: dimensions(15),
    textAlign: "center",
    padding: "15%"
  },
  textForgot: {
    color: "#483D8B",
    textDecorationLine: "underline",
    textAlign: "center",
    fontSize: dimensions(15),
    letterSpacing: 0.5
  },
  icon: {
    left: "80%",
    top: dimensions(27),
    position: "absolute"
  }
});

export default LoginEmail = reduxForm({
  form: "LoginEmail",
  validate: formRules,
  enableReinitialize: true
})(LoginEmail);
