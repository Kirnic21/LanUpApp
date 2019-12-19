import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";
import add from "~/assets/images/icon_add.png";
import ActionButton from "~/shared/components/ActionButton";
import Modal from "~/shared/components/ModalComponent";
import { ScrollView } from "react-native-gesture-handler";
import { Chip } from "react-native-paper";
import { decodeToken, updateSkills } from "~/shared/services/freela.http";
import AsyncStorage from "@react-native-community/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/FontAwesome";
import { Container, Header, Right } from "native-base";
import DropdownAlert from "react-native-dropdownalert";
import InputModal from "~/shared/components/InputModal";

import normalize from "~/assets/FontSize/index";

class AddSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      bottomModalAndTitle: true,
      prevState: [],
      show: true,
      btnShow: 1,
      text: "",
      GetSkill: this.props.navigation.state.params.GetSkill
    };
  }

  Skills = t => {
    const text = t.trim();
    this.setState({ text });
  };

  AddSkills = async skill => {
    this.setState({
      GetSkill: [...this.state.GetSkill, skill],
      visible: false,
      text: ""
    });
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    const skills = this.state.GetSkill;
    updateSkills({ id: token.id, skills })
      .then(({ data }) => {
        if (data.isSuccess) {
          console.log(data.result);
        }
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  handleDelete = c => {
    const GetSkill = this.state.GetSkill;
    const Deleteskills = [c];
    const arr = GetSkill.filter(item => !Deleteskills.includes(item));
    this.setState({ GetSkill: arr });
  };

  SaveSkill = async () => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    const skills = this.state.GetSkill;
    this.setState({ btnShow: 1 });
    this.dropDownAlertRef.alertWithType(
      "success",
      "Sucesso",
      "Habilidade removida com sucesso!"
    );
    updateSkills({ id: token.id, skills })
      .then(({ data }) => {
        if (data.isSuccess) {
          console.log(data.result);
          this.setState({ text: "" });
        }
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  render() {
    const { btnOp, show, GetSkill, visible, btnShow, text } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              position: "absolute"
            }}
          >
            <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
          </View>
          <Container style={{ backgroundColor: "transparent", height: "10%" }}>
            <Header style={{ backgroundColor: "transparent", elevation: 0 }}>
              <StatusBar backgroundColor="#18142F" />
              {show === true ? (
                <Right style={{ marginHorizontal: "5%" }}>
                  <View pointerEvents={GetSkill.length ? "auto" : "none"}>
                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        onPress={() => {
                          this.setState({ show: false, btnShow: 0 });
                        }}
                        name={"pencil"}
                        size={26}
                        style={{ opacity: this.state.opIcon }}
                        color="#FFFFFF"
                      />
                    </TouchableOpacity>
                  </View>
                </Right>
              ) : (
                <Right style={{ marginHorizontal: "5%" }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ show: true }), this.SaveSkill();
                    }}
                  >
                    <Text style={{ color: "#FFF", fontSize: normalize(14) }}>
                      Salvar
                    </Text>
                  </TouchableOpacity>
                </Right>
              )}
            </Header>
          </Container>
          <View style={{ marginHorizontal: "10%" }}>
            <Text style={styles.titleSkill}>Habiliddades</Text>
          </View>
          {GetSkill.length ? (
            <View style={{ marginHorizontal: "10%" }}>
              <View style={styles.containerChip}>
                {GetSkill.map((c, i) => (
                  <View key={i} style={{ marginRight: "2%", height: 42 }}>
                    <Chip style={styles.chip} textStyle={styles.textChip}>
                      {c}
                    </Chip>
                    <MaterialCommunityIcons
                      name={"times-circle"}
                      onPress={() => {
                        this.handleDelete(c);
                      }}
                      size={18}
                      style={[
                        { top: "-90%", left: "85%" },
                        show === false ? { opacity: 1 } : { opacity: 0 }
                      ]}
                      color="#FFFFFF"
                    />
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <View
              style={[
                { marginTop: "45%" },
                show === false ? { opacity: 0 } : { opacity: 1 }
              ]}
            >
              <Text style={styles.title}>
                Não há nenhuma habilidade{"\n"}para ser exibida
              </Text>
              <Text style={styles.subtitle}>
                Adicione usando o{' " '}
                <Image source={add} style={{ width: 20, height: 20 }} />
                {' " '}
                abaixo
              </Text>
            </View>
          )}
          <Modal
            onTouchOutside={() => {
              this.setState({ visible: false });
            }}
            visible={visible}
            onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
          >
            <Text
              style={{ color: "#FFF", padding: "5%", fontSize: normalize(28) }}
            >
              Adicionar
            </Text>
            <View style={styles.containerModalInput}>
              <InputModal
                onChangeText={this.Skills}
                title="Habilidade"
                style={{ width: "91%", height: 50, borderColor: "#46C5F3" }}
              />
            </View>
            <View
              pointerEvents={text !== "" ? "auto" : "none"}
              style={{ alignItems: "center", top: "10%", opacity: btnOp }}
            >
              <RoundButton
                style={[
                  styles.roundButton,
                  text !== ""
                    ? { backgroundColor: "#46C5F3" }
                    : { backgroundColor: "#c1c2c3" }
                ]}
                name="Adicionar"
                onPress={() => this.AddSkills(text)}
              />
            </View>
          </Modal>
        </ScrollView>
        <View style={[styles.containerAction, { opacity: btnShow }]}>
          <ActionButton
            onPress={() => {
              this.setState({ visible: true });
            }}
          />
        </View>
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
  title: {
    color: "#FFF",
    textAlign: "center",
    fontSize: normalize(23),
    lineHeight: 42
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 17,
    textAlign: "center",
    top: "8%",
    lineHeight: 55
  },
  chip: {
    backgroundColor: "#46C5F3",
    width: "100%"
  },
  containerAction: {
    marginHorizontal: "5%",
    alignItems: "flex-end",
    top: "-2%"
  },
  containerChip: {
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%"
  },
  roundButton: {
    // backgroundColor: "#46C5F3",
    width: "50%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50
  },
  containerModalInput: {
    justifyContent: "center",
    alignItems: "flex-start",
    left: "5%",
    top: "10%"
  },
  titleSkill: {
    color: "#FFF",
    fontSize: normalize(23),
    paddingBottom: "5%"
  },
  textChip: {
    color: "#18142F",
    fontSize: normalize(13),
    paddingHorizontal: "0.5%"
  }
});

export default AddSkill;
