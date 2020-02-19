import React, { Component } from "react";
import { Provider } from "react-redux";

import OneSignal from 'react-native-onesignal';

import store from "./store";

import Routes from "~/routes/routes";

import { initMomentPtBr } from "~/shared/helpers";

initMomentPtBr();

const ONE_SIGNAL_ID = "974fc0c7-12f6-4d7a-8aca-c07d519c7dc1"

class App extends Component {

constructor(properties) {
    super(properties);
    OneSignal.init(ONE_SIGNAL_ID, {
      kOSSettingsKeyInFocusDisplayOption: 0
    });// set kOSSettingsKeyAutoPrompt to false prompting manually on iOS
    // OneSignal.setLogLevel(6, 6);
    OneSignal.inFocusDisplaying(0);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    // TODO: lógica de validação de tipo de push enviado
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    // const { userId: deviceId } = device

    // TODO: lógica de atualização de deviceId
    // TODO: lógica salvamento de deviceId para enviar no cadastro de usuário

    console.log('Device info: ', device);
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}

export default App;
