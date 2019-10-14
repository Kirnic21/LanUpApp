import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Modal, {
  ModalContent,
  SlideAnimation,
  ModalTitle,
  ModalFooter
} from "react-native-modals";
import Icons from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome";

export default ModalComponent = ({
  onTouchOutside,
  style,
  visible,
  children
}) => (
  <View>
    <Modal
      height={350}
      width={400}
      style={{
        justifyContent: "flex-end"
        // width: Dimensions.get("window").width + 100
      }}
      modalStyle={{ backgroundColor: "#49358C", borderLeftTopRadius: 70 }}
      modalAnimation={
        new SlideAnimation({
          slideFrom: "bottom"
        })
      }
      visible={visible}
      onTouchOutside={onTouchOutside}
    >
      <ModalContent>{children}</ModalContent>
    </Modal>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
