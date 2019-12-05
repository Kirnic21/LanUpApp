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
  saveAvailability,
  decodeToken
} from "~/shared/services/freela.http";
import ArrowRight from "~/assets/images/arrowRight.png";
import { Field, reduxForm } from "redux-form";
import moment from 'moment'

import Schedules from "./Schedules";

import AsyncStorage from "@react-native-community/async-storage";

const DisplayDate = ({ date, displayHour }) => {
  return <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Text style={{ color: "#FFF", fontSize: 15, marginRight: "15.5%" }}>
      {moment(date).format("DD [de] MMM, YYYY")}
    </Text>
    <Text style={{
      color: "#46C5F3",
      fontSize: 12
    }}>
      {displayHour}
    </Text>
  </View>;
}

class Availability extends Component {
  state = {
    selected: false,
    SpecialDays: [],
    schedules: [
      {
        id: "1",
        title: "Segunda",
        date: "18:00 até 21:00",
        start: new Date().getTime(),
        end: new Date().getTime(),
        available: true
      },
      {
        id: "2",
        title: "Terça",
        date: "Não aceito job",
        start: new Date().getTime(),
        end: new Date().getTime(),
        available: false
      },
      {
        id: "3",
        title: "Quarta",
        date: "Não aceito job",
        start: new Date().getTime(),
        end: new Date().getTime(),
        available: false
      },
      {
        id: "4",
        title: "Quinta",
        date: "18:00 até 21:00",
        start: new Date().getTime(),
        end: new Date().getTime(),
        available: true
      },
      {
        id: "5",
        title: "Sexta",
        date: "18:00 até 21:00",
        start: new Date().getTime(),
        end: new Date().getTime(),
        available: true
      },
      {
        id: "6",
        title: "Sabado",
        date: "Não aceito job",
        start: new Date().getTime(),
        end: new Date().getTime(),
        available: false
      },
      {
        id: "7",
        title: "Domingo",
        date: "18:00 até 21:00",
        start: new Date().getTime(),
        end: new Date().getTime(),
        available: false
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

    const normalizeSpecialDate = ({ day, date, start, end, available }) => ({
      date: day ? day : date,
      start,
      end,
      available
    })

    const convertItems = (days) => days.map(normalizeSpecialDate)

    getAvailability(token.id).then(({ data }) => {
      const SpecialDays = data.result.value.specialDays;

      SpecialDays === null
        ? this.setState({ SpecialDays: [] })
        : this.setState({ SpecialDays: convertItems(SpecialDays) });
    });
  }

  openAvailabilityDays = day => {
    const getFormmatedHour = time =>
      `${new Date(time).getHours()}:${new Date(time).getMinutes()}`;

    updateTime = async (isIni, dayUpdated) => {
      const { schedules } = this.state;
      const curDay = schedules.find(c => c.id === dayUpdated.id);
      if (isIni) curDay.start = dayUpdated.start;
      else curDay.end = dayUpdated.end;

      curDay.date = `${getFormmatedHour(curDay.start)} até ${getFormmatedHour(
        curDay.end
      )}`;
      this.setState({ schedules });
      const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
      const schedule = this.state.days;

      saveAvailability({
        freelaId: token.id,
        dayAvailabilities: [
          ...schedule,
          {
            dayOfWeek: "Sunday",
            start: getFormmatedHour(curDay.start),
            end: getFormmatedHour(curDay.end),
            available: true
          }
        ]
      })
        .then(async ({ data }) => {
          if (data.isSuccess) {
            debugger;
            console.log(data);
          }
        })
        .catch(error => {
          debugger;
          console.log(error.response.data);
        });
    };
    this.props.navigation.push("AvailabilityDays", {
      day,
      updateTime: updateTime
    });
  };

  openSpecialHours = () => {
    const { SpecialDays } = this.state
    this.props.navigation.navigate("SpecialHours", { SpecialDays });
  };

  render() {
    const { schedules, SpecialDays } = this.state;
    debugger
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
              {SpecialDays.map(({date, start, end}) => 
                <DisplayDate date={date} displayHour={`${start.substr(0, 5)} até ${end.substr(0, 5)}`} />
              )}
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
