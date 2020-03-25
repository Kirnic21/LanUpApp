import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ActionButton from "~/shared/components/ActionButton";
import {
  ScrollView,
  TouchableNativeFeedback
} from "react-native-gesture-handler";
import { decodeToken, updateSkills } from "~/shared/services/freela.http";
import AsyncStorage from "@react-native-community/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/FontAwesome";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import AddSkillEmpty from "~/shared/components/emptyState/AddSkillEmpty";
import dimensions, { calcWidth } from "~/assets/Dimensions/index";
import ModalAddSkill from "./ModalAddSkill";
import ButtonRightNavigation from "~/shared/components/ButtonRightNavigation";

class AddSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      prevState: [],
      GetSkill: this.props.navigation.state.params.GetSkill
    };
  }

  componentDidMount() {
    const { GetSkill } = this.state;
    const active = !!GetSkill.length;
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
      headerRight: () =>
        isEditing ? (
          <View>
            <ButtonRightNavigation
              title="Salvar"
              onPress={() => state.params.handleSave()}
            />
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

  Skills = txt => {
    const text = txt.trim();
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

    updateSkills({ id: token.id, skills });
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
    updateSkills({ id: token.id, skills }).then(({ data }) => {
      if (data.isSuccess) {
        this.setState({ text: "" });
      }
    });
  };

  render() {
    const { GetSkill, visible, text } = this.state;
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
                    <TouchableNativeFeedback
                      onPress={() => {
                        isEditing ? this.handleDelete(c) : null;
                      }}
                      style={styles.chip}
                    >
                      <Text style={[styles.textChip]}>{c}</Text>
                      {isEditing ? (
                        <MaterialCommunityIcons
                          name={"times-circle"}
                          size={dimensions(18)}
                          style={[{ left: calcWidth(-1) }]}
                          color="#FFFFFF"
                        />
                      ) : (
                        <></>
                      )}
                    </TouchableNativeFeedback>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View style={styles.containerAction}>
              {isEditing ? (
                <></>
              ) : (
                <ActionButton
                  onPress={() => {
                    this.setState({ visible: true });
                  }}
                />
              )}
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
        <ModalAddSkill
          onClose={() => this.setState({ visible: false })}
          visible={visible}
          onPress={() => this.AddSkills(text)}
          onChangeText={this.Skills}
          disabled={!text}
        />
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
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row"
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

  titleSkill: {
    color: "#FFF",
    fontSize: dimensions(25),
    fontFamily: "HelveticaNowMicro-Regular",
    paddingVertical: "5.6%"
  },
  textChip: {
    color: "#18142F",
    paddingHorizontal: "1.9%",
    fontSize: dimensions(12),
    fontFamily: "HelveticaNowMicro-Regular"
  }
});

export default AddSkill;
