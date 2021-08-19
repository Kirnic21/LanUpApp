import React, { Component } from "react";
import { View, Text, ImageBackground, StatusBar } from "react-native";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { setUser } from "~/store/ducks/user/user.actions";

import { bindActionCreators } from "redux";
import RoundButton from "~/shared/components/RoundButton";
import ImageBack from "~/assets/images/Grupo_518.png";
import InputField from "~/shared/components/InputField";

import styles from "./register.style";
import FormValidator from "~/shared/services/validator";
import AsyncStorage from "@react-native-community/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container } from "native-base";
import {
  create,
  existingCpf,
  existingEmail
} from "~/shared/services/freela.http";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import InputMask from "~/shared/components/InputMask";
import SpinnerComponent from "~/shared/components/SpinnerComponent";

const formRules = FormValidator.make(
  {
    fullName: "required",
    nickname: "required",
    cpf: "required|cpf"
  },
  {
    fullName: "Nome Completo é obrigatório",
    nickname: "Apelido é obrigatório",
    cpf: "Digite um CPF válido."
  }
);
class RegisterStageOne extends Component {
  state = {
    user: {
      isFacebook: false,
      authenticateUser: {}
    },
    spinner: false
  };

  async componentDidMount() {
    const user = this.props.navigation.getParam("user");
    if (user) {
      this.setState({ user: { ...user, isFacebook: true } });
      await this.props.initialize({
        nickname: user.result.authenticateUser.name,
        fullName: user.result.authenticateUser.name
      });
    }
  }

  goRegister = async form => {
    const { user } = this.state;
    const { nickname, cpf, fullName } = form;
    const CPF = cpf.replace(/[\(\)\.\s-]+/g, "");
    this.setState({ spinner: true });
    if (user.isFacebook) {
      await this.props.setUser(user);
      const { authenticateUser } = user.result;
      const { email, password, avatar } = authenticateUser;
      const request = {
        name: fullName,
        nickname,
        cpf: CPF,
        email,
        password,
        confirmPassword: password,
        avatar: avatar.url,
        facebookToken: user.facebookToken
      };
      existingEmail(email)
        .then(({ data }) => {
          const emailExisting = data.result.value;
          emailExisting === true
            ? AlertHelper.show("error", "Erro", "Este email já existe.")
            : existingCpf(CPF).then(({ data }) => {
                const cpfExisting = data.result.value;
                cpfExisting === true
                  ? AlertHelper.show("error", "Erro", "Este cpf já existe.")
                  : create(request)
                      .then(async ({ data }) => {
                        if (data.isSuccess) {
                          await AsyncStorage.setItem(
                            "API_TOKEN",
                            data.result.token
                          );
                          this.props.navigation.navigate("UserProfile");
                        }
                      })
                      .catch(error => {
                        AlertHelper.show("error", "Erro", error.response.data.errorMessage);
                      });
              });
        })
        .finally(() => {
          this.setState({ spinner: false });
        });
      return;
    }

    existingCpf(CPF)
      .then(({ data }) => {
        const cpfExisting = data.result.value;
        cpfExisting === true
          ? AlertHelper.show("error", "Erro", "Este cpf já existe.")
          : this.props.navigation.push("RegisterStageTwo");
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  };

  render() {
    const { user, spinner } = this.state;
    const { handleSubmit, invalid } = this.props;
    return (
      <ImageBackground source={ImageBack} style={styles.ImageBackground}>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <SpinnerComponent loading={spinner} />
          <StatusBar translucent backgroundColor="transparent" />
          <Container style={{ backgroundColor: "transparent" }}>
            <View style={styles.registerContainer}>
              <Text
                style={[styles.textTitle, { marginTop: "-23%", top: "1%" }]}
              >
                Bem-vindo!{"\n"}
                Insira seus dados
              </Text>
              {!user.isFacebook && (
                <Text style={[styles.textSubtitle, { left: "-25.3%" }]}>
                  Etapa 1/2
                </Text>
              )}
              <View style={{ top: "6%", width: "70%" }}>
                <Field
                  name="fullName"
                  style={styles.TextInput}
                  title="Nome Completo"
                  component={InputField}
                  isfocused={"#46C5F3"}
                />
                <Field
                  name="nickname"
                  style={styles.TextInput}
                  title="Apelido"
                  component={InputField}
                  isfocused={"#46C5F3"}
                />
                <Field
                  name="cpf"
                  // style={styles.TextInput}
                  title="CPF"
                  component={InputMask}
                  keyboardType="numeric"
                  isfocused={"#46C5F3"}
                  mask="cpf"
                />
              </View>

              <>
                <RoundButton
                  disabled={invalid}
                  style={[styles.btnRegister]}
                  name="Continuar"
                  onPress={handleSubmit(data => this.goRegister(data))}
                />
              </>
            </View>
          </Container>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUser
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(
  reduxForm({
    form: "RegisterStageOne",
    validate: formRules
  })(RegisterStageOne)
);
