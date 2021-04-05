import React, { Fragment, useEffect, useState } from "react";

import getLocationFreela from "./GetLocationFreela";
import ModalCheckList from "./ModalCheckList";

import ButtonPulse from "~/shared/components/ButtonPulse";
import QRCode from "~/shared/components/QRCodeScanner";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

import {
  operationsCheckout,
  operationsChecklists,
} from "~/shared/services/operations.http";

const Checkout = ({
  textBtnPulse,
  operationId,
  freelaId,
  isHomeOffice,
  job,
  eventId,
  vacancyId,
  checkListCheckOut,
  eventName,
  statusOperation,
  size,
  isLate,
  hirerId,
  navigation,
}) => {
  const [QRCodeVisible, setQRCodeVisible] = useState(false);
  const [openModalCheckout, setOpenModalCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (statusOperation === 4) {
      setOpenModalCheckout(true);
    }
  });

  const ToCheckOut = (value) => {
    const [id, qrcodeDate] = value.data.split("|");
    setQRCodeVisible(false);
    operationsCheckout({ id, vacancyId, job, qrcodeDate, eventId })
      .then(async ({}) => {
        getLocationFreela({
          operationId,
          freelaId,
          isHomeOffice,
          origin: 2,
          job,
        });
        await setOpenModalCheckout(true);
      })
      .catch((error) => {
        AlertHelper.show("error", "Erro", error.response.data.errorMessage);
      })
      .finally(() => setQRCodeVisible(false));
  };

  const confirmChecklist = () => {
    setLoading(true);
    operationsChecklists({ id: operationId, origin: 2, job })
      .then(() => navigation.replace("Rating", { hirerId, eventName }))
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => setLoading(false));
  };

  return (
    <Fragment>
      <ButtonPulse
        title={`Iniciar${"\n"}Check-out`}
        titleStyle={textBtnPulse}
        size={size}
        startAnimations
        color={isLate ? "#FF0000" : "#865FC0"}
        onPress={() =>
          isHomeOffice
            ? ToCheckOut({
                data: `${operationId}|${new Date().toISOString()}`,
              })
            : setQRCodeVisible(true)
        }
      />
      <QRCode
        onPress={(value) => ToCheckOut(value)}
        visible={QRCodeVisible}
        close={() => setQRCodeVisible(false)}
        title={`Para iniciar o checkout escaneia o QR code.`}
      />
      <ModalCheckList
        visible={openModalCheckout}
        loading={loading}
        titleCheck="Check-out"
        job={job}
        checkList={checkListCheckOut}
        pressConfirm={() => confirmChecklist()}
        onPressCheck={() => setChecked(!checked)}
        checked={checked}
        eventName={eventName}
        onClose={() => setOpenModalCheckout(false)}
      />
    </Fragment>
  );
};

export default Checkout;
