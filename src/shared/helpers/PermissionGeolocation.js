import { PermissionsAndroid } from "react-native";

import { AlertHelper } from "~/shared/helpers/AlertHelper";

import { request, PERMISSIONS } from "react-native-permissions";

const permission = async () => {
  try {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        AlertHelper.show(
          "error",
          "Erro",
          "LanUp App precisa de sua permissão para acessar sua localização!"
        );
      }
    } else if (Platform.OS === "ios") {
      await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
    }
  } catch (err) {
    AlertHelper.show("error", "Erro", err);
  }
};

const RequestPermission = (error) => {
  const alert = (value) => {
    return AlertHelper.show("error", "Erro", value);
  };

  const message = {
    1: permission,
    5: alert,
  };

  return message[error.code]("Ative sua localização para prosseguir!");
};

export default RequestPermission;
