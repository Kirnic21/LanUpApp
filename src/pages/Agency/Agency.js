import React, { Component } from "react";
import { FlatList } from "react-native-gesture-handler";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";

import Icon from "../../assets/images/icon_add.png";

import InputField from "~/shared/components/InputField";

import AsyncStorage from "@react-native-community/async-storage";
import {
  registerAgencies,
  decodeToken
} from "../../shared/services/freela.http";
import { Field, reduxForm } from "redux-form";
import FormValidator from "~/shared/services/validator";
import { Chip } from "react-native-paper";

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
    bg: "#737082"
  };

  openIAnAgency = () => {
    this.props.navigation.navigate("UserProfile");
  };

  SaveAgency = async form => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    const jobs = this.state.jobs;
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
        console.log(error.response.data);
      });
    debugger;
  };

  handlePress = text => {
    this.setState({ jobs: [...this.state.jobs, text] });
  };

  render() {
    const { handleSubmit, invalid } = this.props;
    return (
      <View style={styles.Container}>
        <View
          style={[styles.ContainerAgency, styles.width, styles.backColorCard]}
        >
          <Text style={{ color: "#FFF", fontSize: 17 }}>
            Informações da Agência
          </Text>
          <View style={{ alignItems: "center", top: "10%" }}>
            <Field
              style={{ width: 300, height: 50 }}
              title="CNPJ"
              component={InputField}
              name={"cnpj"}
            />
            <Field
              style={{ width: 300, height: 50 }}
              title="CEP"
              name={"cep"}
              component={InputField}
            />
          </View>
        </View>

        <View
          style={[styles.ContainerService, styles.width, styles.backColorCard]}
        >
          <FlatList
            data={[
              {
                key: "1",
                title: "Serviços"
              }
            ]}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text
                    style={{ color: "white", fontSize: 17, marginRight: 10 }}
                  >
                    {item.title}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    maxWidth: 400,
                    margin: 0,
                    flexWrap: "wrap"
                  }}
                >
                  <View>
                    <Chip
                      textStyle={{ color: "#FFF" }}
                      style={styles.chip}
                      onPress={() => this.handlePress("Bartender")}
                    >
                      Bartender
                    </Chip>
                  </View>
                  <View>
                    <Chip
                      textStyle={{ color: "#FFF" }}
                      style={styles.chip}
                      onPress={() => this.handlePress("Cozinha")}
                    >
                      Cozinha
                    </Chip>
                  </View>
                  <View>
                    <Chip
                      textStyle={{ color: "#FFF" }}
                      style={styles.chip}
                      onPress={() => this.handlePress("Recepção")}
                    >
                      Recepção
                    </Chip>
                  </View>
                  <View>
                    <Chip
                      textStyle={{ color: "#FFF" }}
                      style={styles.chip}
                      onPress={() => this.handlePress("Caixa")}
                    >
                      Caixa
                    </Chip>
                  </View>
                  <View>
                    <Chip
                      textStyle={{ color: "#FFF" }}
                      style={styles.chip}
                      onPress={() => this.handlePress("Garçom")}
                    >
                      Garçom
                    </Chip>
                  </View>
                  <View>
                    <Chip
                      textStyle={{ color: "#FFF" }}
                      style={styles.chip}
                      onPress={() => this.handlePress("Serviços Gerais")}
                    >
                      Serviços Gerais
                    </Chip>
                  </View>
                  <View>
                    <Chip
                      textStyle={{ color: "#FFF" }}
                      style={styles.chip}
                      onPress={() => this.handlePress("DJ")}
                    >
                      DJ
                    </Chip>
                  </View>
                  <View>
                    <View>
                      <Chip
                        textStyle={{ color: "#FFF" }}
                        style={styles.chip}
                        onPress={() => this.handlePress("Animador de Festa")}
                      >
                        Animador de Festa
                      </Chip>
                    </View>
                  </View>
                  <View />
                </View>
              </View>
            )}
            keyExtractor={item => item.key}
          />
        </View>
        <View style={[styles.btnContainer, styles.backColorCard, styles.width]}>
          <TouchableOpacity style={[styles.Btn, styles.width]}>
            <Image
              source={Icon}
              style={{ width: 25, height: 25, top: "30%" }}
            />
            <Text style={styles.btnText}>Adicionar Serviços</Text>
          </TouchableOpacity>
        </View>
        <View style={{ top: "15%" }}>
          <TouchableOpacity
            disabled={invalid}
            style={
              invalid
                ? { ...styles.BtnConcluir, ...styles.BtnDisabled }
                : styles.Btn
            }
            onPress={handleSubmit(data => this.SaveAgency(data))}
          >
            <Text>Concluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#18142F",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: Dimensions.get("window").height + 50
  },
  ContainerAgency: {
    height: Dimensions.get("window").height - 530,
    justifyContent: "flex-start",
    padding: 15,
    top: "6%",
    borderRadius: 15
  },
  ContainerService: {
    height: Dimensions.get("window").height - 580,
    top: "7.5%",
    borderRadius: 15
  },
  btnContainer: {
    height: Dimensions.get("window").height - 700,
    top: "8.5%",
    borderRadius: 15
  },
  Btn: {
    height: Dimensions.get("window").height - 700,
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
  },
  item: {
    padding: 20,
    fontSize: 18
  },
  TextBorder: {
    color: "white",
    paddingBottom: 10,
    borderRadius: 50,
    width: 90,
    height: 32,
    paddingTop: 5,
    textAlign: "center",
    flexWrap: "wrap",
    margin: 3
  },
  btnText: {
    color: "#865FC0",
    textAlign: "center",
    top: "-35%",
    left: "-15%",
    fontSize: 15
  },
  width: {
    width: Dimensions.get("window").width - 50
  },
  backColorCard: {
    backgroundColor: "#24203B"
  },
  chip: {
    margin: 5,
    backgroundColor: "#737082"
  }
});

export default Agency = reduxForm({
  form: "Agency",
  validate: formRules,
  enableReinitialize: true
})(Agency);
