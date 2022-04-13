import React from "react";
import { View, Text, Platform } from "react-native";
import { Field, reduxForm } from "redux-form";
import styles from "./styles";
import Toggle from "~/shared/components/SwitchComponent";

import DropDown from "~/shared/components/DropDown";
import { adjust, calcWidth } from "~/assets/Dimensions/index";

const ProfileInformation = ({}) => {
  reduxForm({ form: "ProfileInformation" });
  return (
    <View style={styles.informationProfile}>
      <Text style={styles.TitleInformation}>Informações do Profissional</Text>
      <Field
        style={{ width: "100%" }}
        title="Nome Completo"
        component={InputField}
        name={"fullName"}
        isfocused={"#A893F2"}
      />
      <Field
        style={{ width: "100%" }}
        title="Apelido"
        component={InputField}
        name={"nickName"}
        isfocused={"#A893F2"}
      />
      <Field
        style={[
          styles.textArea,
          { fontSize: adjust(11), fontFamily: "SourceSansPro-Regular" },
        ]}
        title="Descrição"
        component={InputField}
        name="description"
        multiline={true}
        numberOfLines={10}
        isfocused={"#A893F2"}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "stretch",
          // flexWrap: "wrap",
          width: "100%",
        }}
      >
        <Field
          style={{ width: Platform.OS === "ios" ? calcWidth(25) : "30%" }}
          styleInput={{ paddingLeft: calcWidth(5) }}
          title="Altura"
          component={InputMask}
          name={"height"}
          keyboardType="numeric"
          mask="tall"
          isfocused={"#A893F2"}
        />
        <Field
          style={{ width: Platform.OS === "ios" ? calcWidth(25) : "30%" }}
          styleInput={{ paddingLeft: calcWidth(5) }}
          title="Peso"
          component={InputMask}
          name={"weight"}
          maxLength={3}
          keyboardType="numeric"
          mask="withoutMask"
          isfocused={"#A893F2"}
        />
        <Field
          title="Manequim"
          component={DropDown}
          containerStyle={{
            width: Platform.OS === "ios" ? calcWidth(25) : "30%",
          }}
          name={"clothingsSizes"}
          heightModal={calcWidth(95)}
          items={[
            { label: "P", value: "P" },
            { label: "M", value: "M" },
            { label: "G", value: "G" },
            { label: "GG", value: "GG" },
          ]}
        />
      </View>
      <Text
        style={{
          marginTop: "5%",
          color: "#FFF",
          fontSize: adjust(11),
          fontFamily: "HelveticaNowMicro-Regular",
        }}
      >
        Tenho:
      </Text>
      <View style={{ top: "10%", width: "100%" }}>
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
          title="Quero trabalhar fixo"
          component={Toggle}
          name={"healthProblem"}
        />
        <Field title="Material de Trabalho" component={Toggle} name={"smoke"} />
      </View>
    </View>
  );
};

export default ProfileInformation;
