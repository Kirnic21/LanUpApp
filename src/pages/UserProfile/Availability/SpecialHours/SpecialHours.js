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
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MenuItem } from "react-native-material-menu";
import DropdownAlert from "react-native-dropdownalert";
import Toggle from "~/shared/components/ToggleComponent";

import ProfileHeaderMenu from "~/shared/components/ProfileHeaderMenu";
import ActionButton from "~/shared/components/ActionButton";
import Modal from "~/shared/components/ModalComponent";
import DateInputField from "~/shared/components/DateInputField";

import { Field, reduxForm } from "redux-form";
import AsyncStorage from "@react-native-community/async-storage";
import { saveSpecialDay, decodeToken } from "~/shared/services/freela.http";
import dimensions from "~/assets/Dimensions/index";
import SpecialHoursEmpty from "~/pages/UserProfile/Availability/SpecialHours/SpecialHoursEmpty";

class SpecialHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      date: new Date(),
      dateInput: "",
      mode: "date",
      show: false,
      activeButton: false,
      bottomModalAndTitle: true,
      SpecialDays: this.props.navigation.state.params.SpecialDays
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
      isDate: isActive
    });
    this.initializeInput();
    const { handleSubmit } = this.props;
    this.props.navigation.setParams({
      handleSaveHour: handleSubmit(data => this.justSave(data))
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
      headerRight: (
        <View style={{ opacity: isDate ? 1 : 0 }}>
          <TouchableOpacity
            onPress={() => state.params.handleSaveHour()}
            style={{
              paddingHorizontal: 29,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
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
      )
    };
  };

  getStartEndDate(date, { start, end }, index) {
    const dimensionsdStart =
      start !== undefined ? start.substr(0, 5).split(":") : "00:00";
    const dimensionsdEnd =
      end !== undefined ? start.substr(0, 5).split(":") : "00:00";
    return {
      [`start${index}`]: new Date(
        date.set({ hour: dimensionsdStart[0], minute: dimensionsdStart[1] })
      ),
      [`end${index}`]: new Date(
        date.set({ hour: dimensionsdEnd[0], minute: dimensionsdEnd[1] })
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
    this.saveDates(SpecialDays);
  };

  setDate = (event, date) => {
    date = date || this.state.date;
    const dateInput = moment(date).format("LL");
    this.setState({
      show: Platform.OS === "ios" ? true : false,
      date,
      showModal: true,
      dateInput,
      activeButton: true
    });
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
    const isActive = datesToSave.length ? true : false;
    this.props.navigation.setParams({
      isDate: isActive
    });
    this.setState({
      SpecialDays: datesToSave,
      visible: false,
      activeButton: false,
      dateInput: ""
    });
    await this.saveDates(datesToSave);
    this.initializeInput();
    this.dropDownAlertRef.alertWithType(
      "success",
      "Sucesso",
      "Data adicionada com sucesso."
    );
  };

  justSave = async () => {
    const { SpecialDays } = this.state;
    if (SpecialDays.length) {
      await this.saveDates(SpecialDays);
      this.dropDownAlertRef.alertWithType(
        "success",
        "Sucesso",
        "Horário salvo com sucesso."
      );
    } else {
      this.dropDownAlertRef.alertWithType(
        "error",
        "Erro",
        "Adicione pelo menos um horário."
      );
    }
  };

  AddHour = async form => {
    const { start, end, available } = form;
    const { date, SpecialDays } = this.state;
    const request = [
      ...SpecialDays,
      {
        date,
        start: moment(start).format("HH:mm"),
        end: moment(end).format("HH:mm"),
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
    const isActive = datesToSave.length ? true : false;
    this.props.navigation.setParams({
      isDate: isActive
    });
    this.saveDates(datesToSave);
    this.dropDownAlertRef.alertWithType(
      "success",
      "Sucesso",
      "Horário removido com sucesso."
    );
  }

  onFieldChange(propName, data, id) {
    const { SpecialDays } = this.state;
    SpecialDays[id][propName] = moment(data).format("HH:mm");
    this.setState({ SpecialDays });
  }

  render() {
    const {
      show,
      date,
      mode,
      SpecialDays,
      dateInput,
      activeButton
    } = this.state;

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
            closeInterval={300}
            ref={ref => (this.dropDownAlertRef = ref)}
            defaultContainer={{ padding: 8, flexDirection: "row" }}
          />
        </View>
        {SpecialDays.length ? (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <ScrollView>
              {SpecialDays.map(({ date, start, available }, id) => (
                <View key={id} style={styles.containerSpecialHours}>
                  <View style={{ flexDirection: "row", paddingBottom: "5%" }}>
                    <Text
                      style={{
                        color: "#FFF",
                        fontSize: dimensions(20),
                        fontFamily: "HelveticaNowMicro-Regular",
                        width: "90%"
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
                        fontSize: dimensions(14),
                        fontFamily: "HelveticaNowMicro-Regular",
                        width: "85%"
                      }}
                    >
                      Estou disponível
                    </Text>
                    <Field
                      key={id}
                      onColor="#483D8B"
                      offColor="#18142F"
                      isOn={available}
                      onToggle={available => this.onToggle(available, id)}
                      component={Toggle}
                      name={`toggle${id}`}
                    />
                  </View>
                  {available && (
                    <>
                      <Text
                        style={{
                          color: "#FFF",
                          fontSize: dimensions(14),
                          fontFamily: "HelveticaNowMicro-Regular",
                          paddingBottom: "4%"
                        }}
                      >
                        Horas
                      </Text>
                      <View style={{ alignContent: "stretch" }}>
                        <Field
                          style={styles.inputDate}
                          title="Das"
                          mode="time"
                          component={DateInputField}
                          onChange={data =>
                            this.onFieldChange("start", data, id)
                          }
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
                            style={styles.inputDate}
                            title="Até"
                            mode="time"
                            component={DateInputField}
                            onChange={data =>
                              this.onFieldChange("end", data, id)
                            }
                            name={`end${id}`}
                          />
                        </View>
                      </View>
                    </>
                  )}
                </View>
              ))}
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
          <SpecialHoursEmpty
            onPress={() => {
              this.setState({ visible: true });
            }}
          />
        )}

        <Modal
          onClose={() => {
            this.setState({ visible: false });
          }}
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
              fontSize: dimensions(24),
              fontFamily: "HelveticaNowMicro-Medium"
            }}
          >
            Adicione um horário
          </Text>
          <View style={styles.containerModalInput}>
            <InputLabel
              onClick={this.datepicker}
              editable={false}
              value={dateInput}
              style={{ width: "90%", borderColor: "#fff" }}
            />

            <View>
              {show && (
                <DateTimePicker
                  value={date}
                  mode={mode}
                  display="default"
                  onChange={this.setDate}
                />
              )}
            </View>
          </View>
          <View
            pointerEvents={activeButton === true ? "auto" : "none"}
            style={{ alignItems: "center" }}
          >
            <RoundButton
              style={[
                styles.btnModal,
                activeButton === true
                  ? { backgroundColor: "#865FC0" }
                  : { backgroundColor: "#6C757D" }
              ]}
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
    left: "5%"
  },
  btnModal: {
    backgroundColor: "#865FC0",
    width: "50%",
    height: dimensions(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    top: "4%"
  },
  inputDate: {
    width: "48%",
    color: "#46C5F3",
    fontSize: dimensions(12),
    fontFamily: "HelveticaNowMicro-Regular"
  },
  title: {
    color: "#FFF",
    fontSize: dimensions(23),
    textAlign: "center"
  },
  subtitle: {
    color: "#FFF",
    fontSize: dimensions(14.5),
    marginTop: "5%"
    // textAlign: "center"
  }
});

export default SpecialHours = reduxForm({
  form: "SpecialHours",
  enableReinitialize: true
})(SpecialHours);
