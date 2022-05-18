import React, { Fragment, useCallback, useEffect, useState } from "react";

import getLocationFreela from "./GetLocationFreela";
import ModalCheckList from "./ModalCheckList";

import ButtonPulse from "~/shared/components/ButtonPulse";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

import {
  operationsCheckins,
  operationsChecklists,
} from "~/shared/services/operations.http";

const Checkin = ({
  textBtnPulse,
  action,
  load,
  operationId,
  freelaId,
  isHomeOffice,
  job,
  eventId,
  vacancyId,
  checkListCheckIn,
  eventName,
  statusOperation,
  checkout,
}) => {
  const [openModalCheckin, setOpenModalCheckin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (statusOperation === 4) {
      setOpenModalCheckin(true);
    }
  }, [statusOperation]);

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
    load(false);
    operationsCheckins({
      id: operationId,
      vacancyId,
      job,
      eventId,
      freelaId,
    })
      .then(() => {
        setOpenModalCheckin(true);
      })
      .catch((error) => {
        AlertHelper.show("error", "Erro", error.response.data.errorMessage);
      })
      .finally(() => load(false));
  };

  const confirmChecklist = useCallback(() => {
    setLoading((prev) => !prev);
    operationsChecklists({ id: operationId, origin: 1, job })
      .then(() => action({ operationId, freelaId, isHomeOffice, checkout }))
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => setLoading((prev) => !prev));
  }, [loading, freelaId, isHomeOffice, checkout, job, action]);

  return (
    <Fragment>
      <ButtonPulse
        title={`Iniciar${"\n"}Trabalho`}
        titleStyle={textBtnPulse}
        size="normal"
        startAnimations
        color="#46C5F3"
        onPress={() => _getLocationFreela()}
      />
      <ModalCheckList
        visible={openModalCheckin}
        loading={loading}
        titleCheck="Entrada"
        job={job}
        checkList={checkListCheckIn}
        pressConfirm={() => confirmChecklist()}
        onPressCheck={() => setChecked((prev) => !prev)}
        checked={checked}
        eventName={eventName}
        onClose={() => setOpenModalCheckin(false)}
      />
    </Fragment>
  );
};

export default Checkin;
