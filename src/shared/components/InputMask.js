import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import TextInputMask from "react-native-text-input-mask";
import normalize from "~/assets/FontSize/index";

export default InputMask = ({
  input: { value, ...input },
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
  mask,
  onChange,
  maxLength,
  meta: { touched, error }
}) => (
  <View>
    <View>
      <Text style={{ color: "white", fontSize: normalize(14), top: "-10%" }}>
        {title}
      </Text>
    </View>
    <View style={{ marginBottom: "5%", width: "100%" }}>
      <TextInputMask
        style={[
          {
            height: 45,
            width: "100%",
            borderColor: "#FFF",
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
        enablesReturnKeyAutomatically={true}
        onChangeText={input.onBlur}
        {...input}
        defaultValue={value}
        autoCapitalize="none"
        onFocus={onFocus}
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

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 2,
    color: "#FFF",
    paddingHorizontal: "7%"
  }
});
