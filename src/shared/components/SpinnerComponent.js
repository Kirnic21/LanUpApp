import React from "react";
import { StyleSheet, View, Modal, StatusBar } from "react-native";
import Lottie from "lottie-react-native";
import loadingSpinner from "~/assets/loadingSpinner.json";
import { calcWidth } from "~/assets/Dimensions";

const SpinnerComponent = props => {
  const { loading, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={loading}
      onRequestClose={() => {
        loading;
        true;
      }}
    >
      <View style={styles.modalBackground}>
        <StatusBar backgroundColor="#00000098" />
        <View style={styles.activityIndicatorWrapper}>
          <Lottie
            autoSize
            style={{
              height: calcWidth(70),
              width: calcWidth(70)
            }}
            resizeMode="cover"
            source={loadingSpinner}
            loop
            autoPlay
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  activityIndicatorWrapper: {
    width: calcWidth(100),
    height: calcWidth(100),
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default SpinnerComponent;
