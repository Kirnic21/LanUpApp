import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

export default InputLabel = ({
  title,
  keyboardType,
  style,
  secureTextEntry,
  autoFocus,
  numberOfLines,
  multiline,
  onChange,
  value,
  editable,
  onChangeText,
  onClick
}) => (
  <TouchableOpacity style={{ width: "100%" }} onPress={onClick}>
    <View>
      <Text style={{ color: "white", fontSize: 15, top: "-10%" }}>{title}</Text>
    </View>
    <View
      style={{
        marginBottom: "5%",
        width: "100%"
      }}
    >
      <Text
        style={[
          {
            height: 45,
            borderColor: "white",
            borderRadius: 23,
            color: "white"
          },
          style,
          styles.TextInput
        ]}
        onPress={onClick}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        // autoFocus={autoFocus}
        numberOfLines={numberOfLines}
        multiline={multiline}
        enablesReturnKeyAutomatically={true}
        onChange={onChange}
        value={value}
        editable={editable}
        onChangeText={onChangeText}
      >{value}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 2,
    paddingLeft: "7%",
    paddingTop: '4%'
  }
});
