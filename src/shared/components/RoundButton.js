import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import dimensions, { calcWidth } from "~/assets/Dimensions/index";

export default RoundButton = ({ name, style, disabled, onPress, width }) => (
  <View style={styles.buttonContent}>
    <TouchableOpacity
      disabled={disabled}
      style={[
        disabled ? [...style, styles.disabled] : style,
        styles.roundButton,
        { width: width || calcWidth(40) }
      ]}
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
  roundButton: {
    height: calcWidth(13),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: calcWidth(10)
  },
  disabled: {
    backgroundColor: "#6C757D"
  }
});
