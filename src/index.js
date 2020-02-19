import React, { Component } from "react";
import { Provider } from "react-redux";
import { View, StatusBar } from "react-native";

import OneSignal from "react-native-onesignal";

import store from "./store";

import Routes from "~/routes/routes";

import { initMomentPtBr } from "~/shared/helpers";

import DropdownAlert from "react-native-dropdownalert";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import { calcWidth } from "./assets/Dimensions";

initMomentPtBr();

const ONE_SIGNAL_ID = "974fc0c7-12f6-4d7a-8aca-c07d519c7dc1";

class App extends Component {
  constructor(properties) {
    super(properties);
    OneSignal.init(ONE_SIGNAL_ID, {
      kOSSettingsKeyInFocusDisplayOption: 2
    }); // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    // TODO: lógica de validação de tipo de push enviado
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData.type);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  }

  onIds(device) {
    // const { userId: deviceId } = device

    // TODO: lógica de atualização de deviceId
    // TODO: lógica salvamento de deviceId para enviar no cadastro de usuário

    console.log("Device info: ", device);
  }

  render() {
    return (
      <>
        <Provider store={store}>
          <Routes />
        </Provider>
        <DropdownAlert
          defaultContainer={{ padding: calcWidth(3), paddingTop: calcWidth(5) }}
          updateStatusBar={false}
          useNativeDriver
          ref={ref => AlertHelper.setDropDown(ref)}
          onClose={() => AlertHelper.invokeOnClose()}
        />
      </>
    );
  }
}

export default App;
