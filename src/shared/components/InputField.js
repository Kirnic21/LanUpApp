import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import normalize from "~/assets/FontSize/index";

export default InputField = ({
  input: { value, onChange, ...input },
  title,
  keyboardType,
  style,
  secureTextEntry,
  autoFocus,
  numberOfLines,
  multiline,
  onFocus,
  autoCompleteType,
  placeholder,
  placeholderTextColor,
  editable,
  autoCapitalize,

  meta: { touched, error }
}) => {
  return (
    <View>
      <View>
        <Text style={{ color: "white", fontSize: normalize(14), top: "-10%" }}>
          {title}
        </Text>
      </View>
      <View
        style={{
          marginBottom: "5%",
          width: "100%"
        }}
      >
        <TextInput
          style={[
            {
              width: "100%",
              borderColor: "#FFF",
              borderRadius: 50,
              height: 45
            },
            style,
            styles.TextInput,
            touched && error && { borderColor: "#F13567" }
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
        />
        {touched && error && <Text style={{ color: "#F13567" }}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 2,
    color: "#FFF",
    paddingHorizontal: "7%"
  }
});
