import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import dimensions from "~/assets/Dimensions/index";

export default InputField = ({
  input: { value, onChange, ...input },
  title,
  keyboardType,
  style,
  secureTextEntry,
  autoFocus,
  numberOfLines,
  multiline,
  // onFocus,
  autoCompleteType,
  placeholder,
  placeholderTextColor,
  editable,
  autoCapitalize,
  maxLength,
  isfocused,
  meta: { touched, error },
}) => {
  const [isInputFocused, setInputFocused] = useState({
    input1: false,
  });
  const editableColor =
    editable === false ? "rgba(255,255,255,0.5)" : "#FFFFFF";
  return (
    <View>
      <View>
        <Text
          style={{
            color: editableColor,
            top: "-10%",
            fontSize: dimensions(12),
            fontFamily: "HelveticaNowMicro-Regular",
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          marginBottom: "5%",
          width: "100%",
        }}
      >
        <TextInput
          style={[
            {
              width: "100%",
              borderRadius: 50,
              height: dimensions(43),
              fontSize: dimensions(12),
              color: editableColor,
              fontFamily: "HelveticaNowMicro-Regular",
            },
            style,
            styles.TextInput,
            isInputFocused.input1
              ? { borderColor: isfocused }
              : { borderColor: editableColor },
            touched && error && { borderColor: "#F13567" },
          ]}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus}
          numberOfLines={numberOfLines}
          multiline={multiline}
          onChangeText={input.onBlur}
          {...input}
          defaultValue={value}
          enablesReturnKeyAutomatically={true}
          autoCapitalize={autoCapitalize}
          autoCompleteType={autoCompleteType}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          editable={editable}
          onFocus={() => setInputFocused((prev) => ({ ...prev, input1: true }))}
          onBlur={() => setInputFocused((prev) => ({ ...prev, input1: false }))}
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
