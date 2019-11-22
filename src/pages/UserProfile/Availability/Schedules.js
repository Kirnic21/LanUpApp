import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import ArrowRight from "~/assets/images/arrowRight.png";

const Schedules = ({ onPress, schedules }) => {
  debugger;
  return (
    <View style={styles.containerSchedules}>
      <Text
        style={{
          color: "#FFF",
          fontSize: 15,
          paddingBottom: "2%"
        }}
      >
        Horários
      </Text>
      {schedules.map(day => (
        <TouchableOpacity key={day.id} onPress={() => onPress(day)}>
          <View
            style={{
              flexDirection: "row",
              paddingBottom: "10%",
              borderBottomColor: "#18142F",
              borderBottomWidth: day.title === "Domingo" ? 0 : 2
            }}
          >
            <View
              style={{
                width: "50%",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 15
                }}
              >
                {day.title}
              </Text>
            </View>
            <View
              style={{
                width: "30%",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: day.date === "Não aceito job" ? "#EB4886" : "#46C5F3"
                }}
              >
                {day.date}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                width: "18%",

                alignItems: "flex-end"
              }}
            >
              <Image
                source={ArrowRight}
                style={{
                  width: "30%",
                  height: 15
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      ))}
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
  }
});

export default Schedules;
