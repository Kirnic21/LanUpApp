import React, { Component } from "react";
import { FlatList } from "react-native-gesture-handler";
import ToggleSwitch from "toggle-switch-react-native";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput
} from "react-native";
import ProfileHeaderMenu from "~/shared/components/ProfileHeaderMenu";
import InputField from "~/shared/components/InputField";
import { Field, reduxForm } from "redux-form";
import { Menu } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import { availability, decodeToken } from "~/shared/services/freela.http";
import Input from "~/shared/components/InputLabel";

import { useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
const getFormmatedHour = time =>
  `${new Date(time).getHours()}:${new Date(time).getMinutes()}`;
const AvailabilityDays = props => {
  const [showIniTime, setIniTime] = useState(false);
  const [showEndTime, setEndTime] = useState(false);

  const day = props.navigation.state.params.day;
  const updateTime = props.navigation.state.params.updateTime;
  const { title, iniTime, endTime, isAvailable } = day;
  debugger;
  const [iniTimeState, updateIniTime] = useState(iniTime);
  const [endTimeState, updateEndTime] = useState(endTime);

  const [now, updateNow] = useState(false);

  return (
    <View style={styles.Container}>
      <ScrollView>
        <View style={{ marginHorizontal: "6%" }}>
          <Text
            style={{
              color: "#FFF",
              fontSize: 23,
              paddingBottom: "6%"
            }}
          >
            {title}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#FFF",
                fontSize: 15,
                marginRight: "55%"
              }}
            >
              Estou disponível
            </Text>
            <ToggleSwitch
              size="small"
              onColor="#483D8B"
              offColor="#483D8B"
              isOn={now}
              onToggle={now => {
                this.setState({ now });
                updateNow(now);
              }}
            />
          </View>
          <View style={[styles.containerAvailabilityDays]}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 15,
                  paddingBottom: "5%",
                  marginRight: "75%"
                }}
              >
                Horas
              </Text>
              <ProfileHeaderMenu>
                <Menu.Item onPress={{}} title="Salvar" />
              </ProfileHeaderMenu>
            </View>
            <View
              style={{
                alignContent: "stretch"
              }}
            >
              <View style={{}}>
                <Text onPress={() => setIniTime(true)}>
                  {getFormmatedHour(iniTimeState)}
                </Text>
              </View>

              {showIniTime && (
                <DateTimePicker
                  value={iniTimeState}
                  mode={"time"}
                  is24Hour={true}
                  display="spinner"
                  onChange={e => {
                    if (e.type === "set") {
                      setIniTime(false);
                      day.iniTime = e.nativeEvent.timestamp;
                      updateIniTime(day.iniTime);
                      updateTime(true, day);
                    }
                  }}
                />
              )}
              {showEndTime && (
                <DateTimePicker
                  value={endTimeState}
                  mode={"time"}
                  is24Hour={true}
                  display="spinner"
                  onChange={e => {
                    if (e.type === "set") {
                      setEndTime(false);
                      day.endTime = e.nativeEvent.timestamp;
                      updateEndTime(day.endTime);
                      updateTime(false, day);
                    }
                  }}
                />
              )}
              {/* <Field
                style={{ width: "48%" }}
                title="Das"
                component={InputField}
                name={"start"}
              /> */}
              <View
                style={{
                  position: "absolute",
                  width: "50%",
                  left: "52%",
                  borderColor: "#FFF",
                  borderWidth: 2
                }}
              >
                <Text onPress={() => setEndTime(true)}>
                  {getFormmatedHour(endTimeState)}
                </Text>
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
    borderRadius: 15
  }
});

export default AvailabilityDays;
