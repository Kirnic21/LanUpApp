import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import moment from "moment";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Toggle from "~/shared/components/ToggleComponent";
import Schedules from "./Schedules";
import dimensions, { calcWidth } from "~/assets/Dimensions/index";
import ModalComingSoon from "~/shared/components/ModalComingSoon";
import { notifyVacancy } from "~/store/ducks/vacancies/vacancies.actions";
import {
  emergencyAvailability,
  getAvailability,
  decodeToken,
} from "~/shared/services/freela.http";
import { reduxForm } from "redux-form";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import SignalR from "~/shared/services/signalr";

const DisplayDate = ({ date, displayHour, isActive }) => {
  const style = { marginRight: "9.5%", marginBottom: "1%" };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "95.5%",
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
            fontFamily: "HelveticaNowMicro-ExtraLight",
          },
          isActive ? { color: "#46C5F3" } : { color: "#EB4886" },
        ]}
      >
        {isActive ? displayHour : "Não disponível"}
      </Text>
    </View>
  );
};

const convertSpecialDays = (days) =>
  days.map(({ day, date, start, end, available }) => ({
    date: day ? day : date,
    start,
    end,
    available,
  }));

class Availability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emergencyAvailability: false,
      selected: false,
      spinner: false,
      specialDays: [],
      schedules: [],
      daysOfWeek: {
        6: "Sabado",
        5: "Sexta",
        4: "Quinta",
        3: "Quarta",
        2: "Terça",
        1: "Segunda",
        0: "Domingo",
      },
      visible: false,
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

  onToggle = async (isOn) => {
    try {
      const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
      await emergencyAvailability({
        id: token.id,
        hasEmergencyAvailability: isOn,
      });

      SignalR.connect().then((conn) => {
        if (isOn) {
          conn.invoke("AddToGroup");
          conn.on(SignalR.channels.RECEIVE_VACANCY, this.onReceiveVacancy);
        } else {
          conn.invoke("RemoveFromGroup");
        }
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  GetDataAvailability = () => {
    this.setState({ spinner: true }, async () => {
      const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));

      try {
        const { data } = await getAvailability(token.id);
        const { days, emergencyAvailability, specialDays } = data.result.value;
        this.setState(
          {
            emergencyAvailability,
            schedules: days || [],
            specialDays: convertSpecialDays(specialDays || []),
          },
          () => {
            SignalR.connect().then((conn) => {
              if (emergencyAvailability) {
                conn.invoke("AddToGroup");
                conn.on(
                  SignalR.channels.RECEIVE_VACANCY,
                  this.onReceiveVacancy
                );
              }
            });
          }
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ spinner: false });
      }
    });
  };

  onReceiveVacancy = (vacancy) => {
    if (!vacancy.eventId) return;
    this.props.notifyVacancy(vacancy);
  };

  openAvailabilityDays = (day) => {
    const { daysOfWeek, schedules } = this.state;
    this.props.navigation.push("AvailabilityDays", {
      day,
      daysOfWeek,
      schedules,
    });
  };

  openSpecialHours = () => {
    const { specialDays: SpecialDays } = this.state;
    this.props.navigation.push("SpecialHours", { SpecialDays });
  };

  render() {
    const {
      schedules,
      specialDays,
      daysOfWeek,
      emergencyAvailability,
      spinner,
      visible,
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
                onColor="#865FC0"
                offColor="#18142F"
                isOn={emergencyAvailability}
                onToggle={(value) =>
                  this.setState({ emergencyAvailability: value }, () =>
                    this.onToggle(value)
                  )
                }
              />
            </View>
          </View>
          <Schedules
            schedules={schedules}
            daysOfWeek={daysOfWeek}
            onPress={(day) => {
              this.openAvailabilityDays(day);
            }}
          />
          <View style={styles.containerSpecialTimes}>
            <TouchableOpacity onPress={() => this.openSpecialHours()}>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: "10%",
                  width: "94.5%",
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
              {specialDays.map(({ date, start, end, available }, id) => (
                <DisplayDate
                  key={id}
                  isActive={available}
                  date={date}
                  displayHour={`${start.substr(0, 5)} até ${end.substr(0, 5)}`}
                />
              ))}
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: "HelveticaNowMicro-ExtraLight",
              fontSize: dimensions(14),
              color: "rgba(255,255,255,0.8)",
              textAlign: "center",
              marginHorizontal: calcWidth(3),
              marginBottom: calcWidth(8),
            }}
          >
            Preencha corretamente seus horários,{"\n"}para aumentar suas chances
            de{"\n"}receber vagas
          </Text>
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
    backgroundColor: "#18142F",
  },
  containerAvailability: {
    backgroundColor: "#24203B",
    marginHorizontal: "5%",
    padding: "5%",
    marginTop: calcWidth(3),
    borderRadius: 15,
  },
  containerSchedules: {
    backgroundColor: "#24203B",
    marginHorizontal: "5%",
    padding: "5%",
    borderRadius: 15,
    marginTop: "3%",
  },
  containerSpecialTimes: {
    backgroundColor: "#24203B",
    marginHorizontal: "5%",
    padding: "5%",
    marginBottom: "5%",
    borderRadius: 15,
    marginTop: "3%",
  },
  titleStyle: {
    color: "#FFF",
    fontSize: dimensions(14),
    fontFamily: "HelveticaNowMicro-Regular",
  },
});

const mapStateToProps = (state) => ({});
const mapActionToProps = (dispatch) =>
  bindActionCreators({ notifyVacancy }, dispatch);

Availability = connect(mapStateToProps, mapActionToProps)(Availability);
Availability = reduxForm({ form: "Availability", enableReinitialize: true })(
  Availability
);

export default Availability;
