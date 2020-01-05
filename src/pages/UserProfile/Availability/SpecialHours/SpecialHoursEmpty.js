import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import ActionButton from "~/shared/components/ActionButton";
import dimensions from "~/assets/Dimensions/index";
import add from "~/assets/images/icon_add.png";

const SpecialHoursEmpty = ({ onPress }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <View
        style={{
          width: "100%",
          height: "50%",
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <Text style={styles.title}>
          Não há nenhuma data{"\n"}para ser exibida
        </Text>
        <Text style={styles.subtitle}>
          Adicione usando o{' " '}
          <Image source={add} style={{ width: 20, height: 20 }} />
          {' " '}
          abaixo
        </Text>
      </View>
      <View
        style={{
          width: "95%",
          height: "40%",
          justifyContent: "flex-end",
          alignItems: "flex-end",

          top: "-2%"
        }}
      >
        <ActionButton onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  titleSkill: {
    color: "#FFF",
    fontSize: dimensions(23),
    paddingBottom: "5%"
  },
  title: {
    color: "#FFF",
    textAlign: "center",
    fontSize: dimensions(22),
    lineHeight: dimensions(37)
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: dimensions(15),
    textAlign: "center",
    top: "3%",
    lineHeight: dimensions(40)
  }
});

export default SpecialHoursEmpty;
