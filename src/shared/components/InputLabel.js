import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default InputLabel = ({
  title,
  keyboardType,
  style,
  secureTextEntry,
  autoFocus,
  numberOfLines,
  onChangeText,
  multiline,
  value
}) => (
  <View>
    <View>
      <Text style={{ color: "white", fontSize: 15, top: "-10%" }}>{title}</Text>
    </View>
    <View>
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
            styles.TextInput
          ]}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus}
          numberOfLines={numberOfLines}
          multiline={multiline}
          onChangeText={onChangeText}
          enablesReturnKeyAutomatically={true}
        />
      </View>
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
