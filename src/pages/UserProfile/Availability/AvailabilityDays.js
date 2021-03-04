import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Field, reduxForm } from "redux-form";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions/index";
import { saveAvailability } from "~/shared/services/freela.http";
import { decodeToken } from "~/shared/services/decode";
import AsyncStorage from "@react-native-community/async-storage";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import Toggle from "~/shared/components/ToggleComponent";
import ButtonRightNavigation from "~/shared/components/ButtonRightNavigation";
import InputMask from "~/shared/components/InputMask";

class AvailabilityDays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: props.navigation.state.params.day,
      daysOfWeek: props.navigation.state.params.daysOfWeek,
      schedules: props.navigation.state.params.schedules,
      now: false,
      timeSave: false,
    };
  }

  componentDidMount() {
    const { day } = this.state;
    this.setState({ now: day.available });
    this.props.navigation.setParams({
      isEditing: day.available,
    });
    this.props.initialize({
      start: day.start === null ? "" : day.start.slice(0, 5),
      end: day.end === null ? "" : day.end.slice(0, 5),
    });

    const { handleSubmit } = this.props;
    this.props.navigation.setParams({
      handleSave: handleSubmit((data) => this.saveDate(data)),
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const isEditing = navigation.getParam("isEditing");
    return {
      headerRight: () => (
        <View style={{ opacity: isEditing ? 1 : 0 }}>
          <ButtonRightNavigation
            onPress={() => state.params.handleSave()}
            title="Salvar"
          />
        </View>
      ),
    };
  };

  saveToggle = async (now) => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    const { schedules, day, timeSave } = this.state;
    const { dayOfWeek } = day;
    this.props.navigation.setParams({
      isEditing: now,
    });
    const days = schedules.filter((c) => c.available === true);
    const request = {
      freelaId: token.id,
      dayAvailabilities: [...days, { dayOfWeek, available: now }],
    };
    if (timeSave || now === false) {
      saveAvailability(request).catch((error) => {
        console.log(error.response.data);
      });
    }
  };

  isTimeValid = (time) => {
    const timeReg = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    return time.match(timeReg);
  };

  saveDate = async (form) => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    const { schedules, day, now } = this.state;
    const days = schedules.filter((c) => c.available === true);
    const { dayOfWeek } = day;
    const { start, end } = form;
    const request = {
      freelaId: token.id,
      dayAvailabilities: [
        ...days,
        {
          dayOfWeek,
          start,
          end,
          available: now,
        },
      ],
    };
    this.isTimeValid(start) && this.isTimeValid(end)
      ? saveAvailability(request)
          .then(() => {
            this.setState({ timeSave: true });
            this.props.navigation.goBack();
          })
          .catch((error) => {
            AlertHelper.show("error", "Erro", "Horário inválido");
            console.log(error.response.data);
          })
      : AlertHelper.show("error", "Erro", "Horário inválido");
  };

  render() {
    const { daysOfWeek, day, now } = this.state;
    const { dayOfWeek } = day;
    return (
      <View style={styles.Container}>
        <ScrollView>
          <View style={{ marginHorizontal: "6%", marginTop: calcWidth(3) }}>
            <Text style={styles.titleDays}>{daysOfWeek[dayOfWeek]}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.toggleAvailable}>Estou disponível</Text>

              <Toggle
                onColor="#483D8B"
                offColor="#24203B"
                isOn={now}
                onToggle={(now) => {
                  this.setState({ now });
                  this.saveToggle(now);
                }}
              />
            </View>
            <View
              pointerEvents={now ? "auto" : "none"}
              style={[
                styles.containerAvailabilityDays,
                now ? { opacity: 1 } : { opacity: 0.5 },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.Title}>Horas</Text>
              </View>
              <View style={{ alignContent: "stretch" }}>
                <Field
                  style={styles.inputDate}
                  title="Das"
                  component={InputMask}
                  mask={"[00]:[00]"}
                  name={`start`}
                  isfocused="#46C5F3"
                  keyboardType="numeric"
                  placeholder="00:00"
                  placeholderTextColor="#808080"
                />
                <View
                  style={{ position: "absolute", width: "100%", left: "52%" }}
                >
                  <Field
                    style={styles.inputDate}
                    title="Até"
                    placeholder="00:00"
                    component={InputMask}
                    mask={"[00]:[00]"}
                    name={`end`}
                    isfocused="#46C5F3"
                    keyboardType="numeric"
                    placeholderTextColor="#808080"
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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
  containerAvailabilityDays: {
    backgroundColor: "#24203B",
    marginTop: "5%",
    padding: "5%",
    paddingBottom: "5%",
    borderRadius: 15,
  },
  Title: {
    color: "#FFF",
    fontSize: adjust(12),
    fontFamily: "HelveticaNowMicro-Regular",
    paddingBottom: "5%",
    marginRight: "75%",
  },
  titleDays: {
    color: "#FFF",
    fontSize: adjust(18),
    fontFamily: "HelveticaNowMicro-Regular",
    paddingBottom: "6%",
  },
  toggleAvailable: {
    color: "#FFF",
    fontSize: adjust(12),
    fontFamily: "HelveticaNowMicro-Regular",

    width: dimensions(245),
  },
  inputDate: {
    width: "48%",
    color: "#46C5F3",
  },
});

AvailabilityDays = reduxForm({ form: "AvailabilityDays" })(AvailabilityDays);

export default AvailabilityDays;
