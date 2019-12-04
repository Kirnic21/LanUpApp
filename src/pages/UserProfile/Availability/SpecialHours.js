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

import DateInputField from "~/shared/components/DateInputField";
import Toggle from "~/shared/components/SwitchComponent";
import { MenuItem, MenuDivider } from "react-native-material-menu";

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
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      date: new Date(),
      mode: "date",
      show: false,
      SpecialDays: this.props.navigation.state.params.SpecialDays,
      teste: []
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
    getAvailability(token.id).then(({ data }) => {
      debugger;
      const SpecialDays = data.result.value.specialDays;

      SpecialDays === null
        ? this.setState({ SpecialDays: [] })
        : this.setState({ SpecialDays });
    });
  }

  AddHour = async () => {
    debugger;
   
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    const { date, SpecialDays } = this.state;
    const request = {
      freelaId: token.id,
      specialDayAvailabilities: [
        ...SpecialDays,
        {
          date,
        }
      ]
    };
    debugger;

    request.specialDayAvailabilities = request.specialDayAvailabilities.map(
      ({ day, date, start, end, available = true }) => {
        return {
          date: day ? day : date,
          start,
          end,
          available
        };
      }
    );

    specialDay(request)
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

  async saveDates(datesToSave) {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));

    specialDay({
      freelaId: token.id,
      specialDayAvailabilities: [...datesToSave]
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
  }

  removeDate(dateToRemove) {
    const { SpecialDays } = this.state;

    debugger;

    const removeEqualDate = ({ day }) => !(day === dateToRemove);

    const dates = SpecialDays.filter(removeEqualDate);

    const datesToSave = dates.map(({ day, date, start, end, available }) => {
      return {
        date: day ? day : date,
        start,
        end,
        available
      };
    });

    this.setState({ SpecialDays: datesToSave });
    this.saveDates(datesToSave);
  }

  render() {
    const { show, date, mode, SpecialDays } = this.state;
    const { handleSubmit, invalid } = this.props;
    debugger;
    return (
      <View style={styles.Container}>
        <ScrollView>
          {SpecialDays.map(({ day }, id) => (
            <View key={id} style={styles.containerSpecialHours}>
              <View style={{ flexDirection: "row", paddingBottom: "5%" }}>
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 20,
                    marginRight: "50%"
                  }}
                >
                  {moment(day).format("DD [de] MMM, YYYY")}
                </Text>
                <ProfileHeaderMenu>
                  <MenuItem onPress={handleSubmit(this.AddHour)}>
                    Salvar
                  </MenuItem>
                  <MenuItem
                    onPress={() => {
                      alert("teste");
                    }}
                    onPress={() => {
                      this.removeDate(day);
                    }}
                  >
                    Deletar
                  </MenuItem>
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
                <Field key={id} component={Toggle} name={"available"} />
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
                    mode="time"
                    component={DateInputField}
                    name={"start"}
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
                      mode="time"
                      component={DateInputField}
                      name={"end"}
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
                  this.setState({ visible: false });
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
