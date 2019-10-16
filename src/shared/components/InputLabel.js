import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default InputLabel = ({
  input: { onChange, value },
  title,
  keyboardType,
  style,
  secureTextEntry,
  autoFocus,
  numberOfLines,
  multiline
}) => {
  return (
    <View>
      <View>
        <Text style={{ color: "white", fontSize: 15, top: "-10%" }}>
          {title}
        </Text>
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
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            // autoFocus={autoFocus}
            numberOfLines={numberOfLines}
            multiline={multiline}
            onChangeText={onChange}
            value={value}
            enablesReturnKeyAutomatically={true}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 2,
    color: "#FFF",
    paddingLeft: "10%"
  }
});
