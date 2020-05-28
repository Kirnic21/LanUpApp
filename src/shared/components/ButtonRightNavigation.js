import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import dimensions, { calcWidth } from "~/assets/Dimensions/index";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ButtonRightNavigation = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Icon
        name="content-save"
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
    fontSize: dimensions(12),
  },
});

export default ButtonRightNavigation;
