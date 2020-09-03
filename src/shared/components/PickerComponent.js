import React from "react";
import { View, Text, Picker } from "react-native";
import { adjust } from "~/assets/Dimensions/index";

export default PickerComponent = ({
  input: { onChange, value, ...inputProps },
  title,
  stylePicker,
  style,
  children,
  ...pickerProps
}) => {
  return (
    <View>
      <View>
        <Text
          style={{
            top: "-10%",
            color: "#FFF",
            fontSize: adjust(10),
            fontFamily: "HelveticaNowMicro-Regular",
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={[
          style,
          {
            borderColor: "#FFFFFF",
            borderWidth: 2,
            borderRadius: 50,
            height:50,
            paddingHorizontal: "7%",
          },
        ]}
      >
        <Picker
          style={stylePicker}
          selectedValue={value}
          onValueChange={(value) => onChange(value)}
          {...inputProps}
          {...pickerProps}
        >
          {children}
        </Picker>
      </View>
    </View>
  );
};
