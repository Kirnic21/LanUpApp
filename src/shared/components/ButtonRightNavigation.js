import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { calcWidth, adjust } from "~/assets/Dimensions/index";

const ButtonRightNavigation = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.button}
    >
      <Text
        style={styles.textButton}
      >
        Salvar
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#483D8B",
    marginRight: calcWidth(2),
    padding: calcWidth(2),
    borderRadius:calcWidth(2)
  },
  textButton: {
    color: "#FFF",
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: adjust(10),
  },
});

export default ButtonRightNavigation;
