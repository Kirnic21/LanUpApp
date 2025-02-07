import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Geolocation from "react-native-geolocation-service";

import { AlertHelper } from "~/shared/helpers/AlertHelper";
import { hasLocationPermission } from "~/shared/helpers/PermissionGeolocation";
import { startOperation } from "~/shared/services/operations.http";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import { adjust } from "~/assets/Dimensions";
import WarningModal from "~/shared/components/WarningModal";

const OnTheWay = ({
  operationId: id,
  eventName,
  statusOperation,
  navigation,
  eventId,
  vacancyId,
  job,
  action,
  freelaId,
  isHomeOffice,
  checkout,
}) => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (statusOperation === 1) {
      setOpenModal(true);
    }
  }, []);

  const _getLatitudeAndLongitude = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }
    setOpenModal(false);
    setLoading(true);

    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        _onTheWay(latitude, longitude);
      },
      (error) => {
        setLoading(false);
        setOpenModal(true);
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
    try {
      await startOperation({ id, eventId, vacancyId, job });
      action({ operationId: id, freelaId, isHomeOffice, checkout });
    } catch (error) {
      setOpenModal(true);
      AlertHelper.show("error", "Erro", error);
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    navigation.push("UserProfile");
  };

  return (
    <Fragment>
      <SpinnerComponent loading={loading} />

      <WarningModal
        title="Estou a caminho"
        titleButton="Confirmar"
        subtitle={`Você está a caminho da demanda ${eventName}?`}
        visible={openModal}
        onPress={() => _getLatitudeAndLongitude()}
        onClose={closeModal}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: adjust(16),
    color: "#FFF",
  },
  title: {
    color: "#FFF",
    fontSize: adjust(14),
    lineHeight: adjust(18),
    fontFamily: "HelveticaNowMicro-Regular",
    textAlign: "center",
    marginBottom: "10%",
  },
  eventName: {
    color: "#d2d0ff",
    fontSize: adjust(15),
    fontFamily: "HelveticaNowMicro-Medium",
  },
});

export default OnTheWay;
