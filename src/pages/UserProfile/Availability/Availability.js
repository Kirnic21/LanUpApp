import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import moment from "moment";

import Toggle from "~/shared/components/ToggleComponent";
import Schedules from "./Schedules";
import dimensions from "~/assets/Dimensions/index";
import ModalComingSoon from "~/shared/components/ModalComingSoon";

import {
  emergencyAvailability,
  getAvailability,
  decodeToken
} from "~/shared/services/freela.http";
import { reduxForm } from "redux-form";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import SpinnerComponent from "~/shared/components/SpinnerComponent";

const DisplayDate = ({ date, displayHour, isActive }) => {
  const style = { marginRight: "9.5%", marginBottom: "1%" };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "95.5%"
      }}
    >
      <Text style={[styles.titleStyle, style]}>
        {moment(date).format("DD [de] MMM, YYYY")}
      </Text>
      <Text
        style={[
          {
            fontSize: dimensions(10),
            width: "40%",
            left: "12%",
            fontFamily: "HelveticaNowMicro-ExtraLight"
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
      spinner: false,
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
      },
      visible: false
    };
    this.props.navigation.addListener("willFocus", () => {
      this.GetDataAvailability();
    });
  }

  componentDidMount() {
    this.GetDataAvailability();
  }

  openModal = () => {
    this.setState({ visible: true });
  };
  closeModal = () => {
    this.setState({ visible: false });
  };

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
    this.setState({ spinner: true });
    const dimensionsSpecialDate = ({ day, date, start, end, available }) => ({
      date: day ? day : date,
      start,
      end,
      available
    });
    const convertItems = days => days.map(dimensionsSpecialDate);
    getAvailability(token.id)
      .then(({ data }) => {
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
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  };

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
      // emergencyAvailability,
      spinner,
      visible
    } = this.state;
    return (
      <View style={styles.Container}>
        <SpinnerComponent loading={spinner} />
        <ScrollView>
          <View style={styles.containerAvailability}>
            <Text style={[styles.titleStyle, { paddingBottom: "5%" }]}>
              Para vagas urgentes
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.titleStyle, { marginRight: "25%" }]}>
                Estou disponível agora
              </Text>
              <Toggle
                onColor="#18142F"
                offColor="#18142F"
                isOn={false}
                // onToggle={emergencyAvailability => {
                //   this.setState({ emergencyAvailability });
                //   this.onToggle(emergencyAvailability);
                // }}
                onToggle={() => this.openModal()}
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
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: "10%",
                  width: "94.5%"
                }}
              >
                <Text style={[styles.titleStyle, { width: "95.5%" }]}>
                  Horários especiais
                </Text>
                <Icon
                  color={"#FFF"}
                  name={"angle-right"}
                  size={dimensions(30)}
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
        <ModalComingSoon
          onTouchOutside={() => this.closeModal()}
          onClose={() => this.closeModal()}
          visible={visible}
          onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
        />
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
  },
  titleStyle: {
    color: "#FFF",
    fontSize: dimensions(14),
    fontFamily: "HelveticaNowMicro-Regular"
  }
});

export default Availability = reduxForm({
  form: "Availability",
  // validate: formRules,
  enableReinitialize: true
})(Availability);
