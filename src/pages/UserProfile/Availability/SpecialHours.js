import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MenuItem } from "react-native-material-menu";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import Toggle from "~/shared/components/ToggleComponent";

import ProfileHeaderMenu from "~/shared/components/ProfileHeaderMenu";
import ActionButton from "~/shared/components/ActionButton";
import Modal from "~/shared/components/ModalComponent";

import { Field, reduxForm } from "redux-form";
import AsyncStorage from "@react-native-community/async-storage";
import { saveSpecialDay } from "~/shared/services/freela.http";
import { decodeToken } from "~/shared/services/decode";
import { calcHeight, calcWidth, adjust } from "~/assets/Dimensions/index";
import SpecialHoursEmpty from "~/shared/components/emptyState/SpecialHoursEmpty";
import ButtonRightNavigation from "~/shared/components/ButtonRightNavigation";
import InputMask from "~/shared/components/InputMask";
import InputDate from "~/shared/components/InputDate";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class SpecialHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      date: new Date(),
      dateInput: "",
      mode: "date",
      show: false,
      isValid: false,
      activeButton: false,
      bottomModalAndTitle: true,
      SpecialDays: this.props.navigation.state.params.SpecialDays,
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  _menu = null;

  componentDidMount() {
    const { SpecialDays } = this.state;
    const isActive = SpecialDays.length ? true : false;
    this.props.navigation.setParams({
      isDate: isActive,
    });
    this.initializeInput();
    const { handleSubmit } = this.props;
    this.props.navigation.setParams({
      handleSaveHour: handleSubmit((data) => this.justSave(data)),
    });
  }
  initializeInput = () => {
    const { SpecialDays } = this.state;
    const objdimensions = SpecialDays.reduce((prev, cur, index) => {
      const dt = moment(prev.date);
      const newDate = this.getStartEndDate(dt, cur, index);
      return { ...prev, ...newDate, [`toggle${index}`]: cur.available };
    }, {});
    this.props.initialize(objdimensions);
  };

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const isDate = navigation.getParam("isDate");
    return {
      headerRight: () => (
        <View
          pointerEvents={isDate ? "auto" : "none"}
          style={{ opacity: isDate ? 1 : 0 }}
        >
          <ButtonRightNavigation
            onPress={() => state.params.handleSaveHour()}
          />
        </View>
      ),
    };
  };

  getStartEndDate(date, { start, end }, index) {
    const timeStart = start !== undefined ? start.slice(0, 5) : "00:00";
    const timeEnd = end !== undefined ? end.slice(0, 5) : "00:00";
    return {
      [`start${index}`]: timeStart,
      [`end${index}`]: timeEnd,
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
    this.saveDates(SpecialDays);
  };

  setDate = (event, date) => {
    date = date || this.state.date;
    const dateInput = moment(date).format("LL");
    this.setState({
      date,
      showModal: true,
      dateInput,
      activeButton: true,
    });
  };

  showDatepicker = () => {
    this.setState({ show: true, mode: "date" });
  };

  newDate = async () => {
    const { SpecialDays, date } = this.state;
    this.setState({ activeButton: false });
    const datesToSave = [...SpecialDays, { date }];
    const isActive = datesToSave.length ? true : false;
    this.props.navigation.setParams({
      isDate: isActive,
    });
    setTimeout(async () => {
      this.setState({
        SpecialDays: datesToSave,
        visible: false,
        dateInput: "",
      });
      await this.saveDates(datesToSave);
      this.initializeInput();
      AlertHelper.show("success", "Sucesso", "Data adicionada com sucesso.");
    }, 500);
  };

  isTimeValid = (time) => {
    const timeReg = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    const timeReg1 = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    return time.match(timeReg) || time.match(timeReg1);
  };

  justSave = async () => {
    const { SpecialDays } = this.state;
    const times = SpecialDays.map((x) => x.start).concat(
      SpecialDays.map((x) => x.end)
    );
    if (times.every(this.isTimeValid)) {
      this.saveDates(SpecialDays);
      setTimeout(() => {
        this.props.navigation.goBack();
      }, 200);
    } else {
      AlertHelper.show("error", "Erro", "Horário inválido");
    }
  };

  async saveDates(datesToSave) {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));

    saveSpecialDay({
      freelaId: token.id,
      specialDayAvailabilities: [...datesToSave],
    })
      .then(() => {})
      .catch((error) => {
        AlertHelper.show("error", "Erro", error.response.data.errorMessage);
      });
  }

  removeDate(dateToRemove) {
    const { SpecialDays } = this.state;
    const removeEqualDate = ({ date }) => !(date === dateToRemove);
    const datesToSave = SpecialDays.filter(removeEqualDate);
    this.setState({ SpecialDays: datesToSave });
    const isActive = datesToSave.length ? true : false;
    this.props.navigation.setParams({
      isDate: isActive,
    });
    this.saveDates(datesToSave);
    AlertHelper.show("success", "Sucesso", "Horário removido com sucesso.");
  }

  onFieldChange(propName, data, id) {
    const { SpecialDays } = this.state;
    SpecialDays[id][propName] = data;
    this.setState({ SpecialDays });
  }

  render() {
    const { show, date, mode, SpecialDays, dateInput } = this.state;
    const isDate = this.props.navigation.getParam("isDate");
    return (
      <View style={styles.Container}>
        {SpecialDays.length ? (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <KeyboardAwareScrollView style={{ flex: 1 }}>
              {SpecialDays.map(({ date, start, available }, id) => (
                <View key={id} style={styles.containerSpecialHours}>
                  <View style={{ flexDirection: "row", paddingBottom: "5%" }}>
                    <Text
                      style={{
                        color: "#FFF",
                        fontSize: adjust(18),
                        fontFamily: "HelveticaNowMicro-Regular",
                        width: "90%",
                      }}
                    >
                      {moment(date).format("DD [de] MMM, YYYY")}
                    </Text>
                    <ProfileHeaderMenu
                      ref={(comp) => {
                        this._menu = comp;
                      }}
                    >
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
                        fontSize: adjust(12),
                        fontFamily: "HelveticaNowMicro-Regular",
                        width: "85%",
                      }}
                    >
                      Estou disponível
                    </Text>
                    <Field
                      key={id}
                      onColor="#483D8B"
                      offColor="#18142F"
                      isOn={available}
                      onToggle={(available) => this.onToggle(available, id)}
                      component={Toggle}
                      name={`toggle${id}`}
                    />
                  </View>
                  {available && (
                    <>
                      <Text
                        style={{
                          color: "#FFF",
                          fontSize: adjust(12),
                          fontFamily: "HelveticaNowMicro-Regular",
                          paddingBottom: "4%",
                        }}
                      >
                        Horas
                      </Text>
                      <View style={{ alignContent: "stretch" }}>
                        <Field
                          style={styles.inputDate}
                          title="Das"
                          keyboardType="numeric"
                          mask="time"
                          isfocused="#46C5F3"
                          placeholder="00:00"
                          placeholderTextColor="#808080"
                          component={InputMask}
                          onBlur={(data) =>
                            this.onFieldChange("start", data, id)
                          }
                          name={`start${id}`}
                        />
                        <View
                          style={{
                            position: "absolute",
                            width: "100%",
                            left: "52%",
                          }}
                        >
                          <Field
                            style={styles.inputDate}
                            title="Até"
                            keyboardType="numeric"
                            mask="time"
                            isfocused="#46C5F3"
                            placeholder="00:00"
                            placeholderTextColor="#808080"
                            component={InputMask}
                            onBlur={(data) =>
                              this.onFieldChange("end", data, id)
                            }
                            name={`end${id}`}
                          />
                        </View>
                        {!isDate && (
                          <Text
                            style={{
                              color: "#f11111",
                              fontSize: adjust(12),
                              textAlign: "center",
                            }}
                          >
                            Horário inválido
                          </Text>
                        )}
                      </View>
                    </>
                  )}
                </View>
              ))}
            </KeyboardAwareScrollView>
            <View style={styles.containerAction}>
              <ActionButton
                onPress={() => {
                  this.setState({ visible: true });
                }}
              />
            </View>
          </View>
        ) : (
          <SpecialHoursEmpty
            onPress={() => {
              this.setState({ visible: true });
            }}
          />
        )}

        <Modal
          onClose={() => {
            this.setState({ visible: false, dateInput: "" });
          }}
          heightModal={Platform.OS === "ios" ? calcHeight(40) : "auto"}
          visible={this.state.visible}
        >
          <Text style={styles.titleModal}>Adicione uma data</Text>
          <View style={styles.containerModalInput}>
            {Platform.OS !== "ios" && (
              <InputDate
                onClick={this.showDatepicker}
                editable={false}
                value={dateInput}
                style={{ width: "90%", borderColor: "#fff" }}
              />
            )}
            {show ||
              (Platform.OS === "ios" && (
                <View
                  style={{
                    width: "100%",
                    flex: 1,
                    display: "flex",
                    minWidth: 50,
                  }}
                >
                  <DateTimePicker
                    style={{ width: "100%", alignSelf: "center" }}
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="compact"
                    onChange={this.setDate}
                  />
                </View>
              ))}
          </View>
          <View style={[styles.button, { alignItems: "center" }]}>
            <RoundButton
              disabled={!dateInput}
              style={[{ backgroundColor: "#865FC0" }]}
              name="adicionar"
              onPress={this.newDate}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#18142F",
  },
  containerSpecialHours: {
    backgroundColor: "#24203B",
    marginHorizontal: "5%",
    padding: "5%",
    borderRadius: 15,
    marginBottom: "3%",
    marginTop: calcWidth(3),
  },
  containerAction: {
    marginHorizontal: "5%",
    alignItems: "flex-end",
    top: "-2%",
  },
  containerModalInput: {
    justifyContent: "center",
    alignItems: "center",
    top: calcWidth(-4),
    left: "5%",
  },
  inputDate: {
    width: "48%",
    color: "#46C5F3",
    fontSize: adjust(10),
    fontFamily: "HelveticaNowMicro-Regular",
  },
  title: {
    color: "#FFF",
    fontSize: adjust(20),
    textAlign: "center",
  },
  subtitle: {
    color: "#FFF",
    fontSize: adjust(11.5),
    marginTop: "5%",
  },
  titleModal: {
    color: "#FFF",
    padding: "5%",
    fontSize: adjust(20),
    fontFamily: "HelveticaNowMicro-Medium",
  },
  button: {
    ...Platform.select({
      ios: {
        marginTop: calcWidth(15),
      },
    }),
  },
});

export default SpecialHours = reduxForm({
  form: "SpecialHours",
  enableReinitialize: true,
})(SpecialHours);
