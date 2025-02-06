import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { calcWidth, adjust } from "~/assets/Dimensions/index";

export default RoundButton = ({
  name,
  style,
  disabled,
  onPress,
  width = calcWidth(40),
  textStyle,
  testID,
}) => {
  return (
    <View style={styles.buttonContent}>
      <TouchableOpacity
        disabled={disabled}
        testID={testID}
        style={StyleSheet.flatten([
          styles.roundButton,
          style && style,
          disabled && styles.disabled,
          { width: width },
        ])}
        onPress={onPress}
      >
        <Text
          style={[
            {
              color: "#FFF",
              fontSize: adjust(11),
              fontFamily: "HelveticaNowMicro-Medium",
            },
            textStyle,
          ]}
        >
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    // margin: 20,
  },
  roundButton: {
    height: calcWidth(13),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: calcWidth(10),
  },
  disabled: {
    backgroundColor: "#6C757D",
    borderWidth: 0,
  },
});
