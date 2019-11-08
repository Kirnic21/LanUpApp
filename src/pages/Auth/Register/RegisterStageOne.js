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
import { setUser } from "~/store/ducks/user/user.actions";

import { bindActionCreators } from "redux";
import RoundButton from "~/shared/components/RoundButton";
import ImageBack from "~/assets/images/Grupo_518.png";
import InputField from "~/shared/components/InputField";

import styles from "./register.style";
import FormValidator from "~/shared/services/validator";
// import TextInputMask from "react-native-text-input-mask";
import InputMask from "~/shared/components/InputMask";

const formRules = FormValidator.make(
  {
    fullName: "required",
    nickname: "required",
    cpf: ("required", "cpf")
  },
  {
    fullName: "Nome Completo é obrigatório",
    nickname: "Apelido é obrigatório",
    cpf: ("CPF é obrigatório", "Digite um CPF válido.")
  }
);
class RegisterStageOne extends Component {
  state = {
    user: {
      isFacebook: false,
      authenticateUser: {}
    }
  };

  componentDidMount() {
    const user = this.props.navigation.getParam("user");

    this.props.initialize({
      nickname: user.authenticateUser.name,
      fullName: user.authenticateUser.name
    })
  }

  goRegister = () => {
    const { user } = this.state;

    if (user.isFacebook) {
      this.props.navigation.navigate("UserProfile", { user });
      return;
    }

    this.props.navigation.push("RegisterStageTwo");
  };

  render() {
    const { user } = this.state;
    const { handleSubmit, invalid } = this.props;
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
          <Text style={styles.textTitle}>
            Bem-vindo!{"\n"}
            Insira seus dados
          </Text>
          {!user.isFacebook && (
            <Text style={styles.textSubtitle}>Etapa 1/2</Text>
          )}

          <View
            style={{
              top: "5%",
              width: "70%"
            }}
          >
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
              component={InputField}
              keyboardType="numeric"
              mask={"[000].[000].[000]-[00]"}
            />
            {/* 
            <TextInputMask
              // onChangeText={(formatted, extracted) => {
              //   console.log(formatted); // +1 (123) 456-78-90
              //   console.log(extracted); // 1234567890
              // }}
              mask={"+1 ([000]) [000] [00] [00]"}
            /> */}
          </View>

          <RoundButton
            disabled={invalid}
            style={[styles.Btn, styles.btnRegister, { top: "15%" }]}
            name="Continuar"
            onPress={handleSubmit(data => this.goRegister(data))}
          />
        </View>
      </ImageBackground>
    );
  }
}

mapDispatchToProps = dispatch => bindActionCreators({
  setUser
}, dispatch)

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'RegisterStageOne',
  enableReinitialize: true
})(RegisterStageOne))
