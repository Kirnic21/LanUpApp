import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import dimensions, { calcWidth, adjust } from "~/assets/Dimensions/index";
import Icons from "react-native-vector-icons/MaterialIcons";
import RoundButton from "./RoundButton";
import ModalComponent from "./ModalComponent";

export default AlertModal = ({
  visible,
  onClose,
  title,
  subtitle,
  iconName,
  colorIcon,
  nameButton,
  onPress,
  heightModal
}) => (
  <View>
    <ModalComponent
      visible={visible}
      onClose={onClose}
      heightModal={heightModal}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Icons name={iconName} size={calcWidth(25)} color={colorIcon} />
        <Text style={styles.subtitle}>{subtitle}</Text>
        <RoundButton name={nameButton} style={styles.btn} onPress={onPress} />
      </View>
    </ModalComponent>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: adjust(10),
  },
  title: {
    color: "#FFF",
    fontSize: adjust(20),
    fontFamily: "HelveticaNowMicro-Medium",
    marginBottom: adjust(15),
  },
  subtitle: {
    color: "#FFF",
    fontSize: adjust(15),
    fontFamily: "HelveticaNowMicro-Regular",
    marginTop: adjust(15),
    textAlign: "center",
    lineHeight: adjust(23),
    marginBottom: adjust(10),
  },
  btn: {
    borderRadius: 50,
    backgroundColor: "#7541BF",
    paddingVertical: dimensions(15),
    alignItems: "center",
    width: "50%",
  },
});
