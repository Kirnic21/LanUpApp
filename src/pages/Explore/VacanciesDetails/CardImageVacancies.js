import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import imgDetails from "~/assets/images/img_details.png";
import dimensions from "~/assets/Dimensions";
import LinearGradient from "react-native-linear-gradient";

const CardImageVacancies = ({}) => {
  return (
    <View>
      <Image source={imgDetails} style={{ height: dimensions(250) }} />
      <LinearGradient
        colors={["#49358C00", "#1D1738E8", "#18142F"]}
        style={styles.linearImg}
      />
      <View style={styles.container}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          Balada TheWeek
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.containerDate}>
            <Text style={styles.textDate}>
              SÁB{"\n"}
              <Text style={{ fontSize: dimensions(25) }}>10</Text>
              {"\n"}OUT
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.textShift}>3 turnos</Text>
            <Text style={styles.textAdress}>
              Av. Brigadeiro Luís Antônio, 2696 Jardim Paulista, SP - 05581-000
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
    fontSize: dimensions(35),
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
    width: "60%",
    fontFamily: "HelveticaNowMicro-ExtraLight",
    fontSize: dimensions(12),
    color: "#FFF"
  }
});

export default CardImageVacancies;
