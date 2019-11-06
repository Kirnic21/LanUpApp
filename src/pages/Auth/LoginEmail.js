import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  KeyboardAvoidingView
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { login } from "../../shared/services/auth.http";
import ImageBack from "../../assets/images/Grupo_518.png";
import Logo from "../../assets/images/logoLanUp.png";
import InputField from "../../shared/components/InputField";
import Modal from "../../shared/components/ModalComponent";

import { Field, reduxForm } from "redux-form";
import FormValidator from "~/shared/services/validator";
import Spinner from "react-native-loading-spinner-overlay";
import DropdownAlert from "react-native-dropdownalert";

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
      visible: false
    };

    this.changeIcon = this.changeIcon.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      setInterval(() => {
        this.hideLoader();
      }, 3000);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  showLoader = () => {
    if (this._isMounted) {
      this.setState({ spinner: true });
    }
  };
  hideLoader = () => {
    if (this._isMounted) {
      this.setState({ spinner: false });
    }
  };

  doSignup = () => {
    this.showLoader();
  };

  goToLoginPerfil = form => {
    const { email, password } = form;
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
        this.dropDownAlertRef.alertWithType(
          "error",
          "Erro",
          "Usuário ou senha inválidos"
        );
        console.log(error.response.data);
      });
  };

  changeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === "visibility" ? "visibility-off" : "visibility",
      password: !prevState.password
    }));
  }

  render() {
    const { width, height } = Dimensions.get("window");
    const { handleSubmit, invalid } = this.props;
    return (
      <ImageBackground
        source={ImageBack}
        style={{ width, height: "100%", flex: 1 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, height: "100%" }}
          enabled
          behavior="height"
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              position: "absolute"
            }}
          >
            <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
          </View>
          <Spinner
            visible={this.state.spinner}
            size="large"
            animation="fade"
            overlayColor="rgba(0, 0, 0, 0.50)"
          />
          <View style={styles.Container}>
            <View style={styles.ContainerLogo}>
              <Image source={Logo} style={{ width: "70%", height: "40%" }} />
            </View>

            <View style={styles.ContainerForm}>
              <View
                style={{
                  alignItems: "center",
                  marginVertical: "10%",
                  width: "100%"
                }}
              >
                <Field
                  style={{ width: 280, height: 55 }}
                  title="E-mail"
                  keyboardType="email-address"
                  component={InputField}
                  name={"email"}
                />
                <View style={{ flexDirection: "row", left: "2.5%" }}>
                  <Field
                    style={{ width: 280, height: 55 }}
                    title="Senha"
                    secureTextEntry={this.state.password}
                    component={InputField}
                    name={"password"}
                  />
                  <Icon
                    style={styles.icon}
                    name={this.state.icon}
                    size={25}
                    color="#fff"
                    onPress={() => this.changeIcon()}
                  />
                </View>

                <TouchableOpacity disabled={invalid} onPress={this.doSignup}>
                  <TouchableOpacity
                    disabled={invalid}
                    style={
                      invalid
                        ? { ...styles.Btn, ...styles.BtnDisabled }
                        : styles.Btn
                    }
                    onPress={handleSubmit(data => this.goToLoginPerfil(data))}
                  >
                    <Text style={styles.textBtn}>Entrar</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ top: "-40%" }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ visible: true });
                }}
              >
                <Text style={styles.textForgot}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </View>
            <Modal
              onTouchOutside={() => {
                this.setState({ visible: false });
              }}
              visible={this.state.visible}
            >
              <Text style={{ color: "#FFF", padding: "5%", fontSize: 30 }}>
                Esqueci a senha
              </Text>
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 17,
                  lineHeight: 30,
                  padding: "5%",
                  top: "-5%"
                }}
              >
                Escreva o seu e-mail e enviaremos{`\n`}a senha provisória
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  left: "5%",
                  top: "-5%"
                }}
              >
                <InputLabel
                  onChangeText={event => this.getInput(event, "skill")}
                  title="E-mail"
                  style={{ width: 325, height: 50, borderColor: "#865FC0" }}
                />
              </View>
              <View style={{ alignItems: "center", top: "-7%" }}>
                <RoundButton
                  style={{
                    backgroundColor: "#865FC0",
                    width: "50%",
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 50
                  }}
                  name="Mandar"
                  onPress={this.state.teste}
                />
              </View>
            </Modal>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  ContainerLogo: {
    width,
    justifyContent: "flex-end",
    alignItems: "center",
    top: "-2%"
  },
  ContainerForm: {
    width: "100%",
    height,
    alignItems: "center"
  },
  Btn: {
    backgroundColor: "#7541bf",
    width: "100%",
    height: "58%",
    borderRadius: 60,
    justifyContent: "center",
    top: "25%"
  },
  BtnDisabled: {
    backgroundColor: "#6C757D"
  },
  textBtn: {
    color: "#FFF",
    fontSize: 15,
    textAlign: "center",
    padding: "15%"
  },
  textForgot: {
    color: "#483D8B",
    textDecorationLine: "underline",
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 0.5
  },
  icon: {
    left: "-50%",
    top: "9.5%"
  }
});

export default LoginEmail = reduxForm({
  form: "LoginEmail",
  validate: formRules,
  enableReinitialize: true
})(LoginEmail);
