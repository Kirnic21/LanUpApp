import React from "react";
import { View, Text } from "react-native";

import dimensions from "~/assets/Dimensions/index";

const NavigationTitle = ({ title, marginHorizontal }) => {
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        marginHorizontal: marginHorizontal
      }}
    >
      <Text
        style={{
          fontFamily: "HelveticaNowMicro-Regular",
          color: "#FFFFFF",
          fontSize: dimensions(18)
        }}
      >
        {title}
      </Text>
    </View>
  );
};
export default NavigationTitle;
