import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from "react-native";
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
import { create, validateCpf } from "~/shared/services/freela.http";
import { validateCPF } from "~/shared/helpers/validate/ValidateCpfCnpj";

import normalize from "~/assets/FontSize/index";
import InputMask from "~/shared/components/InputMask";
import DropdownAlert from "react-native-dropdownalert";

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
    }
  };

  async componentDidMount() {
    const user = this.props.navigation.getParam("user");

    if (user) {
      this.setState({ user: { ...user, isFacebook: true } });
      await this.props.initialize({
        nickname: user.authenticateUser.name,
        fullName: user.authenticateUser.name
      });
    }
  }

  goRegister = async form => {
    const { user } = this.state;
    debugger;

    await this.props.setUser(user);
    const { email, password, avatar } = user.authenticateUser;
    const { nickname, cpf, fullName } = form;
    if (user.isFacebook) {
      await AsyncStorage.setItem("token", user.accessToken.token);
      const request = {
        name: fullName,
        nickname,
        cpf,
        email,
        password,
        confirmPassword: password,
        avatar: avatar.url,
        facebookToken: user.accessToken.token
      };
      create(request)
        .then(async ({ data }) => {
          if (data.isSuccess) {
            this.props.navigation.navigate("UserProfile");
          }
        })
        .catch(error => {
          debugger;
          console.log(error.response.data);
        });
      debugger;
      return;
    }
    validateCpf(cpf).then(({ data }) => {
      const CPF = cpf.replace(/[\(\)\.\s-]+/g, "");
      const validate = data.result.value;
      const cpfValidate = validateCPF(CPF);
      validate === true
        ? this.dropDownAlertRef.alertWithType(
            "error",
            "Erro",
            "Este cpf já existe."
          )
        : cpfValidate === false
        ? this.dropDownAlertRef.alertWithType(
            "error",
            "Erro",
            "Este cpf é inválido."
          )
        : this.props.navigation.push("RegisterStageTwo");
    });
  };

  render() {
    const { user } = this.state;
    const { handleSubmit, invalid } = this.props;
    return (
      <ImageBackground source={ImageBack} style={styles.ImageBackground}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            position: "absolute"
          }}
        >
          <DropdownAlert
            closeInterval={1}
            ref={ref => (this.dropDownAlertRef = ref)}
          />
        </View>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <StatusBar translucent backgroundColor="transparent" />
          <Container style={{ backgroundColor: "transparent" }}>
            <View style={styles.registerContainer}>
              <Text
                style={[styles.textTitle, { marginTop: "-25%", top: "1%" }]}
              >
                Bem-vindo!{"\n"}
                Insira seus dados
              </Text>
              {!user.isFacebook && (
                <Text style={[styles.textSubtitle, { left: "-25.5%" }]}>
                  Etapa 1/2
                </Text>
              )}
              <View style={{ top: "6%", width: "70%" }}>
                <Field
                  name="fullName"
                  style={styles.TextInput}
                  title="Nome Completo"
                  component={InputField}
                />
                <Field
                  name="nickname"
                  style={styles.TextInput}
                  title="Apelido"
                  component={InputField}
                />
                <Field
                  name="cpf"
                  style={styles.TextInput}
                  title="CPF"
                  component={InputMask}
                  keyboardType="numeric"
                  mask={"[000].[000].[000]-[00]"}
                />
              </View>

              <View style={{ width: "100%", marginBottom: "-25%" }}>
                <RoundButton
                  disabled={invalid}
                  style={[styles.Btn, styles.btnRegister, { top: "15%" }]}
                  name="Continuar"
                  onPress={handleSubmit(data => this.goRegister(data))}
                />
              </View>
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
