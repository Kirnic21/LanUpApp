import React from "react";
import ButtonPulse from "~/shared/components/ButtonPulse";
import { Text, View } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { calcWidth, calcHeight } from "~/assets/Dimensions";

const ButtonDuties = ({ onPress }) => {
  return (
    <ButtonPulse
      onPress={onPress}
      styleButton={[
        styles.buttonSmall,
        {
          backgroundColor: "#46C5F3",
          borderColor: "#03dac57a",
          borderWidth: 3
        }
      ]}
    >
      <View style={{ alignItems: "center", top: calcHeight(0.8) }}>
        <Icon
          size={calcWidth(8)}
          name="assistant"
          color="#FFF"
          style={{ top: calcHeight(0.7) }}
        />
        <Text style={{ color: "#FFF", fontSize: calcWidth(3.5) }}>Deveres</Text>
      </View>
    </ButtonPulse>
  );
};

export default ButtonDuties;
