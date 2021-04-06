import React, { Fragment, useEffect, useState } from "react";

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
      setOpenModalCheckin(true);
    }
  });

  const ToCheckIn = async (value) => {
    const [id, qrcodeDate] = value.data.split("|");
    setQRCodeVisible(false);
    try {
      if (statusOperation === 3) {
        await operationsCheckins({ id, vacancyId, job, qrcodeDate, eventId });
        await getLocationFreela({
          operationId,
          freelaId,
          isHomeOffice,
          origin: 1,
          job,
        });
      }
      await setOpenModalCheckin(true);
    } catch (error) {
      if (error?.code !== 5) {
        AlertHelper.show("error", "Erro", error.response.data.errorMessage);
      }
    } finally {
      setQRCodeVisible(false);
    }
  };

  const confirmChecklist = () => {
    setLoading(true);
    operationsChecklists({ id: operationId, origin: 1, job })
      .then(() => action({ operationId, freelaId, isHomeOffice, checkout }))
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => setLoading(false));
  };

  return (
    <Fragment>
      <ButtonPulse
        title={`Iniciar${"\n"}Check-in`}
        titleStyle={textBtnPulse}
        size="normal"
        startAnimations
        color="#46C5F3"
        onPress={() =>
          isHomeOffice
            ? ToCheckIn({
                data: `${operationId}|${new Date().toISOString()}`,
              })
            : setQRCodeVisible(true)
        }
      />
      <QRCode
        onPress={(value) => ToCheckIn(value)}
        visible={QRCodeVisible}
        close={() => setQRCodeVisible(false)}
        title={`Para iniciar o checkin escaneia o QR code.`}
      />
      <ModalCheckList
        visible={openModalCheckin}
        loading={loading}
        titleCheck="Check-in"
        job={job}
        checkList={checkListCheckIn}
        pressConfirm={() => confirmChecklist()}
        onPressCheck={() => setChecked(!checked)}
        checked={checked}
        eventName={eventName}
        onClose={() => setOpenModalCheckin(false)}
      />
    </Fragment>
  );
};

export default Checkin;
