import {
  Alert,
  Linking,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
} from "react-native";
import Geolocation from "react-native-geolocation-service";

import { AlertHelper } from "~/shared/helpers/AlertHelper";

const openSetting = () => {
  Linking.openSettings().catch(() => {
    AlertHelper.show(
      "error",
      "Erro",
      "Não foi possível abrir as configurações"
    );
  });
};

const hasPermissionIOS = async () => {
  const status = await Geolocation.requestAuthorization("whenInUse");

  if (status === "granted") {
    return true;
  }

  if (status === "denied") {
    Alert.alert(
      `Ative os Serviços de Localização para permitir que a "Lanup" use sua localização.`,
      "",
      [
        { text: "Ir para configurações", onPress: openSetting },
        { text: "Não use a localização", onPress: () => {} },
      ]
    );
  }

  if (status === "disabled") {
    await Geolocation.requestAuthorization("whenInUse");
  }

  return false;
};

const hasLocationPermission = async () => {
  if (Platform.OS === "ios") {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === "android" && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (
    status === PermissionsAndroid.RESULTS.DENIED ||
    status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
  ) {
    Alert.alert(
      `Ative os Serviços de Localização `,
      'Permita que a "Lanup" possa sua localização.',
      [
        { text: "Ir para configurações", onPress: openSetting },
        {
          text: "Não use a localização",
          onPress: () => {},
          style: "cancel",
        },
      ]
    );
  }

  return false;
};

export { hasLocationPermission };
