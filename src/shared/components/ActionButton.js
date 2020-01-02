import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import dimensions from "~/assets/Dimensions/index";

export default ActionButton = ({ name, style, onPress }) => (
  <View style={styles.buttonContent}>
    <TouchableOpacity
      style={[
        style,
        {
          alignItems: "center",
          width: dimensions(80),
          height: dimensions(80),
          justifyContent: "center"
        }
      ]}
      onPress={onPress}
    >
      <Icon name="add" size={35} color="#FFF" style={{}} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  buttonContent: {
    width: dimensions(70),
    height: dimensions(70),
    borderRadius: dimensions(45),
    backgroundColor: "#7541BF",
    alignItems: "center",
    justifyContent: "center"
  }
});
