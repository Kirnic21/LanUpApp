import React, { Fragment, useCallback, useEffect, useState } from "react";

import getLocationFreela from "./GetLocationFreela";
import ModalCheckList from "./ModalCheckList";

import ButtonPulse from "~/shared/components/ButtonPulse";
import QRCode from "~/shared/components/QRCodeScanner";
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
  const [QRCodeVisible, setQRCodeVisible] = useState(false);
  const [openModalCheckin, setOpenModalCheckin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (statusOperation === 4) {
      setOpenModalCheckin((prev) => !prev);
    }
  }, [statusOperation]);

  const _getLocationFreela = (value) => {
    if (statusOperation === 3) {
      getLocationFreela({
        operationId,
        freelaId,
        isHomeOffice,
        origin: 1,
        job,
      }).then(() => toCheckIn(value));
    } else {
      toCheckIn(value);
    }
  };

  const toCheckIn = useCallback(
    async (value) => {
      const [id, qrcodeDate] = value.data.split("|");
      load(true);
      setQRCodeVisible(false);
      try {
        await operationsCheckins({ id, vacancyId, job, qrcodeDate, eventId });
        setOpenModalCheckin((prev) => !prev);
      } catch (error) {
        AlertHelper.show("error", "Erro", error.response.data.errorMessage);
      } finally {
        setQRCodeVisible(false);
        load(false);
      }
    },
    [
      statusOperation,
      QRCodeVisible,
      vacancyId,
      job,
      eventId,
      freelaId,
      operationId,
      isHomeOffice,
      openModalCheckin,
    ]
  );

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
        onPress={() =>
          isHomeOffice
            ? _getLocationFreela({
                data: `${operationId}|${new Date().toISOString()}`,
              })
            : setQRCodeVisible((prev) => !prev)
        }
      />
      <QRCode
        onPress={(value) => _getLocationFreela(value)}
        visible={QRCodeVisible}
        close={() => setQRCodeVisible((prev) => !prev)}
        title={`Para iniciar o trabalho escaneia o QR code.`}
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
        onClose={() => setOpenModalCheckin((prev) => !prev)}
      />
    </Fragment>
  );
};

export default Checkin;
