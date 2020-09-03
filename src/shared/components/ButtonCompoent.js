import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

import { calcWidth, adjust } from "~/assets/Dimensions";

const ButtonComponent = ({
  isSelected,
  selectedColor,
  unSelectedColor,
  textStyle,
  textColor,
  buttonStyle,
  title,
  onPress,
}) => {
  return (
    <View pointerEvents={isSelected ? "auto" : "none"}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          buttonStyle,
          styles.Btn,
          isSelected
            ? { backgroundColor: selectedColor || "#FFFFFF" }
            : { backgroundColor: unSelectedColor || "#FFFFFF" },
        ]}
      >
        <Text
          style={[
            textStyle,
            styles.textBtn,
            { color: isSelected ? textColor || "#FFFFFF" : "#18142F" },
          ]}
        >
          {title || "name"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Btn: {
    width: calcWidth(50),
    padding: calcWidth(3.5),
    borderRadius: calcWidth(30),
    alignItems: "center",
  },
  textBtn: {
    fontSize: adjust(10),
    fontFamily: "HelveticaNowMicro-Regular",
  },
});

export default ButtonComponent;
