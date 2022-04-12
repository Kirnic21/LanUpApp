import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import DateComponent from "~/shared/components/DateComponent";

const CardImageVacancies = ({
  title,
  shift,
  location,
  eventDate,
  picture,
  isHomeOffice,
  agencyName,
  hirerName,
}) => {
  return (
    <View style={{ marginBottom: calcWidth(5) }}>
      {picture !== null && picture !== undefined ? (
        <Image source={{ uri: picture }} style={{ height: dimensions(250) }} />
      ) : (
        <View
          style={{
            height: dimensions(250),
            backgroundColor: "#FFFFFF85",
            alignItems: "center",
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
        <View style={{ width: "100%", marginBottom: calcWidth(5), top: "2%" }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.colorPeriwinkle, styles.title]}
          >
            {title}
          </Text>
          <Text style={styles.textAgencyName}>{agencyName || "---"}</Text>
          <Text style={styles.textAgencyName}>{hirerName || "---"}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <DateComponent date={eventDate} />
          <View
            style={{
              flexDirection: "column",
              width: "80%",
              left: calcWidth(2),
            }}
          >
            <Text style={styles.textShift}>{shift}</Text>
            <Text
              style={isHomeOffice ? styles.textHomeOffice : styles.textAdress}
            >
              {location}
            </Text>
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
    top: "50%",
  },
  linearImg: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -0,
    height: dimensions(130),
  },
  title: {
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: adjust(20),
    lineHeight: calcWidth(10),
  },
  containerDate: {
    width: calcWidth(15),
    paddingVertical: calcWidth(1.5),
    backgroundColor: "#FFFFFF85",
    borderRadius: calcWidth(2),
  },
  colorPeriwinkle: { color: "#d2d0ff" },
  textDate: {
    color: "#18142F",
    fontFamily: "HelveticaNowMicro-Bold",
    textAlign: "center",
    fontSize: adjust(10),
  },
  textShift: {
    fontFamily: "HelveticaNowMicro-Regular",
    color: "#FFF",
    fontSize: adjust(10),
    paddingBottom: "1%",
  },
  textAgencyName: {
    fontFamily: "HelveticaNowMicro-Regular",
    color: "#FFFFFF",
    fontSize: adjust(10),
  },
  textAdress: {
    width: "100%",
    fontFamily: "HelveticaNowMicro-ExtraLight",
    fontSize: adjust(10),
    color: "#FFFF",
  },
  textHomeOffice: {
    color: "#46C5F3",
    width: "100%",
    fontFamily: "HelveticaNowMicro-ExtraLight",
    fontSize: adjust(12),
  },
});

export default CardImageVacancies;
