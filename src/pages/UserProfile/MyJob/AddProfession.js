import React, { Component } from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";

import { Chip } from "react-native-paper";
import InputLabel from "~/shared/components/InputLabel";
import add from "~/assets/images/icon_add.png";
import ActionButton from "~/shared/components/ActionButton";
import Modal from "~/shared/components/ModalComponent";
import RoundButton from "~/shared/components/RoundButton";
import { Field, reduxForm } from "redux-form";
import profession from "./Jobs";

import AsyncStorage from "@react-native-community/async-storage";
import { jobsExists, decodeToken } from "~/shared/services/freela.http";

class AddProfession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      search: ""
    };
  }

  setModalViisible(status) {
    this.setState({ modalVisible: status });
  }
  debugger;
  async componentDidMount() {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    jobsExists(token.id)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(error => {
        debugger;
        console.log(error.response.data);
      });
    debugger;
  }
  click = (e, index) => {
    const buttons = profession;
    const buttonSelected = buttons[index - 1];
    buttonSelected.isSelected = !buttonSelected.isSelected;
    this.setState(prev => ({ ...prev, buttons }));

    const name = buttons.filter(c => c.isSelected === true).map(c => c.name);
    this.setState({ jobs: name });
    debugger;
  };

  // SearchFilterFunction(text) {
  //   //passing the inserted text in textinput
  //   const newData = profession.filter(function(item) {
  //     //applying filter for the inserted text in search bar
  //     const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
  //     const textData = text.toUpperCase();
  //     return itemData.indexOf(textData) > -1;
  //   });
  //   this.setState({
  //     //setting the filtered newData on datasource
  //     //After setting the data it will automatically re-render the view
  //     dataSource: newData,
  //     text: text
  //   });
  //   debugger;
  // }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.containerJob}>
            <Text style={{ color: "#FFF", fontSize: 30, paddingBottom: "2%" }}>
              Profissão
            </Text>

            <Text
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: 20,
                position: "absolute",
                left: "90%",
                top: "1.5%"
              }}
            >
              0/3
            </Text>

            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                width: "100%"
              }}
            >
              {profession.map(({ name, id, isSelected }) => (
                <Chip
                  key={id}
                  style={[
                    styles.chip,
                    isSelected == true ? styles.chipActive : styles.chipDisabled
                  ]}
                  onPress={e => this.click(e, id)}
                  textStyle={{ color: "#FFF", paddingRight: "4%" }}
                >
                  {name}
                </Chip>
              ))}
            </View>
            <View style={[styles.containerText]}>
              <Text style={styles.title}>
                Nenhuma Profissão{"\n"}foi selecionada
              </Text>
              <Text style={styles.subtitle}>
                Se a sua profissão não está{"\n"}
                disponível acima.{"\n"}
                Adicione usando o{' " '}
                <Image source={add} style={{ width: 20, height: 20 }} />
                {' " '}
                abaixo
              </Text>
            </View>
          </View>
          <View
            style={{
              alignContent: "stretch",
              alignItems: "flex-end",
              marginTop: "80%",
              justifyContent: "flex-end",
              marginHorizontal: "10%"
            }}
          >
            <View style={{ position: "absolute" }}>
              <ActionButton
                onPress={() => {
                  this.setState({ visible: true });
                }}
              />
            </View>
          </View>
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
                onChangeText={text => this.SearchFilterFunction(text)}
                value={this.state.text}
                title="Profissão"
                style={{ width: "90%", height: 50, borderColor: "#7541BF" }}
              />
            </View>
            <View style={{ alignItems: "center", top: "10%" }}>
              <RoundButton
                style={{
                  backgroundColor: "#7541BF",
                  width: "50%",
                  height: "80%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50
                }}
                name="Adicionar"
              />
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F",
    width: "100%"
  },
  containerJob: {
    marginHorizontal: "10%"
  },
  containerText: {
    marginTop: "10%",
    marginHorizontal: "10%",
    paddingVertical: "5%"
  },
  title: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 25,
    lineHeight: 40
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 17.8,
    textAlign: "center",
    top: "8%",
    lineHeight: 40
  },
  chip: {
    backgroundColor: "#6C757D",
    margin: "1.5%"
  },
  chipActive: {
    backgroundColor: "#865FC0"
  },
  chipDisabled: {
    backgroundColor: "#737082"
  }
});

export default AddProfession = reduxForm({
  form: "AddProfession",
  enableReinitialize: true
})(AddProfession);
