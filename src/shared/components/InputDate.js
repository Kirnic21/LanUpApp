import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import dimensions, { adjust } from "~/assets/Dimensions/index";
export default InputDate = ({
  title,
  keyboardType,
  style,
  secureTextEntry,
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
      <Text style={{ color: "white", fontSize: adjust(10), top: "-10%" }}>
        {title}
      </Text>
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
            height: dimensions(43),
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
      >
        {value}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 2,
    paddingLeft: "7%",
    paddingTop: "4%"
  }
});
