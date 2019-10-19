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

const formRules = FormValidator.make(
  {
    email: "required",
    password: "required"
  },
  {}
);

class LoginEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "visibility-off",
      password: true,
      visible: false
    };

    this.changeIcon = this.changeIcon.bind(this);
  }

  goToLoginPerfil = form => {
    const { email, password } = form;
    login({
      login: email,
      password: password
    })
      .then(async ({ data }) => {
        if (data.isSuccess) {
          await AsyncStorage.setItem("API_TOKEN", data.result.token);

          this.props.navigation.navigate("LoginPerfil");
        }
      })
      .catch(error => {
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
    const { handleSubmit } = this.props;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior="height">
        <ImageBackground
          source={ImageBack}
          style={{ width, height: height + 80, flex: 1 }}
        >
          <View style={styles.Container}>
            <View style={styles.ContainerLogo}>
              <Image
                source={Logo}
                style={{ width: width - 120, height: height - 700 }}
              />
            </View>

            <View style={styles.ContainerForm}>
              <View style={{ paddingVertical: 100, alignItems: "center" }}>
                <Field
                  style={{ width: 290, height: 50 }}
                  title="E-mail"
                  keyboardType="email-address"
                  component={InputField}
                  name={"email"}
                />

                <Field
                  style={{ width: 290, height: 50 }}
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
                <TouchableOpacity
                  style={styles.Btn}
                  onPress={handleSubmit(data => this.goToLoginPerfil(data))}
                >
                  <Text style={styles.textBtn}>Entrar</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: width - 100, height: 50, top: "-1%" }}>
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
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  ContainerLogo: {
    width: Dimensions.get("window").width - 90,
    height: Dimensions.get("window").height - 500,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  ContainerForm: {
    width: Dimensions.get("window").width - 100,
    height: Dimensions.get("window").height - 250,
    alignItems: "center"
  },
  Btn: {
    backgroundColor: "#7541bf",
    width: Dimensions.get("window").width - 200,
    height: Dimensions.get("window").height - 720,
    borderRadius: 60,
    justifyContent: "center"
  },
  textBtn: {
    color: "#FFF",
    fontSize: 15,
    textAlign: "center"
  },
  textForgot: {
    color: "#483D8B",
    textDecorationLine: "underline",
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 0.5
  },
  icon: {
    left: "40%",
    top: "-21%"
  }
});

export default LoginEmail = reduxForm({
  form: "LoginEmail",
  validate: formRules,
  enableReinitialize: true
})(LoginEmail);
