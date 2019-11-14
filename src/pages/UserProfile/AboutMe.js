import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Picker
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ToggleSwitch from "toggle-switch-react-native";
import ImageProfile from "../../assets/images/backgroud.png";
import Box from "~/shared/components/Box";
import ImageBody from "~/assets/images/icon_addbody.png";
import ImageSelf from "~/assets/images/icon_addselfie.png";
import InputLabel from "~/shared/components/InputLabel";
import { Field, reduxForm } from "redux-form";
import InputField from "~/shared/components/InputField";
import FormValidator from "~/shared/services/validator";

import AddIcon from "~/assets/images/icon_add.png";
import { Switch } from "react-native-paper";

const BoxItem = [
  {
    id: 1,
    icon: ImageSelf,
    onPress: this.SelectedInput
  },
  {
    id: 2,
    icon: ImageSelf,
    onPress: this.SelectedInput
  },
  {
    id: 3,
    icon: ImageBody,
    onPress: this.SelectedInput
  },
  {
    id: 4,
    icon: ImageBody,
    onPress: this.SelectedInput
  }
];

const formRules = FormValidator.make({
  FullName: "required"
});

class AboutMe extends Component {
  state = {
    isSwitchOn: false
  };

  render() {
    const { isSwitchOn } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.containerAvatar}>
            <TouchableOpacity style={{ width: 100 }}>
              <Image
                source={ImageProfile}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  borderColor: "#FFB72B",
                  borderWidth: 2
                }}
              />
              <Image
                source={AddIcon}
                style={{ width: 25, height: 25, top: "-18%", left: "70%" }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.informationProfile}>
            <Text style={{ color: "#FFF", fontSize: 16, paddingBottom: "7%" }}>
              Informações do Perfil
            </Text>
            <Field
              style={{ width: "100%" }}
              title="Nome Completo"
              component={InputField}
              name={"fullName"}
            />
            <Field
              style={{ width: "100%" }}
              title="Apelido"
              component={InputField}
              name={"nickname"}
            />
            <Field
              style={{
                width: "100%",
                height: 140,
                borderRadius: 30,
                textAlignVertical: "top",
                paddingVertical: "5%"
              }}
              title="Descrição"
              component={InputField}
              name={"description"}
              multiline={true}
              numberOfLines={10}
            />
            <View
              style={{
                alignContent: "stretch",
                width: "100%"
              }}
            >
              <Field
                style={{
                  width: "32%"
                }}
                title="Altura"
                component={InputField}
                name={"height"}
              />
              <View
                style={{
                  position: "absolute",
                  left: "34%",

                  width: "32%"
                }}
              >
                <Field
                  style={{
                    width: "100%"
                  }}
                  title="Peso"
                  component={InputField}
                  name={"weight"}
                />
              </View>
              <View
                style={{
                  borderColor: "#FFF",
                  borderWidth: 2,
                  width: "32%",
                  borderRadius: 25,
                  position: "absolute",
                  left: "68%",
                  height: 46,
                  top: 20
                }}
              >
                <Text style={{ top: -23, color: "#FFF" }}>Manequim</Text>
                <Picker
                  selectedValue={this.state.language}
                  style={{
                    width: "100%",
                    color: "#fff",
                    top: "-55%"
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                  }
                >
                  <Picker.Item label="P" value="P" />
                  <Picker.Item label="M" value="M" />
                  <Picker.Item label="G" value="G" />
                  <Picker.Item label="GG" value="GG" />
                </Picker>
              </View>
            </View>
            <Text style={{ marginBottom: "5%", color: "#FFF", fontSize: 15 }}>
              Tenho:
            </Text>
            <View style={styles.containerSwitch}>
              <Text style={{ color: "#FFF", fontSize: 15 }}>
                Vestimenta profissional
              </Text>
              <Switch
                style={{ marginLeft: 103.9 }}
                value={isSwitchOn}
                color="#483D8B"
                onValueChange={() => {
                  this.setState({ isSwitchOn: !isSwitchOn });
                }}
              />
            </View>
            <View style={[styles.containerSwitch, { top: "5%" }]}>
              <Text style={{ color: "#FFF", fontSize: 15 }}>
                Transporte próprio
              </Text>
              <Switch
                style={{
                  marginLeft: 138
                }}
                value={isSwitchOn}
                color="#483D8B"
                onValueChange={() => {
                  this.setState({ isSwitchOn: !isSwitchOn });
                }}
              />
            </View>
            <View style={[styles.containerSwitch, { top: "10%" }]}>
              <Text style={{ color: "#FFF", fontSize: 15 }}>
                Problema de saúde
              </Text>
              <Switch
                style={{
                  marginLeft: 133
                }}
                value={isSwitchOn}
                color="#483D8B"
                onValueChange={() => {
                  this.setState({ isSwitchOn: !isSwitchOn });
                }}
              />
            </View>
            <View style={[styles.containerSwitch, { top: "15%" }]}>
              <Text style={{ color: "#FFF", fontSize: 15 }}>
                Costume de fumar
              </Text>
              <Switch
                style={{
                  marginLeft: 137.5
                }}
                value={isSwitchOn}
                color="#483D8B"
                onValueChange={() => {
                  this.setState({ isSwitchOn: !isSwitchOn });
                }}
              />
            </View>
          </View>
          <View style={styles.containerLocation}>
            <Text style={{ color: "#FFF", fontSize: 16, paddingBottom: "7%" }}>
              Localização
            </Text>
            <Field
              style={{ width: "100%" }}
              component={InputField}
              name={"location"}
            />
          </View>
          <View style={styles.containerPresentationPhoto}>
            <Text style={{ color: "#FFF", fontSize: 16, paddingBottom: "3%" }}>
              Fotos de apresentação
            </Text>
            <Text style={{ color: "#ffffffad", paddingBottom: "6%" }}>
              2 de perfil (sozinho) e 2 de corpo inteiro
            </Text>
            <View style={{ flexDirection: "row" }}>
              {BoxItem.map(({ icon, id, onPress }) => (
                <TouchableOpacity
                  key={id}
                  onPress={onPress}
                  style={styles.thumbnail}
                >
                  <Image source={icon} style={styles.photo} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.containerInformationPrivade}>
            <Text style={{ color: "#FFF", fontSize: 16, paddingBottom: "7%" }}>
              Informações Privadas
            </Text>
            <Field
              style={{ width: "100%" }}
              title="E-mail"
              component={InputField}
              name={"email"}
            />
            <Field
              style={{ width: "100%" }}
              title="Telefone"
              component={InputField}
              name={"phone"}
            />

            <View
              style={{
                alignContent: "stretch"
              }}
            >
              <Field
                style={{ width: "47%" }}
                title="Nascimento"
                component={InputField}
                name={"birthday"}
              />
              <View
                style={{
                  borderColor: "#FFF",
                  borderWidth: 2,
                  width: "47%",
                  position: "absolute",
                  borderRadius: 25,
                  height: 45,
                  top: 20,
                  left: "53%"
                }}
              >
                <Text style={{ top: -23, color: "#FFF" }}>Gênero</Text>
                <Picker
                  selectedValue={this.state.language}
                  style={{
                    width: "100%",
                    color: "#fff",
                    top: "-55%"
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                  }
                >
                  <Picker.Item label="Masculino" value="Masculino" />
                  <Picker.Item label="Feminino" value="Feminino" />
                </Picker>
              </View>
            </View>
          </View>
          <View style={styles.containerInformationBank}>
            <Text style={{ color: "#FFF", fontSize: 16, paddingBottom: "7%" }}>
              Informações Bancárias
            </Text>
            <View style={{ alignContent: "stretch" }}>
              <Field
                style={{ width: "47%" }}
                title="Banco"
                component={InputField}
                name={"bank"}
              />
              <View
                style={{ position: "absolute", width: "100%", left: "53%" }}
              >
                <Field
                  style={{ width: "47%" }}
                  title="Agência"
                  component={InputField}
                  name={"agency"}
                />
              </View>
            </View>
            <Field
              style={{ width: "100%" }}
              title="Conta Corrente"
              component={InputField}
              name={"checkingAccount"}
            />
            <Field
              style={{ width: "100%" }}
              title="CPF/CNPJ"
              component={InputField}
              name={"cpfCnpj"}
            />
            <Field
              style={{ width: "100%" }}
              title="Nome"
              component={InputField}
              name={"name"}
            />
          </View>
          <View style={styles.containerBtn}>
            <TouchableOpacity
              style={{
                borderColor: "#FFF",
                borderWidth: 2,
                padding: 24,
                width: "70%",
                alignItems: "center",
                borderRadius: 25
              }}
            >
              <Text style={{ color: "#FFF", top: -10 }}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F",
    width: "100%",
    alignItems: "center"
  },
  ScrollView: {
    width: "100%",
    paddingHorizontal: "5%"
  },
  containerAvatar: {
    alignItems: "center"
  },
  informationProfile: {
    backgroundColor: "#24203B",
    padding: "5%",
    borderRadius: 15,
    paddingBottom: "18%"
  },
  containerSwitch: {
    flexDirection: "row",
    width: "92%"
  },
  containerLocation: {
    backgroundColor: "#24203B",
    marginTop: "3%",
    padding: "5%",
    borderRadius: 15
  },
  containerPresentationPhoto: {
    backgroundColor: "#24203B",
    marginTop: "3%",
    padding: "7%",
    borderRadius: 15
  },
  thumbnail: {
    width: "22%",
    height: 65,
    paddingVertical: "1%",
    marginRight: "4%"
  },
  photo: {
    width: "100%",
    height: "100%",
    borderColor: "#FFF",
    borderWidth: 2,
    borderRadius: 5
  },
  containerInformationPrivade: {
    backgroundColor: "#24203B",
    marginTop: "3%",
    padding: "5%",
    borderRadius: 15
  },
  containerInformationBank: {
    backgroundColor: "#24203B",
    marginTop: "3%",
    padding: "5%",
    borderRadius: 15
  },
  containerBtn: {
    width: "100%",
    alignItems: "center",
    marginTop: "3%",
    padding: "5%"
  }
});

export default AboutMe = reduxForm({
  form: "AboutMe",
  validate: formRules,
  enableReinitialize: true
})(AboutMe);
