import React, { Fragment, useCallback, useState } from "react";

import getLocationFreela from "./GetLocationFreela";
import ModalCheckList from "./ModalCheckList";

import ButtonPulse from "~/shared/components/ButtonPulse";
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
  load
}) => {
  const [openModalCheckout, setOpenModalCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const _getLocationFreela = () => {
    getLocationFreela({
      operationId,
      freelaId,
      isHomeOffice,
      origin: 2,
      job,
    }).then(() => toCheckOut().finally(() => setOpenModalCheckout(false)));
  };

  const toCheckOut = useCallback(async () => {
    setOpenModalCheckout(false);
    load(true)
    try {
      await operationsCheckout({ id: operationId, vacancyId, job, eventId });
      navigation.replace("Rating", { hirerId, eventName });
    } catch (error) {
      AlertHelper.show("error", error.response.data.errorMessage);
    } finally {
      load(false)
      setLoading(false);
    }
  }, [
    statusOperation,
    operationId,
    freelaId,
    job,
    eventId,
    vacancyId,
    isHomeOffice,
    navigation,
    setOpenModalCheckout,
  ]);

  const confirmChecklist = useCallback(() => {
    const proceedCheckout = () => {
      _getLocationFreela();
      setOpenModalCheckout(false);
    };

    setLoading((prev) => !prev);
    if (statusOperation === 5) {
      operationsChecklists({ id: operationId, origin: 2, job })
        .then(() => proceedCheckout())
        .catch((error) =>
          AlertHelper.show("error", "Erro", error.response.data.errorMessage)
        )
        .finally(() => setLoading((prev) => !prev));
    } else proceedCheckout();
    setLoading((prev) => !prev);
  }, [
    operationId,
    job,
    isHomeOffice,
    hirerId,
    eventName,
    setLoading,
    statusOperation,
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
