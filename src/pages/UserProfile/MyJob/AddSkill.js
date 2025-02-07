import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ActionButton from "~/shared/components/ActionButton";
import MaterialCommunityIcons from "react-native-vector-icons/FontAwesome";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import AddSkillEmpty from "~/shared/components/emptyState/AddSkillEmpty";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions/index";
import ModalAddSkill from "./ModalAddSkill";
import ButtonRightNavigation from "~/shared/components/ButtonRightNavigation";
import {
  skillsSuccess,
  updateSkill,
} from "~/store/ducks/Profession/skills/skills.actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class AddSkill extends Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    const { skill, navigation } = this.props;
    const active = !!skill.length;
    navigation.setParams({
      handleSave: this.SaveSkill,
      editingSave: this.editing,
      active,
      isEditing:false
    });
    this.updateHeader();
  }

  componentDidUpdate(prevProps) {
    const { route } = this.props;
    // Check if params have changed (specifically, if isEditing has changed)
    if (prevProps.route?.params?.isEditing !== route?.params?.isEditing) {
      this.updateHeader();
    }
  }

  updateHeader() {
    const { isEditing, active } = this.props.route?.params || {};
    console.log(isEditing)
    this.props.navigation.setOptions({
      headerRight: () => {

        return isEditing ? (
          <ButtonRightNavigation
            title="Salvar"
            onPress={this.SaveSkill}
          />
        ) : (
          <View pointerEvents={active ? "auto" : "none"}>
            <TouchableOpacity onPress={this.editing}>
              <MaterialCommunityIcons
                name="pencil"
                size={dimensions(22)}
                style={{
                  paddingHorizontal: dimensions(23),
                  opacity: active ? 1 : 0,
                }}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }

  editing = () => {
    this.props.navigation.setParams({
      isEditing: true, // Change isEditing state
    });
  };
AddSkills = async (textSkill) => {

    const { updateSkill, skill, navigation } = this.props;
    this.setState({ visible: false, text: "" });
    updateSkill({ skills: [...skill, textSkill] });
    navigation.setParams({ active: true });
  };
  Skills = (txt) => {
        const text = txt.trim();
        this.setState({ text });
      };

  SaveSkill = () => {
    const { skill: skills, updateSkill, navigation } = this.props;
    navigation.setParams({ active: !!skills.length, isEditing: false });
    AlertHelper.show("success", "Sucesso", "Habilidade removida com sucesso!");
    updateSkill({
      skills,
    }).then(() => {
      this.setState({ text: "" });
    });
  };
handleDelete = (delSkill) => {
    const { skillsSuccess, skill } = this.props;
    skillsSuccess(skill.filter((item) => ![delSkill].includes(item)));
  };
  render() {
    const { visible, text } = this.state;
    const { skill } = this.props;
    const isEditing = this.props.route?.params?.isEditing;
    return (
      <View style={styles.container}>
        {skill.length ? (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              marginHorizontal: "5%",
            }}
          >
            <ScrollView>
              <Text style={styles.titleSkill}>Habilidades</Text>
              <View style={styles.containerChip}>
                {skill.map((c, i) => (
                  <View
                    key={i}
                    style={{ marginRight: "1%", height: dimensions(38) }}
                  >
                    <TouchableOpacity
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
                    </TouchableOpacity>
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
    backgroundColor: "#18142F",
  },

  chip: {
    backgroundColor: "#46C5F3",
    width: "100%",
    height: dimensions(30),
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  containerAction: {
    marginHorizontal: "-2%",
    alignItems: "flex-end",
    top: dimensions(-16),
  },
  containerChip: {
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
  },

  titleSkill: {
    color: "#FFF",
    fontSize: adjust(20),
    fontFamily: "HelveticaNowMicro-Regular",
    paddingVertical: "5.6%",
  },
  textChip: {
    color: "#18142F",
    paddingHorizontal: "1.9%",
    fontSize: adjust(10),
    fontFamily: "HelveticaNowMicro-Regular",
  },
});

const mapStateToProps = (state) => {
  const { skill, loading } = state.skills;
  return {
    skill,
    loading,
  };
};

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    {
      skillsSuccess,
      updateSkill,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionToProps)(AddSkill);
