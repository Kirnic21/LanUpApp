import React, { useState } from "react";
import { Text, View } from "react-native";

import styles from "./styles";
import ModalSearch from "~/shared/components/ModalSearch";

import { getAddress } from "~/shared/services/events.http";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

import { Field, reduxForm } from "redux-form";

const OccupationArea = ({}) => {
  const [places, setPlaces] = useState([]);

  reduxForm({
    form: "OccupationArea",
  });
  const onSearch = (value) => {
    getAddress(value)
      .then((response) => {
        setPlaces(mapCandidatesToPlaces(response.data.results));
      })
      .catch((message) => AlertHelper.show("error", "Erro", message));
  };

  const mapCandidatesToPlaces = (candidates) =>
    candidates.map((candidate) => ({
      name: candidate.formatted_address,
      latitude: candidate.geometry.location.lat,
      longitude: candidate.geometry.location.lng,
    }));

  return (
    <View style={styles.containerLocation}>
      <Text style={[styles.TitleInformation, { paddingBottom: "5%" }]}>
        Coloque seu melhor endereço
      </Text>
      <Field
        component={ModalSearch}
        handleOnSearch={onSearch}
        item="address"
        data={places}
        name={"address"}
        placeHolder="Coloque onde você mora"
        EmptyText="Nenhum endereço"
      />
    </View>
  );
};

export default OccupationArea;
