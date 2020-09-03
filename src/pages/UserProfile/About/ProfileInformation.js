import React from "react";
import { View, Text, Picker } from "react-native";
import { Field, reduxForm } from "redux-form";
import styles from "./styles";
import Toggle from "~/shared/components/SwitchComponent";
import PickerComponent from "~/shared/components/PickerComponent";
import { adjust } from "~/assets/Dimensions/index";

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
      <View style={{  flexDirection:'row', justifyContent:'space-between',}}>
        <Field
          style={{width:100}}
          title="Altura"
          component={InputMask}
          name={"height"}
          keyboardType="numeric"
          mask={"[0],[00]"}
          isfocused={"#A893F2"}
        />
        <Field
          style={{width:100}}
          title="Peso"
          component={InputMask}
          name={"weight"}
          keyboardType="numeric"
          mask={"[000]"}
          maxLength={3}
          isfocused={"#A893F2"}
        />

        <Field
          title={"Manequim"}
          style={{ width: 100 }}
          stylePicker={{color:'#FFFFFF'}}
          name={"clothingsSizes"}
          component={PickerComponent}
          iosHeader="Select one"
          mode="dropdown"
        >
          <Picker.Item label="" value={null} />
          <Picker.Item label="P" value="P" />
          <Picker.Item label="M" value="M" />
          <Picker.Item label="G" value="G" />
          <Picker.Item label="GG" value="GG" />
        </Field>
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
