import Geolocation from "react-native-geolocation-service";

import { AlertHelper } from "~/shared/helpers/AlertHelper";

import { checkpoints, location } from "~/shared/services/operations.http";

const getLocationFreela = ({ origin, operationId: id, job }) =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        await checkpoints({
          id,
          lat: latitude,
          long: longitude,
        }).catch((error) => AlertHelper.show("error", "Erro", error.message));
        await location({
          id,
          lat: latitude,
          long: longitude,
          origin,
          job,
        }).catch((error) => AlertHelper.show("error", "Erro", error.message));
        resolve(true);
      },
      (error) => {
        error.code === 5
          ? AlertHelper.show(
              "error",
              "Erro",
              "Ative sua localização para continuar!."
            )
          : AlertHelper.show("error", "Erro", error.message);
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });

export default getLocationFreela;
