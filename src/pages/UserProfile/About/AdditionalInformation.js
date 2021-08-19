import React from "react";
import { View, Text } from "react-native";
import { Field, reduxForm } from "redux-form";
import styles from "./styles";
import DateInputField from "~/shared/components/DateInputField";

import DropDown from "~/shared/components/DropDown";
import { calcWidth } from "~/assets/Dimensions";

const AdditionalInformation = ({}) => {
  reduxForm({
    form: "AdditionalInformation",
  });
  return (
    <View style={styles.containerInformationPrivade}>
      <Text style={styles.TitleInformation}>Informações Adicionais</Text>
      <Field
        title="E-mail"
        component={InputField}
        name={"email"}
        editable={false}
      />
      <Field
        style={{ width: "100%" }}
        title="Telefone"
        keyboardType="numeric"
        placeholder="(99) 99999-9999"
        placeholderTextColor="rgba(255,255,255,0.5)"
        component={InputMask}
        name={"phone"}
        isfocused={"#A893F2"}
        mask="phone"
      />
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Field
          style={{ width: "45%" }}
          mode="date"
          name={"birthday"}
          title="Nascimento"
          component={DateInputField}
        />

        <Field
          title="Gênero"
          component={DropDown}
          containerStyle={{ width: "45%" }}
          name={"gender"}
          // heightModal={calcWidth(100)}
          items={[
            { label: "Masculino", value: 1 },
            { label: "Feminino", value: 2 },
            { label: "Transgênero homem", value: 3 },
            { label: "Transgênero mulher", value: 4 },
            { label: "Queer +", value: 5 },
          ]}
        />
      </View>
    </View>
  );
};
export default AdditionalInformation;
