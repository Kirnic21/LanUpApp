import React, { useState } from "react";
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
  autoCompleteType,
  placeholder,
  placeholderTextColor,
  mask,
  onChange,
  maxLength,
  isfocused,
  meta: { touched, error }
}) => {
  const [isInputFocused, setInputFocused] = useState({
    input1: false
  });
  return (
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
              borderRadius: 50
            },
            style,
            isInputFocused.input1
              ? { borderColor: isfocused }
              : { borderColor: "#FFF" },
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
          onFocus={() => setInputFocused(prev => ({ ...prev, input1: true }))}
          onBlur={() => setInputFocused(prev => ({ ...prev, input1: false }))}
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
    color: "#FFF",
    paddingHorizontal: "7%"
  }
});
