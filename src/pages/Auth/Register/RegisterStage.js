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
import InputField from "~/shared/components/InputField";

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

  static getDerivedStateFromProps(props, state) {
    const user = props.navigation.getParam("user");

    if (user) {
      return {
        ...state,
        user
      };
    }

    return null;
  }

  goRegister = () => {
    const { user } = this.state;

    if (user.isFacebook) {
      this.props.navigation.navigate("LoginPerfil", { user });
      return;
    }

    this.props.navigation.push("RegisterStageTwo");
  };

  render() {
    const { user } = this.state;
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

          <View style={{ top: "5%" }}>
            <Field
              name={"fullName"}
              style={styles.TextInput}
              title="Nome Completo"
              component={InputField}
            />
            <Field
              style={[styles.TextInput, { borderColor: "#F13567" }]}
              name={"nickname"}
              title="Apelido"
              component={InputField}
            />
            {/* <Text
              style={{
                color: "#F13567",
                fontSize: 12,
                left: "10%",
                top: "-5%",
                marginBottom: "-3%"
              }}
            >
              Este apelido já existe
            </Text> */}
            <Field
              component={InputField}
              style={styles.TextInput}
              title="CPF"
              name={"cpf"}
            />
          </View>

          <RoundButton
            style={[styles.Btn, styles.btnRegister, { top: "15%" }]}
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
