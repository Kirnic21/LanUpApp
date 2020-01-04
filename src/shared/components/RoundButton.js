import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import dimensions from "~/assets/Dimensions/index";

export default RoundButton = ({ name, style, disabled, onPress }) => (
  <View style={styles.buttonContent}>
    <TouchableOpacity
      disabled={disabled}
      style={disabled ? [...style, styles.disabled] : style}
      onPress={onPress}
    >
      <Text
        style={{
          color: "#FFF",
          fontSize: dimensions(12),
          fontFamily: "HelveticaNowMicro-Regular"
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 20
  },
  disabled: {
    backgroundColor: "#6C757D"
  }
});
