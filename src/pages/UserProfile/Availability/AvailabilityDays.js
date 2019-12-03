import React from "react";
import ToggleSwitch from "toggle-switch-react-native";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import ProfileHeaderMenu from "~/shared/components/ProfileHeaderMenu";
import { Menu } from "react-native-paper";
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
  const { title, start, end, available } = day;
  debugger;
  const [iniTimeState, updateIniTime] = useState(start);
  const [endTimeState, updateEndTime] = useState(end);

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
                updateNow(now);
                console.log(now);
              }}
            />
          </View>
          <View style={[styles.containerAvailabilityDays]}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.Title}>Horas</Text>
              <ProfileHeaderMenu>
                <Menu.Item onPress={{}} title="Salvar" />
              </ProfileHeaderMenu>
            </View>
            <View style={{ alignContent: "stretch" }}>
              <TouchableOpacity onPress={() => setIniTime(true)}>
                <Input
                  style={{ width: "50%", color: "#46C5F3" }}
                  title="Das"
                  editable={false}
                  value={getFormmatedHour(iniTimeState)}
                />
              </TouchableOpacity>
              {showIniTime && (
                <DateTimePicker
                  value={iniTimeState}
                  mode={"time"}
                  is24Hour={true}
                  display="spinner"
                  onChange={e => {
                    if (e.type === "set") {
                      setIniTime(false);
                      day.start = e.nativeEvent.timestamp;
                      updateIniTime(day.start);
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
                      day.end = e.nativeEvent.timestamp;
                      updateEndTime(day.end);
                      updateTime(false, day);
                    }
                  }}
                />
              )}
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  left: "52%"
                }}
              >
                <TouchableOpacity onPress={() => setEndTime(true)}>
                  <Input
                    style={{ width: "50%", color: "#46C5F3" }}
                    title="Até"
                    editable={false}
                    value={getFormmatedHour(endTimeState)}
                  />
                </TouchableOpacity>
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

export default AvailabilityDays;
