import React, { Component } from "react";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-community/async-storage";
import env from "react-native-config";

import { View } from "react-native";
import Lottie from "lottie-react-native";
import loadingSpinner from "~/assets/loadingSpinner.json";
import { calcWidth } from "~/assets/Dimensions";

class ViewProfile extends Component {
  state = { token: "" };

  async componentDidMount() {
    const token = await AsyncStorage.getItem("API_TOKEN");
    this.setState({ token: token });
  }

  LoadingIndicatorView() {
    return (
      <View style={styles.container}>
        <Lottie
          autoSize
          style={styles.loading}
          resizeMode="cover"
          source={loadingSpinner}
          loop
          autoPlay
        />
      </View>
    );
  }

  render() {
    const { token } = this.state;
    return (
      <WebView
        textZoom={100}
        renderLoading={this.LoadingIndicatorView}
        startInLoadingState={true}
        source={{
          uri: `${env.REACT_LANUP_URL}freelas/view-profile?access=${token}`,
        }}
      />
    );
  }
}

const styles = {
  loading: { height: calcWidth(30), width: calcWidth(30) },
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default ViewProfile;
