import React from "react";
import { Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons";

const SelectPicker = ({
  input: { onChange, value, ...inputProps },
  title,
  style,
  items,
  children,
  error,
  setValue,
  ...pickerProps
}) => {
  const placeholder = {
    label: setValue ? setValue : "Selecione...",
    value: null,
    color: "#9EA0A4",
  };
  return (
    <View style={{ marginBottom: "5%" }}>
      <Text style={[styles.textPicker, { top: "-4%" }]}>{title}</Text>
      <View
        style={[
          styles.container,
          { borderColor: error ? "#F13567" : "#FFFFFF" },
        ]}
      >
        <RNPickerSelect
          placeholder={placeholder}
          onValueChange={(value) => onChange(value)}
          {...pickerProps}
          {...inputProps}
          items={items || []}
          useNativeAndroidPickerStyle={false}
          style={{
            ...styles,
            iconContainer: {
              top: calcWidth(1),
              right: calcWidth(2),
            },
            placeholder: {
              color: "#FFFFFF",
              fontSize: adjust(10),
              fontFamily: "HelveticaNowMicro-Regular",
            },
          }}
          Icon={() => {
            return (
              <MaterialCommunityIcons
                name={"keyboard-arrow-down"}
                size={calcWidth(10)}
                color="#FFFFFF"
              />
            );
          }}
        ></RNPickerSelect>
        {!!error && (
          <Text style={{ color: "#F13567", fontSize: adjust(10) }}>
            {error}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = {
  textPicker: {
    color: "#FFFFFF",
    fontSize: adjust(10),
    fontFamily: "HelveticaNowMicro-Regular",
  },
  inputIOS: {
    fontSize: adjust(10),
    justifyContent: "center",
    paddingHorizontal: calcWidth(3),
    paddingLeft: calcWidth(5),
    color: "#FFFFFF",
    paddingRight: 30,
    fontFamily: "HelveticaNowMicro-Regular",
  },
  inputAndroid: {
    fontSize: adjust(10),
    justifyContent: "center",
    paddingHorizontal: calcWidth(3),
    paddingLeft: calcWidth(5),
    color: "#FFFFFF",
    paddingRight: 30,
    fontFamily: "HelveticaNowMicro-Regular",
  },
  container: {
    borderWidth: 2,
    height: dimensions(43),
    borderRadius: 50,
  },
};

export default SelectPicker;
