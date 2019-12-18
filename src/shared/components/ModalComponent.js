import React from "react";
import { View, StyleSheet } from "react-native";
import Modal, { ModalContent } from "react-native-modals";

export default ModalComponent = ({
  onTouchOutside,
  visible,
  children,
  onSwipeOut
}) => (
  <View>
    <Modal.BottomModal
      visible={visible}
      onTouchOutside={onTouchOutside}
      height={0.5}
      width={1}
      modalStyle={{ backgroundColor: "transparent" }}
      onSwipeOut={onSwipeOut}
    >
      <ModalContent
        style={{
          flex: 1,
          backgroundColor: "#23203F",
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60
        }}
      >
        {children}
      </ModalContent>
    </Modal.BottomModal>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
