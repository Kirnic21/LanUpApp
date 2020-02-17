import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "~/shared/components/ModalComponent";
import { calcHeight, calcWidth } from "~/assets/Dimensions/index";
import InputModal from "~/shared/components/InputModal";
import cameraPlus from "~/assets/images/camera-plus.png";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ModalOcurrence = ({ visible, onClose, onTouchOutside, onSwipeOut }) => {
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      onTouchOutside={onTouchOutside}
      onSwipeOut={onSwipeOut}
      style={{ height: calcHeight(45) }}
    >
      <View style={{ marginHorizontal: calcWidth(5) }}>
        <Text style={styles.title}>Ocorrência</Text>
        <View style={{ marginTop: calcHeight(4) }}>
          <Text style={styles.subTitle}>O que aconteceu?</Text>

          <InputModal
            isfocused="#46C5F3"
            style={{ backgroundColor: "#3f3d58", width: calcWidth(80) }}
          />
          <TouchableOpacity style={styles.icon}>
            <Image
              source={cameraPlus}
              style={{ height: calcWidth(7), width: calcWidth(7) }}
            />
          </TouchableOpacity>
          <Icon
            size={calcWidth(8)}
            name="send"
            style={[styles.icon, { top: calcWidth(16) }]}
            color="#46C5F3"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#FFF",
    fontSize: calcWidth(8),
    fontFamily: "HelveticaNowMicro-Medium"
  },
  subTitle: {
    color: "#FFF",
    fontSize: calcWidth(5.5),
    fontFamily: "HelveticaNowMicro-Regular"
  },
  icon: {
    position: "absolute",
    left: calcWidth(67),
    top: calcWidth(16.5)
  }
});

export default ModalOcurrence;
