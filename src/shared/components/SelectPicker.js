import React from "react";
import { Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import dimensions, { calcWidth } from "~/assets/Dimensions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons";

const SelectPicker = ({
  input: { onChange, value, ...inputProps },
  title,
  style,
  items,
  children,
  ...pickerProps
}) => {
  const placeholder = {
    label: "Selecione...",
    value: null,
    color: "#9EA0A4",
  };
  return (
    <View style={{ marginBottom: "5%" }}>
      <Text style={[styles.textPicker, { top: "-4%" }]}>{title}</Text>
      <View style={styles.containerPicker}>
        <RNPickerSelect
          placeholder={placeholder}
          onValueChange={(value) => onChange(value)}
          {...pickerProps}
          {...inputProps}
          items={items || []}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return (
              <MaterialCommunityIcons
                name={"keyboard-arrow-down"}
                size={calcWidth(10)}
                color="#FFFFFF"
              />
            );
          }}
        >
          <View style={styles.containerText}>
            <Text style={styles.textPicker}>{value || "Selecione ..."}</Text>
            <MaterialCommunityIcons
              name={"keyboard-arrow-down"}
              size={calcWidth(10)}
              color="#FFFFFF"
            />
          </View>
        </RNPickerSelect>
      </View>
    </View>
  );
};

const styles = {
  containerPicker: {
    borderColor: "#FFFFFF",
    borderWidth: 2,
    height: dimensions(43),
    justifyContent: "center",
    paddingHorizontal: calcWidth(3),
    borderRadius: 50,
    paddingLeft: calcWidth(5),
  },
  textPicker: {
    color: "#FFFFFF",
    fontSize: dimensions(12),
    fontFamily: "HelveticaNowMicro-Regular",
  },
  containerText: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
};

export default SelectPicker;
