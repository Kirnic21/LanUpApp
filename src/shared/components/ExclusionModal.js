import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import dimensions, { calcWidth, adjust } from "~/assets/Dimensions/index";
import Icons from "react-native-vector-icons/MaterialIcons";
import RoundButton from "./RoundButton";
import ModalComponent from "./ModalComponent";

export default ExclusionModal = ({ visible, onClose, title, onPress }) => (
  <View>
    <ModalComponent
      visible={visible}
      onClose={onClose}
      heightModal={calcWidth(100)}
    >
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text allowFontScaling={false} style={styles.textTitle}>
            Confirmação
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Icons name="info-outline" size={calcWidth(20)} color="red" />
          <Text style={styles.textSubtitle}>{title}</Text>
        </View>
        <View style={{ alignItems: "center" }}></View>
      </View>
      <View style={{}}>
        <RoundButton name="confirmar" style={styles.btn} onPress={onPress} />
      </View>
    </ModalComponent>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerTitle: {
    height: "15%",
    justifyContent: "center",
  },
  textTitle: {
    color: "#FFF",
    fontSize: adjust(20),
    fontFamily: "HelveticaNowMicro-Medium",
  },
  textSubtitle: {
    color: "#FFF",
    fontSize: adjust(14),
    fontFamily: "HelveticaNowMicro-Regular",
    textAlign: "center",
    marginTop: calcWidth(2),
    lineHeight: calcWidth(7),
  },
  btn: {
    borderRadius: 50,
    backgroundColor: "#7541BF",
    paddingVertical: dimensions(15),
    alignItems: "center",
    width: "50%",
  },
});
