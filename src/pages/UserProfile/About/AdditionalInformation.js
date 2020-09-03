import React from "react";
import { View, Text, Picker } from "react-native";
import { Field, reduxForm } from "redux-form";
import styles from "./styles";
import DateInputField from "~/shared/components/DateInputField";
import PickerComponent from "~/shared/components/PickerComponent";

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
        name={"Email"}
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
        mask={"([00]) [00000]-[0000]"}
        isfocused={"#A893F2"}
      />
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Field
          style={{ width: 150 }}
          mode="date"
          name={"birthday"}
          title="Nascimento"
          component={DateInputField}
        />
        <Field
          title={"Gênero"}
          stylePicker={{ color: "#fff" }}
          style={{ width: 150 }}
          name={"gender"}
          component={PickerComponent}
          mode="dropdown"
        >
          <Picker.Item label="" value={0} />
          <Picker.Item label="Masculino" value={1} />
          <Picker.Item label="Feminino" value={2} />
          <Picker.Item label="Transgênero homem" value={3} />
          <Picker.Item label="Transgênero mulher" value={4} />
          <Picker.Item label="Queer +" value={5} />
        </Field>
      </View>
    </View>
  );
};
export default AdditionalInformation;
