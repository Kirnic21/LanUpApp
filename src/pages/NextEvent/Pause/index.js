import React, { Fragment, useEffect, useState } from "react";

import ButtonPulse from "~/shared/components/ButtonPulse";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

import ModalPause from "./ModalPause";

import {
  breaks,
  openedBreaks,
  updatebreaks,
} from "~/shared/services/operations.http";

const Pause = ({ operationId: id, job }) => {
  const [pause, setPause] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModalPause, setOpenModalPause] = useState(false);

  useEffect(() => isPaused(), []);

  const isPaused = () => {
    openedBreaks({ id })
      .then(({ data }) => data)
      .then(({ result: { value } }) => {
        setPause(value);
      })
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      );
  };

  const toPause = (reason) => {
    setOpenModalPause(false);
    setLoading(true);

    breaks({ id, reason, job })
      .then(() => setPause(true))
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => setLoading(false));
  };

  const returnPause = () => {
    setSpinner(true);
    updatebreaks({ id, job })
      .then(() => setPause(false))
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => setSpinner(false));
  };

  return (
    <Fragment>
      <ButtonPulse
        size="small"
        disabled={spinner}
        icon={pause ? "play-arrow" : "pause"}
        title={pause ? "voltar" : "Pausa"}
        startAnimations={!!pause}
        color={pause ? "#03DAC6" : "#F13567"}
        onPress={() => (pause ? returnPause() : setOpenModalPause(true))}
      />
      <ModalPause
        visible={openModalPause}
        onPress={(reason) => toPause(reason)}
        loading={loading}
        onClose={() => setOpenModalPause(false)}
      />
    </Fragment>
  );
};

export default Pause;
