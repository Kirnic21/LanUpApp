import React from "react";
import { View, Text, Picker } from "react-native";
import { Field, reduxForm } from "redux-form";
import styles from "./styles";
import DateInputField from "~/shared/components/DateInputField";
import PickerComponent from "~/shared/components/PickerComponent";

const AdditionalInformation = ({}) => {
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
        component={InputField}
        name={"phone"}
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
            style={{
              width: "90%",
              color: "#fff",
              top: "-35%",
              left: "12%"
            }}
            name={"gender"}
            component={PickerComponent}
            iosHeader="Select one"
            mode="dropdown"
          >
            <Picker.Item label="Masculino" value={0} />
            <Picker.Item label="Feminino" value={1} />
            <Picker.Item label="Transgênero homem" value={2} />
            <Picker.Item label="transgênero mulher" value={3} />
            <Picker.Item label="queer +" value={4} />
          </Field>
        </View>
      </View>
    </View>
  );
};
export default reduxForm({
  form: "AdditionalInformation"
})(AdditionalInformation);
