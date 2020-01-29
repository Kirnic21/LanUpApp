import React from "react";
import { View } from "react-native";
import RoundButton from "~/shared/components/RoundButton";
import dimensions from "~/assets/Dimensions";

const ButtonVacancies = ({ onPress, style, name }) => {
  return (
    <View>
      <RoundButton
        name={name}
        onPress={onPress}
        style={[
          {
            borderColor: "#FFF",
            borderWidth: 2,
            width: "70%",
            alignItems: "center",
            padding: "5%",
            borderRadius: dimensions(30)
          },
          style
        ]}
      />
    </View>
  );
};

export default ButtonVacancies;
