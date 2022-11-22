import React, { Fragment, useState } from "react";

import getLocationFreela from "./GetLocationFreela";

import ButtonPulse from "~/shared/components/ButtonPulse";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import SpinnerComponent from "~/shared/components/SpinnerComponent";

import { operationsCheckout } from "~/shared/services/operations.http";
import { calcWidth } from "~/assets/Dimensions";

const Checkout = ({
  textBtnPulse,
  operationId,
  freelaId,
  isHomeOffice,
  job,
  eventId,
  vacancyId,
  eventName,
  agencyName,
  hirerName,
  agencyId,
  size,
  isLate,
  hirerId,
  navigation,
  load,
  hasCheckoutQrCode,
  openQrCheckout,
}) => {
  const [loading, setLoading] = useState(false);

  const _getLocationFreela = () => {
    setLoading(true);
    getLocationFreela({
      operationId,
      freelaId,
      isHomeOffice,
      origin: 2,
      job,
    })
      .then(() => (hasCheckoutQrCode ? openQrCheckout(true) : toCheckOut()))
      .finally(() => {
        setLoading(false);
      });
  };

  const toCheckOut = async () => {
    load(true);
    try {
      await operationsCheckout({
        id: operationId,
        vacancyId,
        job,
        eventId,
        freelaId,
      });
      navigation.replace("Rating", {
        hirerId,
        eventName,
        agencyName,
        hirerName,
        agencyId,
      });
    } catch (error) {
      AlertHelper.show("error", error.response.data.errorMessage);
    } finally {
      load(false);
    }
  };

  return (
    <Fragment>
      <SpinnerComponent loading={loading} />
      <ButtonPulse
        title={`Finalizar${"\n"}Trabalho`}
        titleStyle={[
          size === "normal"
            ? textBtnPulse
            : { textAlign: "center", lineHeight: calcWidth(5) },
        ]}
        size={size}
        startAnimations
        color={isLate ? "#FF0000" : "#865FC0"}
        onPress={() => _getLocationFreela()}
      />
    </Fragment>
  );
};

export default Checkout;
