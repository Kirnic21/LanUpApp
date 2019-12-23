import React from "react";
import { View, Text, Picker } from "react-native";
import { Field, reduxForm } from "redux-form";
import styles from "./styles";
import DateInputField from "~/shared/components/DateInputField";
import PickerComponent from "~/shared/components/PickerComponent";
import normalize from "~/assets/FontSize/index";

const AdditionalInformation = ({}) => {
  reduxForm({
    form: "AdditionalInformation"
  });
  return (
    <View style={styles.containerInformationPrivade}>
      <Text
        style={{
          color: "#FFF",
          fontSize: normalize(14.5),
          paddingBottom: "7%"
        }}
      >
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
        mask={"([000]) [00000]-[0000]"}
        isfocused={"#A893F2"}
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
