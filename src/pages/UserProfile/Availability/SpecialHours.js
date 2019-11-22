import React, { Component } from "react";
import ToggleSwitch from "toggle-switch-react-native";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager
} from "react-native";
import ProfileHeaderMenu from "~/shared/components/ProfileHeaderMenu";
import InputField from "~/shared/components/InputField";
import { Field, reduxForm } from "redux-form";
import { Menu } from "react-native-paper";

specialHours = [
  {
    id: "1",
    title: "16 de Dez,2019",
    expanded: false
  },
  {
    id: "2",
    title: "25 de Dez,2019",
    expanded: false
  }
];

class SpecialHours extends Component {
  constructor() {
    super();

    this.state = {};

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  onToggle(isOn) {
    console.log(`Changed to ${isOn}`);
  }
  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  clickToggle = (id, index) => {
    const toggle = specialHours;
    const toggleSelected = toggle[index - 1];
    toggleSelected.expanded = !toggleSelected.expanded;
    this.setState(prev => ({ ...prev, toggle }));

    const select = toggle.filter(c => c.expanded === true).map(c => c.expanded);
    this.setState({ expanded: select });
    debugger;
  };

  render() {
    return (
      <View style={styles.Container}>
        <ScrollView>
          {specialHours.map(({ id, title, expanded }) => (
            <View key={id} style={styles.containerSpecialHours}>
              <View style={{ flexDirection: "row", paddingBottom: "5%" }}>
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 20,
                    marginRight: "50%"
                  }}
                >
                  {title}
                </Text>
                <ProfileHeaderMenu>
                  <Menu.Item onPress={() => {}} title="Salvar" />
                  <Menu.Item
                    onPress={() => {}}
                    title={<Text style={{ color: "#f00" }}>Deletar</Text>}
                  />
                </ProfileHeaderMenu>
              </View>
              <View style={{ flexDirection: "row", paddingBottom: "5%" }}>
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 15,
                    marginRight: "55%"
                  }}
                >
                  Estou disponível
                </Text>
                <ToggleSwitch
                  key={id}
                  size="small"
                  onColor="#483D8B"
                  offColor="#18142F"
                  isOn={expanded}
                  onToggle={expanded => {
                    this.clickToggle(expanded, id);
                    this.onToggle(expanded);
                    this.changeLayout();
                  }}
                />
              </View>
              <View
                style={{
                  height: expanded === true ? null : 0,
                  overflow: "hidden"
                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 15,
                    paddingBottom: "4%"
                  }}
                >
                  Horas
                </Text>
                <View
                  style={{
                    alignContent: "stretch"
                  }}
                >
                  <Field
                    style={{ width: "48%" }}
                    title="Das"
                    component={InputField}
                    name={"das"}
                  />
                  <View
                    style={{
                      position: "absolute",
                      width: "100%",
                      left: "52%"
                    }}
                  >
                    <Field
                      style={{ width: "48%" }}
                      title="Até"
                      component={InputField}
                      name={"birthday"}
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#18142F"
  },
  containerSpecialHours: {
    backgroundColor: "#24203B",
    marginHorizontal: "5%",
    padding: "5%",
    borderRadius: 15,
    marginBottom: "3%"
  }
});

export default SpecialHours = reduxForm({
  form: "SpecialHours",
  // validate: formRules,
  enableReinitialize: true
})(SpecialHours);
