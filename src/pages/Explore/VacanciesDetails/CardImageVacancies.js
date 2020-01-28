import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import dimensions from "~/assets/Dimensions";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";

const CardImageVacancies = ({ title, shift, location, eventDate, picture }) => {
  formatDate = (date, form) => {
    return moment(date).format(form);
  };
  return (
    <View>
      {picture !== null ? (
        <Image source={{ uri: picture }} style={{ height: dimensions(250) }} />
      ) : (
        <View
          style={{
            height: dimensions(250),
            backgroundColor: "#FFFFFF85",
            alignItems: "center"
          }}
        >
          <Icon
            name="image"
            size={dimensions(35)}
            color="#23203F"
            style={{ top: "30%" }}
          />
        </View>
      )}
      <LinearGradient
        colors={["#49358C00", "#1D1738E8", "#18142F"]}
        style={styles.linearImg}
      />
      <View style={styles.container}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.containerDate}>
            <Text style={styles.textDate}>
              {formatDate(eventDate, "ddd")}
              {"\n"}
              <Text style={{ fontSize: dimensions(25) }}>
                {formatDate(eventDate, "DD")}
              </Text>
              {"\n"}
              {formatDate(eventDate, "MMM")}
            </Text>
          </View>
          <View style={{ flexDirection: "column", width: "80%" }}>
            <Text style={styles.textShift}>{shift} turnos</Text>
            <Text style={styles.textAdress}>{location}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "5%",
    flexWrap: "wrap",
    width: "90%",
    position: "absolute",
    top: "50%"
  },
  linearImg: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -0,
    height: dimensions(130)
  },
  title: {
    color: "#fff",
    fontFamily: "HelveticaNowDisplay-Regular",
    fontSize: dimensions(30),
    paddingBottom: "5%",
    width: "100%"
  },
  containerDate: {
    backgroundColor: "#FFFFFF85",
    paddingHorizontal: "4%",
    paddingVertical: "2%",
    alignItems: "center",
    borderRadius: dimensions(10),
    marginRight: "4%"
  },
  textDate: {
    color: "#18142F",
    fontFamily: "HelveticaNowMicro-Bold",
    fontSize: dimensions(12),
    textAlign: "center"
  },
  textShift: {
    fontFamily: "HelveticaNowMicro-Regular",
    color: "#FFF",
    fontSize: dimensions(12),
    paddingBottom: "2%"
  },
  textAdress: {
    width: "100%",
    fontFamily: "HelveticaNowMicro-ExtraLight",
    fontSize: dimensions(12),
    color: "#FFF"
  }
});

export default CardImageVacancies;
