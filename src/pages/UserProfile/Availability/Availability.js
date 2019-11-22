import React, { Component } from "react";
import ToggleSwitch from "toggle-switch-react-native";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import {
  emergencyAvailability,
  getAvailability,
  decodeToken
} from "~/shared/services/freela.http";
import ArrowRight from "~/assets/images/arrowRight.png";
import { Field, reduxForm } from "redux-form";

import Schedules from "./Schedules";

import AsyncStorage from "@react-native-community/async-storage";

class Availability extends Component {
  state = {
    selected: false,
    now: false,
    test: "teste",
    schedules: [
      {
        id: "1",
        title: "Segunda",
        date: "18:00 até 21:00",
        iniTime: new Date().getTime(),
        endTime: new Date().getTime(),
        isAvailable: false
      },
      {
        id: "2",
        title: "Terça",
        date: "Não aceito job",
        iniTime: new Date().getTime(),
        endTime: new Date().getTime(),
        isAvailable: false
      },
      {
        id: "3",
        title: "Quarta",
        date: "Não aceito job",
        iniTime: new Date().getTime(),
        endTime: new Date().getTime(),
        isAvailable: false
      },
      {
        id: "4",
        title: "Quinta",
        date: "18:00 até 21:00",
        iniTime: new Date().getTime(),
        endTime: new Date().getTime(),
        isAvailable: false
      },
      {
        id: "5",
        title: "Sexta",
        date: "18:00 até 21:00",
        iniTime: new Date().getTime(),
        endTime: new Date().getTime(),
        isAvailable: false
      },
      {
        id: "6",
        title: "Sabado",
        date: "Não aceito job",
        iniTime: new Date().getTime(),
        endTime: new Date().getTime(),
        isAvailable: false
      },
      {
        id: "7",
        title: "Domingo",
        date: "18:00 até 21:00",
        iniTime: new Date().getTime(),
        endTime: new Date().getTime(),
        isAvailable: false
      }
    ]
  };

  onToggle = async isOn => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    emergencyAvailability({
      id: token.id,
      hasEmergencyAvailability: isOn
    })
      .then(({ data }) => {
        console.log("passou");
        if (data.isSuccess) {
          AsyncStorage.setItem(JSON.stringify(data));
          console.log(data);
          alert(isOn);
        }
      })
      .catch(error => {
        console.log(error.response.data);
        alert(isOn);
      });
  };

  async componentDidMount() {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    getAvailability(token.id).then(({ data }) => {
      console.log(data.result);
      const availability = data.result.value.emergencyAvailability;
      this.setState({ availability });
    });
  }

  openAvailabilityDays = day => {
    const getFormmatedHour = time =>
      `${new Date(time).getHours()}:${new Date(time).getMinutes()}`;

    updateTime = (isIni, dayUpdated) => {
      const { schedules } = this.state;
      const curDay = schedules.find(c => c.id === dayUpdated.id);
      if (isIni) curDay.iniTime = dayUpdated.iniTime;
      else curDay.endTime = dayUpdated.endTime;

      curDay.date = `${getFormmatedHour(curDay.iniTime)} até ${getFormmatedHour(
        curDay.endTime
      )}`;
      this.setState({ schedules });
    };
    this.props.navigation.push("AvailabilityDays", {
      day,
      updateTime: updateTime
    });
  };

  openSpecialHours = () => {
    this.props.navigation.navigate("SpecialHours");
  };

  render() {
    const { schedules } = this.state;
    return (
      <View style={styles.Container}>
        <ScrollView>
          <View style={styles.containerAvailability}>
            <Text
              style={{
                color: "#FFF",
                fontSize: 15,
                paddingBottom: "5%"
              }}
            >
              Para vagas urgentes
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 16,
                  marginRight: "35%"
                }}
              >
                Estou disponível agora
              </Text>
              <ToggleSwitch
                size="medium"
                onColor="#483D8B"
                offColor="#18142F"
                isOn={this.state.availability}
                onToggle={availability => {
                  this.setState({ availability });
                  this.onToggle(availability);
                }}
              />
            </View>
          </View>
          <Schedules
            schedules={schedules}
            onPress={day => {
              debugger;
              this.openAvailabilityDays(day);
            }}
          />
          <View style={styles.containerSpecialTimes}>
            <TouchableOpacity onPress={() => this.openSpecialHours()}>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: "10%"
                }}
              >
                <Text
                  style={{ color: "#FFF", fontSize: 15, marginRight: "51%" }}
                >
                  Horários especiais
                </Text>
                <Image
                  source={ArrowRight}
                  style={{
                    width: "6%",
                    height: 15,
                    top: "2%"
                  }}
                />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ color: "#FFF", fontSize: 15, marginRight: "15.5%" }}
                >
                  16 de Dez,2019
                </Text>
                <Text
                  style={{
                    color: "#46C5F3",
                    fontSize: 12
                  }}
                >
                  18:00 até 21:00
                </Text>
              </View>
            </TouchableOpacity>
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
  containerAvailability: {
    backgroundColor: "#24203B",
    marginHorizontal: "5%",
    padding: "5%",
    borderRadius: 15
  },
  containerSchedules: {
    backgroundColor: "#24203B",
    marginHorizontal: "5%",
    padding: "5%",
    borderRadius: 15,
    marginTop: "3%"
  },
  containerSpecialTimes: {
    backgroundColor: "#24203B",
    marginHorizontal: "5%",
    padding: "5%",
    borderRadius: 15,
    marginTop: "3%"
  }
});

export default Availability = reduxForm({
  form: "Availability",
  // validate: formRules,
  enableReinitialize: true
})(Availability);
