import React from "react";
import { View, Text } from "react-native";
import InputField from "~/shared/components/InputField";
import { Field, reduxForm } from "redux-form";
import Modal from "./ModalFilterBank";
import styles from "./styles";
import dimensions from "~/assets/Dimensions/index";

const BankInformation = ({ onPress, bankCode }) => {
  reduxForm({ form: "BankInformation" });
  return (
    <View>
      <View style={styles.containerInformationBank}>
        <Text
          style={{
            color: "#FFF",
            fontSize: dimensions(14),
            paddingBottom: "7%",
            fontFamily: "HelveticaNowMicro-Regular"
          }}
        >
          Informações Bancárias
        </Text>
        <View style={{ alignContent: "stretch", paddingBottom: "2.5%" }}>
          <Text
            style={{
              fontSize: dimensions(12),
              color: "#FFF",
              top: "-1%",
              fontFamily: "HelveticaNowMicro-Regular"
            }}
          >
            Banco
          </Text>
          <Modal onPress={onPress} bankCode={bankCode} />

          <View style={{ position: "absolute", width: "100%", left: "53%" }}>
            <Field
              style={{ width: "47%" }}
              title="Agência"
              component={InputField}
              name={"bankBranch"}
              keyboardType="numeric"
              maxLength={4}
              isfocused={"#A893F2"}
            />
          </View>
        </View>
        <Field
          style={{ width: "100%" }}
          title="Conta Corrente"
          component={InputField}
          name={"bankAccount"}
          isfocused={"#A893F2"}
          keyboardType="numeric"
        />
        <Field
          style={{ width: "100%" }}
          title="CPF/CNPJ"
          component={InputMask}
          name={"cpfCnpj"}
          keyboardType="numeric"
          maxLength={14}
          isfocused={"#A893F2"}
        />
        <Field
          style={{ width: "100%" }}
          title="Nome do Titular"
          component={InputField}
          name={"owner"}
          isfocused={"#A893F2"}
        />
      </View>
    </View>
  );
};

export default BankInformation;
