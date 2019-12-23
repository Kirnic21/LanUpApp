import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import InputField from "~/shared/components/InputField";
import Input from "~/shared/components/InputLabel";

import { Field, reduxForm } from "redux-form";

import Modal from "./modalFilter";
import styles from "./styles";
import { useState } from "react";
import normalize from "~/assets/FontSize/index";

const BankInformation = ({ children }) => {
  reduxForm({ form: "BankInformation" });

  return (
    <View>
      <View style={styles.containerInformationBank}>
        <Text
          style={{
            color: "#FFF",
            fontSize: normalize(14.5),
            paddingBottom: "7%"
          }}
        >
          Informações Bancárias
        </Text>
        <View
          style={{
            alignContent: "stretch",
            // borderColor: "#FFF",
            // borderWidth: 2,
            paddingBottom: "2.5%"
          }}
        >
          {children}
          <View
            style={{
              position: "absolute",
              width: "100%",
              left: "53%"
            }}
          >
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
          // mask={("[000].[000].[000]-[00]", "[00].[000].[000]/[0000]-[00]")}
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
