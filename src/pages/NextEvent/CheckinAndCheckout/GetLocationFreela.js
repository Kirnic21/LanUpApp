import Geolocation from "react-native-geolocation-service";

import { AlertHelper } from "~/shared/helpers/AlertHelper";
import { hasLocationPermission } from "~/shared/helpers/PermissionGeolocation";
import { checkpoints, location } from "~/shared/services/operations.http";

const errors = {
  1: "A permissão de localização não foi concedida",
  2: "O provedor de localização não está disponível",
  3: "A solicitação de localização expirou",
  4: "O serviço Google Play não está instalado ou tem uma versão mais antiga",
  5: "O serviço de localização não está ativado ou o modo de localização não é apropriado para a solicitação atual",
};

const getLocationFreela = async (origin, id, job, latitude, longitude) => {
  try {
    await checkpoints({
      id,
      lat: latitude,
      long: longitude,
    });
    await location({
      id,
      lat: latitude,
      long: longitude,
      origin,
      job,
    });
  } catch (error) {
    AlertHelper.show("error", "Erro", error.message);
  }
};

const getLatLong = async ({ origin, operationId: id, job }) => {
  const hasPermission = await hasLocationPermission();

  if (!hasPermission) {
    stopBackground.stop();
    return;
  }

  new Promise((resolve) => {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        getLocationFreela(origin, id, job, latitude, longitude);
        resolve(true);
      },
      (error) => {
        AlertHelper.show(
          "error",
          "Erro",
          `${
            errors[error?.code] || "Ocorreu um erro, por favor tente mais tarde"
          }`
        );
      },
      {
        accuracy: {
          android: "high",
          ios: "best",
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
        forceLocationManager: false,
        showLocationDialog: true,
      }
    );
  });
};

export default getLatLong;
