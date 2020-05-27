import React, { Component } from "react";
import { Provider } from "react-redux";
import { StatusBar, PermissionsAndroid, Platform, Text } from "react-native";

import OneSignal from "react-native-onesignal";

import store from "./store";

import createNavigator from "~/routes/routes";
import AsyncStorage from "@react-native-community/async-storage";

import { initMomentPtBr } from "~/shared/helpers";

import DropdownAlert from "react-native-dropdownalert";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import { calcWidth } from "./assets/Dimensions";
import * as Sentry from "@sentry/react-native";

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

initMomentPtBr();

const ONE_SIGNAL_ID = "974fc0c7-12f6-4d7a-8aca-c07d519c7dc1";
Sentry.init({
  dsn: "https://56c92c18d0684d81b3f59dde2512aed4@sentry.io/4606069",
});

class App extends Component {
  constructor(properties) {
    super(properties);
    this.state = {
      userChecked: false,
      userLogged: false,
    };
    OneSignal.init(ONE_SIGNAL_ID, {
      kOSSettingsKeyInFocusDisplayOption: 0,
    }); // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS
    // OneSignal.setLogLevel(6, 6);
    OneSignal.inFocusDisplaying(0);
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);
  }

  async componentDidMount() {
    await this.requestLocationPermision();
    const token = await AsyncStorage.getItem("API_TOKEN");

    this.setState({
      userChecked: true,
      userLogged: !!token,
    });
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
  }

  requestLocationPermision = async () => {
    if (Platform.OS === "android") {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    }
  };

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    // TODO: lógica de validação de tipo de push enviado
    // this.props.navigation.navigate("NextEvent");
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
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
    const { userChecked, userLogged } = this.state;

    if (!userChecked) return null;

    const Routes = createNavigator(userLogged);

    return (
      <React.Fragment>
        <StatusBar backgroundColor="#18142F" barStyle="light-content" />
        <Provider store={store}>
          <Routes />
          {/* <VacancyModal /> */}
        </Provider>
        <DropdownAlert
          defaultContainer={{ padding: calcWidth(3), paddingTop: calcWidth(5) }}
          updateStatusBar={false}
          useNativeDriver
          ref={(ref) => AlertHelper.setDropDown(ref)}
          onClose={() => AlertHelper.invokeOnClose()}
        />
      </React.Fragment>
    );
  }
}

export default App;
