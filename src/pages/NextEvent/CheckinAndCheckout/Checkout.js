import React, { Fragment, useCallback, useEffect, useState } from "react";

import getLocationFreela from "./GetLocationFreela";
import ModalCheckList from "./ModalCheckList";

import ButtonPulse from "~/shared/components/ButtonPulse";
import QRCode from "~/shared/components/QRCodeScanner";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

import {
  operationsCheckout,
  operationsChecklists,
} from "~/shared/services/operations.http";
import { calcWidth } from "~/assets/Dimensions";

const Checkout = ({
  textBtnPulse,
  operationId,
  freelaId,
  isHomeOffice,
  job,
  eventId,
  vacancyId,
  checkListCheckout,
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

  const toCheckOut = useCallback(
    async (value) => {
      const [id, qrcodeDate] = value.data.split("|");
      setOpenModalCheckout(false);
      setQRCodeVisible(false);
      try {
        await getLocationFreela({
          operationId,
          freelaId,
          isHomeOffice,
          origin: 2,
          job,
        });
        await operationsCheckout({ id, vacancyId, job, qrcodeDate, eventId });
        navigation.replace("Rating", { hirerId, eventName });
      } catch (error) {
        if (error?.code !== 5) {
          AlertHelper.show("error", "Erro", error.response.data.errorMessage);
        }
      } finally {
        setQRCodeVisible(false);
      }
    },
    [
      statusOperation,
      operationId,
      freelaId,
      job,
      eventId,
      vacancyId,
      setQRCodeVisible,
      isHomeOffice,
      navigation,
      setOpenModalCheckout,
    ]
  );

  const confirmChecklist = useCallback(() => {
    setLoading((prev) => !prev);
    if (statusOperation === 5) {
      operationsChecklists({ id: operationId, origin: 2, job })
        .then(() =>
          isHomeOffice
            ? toCheckOut({
                data: `${operationId}|${new Date().toISOString()}`,
              })
            : setQRCodeVisible((prev) => !prev)
        )
        .catch((error) =>
          AlertHelper.show("error", "Erro", error.response.data.errorMessage)
        )
        .finally(() => setLoading((prev) => !prev));
    } else {
      setLoading((prev) => !prev);
      isHomeOffice
        ? toCheckOut({
            data: `${operationId}|${new Date().toISOString()}`,
          })
        : setQRCodeVisible((prev) => !prev);
    }
  }, [
    operationId,
    job,
    isHomeOffice,
    hirerId,
    eventName,
    setLoading,
    statusOperation,
    setQRCodeVisible,
  ]);

  return (
    <Fragment>
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
        onPress={() => setOpenModalCheckout((prev) => !prev)}
      />
      <QRCode
        onPress={(value) => toCheckOut(value)}
        visible={QRCodeVisible}
        close={() => setQRCodeVisible((prev) => !prev)}
        title={`Para finalizar o trabalho escaneia o QR code.`}
      />
      <ModalCheckList
        visible={openModalCheckout}
        loading={loading}
        titleCheck="Saída"
        job={job}
        checkList={checkListCheckout}
        pressConfirm={() => confirmChecklist()}
        onPressCheck={() => setChecked((prev) => !prev)}
        checked={checked}
        eventName={eventName}
        onClose={() => setOpenModalCheckout((prev) => !prev)}
      />
    </Fragment>
  );
};

export default Checkout;
