import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import ButtonPulse from "~/shared/components/ButtonPulse";
import dimensions from "~/assets/Dimensions";

const Checkin = ({ onPress, type, title }) => {
  return (
    <View pointerEvents={type === "without" ? "none" : "auto"}>
      <ButtonPulse
        title={title}
        titleStyle={[
          styles.textButtonPulse,
          type === "without" ? { color: "#24203B" } : { color: "#FFF" }
        ]}
        onPress={onPress}
        circleStyle={
          type === "checkin"
            ? styles.circleCheckin
            : type === "without"
            ? styles.circleWithoutEvent
            : styles.circleCheckout
        }
        styleButton={
          type === "checkin"
            ? styles.buttonCheckin
            : type === "without"
            ? styles.buttonWithoutEvent
            : styles.buttonCheckout
        }
        startAnimations={true}
      />
    </View>
  );
};

export default Checkin;
