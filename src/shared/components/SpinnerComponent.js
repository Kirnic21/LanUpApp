// import React from "react";
// import { View } from "react-native";
// import Spinner from "react-native-loading-spinner-overlay";

// const SpinnerComponent = ({ visible }) => {
//   return (
//     <View>
//       <Spinner
//         visible={visible}
//         size="large"
//         animation="fade"
//         color="#7541BF"
//         overlayColor="rgba(0, 0, 0, 0.9)"
//       />
//     </View>
//   );
// };
// export default SpinnerComponent;
import React, { Component } from "react";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator
} from "react-native-indicators";

const SpinnerComponent = props => {
  const { loading, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={loading}
      onRequestClose={() => {
        console.log("close modal");
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <DotIndicator color="#7541BF" count={4} />
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
    backgroundColor: "#00000299"
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default SpinnerComponent;
