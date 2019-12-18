import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import InputField from "~/shared/components/InputField";
import Input from "~/shared/components/InputLabel";

import { Field, reduxForm } from "redux-form";

import Modal from "./modalFilter";
import styles from "./styles";
import { useState } from "react";

const BankInformation = ({ children }) => {
  reduxForm({ form: "BankInformation" });

  return (
    <View>
      <View style={styles.containerInformationBank}>
        <Text style={{ color: "#FFF", fontSize: 16, paddingBottom: "7%" }}>
          Informações Bancárias
        </Text>
        <View style={{ alignContent: "stretch" }}>
          {children}
          <View style={{ position: "absolute", width: "100%", left: "53%" }}>
            <Field
              style={{ width: "47%" }}
              title="Agência"
              component={InputField}
              name={"bankBranch"}
              keyboardType="numeric"
            />
          </View>
        </View>
        <Field
          style={{ width: "100%" }}
          title="Conta Corrente"
          component={InputField}
          name={"bankAccount"}
          keyboardType="numeric"
        />
        <Field
          style={{ width: "100%" }}
          title="CPF/CNPJ"
          component={InputMask}
          name={"cpfCnpj"}
          keyboardType="numeric"
          mask={"[000].[000].[000]-[00]" || "[00].[000].[000]/[0000]-[00]"}
        />
        <Field
          style={{ width: "100%" }}
          title="Nome do Titular"
          component={InputField}
          name={"owner"}
        />
      </View>
    </View>
  );
};

export default BankInformation;
