import React, { Component } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import { Field, reduxForm } from "redux-form";
import { Chip } from "react-native-paper";

import { registerAgencies, decodeToken } from "~/shared/services/freela.http";
import FormValidator from "~/shared/services/validator";
import InputMask from "~/shared/components/InputMask";
import DropdownAlert from "react-native-dropdownalert";
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
  };

  click = (e, index) => {
    const buttons = Service;
    const buttonSelected = buttons[index - 1];
    buttonSelected.isSelected = !buttonSelected.isSelected;
    this.setState(prev => ({ ...prev, buttons }));

    const name = buttons.filter(c => c.isSelected === true).map(c => c.name);
    this.setState({ jobs: name });
  };

  render() {
    const { handleSubmit, invalid } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            position: "absolute",
            marginTop: "-20%"
          }}
        >
          <DropdownAlert
            ref={ref => (this.dropDownAlertRef = ref)}
            defaultContainer={{
              padding: 8,
              paddingTop: StatusBar.currentHeight,
              flexDirection: "row"
            }}
          />
        </View>
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
