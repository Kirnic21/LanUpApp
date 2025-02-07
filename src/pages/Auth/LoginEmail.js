import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/MaterialIcons";
import { login, resetPassword } from "~/shared/services/auth.http";
import { decodeToken } from "~/shared/services/decode";
import ImageBack from "~/assets/images/Grupo_518.png";
import Logo from "~/assets/images/logoLanUp.png";
import InputField from "~/shared/components/InputField";
import { Field, reduxForm } from "redux-form";
import FormValidator from "~/shared/services/validator";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container } from "@gluestack-ui/themed-native-base";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions/index";
import ModalForgotPassword from "./ModalForgotPassword";
import ButtonLoading from "~/shared/components/Button";
import { useContext } from "react";
import {AuthContext} from "../../index"
const formRules = FormValidator.make(
  {
    email: "required|email",
    password: "required",
  },
  {
    email: ("E-mail é obrigatório", "Digite um endereço de email válido!"),
    password: "Senha é obrigatória",
  }
);

const LoginEmail = ({ handleSubmit, invalid }) => {
  const [icon, setIcon] = useState("visibility-off");
  const [password, setPassword] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState("");
const { signIn } = useContext(AuthContext);
  const goToLoginPerfil = async (form) => {

    const { email, password } = form;
    const deviceId = await AsyncStorage.getItem("DEVICE_ID");


    setSpinner(true);
    try {
      const response = await login({
        login: email,
        password,
        deviceId,
      });

      const { data } = response;
      const token = decodeToken(data.result.token);

      if (token.userType === "1") {
await AsyncStorage.setItem("API_TOKEN", data.result.token);
        signIn(data.result.token);
      } else {
        AlertHelper.show(
          "error",
          "Erro",
          "Apenas freelancer pode acessar o App."
        );
      }
    } catch (error) {
      console.error(error);
      AlertHelper.show("error", "Erro", error.response.data.errorMessage);
    } finally {
      setSpinner(false);
    }
  };

  const changeIcon = () => {
    setIcon(icon === "visibility" ? "visibility-off" : "visibility");
    setPassword(!password);
  };

  const resetPassword = () => {
    setLoading(true);
    resetPassword(email)
      .then(() => {
        setVisible(false);
        AlertHelper.show("success", "Sucesso", "Email enviado com sucesso!");
      })
      .catch(() => {
        setTitleError("Este e-mail não está cadastrado.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const { width, height } = Dimensions.get("screen");

  return (
    <ImageBackground source={ImageBack} style={{ width, height, flex: 1 }}>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <Container
          style={{
            backgroundColor: "transparent",
            height: height - dimensions(90),
          }}
        >
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                source={Logo}
                style={{ width: dimensions(220), height: dimensions(65) }}
              />
            </View>
            <View style={styles.containerForm}>
              <View style={{ alignContent: "stretch", width: "90%" }}>
                <Field
                  style={{ width: "100%" }}
                  title="E-mail"
                  keyboardType="email-address"
                  component={InputField}
                  name={"email"}
                  isfocused={"#A893F2"}
                  autoCapitalize="none"
                  testID="br.com.lanup.app:id/input-email"
                />

                <View
                  style={{
                    alignContent: "stretch",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <Field
                    style={[{ width: "100%" }]}
                    title="Senha"
                    secureTextEntry={password}
                    component={InputField}
                    name={"password"}
                    isfocused={"#A893F2"}
                    autoCapitalize="none"
                    testID="br.com.lanup.app:id/input-password"
                  />
                  <Icon
                    style={styles.icon}
                    name={icon}
                    size={dimensions(24)}
                    color="#fff"
                    onPress={changeIcon}
                    testID="br.com.lanup.app:id/input-password-eye-icon"
                  />
                </View>
              </View>
              <View style={{ width: "60%", marginTop: calcWidth(5) }}>
                <ButtonLoading
                  disabled={invalid}
                  loading={!spinner}
                  color="#7541bf"
                  cliclButtonColor="#EB4886"
                  name="Entrar"
                  size="small"
                  onPress={handleSubmit(goToLoginPerfil)}
                />
              </View>
            </View>
          </View>
          <ModalForgotPassword
            visible={visible}
            loading={loading}
            disabledButton={disabled}
            titleError={titleError}
            onPress={resetPassword}
            onChangeText={(email) => {
              setEmail(email);
              setDisabled(!email);
              setTitleError("");
            }}
            onClose={() => {
              setVisible(false);
              setTitleError("");
              setDisabled(true);
            }}
          />
        </Container>
        <View style={{ width: "100%" }}>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
          >
            <Text
              style={styles.textForgot}
              testID="br.com.lanup.app:id/input-forgot-password"
            >
              Esqueci minha senha
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logoContainer: {
    width: "100%",
    height: "37%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  containerForm: {
    width: "80%",
    marginHorizontal: "10%",
    alignItems: "center",
    height: "50%",
  },
  Btn: {
    backgroundColor: "#7541bf",
  },
  textBtn: {
    color: "#FFF",
    fontSize: adjust(13),
    textAlign: "center",
    padding: "15%",
  },
  textForgot: {
    color: "#46C5F3",
    textDecorationLine: "underline",
    textAlign: "center",
    fontSize: adjust(14),
    letterSpacing: 0.5,
  },
  icon: {
    bottom: "30%",
    right: "8%",
    position: "absolute",
  },
  inputModal: {
    height: dimensions(43),
    borderColor: "#865FC0",
  },
});

export default reduxForm({
  form: "LoginEmail",
  validate: formRules,
  enableReinitialize: true,
})(LoginEmail);
