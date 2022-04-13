import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import InputLabel from "~/shared/components/InputLabel";
import RoundButton from "~/shared/components/RoundButton";
import ModalComponent from "~/shared/components/ModalComponent";
import { calcWidth, adjust, calcHeight } from "~/assets/Dimensions";

const ModalForgotPassword = ({
  onClose,
  visible,
  onChangeText,
  onPress,
  loading,
  disabledButton,
  titleError,
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <ModalComponent
      heightModal={
        Platform.OS === "ios" ? calcHeight(focused ? 85 : 50) : "auto"
      }
      onClose={onClose}
      visible={visible}
      loading={loading}
    >
      <Text
        style={[styles.colorWhite, styles.titleModal, styles.fontHMicroMeudim]}
      >
        Esqueci a senha
      </Text>
      <Text
        style={[
          styles.colorWhite,
          styles.subtitleModal,
          styles.fontHMicroMeudim,
        ]}
      >
        Escreva o seu e-mail e enviaremos{`\n`}a senha provisória
      </Text>
      <View style={styles.containerInputLabel}>
        <InputLabel
          inputFocused={(value) => setFocused(value)}
          isfocused={"#865FC0"}
          onChangeText={onChangeText}
          title="E-mail"
          style={styles.inputModal}
        />
      </View>
      <View style={{ alignItems: "center", marginVertical: "5%" }}>
        <RoundButton
          disabled={disabledButton}
          style={[styles.buttonModal]}
          name="Mandar"
          onPress={onPress}
        />
        <Text
          style={[
            styles.fontHMicroMeudim,
            { color: "#C40E14", fontSize: adjust(12), top: calcWidth(5) },
          ]}
        >
          {titleError}
        </Text>
      </View>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  containerInputLabel: {
    marginHorizontal: calcWidth(4),
    top: calcWidth(8),
  },
  titleModal: {
    paddingHorizontal: "5%",
    fontSize: adjust(23),
  },
  subtitleModal: {
    fontSize: adjust(12),
    lineHeight: calcWidth(8),
    marginHorizontal: calcWidth(4),
    top: calcWidth(3),
  },
  fontHMicroMeudim: {
    fontFamily: "HelveticaNowMicro-Medium",
  },
  colorWhite: {
    color: "#FFFFFF",
  },
  buttonModal: {
    backgroundColor: "#865FC0",
    top: calcWidth(4),
  },
});

export default ModalForgotPassword;
