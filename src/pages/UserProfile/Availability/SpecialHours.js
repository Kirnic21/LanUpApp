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
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MenuItem } from "react-native-material-menu";
import DropdownAlert from "react-native-dropdownalert";

import ProfileHeaderMenu from "~/shared/components/ProfileHeaderMenu";
import ActionButton from "~/shared/components/ActionButton";
import Modal from "~/shared/components/ModalComponent";
import DateInputField from "~/shared/components/DateInputField";

import { Field, reduxForm } from "redux-form";
import AsyncStorage from "@react-native-community/async-storage";
import { saveSpecialDay, decodeToken } from "~/shared/services/freela.http";
import normalize from "~/assets/FontSize/index";

class SpecialHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      date: new Date(),
      mode: "date",
      show: false,
      bottomModalAndTitle: true,
      SpecialDays: this.props.navigation.state.params.SpecialDays
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  _menu = null;

  async componentDidMount() {
    const { SpecialDays } = this.state;
    const objNormalize = SpecialDays.reduce((prev, cur, index) => {
      const dt = moment(prev.date);
      const newDate = this.getStartEndDate(dt, cur, index);
      return { ...prev, ...newDate, [`toggle${index}`]: cur.available };
    }, {});

    await this.props.initialize(objNormalize);
  }

  getStartEndDate(date, { start, end }, index) {
    const normalizedStart = start.substr(0, 5).split(":");
    const normalizedEnd = end.substr(0, 5).split(":");
    return {
      [`start${index}`]: new Date(
        date.set({ hour: normalizedStart[0], minute: normalizedStart[1] })
      ),
      [`end${index}`]: new Date(
        date.set({ hour: normalizedEnd[0], minute: normalizedEnd[1] })
      )
    };
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  onToggle = (value, index) => {
    const { SpecialDays } = this.state;
    const toggle = SpecialDays;
    const toggleSelected = toggle[index];
    toggleSelected.available = value;
    this.setState({ toggle });
    this.changeLayout();
    this.justSave();
  };

  setDate = (event, date) => {
    date = date || this.state.date;
    this.setState({ show: Platform.OS === "ios" ? true : false, date });
  };

  show = mode => {
    this.setState({ show: true, mode });
  };

  datepicker = () => {
    this.show("date");
  };

  newDate = async () => {
    const { SpecialDays, date } = this.state;
    const datesToSave = [...SpecialDays, { date }];
    this.setState({ SpecialDays: datesToSave, visible: false });
    await this.saveDates(datesToSave);
  };

  justSave = async () => {
    const { SpecialDays } = this.state;
    await this.saveDates(SpecialDays);
  };

  AddHour = async form => {
    const { start, end, available } = form;
    const { date, SpecialDays } = this.state;
    const request = [
      ...SpecialDays,
      {
        date,
        start: moment(start).format("hh:mm[:00]"),
        end: moment(end).format("hh:mm[:00]"),
        available
      }
    ];
    await this.saveDates(request);
  };

  async saveDates(datesToSave) {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));

    saveSpecialDay({
      freelaId: token.id,
      specialDayAvailabilities: [...datesToSave]
    })
      .then(({ data }) => {
        if (data.isSuccess) {
          this.dropDownAlertRef.alertWithType("success", "Sucesso", data);
          console.log(data);
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
  }

  removeDate(dateToRemove) {
    const { SpecialDays } = this.state;
    const removeEqualDate = ({ date }) => !(date === dateToRemove);
    const datesToSave = SpecialDays.filter(removeEqualDate);
    this.setState({ SpecialDays: datesToSave });
    this.saveDates(datesToSave);
  }

  onFieldChange(propName, data, id) {
    const { SpecialDays } = this.state;
    SpecialDays[id][propName] = moment(data).format("hh:mm:[00]");
    this.setState({ SpecialDays });
  }

  render() {
    const { show, date, mode, SpecialDays } = this.state;
    return (
      <View style={styles.Container}>
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
            defaultContainer={{ padding: 8, flexDirection: "row" }}
          />
        </View>
        <ScrollView>
          {SpecialDays.map(({ date, start, available }, id) => (
            <View key={id} style={styles.containerSpecialHours}>
              <View style={{ flexDirection: "row", paddingBottom: "5%" }}>
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: normalize(18),
                    marginRight: "50%"
                  }}
                >
                  {moment(date).format("DD [de] MMM, YYYY")}
                </Text>
                <ProfileHeaderMenu
                  ref={comp => {
                    this._menu = comp;
                  }}
                >
                  <MenuItem
                    onPress={() => {
                      this.justSave();
                      this._menu.hideMenu();
                    }}
                  >
                    Salvar
                  </MenuItem>
                  <MenuItem
                    onPress={() => {
                      this.removeDate(date);
                      this._menu.hideMenu();
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
                    fontSize: normalize(14),
                    marginRight: "55%"
                  }}
                >
                  Estou disponível
                </Text>
                <Field
                  key={id}
                  size="small"
                  onColor="#483D8B"
                  offColor="#18142F"
                  isOn={available}
                  onToggle={available => this.onToggle(available, id)}
                  component={ToggleSwitch}
                  name={`toggle${id}`}
                />
              </View>
              {available && (
                <>
                  <Text
                    style={{
                      color: "#FFF",
                      fontSize: normalize(14),
                      paddingBottom: "4%"
                    }}
                  >
                    Horas
                  </Text>
                  <View style={{ alignContent: "stretch" }}>
                    <Field
                      style={{ width: "48%" }}
                      title="Das"
                      mode="time"
                      component={DateInputField}
                      onChange={data => this.onFieldChange("start", data, id)}
                      name={`start${id}`}
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
                        onChange={data => this.onFieldChange("end", data, id)}
                        name={`end${id}`}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          ))}
          <Modal
            onTouchOutside={() => {
              this.setState({ visible: false });
            }}
            visible={this.state.visible}
            onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
          >
            <Text
              style={{
                color: "#FFF",
                padding: "5%",
                top: "5%",
                fontSize: normalize(28)
              }}
            >
              Adicione um horário
            </Text>
            <View style={styles.containerModalInput}>
              <InputLabel
                onClick={this.datepicker}
                editable={false}
                value={moment(date).format("LL")}
                style={{ width: "90%", height: 50, borderColor: "#865FC0" }}
              />

              <View>
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
            </View>
            <View style={{ alignItems: "center" }}>
              <RoundButton
                style={styles.btnModal}
                name="adicionar"
                onPress={this.newDate}
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
  enableReinitialize: true
})(SpecialHours);
