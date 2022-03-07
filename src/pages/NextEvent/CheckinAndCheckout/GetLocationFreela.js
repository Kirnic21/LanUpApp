import Geolocation from "react-native-geolocation-service";

import { AlertHelper } from "~/shared/helpers/AlertHelper";

import { checkpoints, location } from "~/shared/services/operations.http";
import RequestPermission from "~/shared/helpers/PermissionGeolocation";

const getLatLong = ({ origin, operationId: id, job }) =>
  new Promise((resolve) => {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        getLocationFreela(origin, id, job, latitude, longitude);
        resolve(true);
      },
      (error) => {
        RequestPermission(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });

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

export default getLatLong;
