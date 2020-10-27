import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { calcWidth, adjust } from "~/assets/Dimensions/index";
import Icon from "react-native-vector-icons/MaterialIcons";

const ButtonRightNavigation = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.button}>
      <Icon
        name="save"
        size={calcWidth(8)}
        color="#FFFFFF"
        style={{
          backgroundColor: "#483D8B",
          borderRadius: calcWidth(10),
          padding: calcWidth(1),
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: calcWidth(5),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#FFF",
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: adjust(10),
  },
});

export default ButtonRightNavigation;
