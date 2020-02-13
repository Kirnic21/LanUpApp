import React from "react";
import { Text } from "react-native";
import { calcWidth, calcHeight } from "~/assets/Dimensions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonPulse from "~/shared/components/ButtonPulse";
import styles from "./styles";

const buttonOccurrence = ({ onPress, size }) => {
  return (
    <ButtonPulse
      circleStyle={[
        size === "small"
          ? {
              height: calcWidth(22.5),
              width: calcWidth(22.5),
              backgroundColor: "#ffb82b80"
            }
          : styles.circleOccurence
      ]}
      styleButton={
        size === "small"
          ? {
              height: calcWidth(21),
              width: calcWidth(21),
              backgroundColor: "#FFB72B"
            }
          : styles.buttonOccurrence
      }
      startAnimations={true}
      onPress={onPress}
    >
      <Icon
        size={size === "small" ? calcWidth(8) : calcWidth(12)}
        name="alert-circle"
        color="#FFF"
        style={{
          marginTop: size === "small" ? calcHeight(1.4) : "5%",
          top: size === "small" ? calcHeight(1) : 0
        }}
      />
      <Text
        style={[
          styles.textButtonPulse,
          { fontSize: size === "small" ? calcWidth(2.7) : calcWidth(4) }
        ]}
      >
        Ocorrência
      </Text>
    </ButtonPulse>
  );
};

export default buttonOccurrence;
