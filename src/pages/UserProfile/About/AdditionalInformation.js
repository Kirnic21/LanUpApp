import React, { useEffect } from "react";
import { View, Text, Picker } from "react-native";
import { Field, reduxForm } from "redux-form";
import styles from "./styles";
import DateInputField from "~/shared/components/DateInputField";
import PickerComponent from "~/shared/components/PickerComponent";
import { initialize } from "redux-form";

const AdditionalInformation = ({}) => {
  reduxForm({
    form: "AdditionalInformation"
  });
  return (
    <View style={styles.containerInformationPrivade}>
      <Text style={{ color: "#FFF", fontSize: 16, paddingBottom: "7%" }}>
        Informações Adicionais
      </Text>
      <Field
        style={{ width: "100%" }}
        title="E-mail"
        component={InputField}
        name={"email"}
        editable={false}
      />
      <Field
        style={{ width: "100%" }}
        title="Telefone"
        keyboardType="numeric"
        component={InputMask}
        name={"phone"}
        mask={"([000]) [0] [0000]-[0000]"}
      />
      <View style={{ alignContent: "stretch" }}>
        <Field
          style={{ width: "46%" }}
          name={"birthday"}
          title="Nascimento"
          component={DateInputField}
        />
        <View style={styles.containerGender}>
          <Field
            title={"Gênero"}
            style={{ width: "90%", color: "#fff", top: "-35%", left: "12%" }}
            name={"gender"}
            component={PickerComponent}
            mode="dropdown"
          >
            <Picker.Item label="Selecione..." value={0} />
            <Picker.Item label="Masculino" value={1} />
            <Picker.Item label="Feminino" value={2} />
            <Picker.Item label="Transgênero homem" value={3} />
            <Picker.Item label="transgênero mulher" value={4} />
            <Picker.Item label="queer +" value={5} />
          </Field>
        </View>
      </View>
    </View>
  );
};
export default AdditionalInformation;
