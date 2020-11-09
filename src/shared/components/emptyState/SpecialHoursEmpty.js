import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import ActionButton from "~/shared/components/ActionButton";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions/index";
import add from "~/assets/images/icon_add.png";

const SpecialHoursEmpty = ({ onPress }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "50%",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>
          Não há nenhuma data{"\n"}para ser exibida
        </Text>
        <Text style={styles.subtitle}>
          Os horários especiais é mais uma{"\n"}oportunidade de aumentar suas
          {"\n"}chances e ser selecionado em{"\n"}feriados como Natal e Ano
          novo.
        </Text>
        <Text style={[styles.subtitle, { marginTop: calcWidth(5) }]}>
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

          top: "-2%",
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
    justifyContent: "space-between",
  },
  title: {
    color: "#FFF",
    textAlign: "center",
    fontSize: adjust(20),
    lineHeight: dimensions(37),
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: adjust(13),
    fontFamily: "HelveticaNowMicro-ExtraLight",
    textAlign: "center",
    top: calcWidth(6),
  },
});

export default SpecialHoursEmpty;
