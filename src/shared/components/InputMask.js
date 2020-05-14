import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import TextInputMask from "react-native-text-input-mask";
import dimensions from "~/assets/Dimensions/index";

export default InputMask = ({
  input: { value, ...input },
  title,
  keyboardType,
  style,
  secureTextEntry,
  autoFocus,
  numberOfLines,
  multiline,
  autoCompleteType,
  placeholder,
  placeholderTextColor,
  mask,
  onChange,
  maxLength,
  isfocused,
  meta: { touched, error },
}) => {
  const [isInputFocused, setInputFocused] = useState({
    input1: false,
  });
  return (
    <View>
      <View>
        <Text
          style={{
            color: "white",
            fontSize: dimensions(12),
            top: "-10%",
            fontFamily: "HelveticaNowMicro-Regular",
          }}
        >
          {title}
        </Text>
      </View>
      <View style={{ marginBottom: "5%", width: "100%" }}>
        <TextInputMask
          style={[
            {
              height: dimensions(43),
              width: "100%",
              borderRadius: 50,
              color: "#FFF",
              fontSize: dimensions(12),
              fontFamily: "HelveticaNowMicro-Regular",
            },
            style,
            isInputFocused.input1
              ? { borderColor: isfocused }
              : { borderColor: "#FFF" },
            styles.TextInput,
            touched && error && { borderColor: "#F13567" },
          ]}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus}
          numberOfLines={numberOfLines}
          multiline={multiline}
          enablesReturnKeyAutomatically={true}
          onChangeText={input.onBlur}
          {...input}
          defaultValue={value}
          autoCapitalize="none"
          onFocus={() => setInputFocused((prev) => ({ ...prev, input1: true }))}
          onBlur={() => setInputFocused((prev) => ({ ...prev, input1: false }))}
          onChange={onChange}
          autoCompleteType={autoCompleteType}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          mask={mask}
          maxLength={maxLength}
        />
        {touched && error && <Text style={{ color: "#F13567" }}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 2,
    paddingHorizontal: "7%",
  },
});
