import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default InputField = ({
  input,
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

  meta: { touched, error }
}) => (
  <View>
    <View>
      <Text style={{ color: "white", fontSize: 15, top: "-10%" }}>{title}</Text>
    </View>
    <View style={{ marginBottom: "5%" }}>
      <TextInput
        style={[
          {
            height: 45,
            width: 250,
            borderColor: "white",
            borderRadius: 50
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
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        enablesReturnKeyAutomatically={true}
        autoCapitalize="none"
        onFocus={onFocus}
        autoCompleteType={autoCompleteType}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        editable={editable}
      />
      {touched && error && <Text style={{ color: "#F13567" }}>{error}</Text>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 2,
    color: "#FFF",
    paddingLeft: "10%"
  }
});
