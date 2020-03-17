import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Modal, { ModalContent } from "react-native-modals";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import dimensions from "~/assets/Dimensions/index";
import imgBuilder from "~/assets/images/icon_msg-builder.png";
import RoundButton from "./RoundButton";

export default ModalComingSoon = ({
  onTouchOutside,
  visible,
  onSwipeOut,
  onClose
}) => (
  <View>
    <Modal.BottomModal
      visible={visible || false}
      onTouchOutside={onClose}
      modalStyle={{ backgroundColor: "transparent", height: dimensions(470) }}
      onSwipeOut={onClose}
    >
      <ModalContent
        style={{
          flex: 1,
          backgroundColor: "#23203F",
          borderTopLeftRadius: dimensions(40),
          borderTopRightRadius: dimensions(40)
        }}
      >
        <View style={styles.container}>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>Calma ai, amig@!</Text>
          </View>
          <View style={{ alignItems: "center", top: "-4%" }}>
            <Text style={styles.textSubtitle}>Ainda estamos em progresso!</Text>
          </View>
          <View style={{ alignItems: "center", top: "-4%" }}>
            <Image
              source={imgBuilder}
              style={{
                height: dimensions(160),
                width: dimensions(220)
              }}
            />
          </View>
          <View style={{ alignItems: "center", top: "-10%" }}>
            <Text style={styles.textSubtitle}>Logo mais teremos essa</Text>
            <Text style={styles.textSubtitle}>funcionalidade para você!</Text>
          </View>
        </View>
        <View style={{ top: "-3%" }}>
          <RoundButton name="Entendi" style={styles.btn} onPress={onClose} />
        </View>
      </ModalContent>
    </Modal.BottomModal>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  containerTitle: {
    height: "15%",
    justifyContent: "center",
    alignItems: "center"
  },
  textTitle: {
    color: "#FFF",
    fontSize: dimensions(30),
    fontFamily: "HelveticaNowMicro-Medium"
  },
  textSubtitle: {
    color: "#FFF",
    fontSize: dimensions(15),
    fontFamily: "HelveticaNowMicro-Regular"
  },
  btn: {
    borderRadius: 50,
    backgroundColor: "#7541BF",
    paddingVertical: dimensions(15),
    alignItems: "center",
    width: "50%"
  }
});
