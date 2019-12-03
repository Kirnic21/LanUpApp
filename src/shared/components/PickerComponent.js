import React, { Children } from "react";
import { View, Text, Picker } from "react-native";
import { Field, reduxForm } from "redux-form";

// style={styles.containerManequim}
export default PickerComponent = ({
  input: { onChange, value, ...inputProps },
  title,
  style,
  children,
  ...pickerProps
}) => {
  return (
    <View>
      <Text style={{ top: -23, color: "#FFF" }}>{title}</Text>
      <Picker
        style={style}
        selectedValue={value}
        onValueChange={value => onChange(value)}
        {...inputProps}
        {...pickerProps}
      >
        {children}
      </Picker>
    </View>
  );
};
