import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import ArrowRight from "~/assets/images/arrowRight.png";
import dimensions from "~/assets/Dimensions/index";

const getDisplayDate = day => {
  if (!day.available) return "Não aceito job";
  const start = day.start;
  const end = day.end;
  return `${start.substring(0, 5)} até ${end.substring(0, 5)}`;
};

const sortByDaysOfWeek = arr =>
  arr.sort(({ dayOfWeek: a }, { dayOfWeek: b }) =>
    a > b ? 1 : a < b ? -1 : 0
  );

const Schedules = ({ onPress, schedules, daysOfWeek }) => {
  return (
    <View style={styles.containerSchedules}>
      <Text style={[styles.textStyle, { paddingBottom: "2%" }]}>Horários</Text>
      {sortByDaysOfWeek(schedules).map(day => {
        return (
          <TouchableOpacity key={day.dayOfWeek} onPress={() => onPress(day)}>
            <View
              style={{
                flexDirection: "row",
                paddingBottom: "10%",
                borderBottomColor: "#18142F",
                borderBottomWidth: day.dayOfWeek === 6 ? 0 : 2
              }}
            >
              <View style={{ width: "55%", justifyContent: "center" }}>
                <Text style={styles.textStyle}>
                  {daysOfWeek[day.dayOfWeek]}
                </Text>
              </View>
              <View style={{ width: "30%", justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: dimensions(10),
                    fontFamily: "HelveticaNowMicro-ExtraLight",
                    color: !day.available ? "#EB4886" : "#46C5F3"
                  }}
                >
                  {getDisplayDate(day)}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  width: "10%",
                  alignItems: "flex-end"
                }}
              >
                <Image
                  source={ArrowRight}
                  style={{ width: "35%", height: dimensions(17) }}
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
    marginTop: "3%"
  },
  textStyle: {
    color: "#FFF",
    fontSize: dimensions(14),
    fontFamily: "HelveticaNowMicro-Regular"
  }
});

export default Schedules;
