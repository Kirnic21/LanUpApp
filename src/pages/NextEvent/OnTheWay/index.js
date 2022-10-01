import React, { Fragment, useCallback, useEffect, useState } from "react";
import Geolocation from "react-native-geolocation-service";

import { AlertHelper } from "~/shared/helpers/AlertHelper";
import { hasLocationPermission } from "~/shared/helpers/PermissionGeolocation";
import { startOperation } from "~/shared/services/operations.http";
import ButtonPulse from "~/shared/components/ButtonPulse";
import SpinnerComponent from "~/shared/components/SpinnerComponent";

const OnTheWay = ({
  textBtnPulse,
  operationId: id,
  eventName,
  addressId,
  address,
  statusOperation,
  navigation,
  eventId,
  vacancyId,
  job,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (statusOperation === 2) {
      _getLatitudeAndLongitude();
    }
  }, [statusOperation]);

  const _getLatitudeAndLongitude = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    setLoading(true);

    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        _onTheWay(latitude, longitude);
      },
      (error) => {
        setLoading(false);
        const errors = {
          1: "A permissão de localização não foi concedida",
          2: "O provedor de localização não está disponível",
          3: "A solicitação de localização expirou",
          4: "O serviço Google Play não está instalado ou tem uma versão mais antiga",
          5: "O serviço de localização não está ativado ou o modo de localização não é apropriado para a solicitação atual",
        };
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
  };

  const _onTheWay = async (latitude, longitude) => {
    if (statusOperation === 2) {
      setLoading(false);
      return openMaps(latitude, longitude);
    }

    try {
      await startOperation({ id, eventId, vacancyId, job });
      openMaps(latitude, longitude);
    } catch (error) {
      AlertHelper.show("error", "Erro", error);
    } finally {
      setLoading(false);
    }
  };

  const openMaps = (latitude, longitude) => {
    navigation.replace("MapsGeolocation", {
      id,
      eventName,
      eventId,
      vacancyId,
      job,
      addressId,
      address,
      latitude,
      longitude,
    });
  };

  return (
    <Fragment>
      <SpinnerComponent loading={loading}/>
      <ButtonPulse
        title={`Estou${"\n"}a${"\n"}caminho`}
        titleStyle={textBtnPulse}
        size="normal"
        startAnimations
        color="#03DAC6"
        titleColor="#24203B"
        onPress={() => _getLatitudeAndLongitude()}
      />
    </Fragment>
  );
};

export default OnTheWay;
