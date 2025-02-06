import React, { Fragment, useState } from "react";

import ModalOccurrence from "./ModalOccurrence";

import ButtonPulse from "~/shared/components/ButtonPulse";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

import { incidents } from "~/shared/services/operations.http";

const Occurrence = ({ operationId: id, job, size }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState("");
  const [image, setImage] = useState("");
  const [send, setSend] = useState(false);
  const [description, setDescription] = useState("");

  const SendOcurrence = () => {
    setLoading(true);
    incidents({ id, job, incidentStatus: 1, image, description })
      .then(() => {
        setDescription(""), setSend(false);
        setImage("");
        setPicture("");

        AlertHelper.show(
          "success",
          "Sucesso",
          "Ocorrência enviada com sucesso."
        );
      })
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => {
        setLoading(false);
        setVisible(false);
      });
  };

  return (
    <Fragment>
      <ButtonPulse
        title="Ocorrência"
        icon="error"
        size={size}
        color="#FFB72B"
        startAnimations
        onPress={() => setVisible(true)}
      />
      <ModalOccurrence
        visible={visible}
        picture={picture}
        loading={loading}
        sendOcurrence={send}
        onPressSend={() => SendOcurrence()}
        onImageSelected={(image) => {
          setImage(image.data);
          setPicture(image.uri);
        }}
        valueInput={description}
        onChangeText={(text) => {
          setDescription(text);
          setSend(text !== "");
        }}
        onClose={() => {
          setVisible(false);
          setImage("");
          setPicture("");
        }}
      />
    </Fragment>
  );
};

export default Occurrence;
