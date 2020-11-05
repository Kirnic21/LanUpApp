import React, { useState } from "react";
import { Text, View } from "react-native";
import axios from "axios";
import styles from "./styles";
import { Field, reduxForm } from "redux-form";

import ModalSearch from "~/shared/components/ModalSearch";

const OccupationArea = ({}) => {
  const [places, setPlaces] = useState([]);

  reduxForm({
    form: "OccupationArea",
  });
  const onSearch = (value) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${value}&key=AIzaSyB1QnZpLJnE-j8mL3f5uHDlCmV7jH_GRp0`
      )
      .then((response) =>
        setPlaces(mapCandidatesToPlaces(response.data.results))
      )
      .catch((message) => console.log(message));
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
