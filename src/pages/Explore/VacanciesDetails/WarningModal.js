import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import dimensions, { adjust } from "~/assets/Dimensions/index";
import ModalComponent from "~/shared/components/ModalComponent";

export default WarningModal = ({ visible, onClose, subtitle, onPress }) => (
  <View>
    <ModalComponent visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Complete seus dados bancários</Text>
        <Text style={styles.subtitle}>
          {subtitle}Para se candidatar a vagas, preencha seus dados bancários
          com sua conta corrente ou poupança e uma chave PIX
        </Text>
        <TouchableOpacity onPress={onPress} style={styles.btn}>
          <Text style={styles.textButton}>Completar dados bancários</Text>
        </TouchableOpacity>
      </View>
    </ModalComponent>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: adjust(20),
    paddingHorizontal: adjust(5),
  },
  title: {
    color: "#FFF",
    fontSize: adjust(18),
    fontFamily: "HelveticaNowMicro-Medium",
    marginBottom: adjust(5),
    textAlign: "center",
  },
  subtitle: {
    color: "#FFF",
    fontSize: adjust(12),
    fontFamily: "HelveticaNowMicro-Regular",
    marginTop: adjust(15),
    textAlign: "center",
    lineHeight: adjust(23),
    marginBottom: adjust(30),
  },
  btn: {
    borderRadius: 50,
    backgroundColor: "#7541BF",
    paddingVertical: dimensions(15),
    alignItems: "center",
    width: "100%",
    marginBottom: adjust(15),
  },
  textButton: {
    color: "#FFF",
    fontSize: adjust(10),
    fontFamily: "HelveticaNowMicro-Regular",
  },
});
