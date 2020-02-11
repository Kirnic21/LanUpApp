import React from "react";
import ButtonPulse from "~/shared/components/ButtonPulse";
import { Text, View } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { calcWidth, calcHeight } from "~/assets/Dimensions";

const ButtonPause = ({ onPress, isPause }) => {
  const [pause, setPause] = useState(false);
  return (
    <ButtonPulse
      onPress={() => {
        onPress, setPause(isPause);
      }}
      startAnimations={pause ? true : false}
      circleStyle={[
        {
          backgroundColor: "#03dac57a",
          height: calcWidth(22),
          width: calcWidth(22)
        }
      ]}
      styleButton={[
        styles.buttonSmall,
        pause
          ? { backgroundColor: "#03DAC6" }
          : {
              backgroundColor: "#F13567",
              borderColor: "#f1356760",
              borderWidth: 3
            }
      ]}
    >
      <View style={{ alignItems: "center", top: calcHeight(0.5) }}>
        <Icon
          size={calcWidth(8.5)}
          name={pause ? "play" : "pause"}
          color="#FFF"
          style={{ top: calcHeight(1) }}
        />
        <Text style={{ color: "#FFF", fontSize: calcWidth(3.5) }}>
          {pause ? "voltar" : "Pausa"}
        </Text>
      </View>
    </ButtonPulse>
  );
};

export default ButtonPause;
