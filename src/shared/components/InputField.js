import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default InputLabel = ({
  input: { onChange, onBlur, ...restInput },
  title,
  keyboardType,
  style,
  secureTextEntry,
  autoFocus,
  numberOfLines,
  multiline,
  onFocus,
  autoCompleteType,
<<<<<<< HEAD
=======
  placeholder,
  placeholderTextColor,

>>>>>>> c4ccd3c71c7f3c38fcf8391b21df73e7bda25523
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
        onChangeText={onChange}
        onBlur={onBlur}
        enablesReturnKeyAutomatically={true}
        {...restInput}
        autoCapitalize="none"
        onFocus={onFocus}
        autoCompleteType={autoCompleteType}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
      />
      {touched && (error && <Text style={{ color: "#F13567" }}>{error}</Text>)}
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
