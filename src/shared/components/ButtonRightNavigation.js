import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import dimensions, { calcWidth } from "~/assets/Dimensions/index";

const ButtonRightNavigation = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: calcWidth(5),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  textButton: {
    color: "#FFF",
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: dimensions(12)
  }
});

export default ButtonRightNavigation;
