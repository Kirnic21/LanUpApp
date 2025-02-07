import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import dimensions, { adjust } from "~/assets/Dimensions/index";

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
  onClick,
  onSubmitEditing,
  placeholder,
  placeholderTextColor,
  isfocused,
  onContentSizeChange,
  textStyle,
  inputFocused = () => {},
}) => {
  const [isInputFocused, setInputFocused] = useState({
    input1: false,
  });
  return (
    <View style={{ width: "100%" }}>
      <View>
        <Text
          style={StyleSheet.flatten([styles.title, textStyle && textStyle])}
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
          {...isInputFocused}
          style={[
            {
              height: dimensions(45),
              borderRadius: dimensions(23),
              color: "white",
            },
            style,
            isInputFocused.input1
              ? { borderColor: isfocused }
              : { borderColor: "#FFF" },
            styles.TextInput,
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
          onFocus={() => {
            setInputFocused((prev) => ({ ...prev, input1: true }));
            inputFocused(true);
          }}
          onBlur={() => {
            setInputFocused((prev) => ({ ...prev, input1: false }));
            inputFocused(false);
          }}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onContentSizeChange={onContentSizeChange}
        ></TextInput>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 2,
    paddingLeft: "7%",
    paddingTop: "4%",
  },
  title: {
    fontSize: adjust(10),
    color: "white",
    top: "-10%",
    fontFamily: "HelveticaNowMicro-Regular",
  },
});
