import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import ActionButton from "~/shared/components/ActionButton";
import dimensions, { adjust } from "~/assets/Dimensions/index";
import add from "~/assets/images/icon_add.png";

const AddSkillEmpty = ({ onPress, isEditing }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <View style={{ width: "100%", padding: "5%" }}>
        <Text style={styles.titleSkill}>Habilidades</Text>
      </View>
      <View
        style={{
          width: "100%",
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
          opacity: isEditing ? 0 : 1
        }}
      >
        <Text style={styles.title}>
          Não há nenhuma habilidade{"\n"}para ser exibida
        </Text>
        <Text style={styles.subtitle}>
          Adicione usando o{' " '}
          <Image source={add} style={{ width: 20, height: 20 }} />
          {' " '}
          abaixo
        </Text>
      </View>
      <View style={styles.containerActionButton}>
        {isEditing ? <></> : <ActionButton onPress={onPress} />}
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
    fontSize: adjust(20),
    paddingBottom: "5%",
    fontFamily: "HelveticaNowMicro-Regular"
  },
  title: {
    color: "#FFF",
    textAlign: "center",
    fontSize: adjust(20),
    lineHeight: dimensions(37),
    fontFamily: "HelveticaNowDisplay-Regular"
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: adjust(13),
    textAlign: "center",
    top: "3%",
    lineHeight: dimensions(40),
    fontFamily: "HelveticaNowMicro-ExtraLight"
  },
  containerActionButton: {
    width: "97%",
    height: "30%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    top: "-3%"
  }
});

export default AddSkillEmpty;
