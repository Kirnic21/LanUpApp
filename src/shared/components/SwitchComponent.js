import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Toggle from "~/shared/components/ToggleComponent";
import dimensions from "~/assets/Dimensions/index";

export default SwitchComponent = ({ title, textStyle, input }) => (
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
          fontSize: dimensions(14),
          fontFamily: "HelveticaNowMicro-Regular",
          paddingBottom: "5%"
        },
        textStyle
      ]}
    >
      {title}
    </Text>
    <View style={{ position: "absolute", marginLeft: "75%" }}>
      <Toggle
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
