import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import ToggleSwitch from "toggle-switch-react-native";

export default SwitchComponent = ({
  title,
  onToggle,
  isOn,
  textStyle,
  secureTextEntry,
  autoFocus,
  numberOfLines,
  multiline,
  onChange,
  value,
  editable,
  onChangeText,
  onValueChange,
  input
}) => (
  <View
    style={{
      alignContent: "stretch",

      top: "10%"
    }}
  >
    <Text
      style={[
        {
          color: "#FFF",
          fontSize: 16,
          paddingBottom: "5%"
        },
        textStyle
      ]}
    >
      {title}
    </Text>
    <View style={{ position: "absolute", marginLeft: "75%" }}>
      <ToggleSwitch
        size="small"
        onColor="#483D8B"
        offColor="#18142F"
        isOn={input.value ? true : false}
        onToggle={input.onChange}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 2,
    paddingLeft: "10%"
  }
});
