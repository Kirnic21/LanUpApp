import React from "react";
import { View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const SpinnerComponent = ({ visible }) => {
  return (
    <View>
      <Spinner
        visible={visible}
        size="large"
        animation="fade"
        color="#7541BF"
        overlayColor="rgba(0, 0, 0, 0.9)"
      />
    </View>
  );
};
export default SpinnerComponent;
