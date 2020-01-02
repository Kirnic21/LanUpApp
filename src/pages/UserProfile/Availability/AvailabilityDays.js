import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import moment from "moment";

import ToggleSwitch from "toggle-switch-react-native";

import { Field, reduxForm } from "redux-form";
import dimensions from "~/assets/Dimensions/index";
import DateInputField from "~/shared/components/DateInputField";
import { saveAvailability, decodeToken } from "~/shared/services/freela.http";
import AsyncStorage from "@react-native-community/async-storage";
import DropdownAlert from "react-native-dropdownalert";

class AvailabilityDays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: props.navigation.state.params.day,
      daysOfWeek: props.navigation.state.params.daysOfWeek,
      schedules: props.navigation.state.params.schedules,
      now: false
    };
  }

  componentDidMount() {
    const { day } = this.state;
    this.setState({ now: day.available });
    this.props.navigation.setParams({
      isEditing: day.available
    });
    this.props.initialize({
      start:
        day.start === null
          ? new Date(`01/01/2000 00:00`)
          : new Date(`01/01/2000 ${day.start}`),
      end:
        day.end === null
          ? new Date(`01/01/2000 00:00`)
          : new Date(`01/01/2000 ${day.end}`)
    });

    const { handleSubmit } = this.props;
    this.props.navigation.setParams({
      handleSave: handleSubmit(data => this.saveDate(data))
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const isEditing = navigation.getParam("isEditing");
    return {
      headerRight: (
        <View style={{ opacity: isEditing ? 1 : 0 }}>
          <TouchableOpacity
            onPress={() => state.params.handleSave()}
            style={{
              paddingHorizontal: 29,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#FFF" }}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )
    };
  };

  saveToggle = async now => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    const { schedules, day } = this.state;
    const { dayOfWeek } = day;
    this.props.navigation.setParams({
      isEditing: now
    });
    const days = schedules.filter(c => c.available === true);
    const request = {
      freelaId: token.id,
      dayAvailabilities: [...days, { dayOfWeek, available: now }]
    };
    saveAvailability(request)
      .then(({ data }) => {
        if (data.isSuccess) {
          console.log(data);
        }
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  saveDate = async form => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    const { schedules, day, now } = this.state;
    const days = schedules.filter(c => c.available === true);
    const { dayOfWeek } = day;
    const { start, end } = form;
    const request = {
      freelaId: token.id,
      dayAvailabilities: [
        ...days,
        {
          dayOfWeek,
          start: moment(start).format("HH:mm"),
          end: moment(end).format("HH:mm"),
          available: now
        }
      ]
    };
    saveAvailability(request)
      .then(({ data }) => {
        if (data.isSuccess) {
          console.log(data);
          this.dropDownAlertRef.alertWithType(
            "success",
            "Sucesso",
            "Horário confirmado com sucesso"
          );
        }
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  render() {
    const { daysOfWeek, day, now } = this.state;
    const { dayOfWeek } = day;
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
          <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        </View>
        <ScrollView>
          <View style={{ marginHorizontal: "6%" }}>
            <Text style={styles.titleDays}>{daysOfWeek[dayOfWeek]}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.toggleAvailable}>Estou disponível</Text>
              <ToggleSwitch
                size="small"
                onColor="#483D8B"
                offColor="#24203B"
                isOn={now}
                onToggle={now => {
                  this.setState({ now });
                  this.saveToggle(now);
                }}
              />
            </View>
            <View
              pointerEvents={now ? "auto" : "none"}
              style={[
                styles.containerAvailabilityDays,
                now ? { opacity: 1 } : { opacity: 0.5 }
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.Title}>Horas</Text>
              </View>
              <View style={{ alignContent: "stretch" }}>
                <Field
                  style={styles.inputDate}
                  title="Das"
                  mode="time"
                  component={DateInputField}
                  name={`start`}
                />
                <View
                  style={{ position: "absolute", width: "100%", left: "52%" }}
                >
                  <Field
                    style={styles.inputDate}
                    title="Até"
                    mode="time"
                    component={DateInputField}
                    name={`end`}
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
    backgroundColor: "#18142F"
  },
  containerAvailabilityDays: {
    backgroundColor: "#24203B",
    marginTop: "5%",
    padding: "5%",
    paddingBottom: "5%",
    borderRadius: 15
  },
  Title: {
    color: "#FFF",
    fontSize: 15,
    paddingBottom: "5%",
    marginRight: "75%"
  },
  titleDays: {
    color: "#FFF",
    fontSize: dimensions(22),
    paddingBottom: "6%"
  },
  toggleAvailable: {
    color: "#FFF",
    fontSize: dimensions(14),
    marginRight: "55%"
  },
  inputDate: {
    width: "48%",
    color: "#46C5F3"
  }
});

AvailabilityDays = reduxForm({ form: "AvailabilityDays" })(AvailabilityDays);

export default AvailabilityDays;
