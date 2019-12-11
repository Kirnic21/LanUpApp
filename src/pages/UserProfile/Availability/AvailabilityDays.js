import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import moment from "moment";

import ToggleSwitch from "toggle-switch-react-native";
import ProfileHeaderMenu from "~/shared/components/ProfileHeaderMenu";

import { Field, reduxForm } from "redux-form";
import { MenuItem } from "react-native-material-menu";
import DateInputField from "~/shared/components/DateInputField";
import { saveAvailability, decodeToken } from "~/shared/services/freela.http";
import AsyncStorage from "@react-native-community/async-storage";
import DropdownAlert from "react-native-dropdownalert";

const AvailabilityDays = props => {
  useEffect(() => {
    props.initialize({
      start:
        day.start === null
          ? new Date(`01/01/2000 00:00`)
          : new Date(`01/01/2000 ${day.start}`),
      end:
        day.end === null
          ? new Date(`01/01/2000 00:00`)
          : new Date(`01/01/2000 ${day.end}`)
    });
  }, []);

  _menu = null;
  const day = props.navigation.state.params.day;
  const daysOfWeek = props.navigation.state.params.daysOfWeek;
  const schedules = props.navigation.state.params.schedules;
  const days = schedules.filter(c => c.available === true);
  const { dayOfWeek, available } = day;

  const [now, updateNow] = useState(available);
  const { handleSubmit } = props;

  saveToggle = async now => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    saveAvailability({
      freelaId: token.id,
      dayAvailabilities: [...days, { dayOfWeek, available: now }]
    })
      .then(({ data }) => {
        if (data.isSuccess) {
          console.log(data);
        }
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  const saveDate = async form => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    const { start, end } = form;
    saveAvailability({
      freelaId: token.id,
      dayAvailabilities: [
        ...days,
        {
          dayOfWeek,
          start: moment(start).format("hh:mm"),
          end: moment(end).format("hh:mm"),
          available: now
        }
      ]
    })
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
          <Text style={{ color: "#FFF", fontSize: 23, paddingBottom: "6%" }}>
            {daysOfWeek[dayOfWeek]}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#FFF", fontSize: 15, marginRight: "55%" }}>
              Estou disponível
            </Text>
            <ToggleSwitch
              size="small"
              onColor="#483D8B"
              offColor="#24203B"
              isOn={now}
              onToggle={now => {
                updateNow(now);
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
              <ProfileHeaderMenu
                ref={comp => {
                  _menu = comp;
                }}
              >
                <MenuItem
                  onPress={
                    (() => {
                      this._menu.hideMenu();
                    },
                    handleSubmit(data => saveDate(data)))
                  }
                >
                  Salvar
                </MenuItem>
              </ProfileHeaderMenu>
            </View>
            <View style={{ alignContent: "stretch" }}>
              <Field
                style={{ width: "48%" }}
                title="Das"
                mode="time"
                component={DateInputField}
                name={`start`}
              />
              <View
                style={{ position: "absolute", width: "100%", left: "52%" }}
              >
                <Field
                  style={{ width: "48%" }}
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
};

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
    paddingBottom: "-1%",
    borderRadius: 15
  },
  Title: {
    color: "#FFF",
    fontSize: 15,
    paddingBottom: "5%",
    marginRight: "75%"
  }
});

export default reduxForm({
  form: "AvailabilityDays"
})(AvailabilityDays);
