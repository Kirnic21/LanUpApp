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

const stylePage = {
  ...styles,
  icon: {
    left: "55%",
    top: "-25%",
    position: "relative"
  }
};

const formRules = FormValidator.make(
  {
    email: "required",
    password: "required",
    confirmPassword: "required"
  },
  {}
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

    this.props.navigation.push("LoginProfilePicture", {
      email,
      password,
      confirmPassword
    });
  };

  changeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === "visibility" ? "visibility-off" : "visibility",
      password: !prevState.password
    }));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <ImageBackground
        source={ImageBack}
        style={{
          width: Dimensions.get("window").width,
          // height: Dimensions.get('window').height,
          flex: 1
        }}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            top: "1%"
          }}
        >
          <View style={styles.registerContainer}>
            <View style={{ top: "2%" }}>
              <Text style={styles.textTitle}>
                Bem-vindo!{"\n"}
                Insira seus dados
              </Text>

              <Text style={stylePage.textSubtitle}>Etapa 2/2</Text>
            </View>
            <View style={{ top: "5%" }}>
              <Field
                name={"email"}
                style={styles.TextInput}
                title="E-mail"
                keyboardType="email-address"
                component={InputField}
              />
              <Field
                name={"password"}
                style={styles.TextInput}
                title="Senha"
                secureTextEntry={this.state.password}
                component={InputField}
              />
              <Field
                name={"confirmPassword"}
                style={styles.TextInput}
                title="Confirmar senha"
                secureTextEntry={this.state.password}
                fullWidth
                component={InputField}
              />
              <Icon
                style={[stylePage.icon, { top: "-46%" }]}
                name={this.state.icon}
                size={25}
                color="#fff"
                onPress={() => this.changeIcon()}
              />
              <Icon
                style={stylePage.icon}
                name={this.state.icon}
                size={25}
                color="#fff"
                onPress={() => this.changeIcon()}
              />
            </View>
            <RoundButton
              style={[stylePage.Btn, stylePage.btnRegister]}
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
