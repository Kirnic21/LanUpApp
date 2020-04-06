import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { calcWidth } from "~/assets/Dimensions/index";
import Modal from "react-native-modal";
import { TextInput } from "react-native-gesture-handler";
import Lottie from "lottie-react-native";
import loadingSpinner from "~/assets/loadingSpinner.json";

export default ModalComponent = ({
  visible,
  children,
  onClose,
  heightModal,
  width,
  loading,
  swipe
}) => (
  <Modal
    isVisible={visible}
    backdropOpacity={0.5}
    onBackButtonPress={onClose}
    onBackdropPress={onClose}
    onSwipeComplete={onClose}
    hideModalContentWhileAnimating={true}
    swipeDirection={swipe || ["down"]}
    style={styles.view}
    animationIn="slideInUp"
  >
    <View
      style={[
        styles.content,
        { height: heightModal || calcWidth(112), width: width }
      ]}
    >
      <View style={{ alignItems: "flex-end", padding: calcWidth(2) }}>
        <MaterialCommunityIcons
          onPress={onClose}
          color={"#FFF"}
          name={"close"}
          size={calcWidth(9)}
        />
      </View>
      {children}
      {loading ? (
        <View style={{ alignItems: "center", top: calcWidth(-4) }}>
          <Lottie
            autoSize
            style={{
              height: calcWidth(14),
              width: calcWidth(14)
            }}
            resizeMode="cover"
            source={loadingSpinner}
            loop
            autoPlay
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0
  },
  content: {
    backgroundColor: "#23203F",
    borderTopLeftRadius: calcWidth(13),
    borderTopRightRadius: calcWidth(13),
    padding: calcWidth(5)
  }
});
