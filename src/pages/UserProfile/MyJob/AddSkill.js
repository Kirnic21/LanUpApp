import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import ActionButton from "~/shared/components/ActionButton";
import Modal from "~/shared/components/ModalComponent";
import { ScrollView } from "react-native-gesture-handler";
import { decodeToken, updateSkills } from "~/shared/services/freela.http";
import AsyncStorage from "@react-native-community/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/FontAwesome";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import InputModal from "~/shared/components/InputModal";
import AddSkillEmpty from "~/shared/components/emptyState/AddSkillEmpty";

import dimensions from "~/assets/Dimensions/index";

class AddSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      bottomModalAndTitle: true,
      prevState: [],
      text: "",
      GetSkill: this.props.navigation.state.params.GetSkill
    };
  }

  componentDidMount() {
    const { GetSkill } = this.state;
    const active = GetSkill.length ? true : false;
    this.props.navigation.setParams({
      handleSave: () => this.SaveSkill(),
      editingSave: () => this.editing(),
      active
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const isEditing = navigation.getParam("isEditing");
    const active = navigation.getParam("active");
    return {
      headerRight: isEditing ? (
        <View>
          <TouchableOpacity
            style={{ paddingHorizontal: dimensions(23) }}
            onPress={() => state.params.handleSave()}
          >
            <Text
              style={{
                color: "#FFF",
                fontFamily: "HelveticaNowMicro-Regular",
                fontSize: dimensions(12)
              }}
            >
              Salvar
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View pointerEvents={active ? "auto" : "none"}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              onPress={() => state.params.editingSave()}
              name={"pencil"}
              size={dimensions(22)}
              style={{
                paddingHorizontal: dimensions(23),
                opacity: active ? 1 : 0
              }}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      )
    };
  };

  editing = () => {
    this.props.navigation.setParams({
      isEditing: true
    });
  };

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

    this.props.navigation.setParams({
      active: true
    });

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
    const active = skills.length ? true : false;

    this.props.navigation.setParams({
      active: active
    });

    this.props.navigation.setParams({
      isEditing: false
    });
    AlertHelper.show("success", "Sucesso", "Habilidade removida com sucesso!");
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
    const { btnOp, GetSkill, visible, text } = this.state;
    const isEditing = this.props.navigation.getParam("isEditing");
    return (
      <View style={styles.container}>
        {GetSkill.length ? (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              marginHorizontal: "5%"
            }}
          >
            <ScrollView>
              <Text style={styles.titleSkill}>Habilidades</Text>
              <View style={styles.containerChip}>
                {GetSkill.map((c, i) => (
                  <View
                    key={i}
                    style={{ marginRight: "1%", height: dimensions(38) }}
                  >
                    <View style={styles.chip}>
                      <MaterialCommunityIcons
                        name={"times-circle"}
                        onPress={() => {
                          this.handleDelete(c);
                        }}
                        size={dimensions(18)}
                        style={[
                          { top: "-15%", left: "80%" },
                          isEditing ? { opacity: 1 } : { opacity: 0 }
                        ]}
                        color="#FFFFFF"
                      />
                      <Text style={styles.textChip}>{c}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View style={styles.containerAction}>
              <ActionButton
                onPress={() => {
                  this.setState({ visible: true });
                }}
              />
            </View>
          </View>
        ) : (
          <AddSkillEmpty
            isEditing={isEditing}
            onPress={() => {
              this.setState({ visible: true });
            }}
          />
        )}
        <Modal
          onClose={() => this.setState({ visible: false })}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
          visible={visible}
          onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
        >
          <Text
            style={{
              color: "#FFF",
              paddingHorizontal: "5%",
              fontSize: dimensions(30),
              fontFamily: "HelveticaNowMicro-Medium"
            }}
          >
            Adicionar
          </Text>
          <View style={styles.containerModalInput}>
            <InputModal
              isfocused={"#46C5F3"}
              onChangeText={this.Skills}
              title="Habilidade"
              style={{ width: "91%", height: dimensions(40) }}
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
                  : { backgroundColor: "#6C757D" }
              ]}
              name="Adicionar"
              onPress={() => this.AddSkills(text)}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F"
  },

  chip: {
    backgroundColor: "#46C5F3",
    width: "100%",
    height: dimensions(30),
    borderRadius: 20
    // justifyContent: "center"
  },
  containerAction: {
    marginHorizontal: "-2%",
    alignItems: "flex-end",
    top: dimensions(-16)
  },
  containerChip: {
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%"
  },
  roundButton: {
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
    fontSize: dimensions(25),
    fontFamily: "HelveticaNowMicro-Regular",
    paddingVertical: "5.6%"
  },
  textChip: {
    color: "#18142F",
    paddingHorizontal: "1.9%",
    top: "-36%",
    fontSize: dimensions(12),
    fontFamily: "HelveticaNowMicro-Regular"
  }
});

export default AddSkill;
