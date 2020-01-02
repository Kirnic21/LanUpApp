import React, { Children } from "react";
import { View, Text, Picker } from "react-native";
import { Field, reduxForm } from "redux-form";
import dimensions from "~/assets/Dimensions/index";

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
      <Text
        style={{
          top: dimensions(-19),
          color: "#FFF",
          fontSize: dimensions(14)
        }}
      >
        {title}
      </Text>
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
