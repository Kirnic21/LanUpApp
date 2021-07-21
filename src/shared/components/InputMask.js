import React, { useState } from "react";
import { TextInput } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { adjust } from "~/assets/Dimensions/index";
import Mask from "~/shared/helpers/Masks";

export default InputMask = (props) => {
  const [isInputFocused, setInputFocused] = useState({
    input1: false,
  });

  return (
    <View style={[props.style]}>
      <View>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={{ marginBottom: "5%", width: "100%" }}>
        <TextInput
          {...props}
          onChangeText={(text) => props.input.onBlur(text)}
          value={Mask(props.mask, props.input.value)}
          style={[
            {
              height: 50,
              width: "100%",
              borderRadius: 50,
              color: "#FFF",
              fontSize: adjust(10),
              fontFamily: "HelveticaNowMicro-Regular",
              paddingHorizontal: "7%",
            },
            props.style,
            isInputFocused.input1
              ? { borderColor: props.isfocused }
              : { borderColor: "#FFF" },
            styles.TextInput,
            props.meta.touched &&
              props.meta.error && { borderColor: "#F13567" },
          ]}
          enablesReturnKeyAutomatically={true}
          autoCapitalize="none"
          onFocus={() => setInputFocused((prev) => ({ ...prev, input1: true }))}
          onBlur={() => setInputFocused((prev) => ({ ...prev, input1: false }))}
        />

        {props.meta.touched && props.meta.error && (
          <Text style={{ color: "#F13567" }}>{props.meta.error}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 2,
  },
  title: {
    color: "white",
    fontSize: adjust(10),
    top: "-10%",
    fontFamily: "HelveticaNowMicro-Regular",
  },
  title: {
    color: "white",
    fontSize: adjust(10),
    top: "-10%",
    fontFamily: "HelveticaNowMicro-Regular",
  },
});
