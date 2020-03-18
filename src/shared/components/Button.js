import React from "react";
import { View, Text } from "react-native";
import dimensions, { calcWidth } from "~/assets/Dimensions";
import { TouchableOpacity } from "react-native-gesture-handler";

const Button = ({ onPress, style, name, textStyle }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[
          {
            borderColor: "#FFF",
            borderWidth: 2,
            // width: "70%",
            alignItems: "center",
            padding: calcWidth(3.5),
            borderRadius: dimensions(30)
          },
          style
        ]}
      >
        <Text
          style={[
            textStyle,
            {
              color: "#FFF",
              fontSize: dimensions(12),
              fontFamily: "HelveticaNowMicro-Regular"
            }
          ]}
        >
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
