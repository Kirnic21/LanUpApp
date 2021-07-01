import React, { Fragment, useCallback, useEffect } from "react";
import { NativeModules } from "react-native";

import ButtonPulse from "~/shared/components/ButtonPulse";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

import { startOperation } from "~/shared/services/operations.http";

import Geolocation from "react-native-geolocation-service";

const OnTheWay = ({
  textBtnPulse,
  operationId: id,
  eventName,
  addressId,
  address,
  statusOperation,
  navigation,
}) => {
  useEffect(() => {
    if (statusOperation === 2) {
      _getLatitudeAndLongitude();
    }
  }, [statusOperation]);

  const _getLatitudeAndLongitude = useCallback(() => {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        openMaps(latitude, longitude);
      },
      (error) => {
        error.code === 5
          ? AlertHelper.show(
              "error",
              "Erro",
              "Ative sua localização para continuar!."
            )
          : AlertHelper.show("error", "Erro", error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const openMaps = useCallback(
    (latitude, longitude) => {
      NativeModules.ForegroundModule.startForegroundService();

      navigation.replace("MapsGeolocation", {
        id,
        eventName,
        addressId,
        address,
        latitude,
        longitude,
      });
    },
    [navigation, id, eventName, address, addressId]
  );

  const _onTheWay = useCallback(() => {
    startOperation(id)
      .then(() => _getLatitudeAndLongitude())
      .catch((error) => AlertHelper.show("error", "Erro", error));
  }, [id]);

  return (
    <Fragment>
      <ButtonPulse
        title={`Estou${"\n"}a${"\n"}caminho`}
        titleStyle={textBtnPulse}
        size="normal"
        startAnimations
        color="#03DAC6"
        titleColor="#24203B"
        onPress={() => _onTheWay()}
      />
    </Fragment>
  );
};

export default OnTheWay;
