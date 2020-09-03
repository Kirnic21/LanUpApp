import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Toggle from "~/shared/components/ToggleComponent";
import dimensions, { adjust } from "~/assets/Dimensions/index";

export default SwitchComponent = ({ title, textStyle, input }) => (
  <View
    style={{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    }}
  >
    <Text
      style={[
        {
          color: "#FFF",
          fontSize: adjust(11),
          fontFamily: "HelveticaNowMicro-Regular",
          paddingBottom: "5%"
        },
        textStyle
      ]}
    >
      {title}
    </Text>
    <View style={{ paddingBottom: "5%"}}>
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
