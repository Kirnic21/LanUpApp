import React, { Component } from "react";
import ToggleSwitch from "toggle-switch-react-native";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity
} from "react-native";
import ProfileHeaderMenu from "~/shared/components/ProfileHeaderMenu";
import InputField from "~/shared/components/InputField";
import { Field, reduxForm } from "redux-form";
import { Menu } from "react-native-paper";
import ActionButton from "~/shared/components/ActionButton";
import Modal from "~/shared/components/ModalComponent";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-community/async-storage";
import {
  specialDay,
  decodeToken,
  getAvailability
} from "~/shared/services/freela.http";

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
    this.state = {
      visible: false,
      date: new Date(),
      mode: "date",
      show: false,
      SpecialDay: []
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  onToggle(isOn) {}

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

  setDate = (event, date) => {
    date = date || this.state.date;
    this.setState({ show: Platform.OS === "ios" ? true : false, date });
    debugger;
  };

  show = mode => {
    this.setState({ show: true, mode });
  };

  datepicker = () => {
    this.show("date");
  };

  async componentDidMount() {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    await getAvailability(token.id).then(({ data }) => {
      console.log(data.result);
      debugger;
      const SpecialDay = data.result.value.specialDays;
      this.setState({ SpecialDay });
    });
  }

  AddHour = async () => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    const { date, SpecialDay } = this.state;
    specialDay({
      freelaId: token.id,
      specialDayAvailabilities: [
        ...SpecialDay,
        {
          date: date,
          start: "7:00",
          end: "15:00",
          available: true
        }
      ]
    })
      .then(({ data }) => {
        if (data.isSuccess) {
          debugger;
          console.log(data);
        }
      })
      .catch(error => {
        debugger;
        console.log(error.response.data);
      });
    debugger;
  };

  render() {
    const { show, date, mode, SpecialDay } = this.state;
    return (
      <View style={styles.Container}>
        <ScrollView>
          {SpecialDay.map(({ day }, id) => (
            <View key={id} style={styles.containerSpecialHours}>
              <View style={{ flexDirection: "row", paddingBottom: "5%" }}>
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 20,
                    marginRight: "50%"
                  }}
                >
                  {day}
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
                  isOn={true}
                  // onToggle={expanded => {
                  //   this.clickToggle(expanded, id);
                  //   this.onToggle(expanded);
                  //   this.changeLayout();
                  // }}
                />
              </View>
              <View
                style={{
                  // height: expanded === true ? null : 0,
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
          <Modal
            onTouchOutside={() => {
              this.setState({ visible: false });
            }}
            visible={this.state.visible}
          >
            <Text
              style={{ color: "#FFF", padding: "5%", top: "5%", fontSize: 30 }}
            >
              Adicione um horário
            </Text>
            <View style={styles.containerModalInput}>
              <TouchableOpacity
                onPress={this.datepicker}
                style={{ width: "100%" }}
              >
                <InputLabel
                  editable={false}
                  value={moment(date).format("LL")}
                  style={{ width: "90%", height: 50, borderColor: "#865FC0" }}
                />
              </TouchableOpacity>

              {show && (
                <DateTimePicker
                  value={date}
                  mode={mode}
                  locale="es-ES"
                  is24Hour={true}
                  display="default"
                  onChange={this.setDate}
                />
              )}
            </View>
            <View style={{ alignItems: "center" }}>
              <RoundButton
                style={styles.btnModal}
                name="adicionar"
                onPress={() => {
                  this.AddHour();
                }}
              />
            </View>
          </Modal>
        </ScrollView>
        <View style={styles.containerAction}>
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
  },
  containerAction: {
    marginHorizontal: "5%",
    alignItems: "flex-end",
    top: "-2%"
  },
  containerModalInput: {
    justifyContent: "center",
    alignItems: "flex-start",
    left: "5%",
    top: "10%"
  },
  btnModal: {
    backgroundColor: "#865FC0",
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    top: "10%"
  }
});

export default SpecialHours = reduxForm({
  form: "SpecialHours",
  // validate: formRules,
  enableReinitialize: true
})(SpecialHours);
