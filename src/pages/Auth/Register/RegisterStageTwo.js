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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container } from "native-base";
import { validateEmail } from "~/shared/services/freela.http";
import dimensions from "~/assets/Dimensions/index";

const stylePage = {
  ...styles,
  icon: {
    left: "82%",
    top: dimensions(28),
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
    validateEmail(email).then(({ data }) => {
      console.log(data);
      const validate = data.result.value;

      validate === true
        ? this._dropdown.alertWithType("error", "Erro", "Este email já existe.")
        : password !== confirmPassword
        ? this._dropdown.alertWithType(
            "error",
            "Erro",
            "As senhas não podem ser diferentes!"
          )
        : this.props.navigation.push("SelectAvatar");
    });
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
      <ImageBackground source={ImageBack} style={styles.ImageBackground}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            position: "absolute",
            marginTop: "-5%"
          }}
        >
          <DropdownAlert
            ref={ref => {
              this._dropdown = ref;
            }}
            closeInterval={500}
          />
        </View>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <StatusBar translucent backgroundColor="transparent" />
          <Container
            style={{
              backgroundColor: "transparent",
              height: Dimensions.get("window").height - dimensions(30)
            }}
          >
            <View style={styles.registerContainer}>
              <Text
                style={[styles.textTitle, { marginTop: "-19%", top: "1%" }]}
              >
                Bem-vindo!{"\n"}
                Insira seus dados
              </Text>

              <Text style={[styles.textSubtitle, { left: "-25.5%" }]}>
                Etapa 2/2
              </Text>

              <View style={{ top: "6%", width: "70%" }}>
                <Field
                  name={"email"}
                  style={styles.TextInput}
                  title="E-mail"
                  keyboardType="email-address"
                  component={InputField}
                  autoCapitalize="none"
                  isfocused={"#46C5F3"}
                />
                <View
                  style={{
                    alignContent: "stretch",
                    width: "100%"
                  }}
                >
                  <Field
                    name={"password"}
                    style={[{ width: "100%", paddingLeft: "10%" }]}
                    title="Senha"
                    secureTextEntry={this.state.password}
                    component={InputField}
                    autoCapitalize="none"
                    isfocused={"#46C5F3"}
                  />
                  <Icon
                    style={stylePage.icon}
                    name={this.state.icon}
                    size={dimensions(22)}
                    color="#fff"
                    onPress={() => this.changeIcon()}
                  />
                </View>
                <Field
                  name={"confirmPassword"}
                  title="Confirmar senha"
                  secureTextEntry={this.state.password}
                  component={InputField}
                  autoCapitalize="none"
                  isfocused={"#46C5F3"}
                  style={[{ width: "100%", paddingLeft: "10%" }]}
                />
              </View>

              <View style={{ width: "100%", marginBottom: "-25%" }}>
                <RoundButton
                  disabled={invalid}
                  style={[styles.Btn, styles.btnRegister, { top: "15%" }]}
                  name="Continuar"
                  onPress={handleSubmit(data => this.goLoginPicture(data))}
                />
              </View>
            </View>
          </Container>
        </KeyboardAwareScrollView>
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
