import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Modal, { ModalContent } from "react-native-modals";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default ModalComponent = ({
  onTouchOutside,
  visible,
  children,
  onSwipeOut,
  onClose
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
        <View
          style={{
            alignItems: "flex-end",
            paddingHorizontal: "8%",
            paddingVertical: "2%"
          }}
        >
          <MaterialCommunityIcons
            onPress={onClose}
            color={"#FFF"}
            name={"close"}
            size={30}
          />
        </View>
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
