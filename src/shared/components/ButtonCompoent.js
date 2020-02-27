import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

import { calcWidth } from "~/assets/Dimensions";

const ButtonComponent = ({
  isSelected,
  selectedColor,
  unSelectedColor,
  textStyle,
  buttonStyle,
  title
}) => {
  return (
    <View style={{}}>
      <TouchableOpacity
        style={[
          buttonStyle,
          styles.Btn,
          isSelected
            ? { backgroundColor: selectedColor || "#FFF" }
            : { backgroundColor: unSelectedColor || "#FFF" }
        ]}
      >
        <Text style={[textStyle, styles.textBtn]}>{title || "name"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Btn: {
    width: calcWidth(50),
    padding: calcWidth(3.5),
    borderRadius: calcWidth(30),
    alignItems: "center"
  },
  textBtn: {
    fontSize: calcWidth(3.5),
    fontFamily: "HelveticaNowMicro-Regular"
  }
});

export default ButtonComponent;
