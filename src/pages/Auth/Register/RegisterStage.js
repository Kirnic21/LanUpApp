import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar
} from "react-native";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";

import RoundButton from "~/shared/components/RoundButton";
import ImageBack from "~/assets/images/Grupo_518.png";
import InputLabel from "~/shared/components/InputLabel";

import styles from "./register.style";
import FormValidator from "~/shared/services/validator";

const formRules = FormValidator.make(
  {
    fullName: "required",
    nickname: "required",
    cpf: "required"
  },
  {}
);

class RegisterStage extends Component {
  state = {
    user: {
      isFacebook: false,
      authenticateUser: {}
    }
  };

  // static getDerivedStateFromProps(props, state) {
  //   const user = props.navigation.getParam("user");

  //   if (user) {
  //     return {
  //       ...state,
  //       user
  //     };
  //   }

  //   return null;
  // }

  goRegister = form => {
    const { fullName, nickname, cpf } = form;
    const { user } = this.state;

    if (user.isFacebook) {
      this.props.navigation.navigate("LoginPerfil", { user });
      return;
    }

    this.props.navigation.push("RegisterStageTwo", {
      fullName,
      nickname,
      cpf
    });
  };

  render() {
    const { user } = this.state;
    const { handleSubmit } = this.props;

    debugger;

    return (
      <ImageBackground
        source={ImageBack}
        style={{
          width: Dimensions.get("window").width,
          flex: 1
        }}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.registerContainer}>
          <View>
            <Text style={styles.textTitle}>
              Bem-vindo!{"\n"}
              Insira seus dados
            </Text>
            {!user.isFacebook && (
              <Text style={styles.textSubtitle}>Etapa 1/2</Text>
            )}
          </View>

          <View>
            <Field
              name={"fullName"}
              inputStyle={styles.TextInput}
              title="Nome Completo"
              component={InputLabel}
            />
            <Field
              inputStyle={[styles.TextInput, { borderColor: "#F13567" }]}
              name={"nickname"}
              title="Apelido"
              component={InputLabel}
            />
            <Text
              style={{
                color: "#F13567",
                fontSize: 12,
                left: "10%",
                top: "-5%",
                marginBottom: "-3%"
              }}
            >
              Este apelido já existe
            </Text>
            <Field
              component={InputLabel}
              inputStyle={styles.TextInput}
              title="CPF"
              name={"cpf"}
            />
          </View>

          <RoundButton
            style={[styles.Btn, styles.btnRegister]}
            name="Continuar"
            onPress={handleSubmit(data => this.goRegister(data))}
          />
        </View>
      </ImageBackground>
    );
  }
}

export default RegisterStage = reduxForm({
  form: "RegisterStage",
  validate: formRules,
  enableReinitialize: true
})(RegisterStage);
