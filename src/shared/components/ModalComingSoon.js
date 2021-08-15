import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import dimensions, { calcWidth, adjust, calcHeight } from "~/assets/Dimensions/index";
import imgBuilder from "~/assets/images/icon_msg-builder.png";
import RoundButton from "./RoundButton";
import ModalComponent from "./ModalComponent";
import { Platform } from 'react-native'

export default ModalComingSoon = ({ visible, onClose }) => (
  <View>
    <ModalComponent
      visible={visible}
      onClose={onClose}
      heightModal={Platform.OS === 'ios' ? calcHeight(88) : calcWidth(108)}
    >
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text allowFontScaling={false} style={styles.textTitle}>Calma ai, amig@!</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.textSubtitle}>Ainda estamos em progresso!</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={imgBuilder}
            style={{
              height: calcWidth(50),
              width: calcWidth(70)
            }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.textSubtitle}>Logo mais teremos essa</Text>
          <Text style={styles.textSubtitle}>funcionalidade para você!</Text>
        </View>
      </View>
      <View style={{}}>
        <RoundButton name="Entendi" style={styles.btn} onPress={onClose} />
      </View>
    </ModalComponent>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  containerTitle: {
    height: "15%",
    justifyContent: "center",
    alignItems: "center"
  },
  textTitle: {
    color: "#FFF",
    fontSize: adjust(25),
    fontFamily: "HelveticaNowMicro-Medium"
  },
  textSubtitle: {
    color: "#FFF",
    fontSize: adjust(12),
    fontFamily: "HelveticaNowMicro-Regular"
  },
  btn: {
    borderRadius: 50,
    backgroundColor: "#7541BF",
    paddingVertical: dimensions(15),
    alignItems: "center",
    width: "50%"
  }
});
