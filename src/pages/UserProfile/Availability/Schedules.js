import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import dimensions, { adjust } from "~/assets/Dimensions/index";

const getDisplayDate = (day) => {
  if (!day.available) return "Não aceito trabalho";
  const start = day.start;
  const end = day.end;
  return `${start.substring(0, 5)} até ${end.substring(0, 5)}`;
};

const sortByDaysOfWeek = (arr) =>
  arr.sort(({ dayOfWeek: a }, { dayOfWeek: b }) =>
    a > b ? 1 : a < b ? -1 : 0
  );

const Schedules = ({ onPress, schedules, daysOfWeek }) => {
  return (
    <View style={styles.containerSchedules}>
      <Text style={[styles.textStyle, { paddingBottom: "2%" }]}>Horários</Text>
      {sortByDaysOfWeek(schedules).map((day) => {
        return (
          <TouchableOpacity key={day.dayOfWeek} onPress={() => onPress(day)}>
            <View
              style={{
                flexDirection: "row",
                paddingBottom: "10%",
                borderBottomColor: "#18142F",
                borderBottomWidth: day.dayOfWeek === 6 ? 0 : 2,
              }}
            >
              <View
                style={{
                  width: Platform.OS === "ios" ? "55%" : "50%",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.textStyle}>
                  {daysOfWeek[day.dayOfWeek]}
                </Text>
              </View>
              <View
                style={{
                  width: Platform.OS === "ios" ? "30%" : "35%",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: adjust(8),
                    fontFamily: "HelveticaNowMicro-ExtraLight",
                    color: !day.available ? "#EB4886" : "#46C5F3",
                  }}
                >
                  {getDisplayDate(day)}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  width: "10%",
                  alignItems: "flex-end",
                }}
              >
                <Icon
                  color={"#FFF"}
                  name={"angle-right"}
                  size={dimensions(30)}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  containerSchedules: {
    backgroundColor: "#24203B",
    marginHorizontal: "5%",
    padding: "5%",
    borderRadius: 15,
    marginTop: "3%",
  },
  textStyle: {
    color: "#FFF",
    fontSize: adjust(12),
    fontFamily: "HelveticaNowMicro-Regular",
  },
});

export default Schedules;
