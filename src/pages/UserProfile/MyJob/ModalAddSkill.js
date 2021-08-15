import React from "react";
import { View, Text, Platform } from "react-native";
import ModalComponent from "~/shared/components/ModalComponent";
import { calcWidth, calcHeight, adjust } from "~/assets/Dimensions";

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
      heightModal={Platform.OS === 'ios' ? calcHeight(88) : calcWidth(108)}
    >
      <Text style={styles.title}>Adicionar</Text>
      <View style={styles.containerModalInput}>
        <InputLabel
          isfocused={"#46C5F3"}
          onChangeText={onChangeText}
          title="Habilidade"
        />
      </View>
      <View style={{ alignItems: "center", marginVertical:'5%' }}>
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
    marginHorizontal: '5%',
    marginTop:'5%'
    // top: calcWidth(8)
  }
};

export default ModalAddSkill;
