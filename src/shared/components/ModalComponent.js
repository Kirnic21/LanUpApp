import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Modal, { ModalContent } from "react-native-modals";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import dimensions from "~/assets/Dimensions/index";

export default ModalComponent = ({
  onTouchOutside,
  visible,
  children,
  onSwipeOut,
  onClose,
  style
}) => (
  <View>
    <Modal.BottomModal
      visible={visible}
      onTouchOutside={onTouchOutside}
      modalStyle={[
        { backgroundColor: "transparent", height: dimensions(300) },
        style
      ]}
      onSwipeOut={onSwipeOut}
    >
      <ModalContent
        style={{
          flex: 1,
          backgroundColor: "#23203F",
          borderTopLeftRadius: dimensions(40),
          borderTopRightRadius: dimensions(40)
        }}
      >
        <View
          style={{
            alignItems: "flex-end",
            paddingHorizontal: "7%",
            paddingVertical: "2%"
          }}
        >
          <MaterialCommunityIcons
            onPress={onClose}
            color={"#FFF"}
            name={"close"}
            size={dimensions(28)}
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
