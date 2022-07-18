import React from "react";
import { View, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

import { adjust, calcWidth } from "~/assets/Dimensions";

const Checkbox = ({ onPress = () => {}, checked, text, children }) => {
  return (
    <View style={styles.container}>
      <CheckBox
        title={text}
        textStyle={styles.textStyle}
        checkedIcon="check-box"
        uncheckedIcon="check-box-outline-blank"
        iconType="material"
        checkedColor="#46C5F3"
        uncheckedColor="#46C5F3"
        size={calcWidth(8)}
        checked={checked}
        containerStyle={styles.containerStyle}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: calcWidth(5),
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "transparent",
    borderWidth: 0,
    width: "95%",
    padding: 0,
    marginLeft: 0,
  },
  textStyle: {
    fontFamily: "HelveticaNowDisplay-Regular",
    fontSize: adjust(13),
    color: "#FFF",
    fontWeight: "normal",
  },
});

export default Checkbox;
