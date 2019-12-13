import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import RoundButton from "~/shared/components/RoundButton";
import ImageBack from "~/assets/images/Grupo_518.png";
import InputField from "~/shared/components/InputField";
import styles from "./register.style";

import { Field, reduxForm } from "redux-form";
import FormValidator from "~/shared/services/validator";
import DropdownAlert from "react-native-dropdownalert";

const stylePage = {
  ...styles,
  icon: {
    left: "80%",
    top: 35,
    position: "absolute"
  }
};

const formRules = FormValidator.make(
  {
    email: "required|email",
    password: "required|min:6",
    confirmPassword: "required|min:6"
  },
  {
    email: "Digite um email válido.",
    password: "A senha deve conter no mínimo 6 caracteres",
    confirmPassword: "Confirmação da Senha é obrigatória"
  }
);

class RegisterStageTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "visibility-off",
      password: true
    };

    this.changeIcon = this.changeIcon.bind(this);
  }

  goLoginPicture = form => {
    const { email, password, confirmPassword } = form;

    if (password === confirmPassword) {
      this.props.navigation.push("SelectAvatar", {
        email,
        password,
        confirmPassword
      });
    } else {
      this.dropDownAlertRef.alertWithType(
        "error",
        "Erro",
        "As senhas não podem ser diferentes!"
      );
    }
  };

  changeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === "visibility" ? "visibility-off" : "visibility",
      password: !prevState.password
    }));
  }

  render() {
    const { handleSubmit, invalid } = this.props;
    return (
      <ImageBackground
        source={ImageBack}
        style={{
          width: "100%",
          flex: 1
        }}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <View
          style={{
            width: "100%",
            top: "-1%",
            alignItems: "center",
            position: "absolute"
          }}
        >
          <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            width: "100%"
          }}
        >
          <View style={[styles.registerContainer, { width: "100%" }]}>
            <View style={{ top: "-6%" }}>
              <Text style={styles.textTitle}>
                Bem-vindo!{"\n"}
                Insira seus dados
              </Text>

              <Text style={stylePage.textSubtitle}>Etapa 2/2</Text>
            </View>
            <View
              style={{
                top: "-2%",
                width: "70%"
              }}
            >
              <Field
                name={"email"}
                style={[styles.TextInput]}
                title="E-mail"
                keyboardType="email-address"
                component={InputField}
                autoCapitalize="none"
              />
              <View
                style={{
                  alignContent: "stretch",
                  width: "100%"
                }}
              >
                <Field
                  name={"password"}
                  style={[{ width: "100%", height: 51, paddingLeft: "10%" }]}
                  title="Senha"
                  secureTextEntry={this.state.password}
                  component={InputField}
                  autoCapitalize="none"
                />
                <Icon
                  style={stylePage.icon}
                  name={this.state.icon}
                  size={25}
                  color="#fff"
                  onPress={() => this.changeIcon()}
                />
              </View>

              <Field
                name={"confirmPassword"}
                style={[{ width: "100%", height: 51, paddingLeft: "10%" }]}
                title="Confirmar senha"
                secureTextEntry={this.state.password}
                fullWidth
                component={InputField}
                autoCapitalize="none"
              />
            </View>
            <RoundButton
              disabled={invalid}
              style={[
                stylePage.Btn,
                stylePage.btnRegister,
                { marginTop: "-1%" }
              ]}
              name="Continuar"
              onPress={handleSubmit(data => this.goLoginPicture(data))}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

// const mapStateToProps = (state, ownProps) => ({
//   fullName: state.form.RegisterStage.values.fullName
// });
// const mapActionToProps = dispatch =>
//   bindActionCreators({ select: select }, dispatch);

export default RegisterStageTwo = reduxForm({
  form: "RegisterStageTwo",
  validate: formRules,
  enableReinitialize: true
})(RegisterStageTwo);
