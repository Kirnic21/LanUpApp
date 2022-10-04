import React, { Fragment, useCallback, useState } from "react";

import getLocationFreela from "./GetLocationFreela";
import ModalCheckList from "./ModalCheckList";

import ButtonPulse from "~/shared/components/ButtonPulse";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import SpinnerComponent from "~/shared/components/SpinnerComponent";

import {
  operationsCheckout,
  operationsChecklists,
  checkListStatus,
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
  const [openModalCheckout, setOpenModalCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setButtonLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const _getLocationFreela = () => {
    getLocationFreela({
      operationId,
      freelaId,
      isHomeOffice,
      origin: 2,
      job,
    })
      .then(() => (hasCheckoutQrCode ? openQrCheckout(true) : toCheckOut()))
      .finally(() => {
        setOpenModalCheckout(false);
        setButtonLoading(false);
      });
  };

  const toCheckOut = async () => {
    setOpenModalCheckout(false);
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
      setButtonLoading(false);
    }
  };

  const confirmedChecklist = useCallback(() => {
    setLoading(true);
    checkListStatus({ id: operationId, origin: 2, freelaId })
      .then(({ data }) => data)
      .then(({ result }) => {
        if (result.value) return _getLocationFreela();
        if (!result.value) return setOpenModalCheckout(true);
      })
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => setLoading(false));
  }, [operationId, freelaId, load]);

  const confirmChecklist = () => {
    const proceedCheckout = () => {
      _getLocationFreela();
      setOpenModalCheckout(false);
    };

    setButtonLoading(true);
    operationsChecklists({ id: operationId, origin: 2, job })
      .then(() => proceedCheckout())
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => setButtonLoading(false));
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
        onPress={
          () => confirmedChecklist()
          // statusOperation === 6
          //   ? _getLocationFreela()
          //   : setOpenModalCheckout(true)
        }
      />
      <ModalCheckList
        visible={openModalCheckout}
        loading={loadingButton}
        titleCheck="Saída"
        job={job}
        checkList={checkListCheckout}
        pressConfirm={() => confirmChecklist()}
        onPressCheck={() => setChecked((prev) => !prev)}
        checked={checked}
        eventName={eventName}
        onClose={() => setOpenModalCheckout(false)}
      />
    </Fragment>
  );
};

export default Checkout;
