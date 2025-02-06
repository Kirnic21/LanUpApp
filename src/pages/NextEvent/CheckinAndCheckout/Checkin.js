import React, { Fragment, useState } from "react";

import getLocationFreela from "./GetLocationFreela";

import ButtonPulse from "~/shared/components/ButtonPulse";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

import { operationsCheckins } from "~/shared/services/operations.http";

import SpinnerComponent from "~/shared/components/SpinnerComponent";

const Checkin = ({
  textBtnPulse,
  action,
  operationId,
  freelaId,
  isHomeOffice,
  job,
  eventId,
  vacancyId,
  statusOperation,
  checkout,
}) => {
  const [spinner, setSpinner] = useState(false);

  const _getLocationFreela = () => {
    if (statusOperation === 3) {
      getLocationFreela({
        operationId,
        freelaId,
        isHomeOffice,
        origin: 1,
        job,
      }).then(() => toCheckIn());
    } else {
      toCheckIn();
    }
  };

  const toCheckIn = () => {
    setSpinner(true);
    operationsCheckins({
      id: operationId,
      vacancyId,
      job,
      eventId,
      freelaId,
    })
      .then(() => {
        action({ operationId, freelaId, isHomeOffice, checkout });
      })
      .catch((error) => {
        AlertHelper.show("error", "Erro", error.response.data.errorMessage);
      })
      .finally(() => setSpinner(false));
  };

  return (
    <Fragment>
      <SpinnerComponent loading={spinner} />
      <ButtonPulse
        title={`Iniciar${"\n"}Trabalho`}
        titleStyle={textBtnPulse}
        size="normal"
        startAnimations
        color="#46C5F3"
        onPress={() => _getLocationFreela()}
      />
    </Fragment>
  );
};

export default Checkin;
