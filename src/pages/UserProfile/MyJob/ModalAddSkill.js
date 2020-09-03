import React from "react";
import { View, Text } from "react-native";
import ModalComponent from "~/shared/components/ModalComponent";
import { calcWidth, adjust } from "~/assets/Dimensions";

const ModalAddSkill = ({
  onClose,
  visible,
  onPress,
  onChangeText,
  disabled
}) => {
  return (
    <ModalComponent
      onClose={onClose}
      visible={visible}
      heightModal={calcWidth(90)}
    >
      <Text style={styles.title}>Adicionar</Text>
      <View style={styles.containerModalInput}>
        <InputLabel
          isfocused={"#46C5F3"}
          onChangeText={onChangeText}
          title="Habilidade"
        />
      </View>
      <View style={{ alignItems: "center", top: calcWidth(5) }}>
        <RoundButton
          disabled={disabled}
          style={[{ backgroundColor: "#46C5F3" }]}
          name="Adicionar"
          onPress={onPress}
        />
      </View>
    </ModalComponent>
  );
};

const styles = {
  title: {
    color: "#FFF",
    paddingHorizontal: "5%",
    fontSize: adjust(25),
    fontFamily: "HelveticaNowMicro-Medium"
  },
  containerModalInput: {
    justifyContent: "center",
    marginHorizontal: calcWidth(4),
    top: calcWidth(8)
  }
};

export default ModalAddSkill;
