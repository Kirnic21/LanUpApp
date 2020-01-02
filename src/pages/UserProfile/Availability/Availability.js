import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import moment from "moment";

import ToggleSwitch from "toggle-switch-react-native";
import ArrowRight from "~/assets/images/arrowRight.png";
import Schedules from "./Schedules";
import dimensions from "~/assets/Dimensions/index";

import {
  emergencyAvailability,
  getAvailability,
  decodeToken
} from "~/shared/services/freela.http";
import { reduxForm } from "redux-form";
import AsyncStorage from "@react-native-community/async-storage";

const DisplayDate = ({ date, displayHour, isActive }) => {
  const style = {
    color: "#FFF",
    fontSize: dimensions(14),
    marginRight: "15.5%",
    marginBottom: "1%"
  };
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={style}>{moment(date).format("DD [de] MMM, YYYY")}</Text>
      <Text
        style={[
          {
            fontSize: dimensions(11)
          },
          isActive ? { color: "#46C5F3" } : { color: "#EB4886" }
        ]}
      >
        {isActive ? displayHour : "Não disponível"}
      </Text>
    </View>
  );
};

class Availability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emergencyAvailability: false,
      selected: false,
      SpecialDays: [],
      schedules: [],
      daysOfWeek: {
        6: "Sabado",
        5: "Sexta",
        4: "Quinta",
        3: "Quarta",
        2: "Terça",
        1: "Segunda",
        0: "Domingo"
      }
    };
    this.props.navigation.addListener("willFocus", () => {
      this.GetDataAvailability();
    });
  }

  onToggle = async isOn => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    emergencyAvailability({
      id: token.id,
      hasEmergencyAvailability: isOn
    })
      .then(({ data }) => {
        if (data.isSuccess) {
          AsyncStorage.setItem(JSON.stringify(data));
          console.log(data);
        }
      })
      .catch(error => {
        console.log(error.response.data);
        alert(isOn);
      });
  };

  GetDataAvailability = async () => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    const dimensionsSpecialDate = ({ day, date, start, end, available }) => ({
      date: day ? day : date,
      start,
      end,
      available
    });
    const convertItems = days => days.map(dimensionsSpecialDate);
    getAvailability(token.id).then(({ data }) => {
      const schedules = data.result.value.days;
      const emergencyAvailability = data.result.value.emergencyAvailability;
      this.setState({ emergencyAvailability });
      schedules === null
        ? this.setState({ schedules: [] })
        : this.setState({ schedules });

      const SpecialDays = data.result.value.specialDays;
      SpecialDays === null
        ? this.setState({ SpecialDays: [] })
        : this.setState({ SpecialDays: convertItems(SpecialDays) });
    });
  };

  componentDidMount() {
    this.GetDataAvailability();
  }

  openAvailabilityDays = day => {
    const { daysOfWeek, schedules } = this.state;
    this.props.navigation.push("AvailabilityDays", {
      day,
      daysOfWeek,
      schedules
    });
  };

  openSpecialHours = () => {
    const { SpecialDays } = this.state;
    this.props.navigation.navigate("SpecialHours", { SpecialDays });
  };

  render() {
    const {
      schedules,
      SpecialDays,
      daysOfWeek,
      emergencyAvailability
    } = this.state;
    return (
      <View style={styles.Container}>
        <ScrollView>
          <View style={styles.containerAvailability}>
            <Text
              style={{
                color: "#FFF",
                fontSize: dimensions(14),
                paddingBottom: "5%"
              }}
            >
              Para vagas urgentes
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#FFF",
                  fontSize: dimensions(14),
                  marginRight: "35%"
                }}
              >
                Estou disponível agora
              </Text>
              <ToggleSwitch
                size="medium"
                onColor="#483D8B"
                offColor="#18142F"
                isOn={emergencyAvailability}
                onToggle={emergencyAvailability => {
                  this.setState({ emergencyAvailability });
                  this.onToggle(emergencyAvailability);
                }}
              />
            </View>
          </View>
          <Schedules
            schedules={schedules}
            daysOfWeek={daysOfWeek}
            onPress={day => {
              this.openAvailabilityDays(day);
            }}
          />
          <View style={styles.containerSpecialTimes}>
            <TouchableOpacity onPress={() => this.openSpecialHours()}>
              <View style={{ flexDirection: "row", paddingBottom: "10%" }}>
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: dimensions(14),
                    marginRight: "51%"
                  }}
                >
                  Horários especiais
                </Text>
                <Image
                  source={ArrowRight}
                  style={{ width: "6%", height: 15, top: "2%" }}
                />
              </View>
              {SpecialDays.map(({ date, start, end, available }, id) => (
                <DisplayDate
                  key={id}
                  isActive={available}
                  date={date}
                  displayHour={`${start.substr(0, 5)} até ${end.substr(0, 5)}`}
                />
              ))}
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
    marginBottom: "2%",
    borderRadius: 15,
    marginTop: "3%"
  }
});

export default Availability = reduxForm({
  form: "Availability",
  // validate: formRules,
  enableReinitialize: true
})(Availability);
