import React, { Fragment, useEffect } from "react";
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
      openMaps();
    }
  });

  const openMaps = async () => {
    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        statusOperation === 1 && (await startOperation(id));

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
  };

  return (
    <Fragment>
      <ButtonPulse
        title={`Estou${"\n"}a${"\n"}caminho`}
        titleStyle={textBtnPulse}
        size="normal"
        startAnimations
        color="#03DAC6"
        titleColor="#24203B"
        onPress={() => openMaps()}
      />
    </Fragment>
  );
};

export default OnTheWay;
