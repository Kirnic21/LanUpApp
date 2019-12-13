import React, { useEffect } from "react";
import { View, Text, Picker } from "react-native";
import { Field, reduxForm } from "redux-form";
import styles from "./styles";
import Toggle from "~/shared/components/SwitchComponent";
import PickerComponent from "~/shared/components/PickerComponent";

const ProfileInformation = ({}) => {
  reduxForm({ form: "ProfileInformation" });
  return (
    <View style={styles.informationProfile}>
      <Text style={{ color: "#FFF", fontSize: 16, paddingBottom: "7%" }}>
        Informações do Perfil
      </Text>
      <Field
        style={{ width: "100%" }}
        title="Nome Completo"
        component={InputField}
        name={"fullName"}
      />
      <Field
        style={{ width: "100%" }}
        title="Apelido"
        component={InputField}
        name={"nickName"}
      />
      <Field
        style={styles.textArea}
        title="Descrição"
        component={InputField}
        name="description"
        multiline={true}
        numberOfLines={10}
      />
      <View style={{ alignContent: "stretch", width: "100%" }}>
        <Field
          style={{ width: "32%" }}
          title="Altura"
          component={InputMask}
          name={"height"}
          keyboardType="numeric"
          mask={"[0],[00]"}
        />
        <View style={{ position: "absolute", left: "34%", width: "32%" }}>
          <Field
            style={{ width: "100%" }}
            title="Peso"
            component={InputMask}
            name={"weight"}
            keyboardType="numeric"
            mask={"[00],[0]"}
          />
        </View>
        <View style={styles.containerManequim}>
          <Field
            title={"Manequim"}
            style={{
              width: "90%",
              color: "#fff",
              top: "-35%",
              left: "12%"
            }}
            name={"clothingsSizes"}
            component={PickerComponent}
            iosHeader="Select one"
            mode="dropdown"
          >
            <Picker.Item label="Selecione..." value={null} />
            <Picker.Item label="P" value="P" />
            <Picker.Item label="M" value="M" />
            <Picker.Item label="G" value="G" />
            <Picker.Item label="GG" value="GG" />
          </Field>
        </View>
      </View>
      <Text style={{ marginTop: "5%", color: "#FFF", fontSize: 15 }}>
        Tenho:
      </Text>
      <Field
        title="Vestimenta profissional"
        component={Toggle}
        name={"professionalClothing"}
      />
      <Field
        title="Transporte próprio"
        component={Toggle}
        name={"ownTransport"}
      />
      <Field
        title="Problema de saúde"
        component={Toggle}
        name={"healthProblem"}
      />
      <Field title="Costume de fumar" component={Toggle} name={"smoke"} />
    </View>
  );
};

export default ProfileInformation;
