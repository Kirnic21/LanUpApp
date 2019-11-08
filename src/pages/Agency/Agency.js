import React, { Component } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import { Field, reduxForm } from "redux-form";
import { Chip } from "react-native-paper";
import Icon from "../../assets/images/icon_add.png";

import {
  registerAgencies,
  decodeToken
} from "../../shared/services/freela.http";
import FormValidator from "~/shared/services/validator";
import InputMask from "~/shared/components/InputMask";
import Modal from "~shared/components/ModalComponent";
import Service from "./services";

const formRules = FormValidator.make(
  {
    cep: "required",
    cnpj: "required",
    jobs: "required"
  },
  {
    cep: "cep é obrigatório",
    cnpj: "cnpj é obrigatório"
  }
);

class Agency extends Component {
  state = {
    jobs: [],
    bg: "#737082",
    visible: false
  };

  openIAnAgency = () => {
    this.props.navigation.navigate("UserProfile");
  };

  SaveAgency = async form => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    const { jobs } = this.state;
    const { cep, cnpj } = form;
    registerAgencies({
      id: token.id,
      cep,
      cnpj,
      jobs
    })
      .then(({ data }) => {
        console.log("passou");
        if (data.isSuccess) {
          AsyncStorage.setItem(JSON.stringify(data));
          console.log(data);
          alert("cadastrado");
        }
      })
      .catch(error => {
        this.dropDownAlertRef.alertWithType(
          "error",
          "Erro",
          error.response.data.errorMessage
        );
        console.log(error.response.data);
      });
    debugger;
  };

  click = (e, index) => {
    const buttons = Service;
    const buttonSelected = buttons[index - 1];
    const name = buttonSelected.name;
    this.setState({ jobs: [...this.state.jobs, name] });
    buttonSelected.isSelected = !buttonSelected.isSelected;
    this.setState(prev => ({ ...prev, buttons }));
  };

  render() {
    const { handleSubmit, invalid } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.Formcontainer}>
            <Text style={{ color: "#FFF", fontSize: 17, marginBottom: "5%" }}>
              Informações da Agência
            </Text>
            <Field
              style={{ width: "100%" }}
              title="CNPJ"
              component={InputMask}
              name="cnpj"
              keyboardType="numeric"
              mask="[00].[000].[000]/[0000]-[00]"
            />
            <Field
              style={{ width: "100%" }}
              title="CEP"
              name="cep"
              keyboardType="numeric"
              component={InputMask}
              mask="[00000]-[000]"
            />
          </View>
          <View
            style={{
              backgroundColor: "#24203B",
              borderRadius: 15,
              marginTop: "3%"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                top: "3%",
                paddingHorizontal: "5%"
              }}
            >
              <Text style={{ color: "white", fontSize: 17 }}>Serviços</Text>
            </View>
            <FlatList
              contentContainerStyle={styles.FlatListContainer}
              data={Service}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "column",
                    margin: "2%"
                  }}
                >
                  <Chip
                    textStyle={{ color: "#FFF" }}
                    style={[
                      styles.chip,
                      item.isSelected == true
                        ? styles.chipActive
                        : styles.chipDisabled
                    ]}
                    onPress={e => this.click(e, item.id)}
                  >
                    {item.name}
                  </Chip>
                </View>
              )}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={styles.AddService}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ visible: true });
              }}
            >
              <Image
                source={Icon}
                style={{
                  width: 25,
                  height: 25,
                  top: "50%",
                  marginHorizontal: "5%"
                }}
              />
              <Text style={styles.AddServiceText}>Adicionar Serviços</Text>
            </TouchableOpacity>
            <Modal
              onTouchOutside={() => {
                this.setState({ visible: false });
              }}
              visible={this.state.visible}
            >
              <Text style={{ color: "#FFF", padding: "5%", fontSize: 30 }}>
                Adicionar
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  left: "5%",
                  top: "10%"
                }}
              >
                <InputLabel
                  onChangeText={event => this.getInput(event, "skill")}
                  title="Serviço"
                  style={{ width: 325, height: 50, borderColor: "#865FC0" }}
                />
              </View>
              <View style={{ alignItems: "center", top: "-10%" }}>
                <RoundButton
                  style={{
                    backgroundColor: "#865FC0",
                    width: "50%",
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 50
                  }}
                  name="Adicionar"
                  onPress={this.state.teste}
                />
              </View>
            </Modal>
          </View>
          <View style={{ marginTop: "10%", alignItems: "center" }}>
            <TouchableOpacity
              disabled={invalid}
              style={
                invalid
                  ? { ...styles.BtnConcluir, ...styles.BtnDisabled }
                  : styles.BtnConcluir
              }
              onPress={handleSubmit(data => this.SaveAgency(data))}
            >
              <Text>Concluir</Text>
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
  Formcontainer: {
    backgroundColor: "#24203B",
    width: "100%",
    padding: "5%",
    borderRadius: 15
  },
  FlatListContainer: {
    marginVertical: "1%",
    padding: "5%",
    paddingVertical: "6%",
    top: "-4%",
    marginHorizontal: "-2%"
  },
  AddService: {
    top: "1%",
    borderRadius: 15,
    backgroundColor: "#24203B",
    justifyContent: "center",
    paddingVertical: "5%"
  },
  AddServiceText: {
    color: "#865FC0",
    fontSize: 15,
    marginHorizontal: "15%"
  },
  chip: {
    width: "100%"
  },
  chipActive: {
    backgroundColor: "#865FC0"
  },
  chipDisabled: {
    backgroundColor: "#737082"
  },
  Btn: {
    justifyContent: "center",
    padding: 20
  },
  BtnDisabled: {
    backgroundColor: "#6C757D"
  },
  BtnConcluir: {
    backgroundColor: "#865FC0",
    width: 250,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50
  }
});

export default Agency = reduxForm({
  form: "Agency",
  validate: formRules,
  enableReinitialize: true
})(Agency);
