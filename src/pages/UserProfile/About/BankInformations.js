import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import InputField from "~/shared/components/InputField";
import Input from "~/shared/components/InputLabel";

import { Field, reduxForm } from "redux-form";

import Modal from "./modalFilter";
import styles from "./styles";
import { useState } from "react";

const BankInformation = ({}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <View style={styles.containerInformationBank}>
        <Text style={{ color: "#FFF", fontSize: 16, paddingBottom: "7%" }}>
          Informações Bancárias
        </Text>
        <View style={{ alignContent: "stretch" }}>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
          >
            <Input
              style={{ width: "47%" }}
              title="Banco"
              editable={false}
              value={this.state.code}
            />
          </TouchableOpacity>
          <View style={{ position: "absolute", width: "100%", left: "53%" }}>
            <Field
              style={{ width: "47%" }}
              title="Agência"
              component={InputField}
              name={"bankBranch"}
            />
          </View>
        </View>
        <Field
          style={{ width: "100%" }}
          title="Conta Corrente"
          component={InputField}
          name={"bankAccount"}
        />
        <Field
          style={{ width: "100%" }}
          title="CPF/CNPJ"
          component={InputField}
          name={"cpfCnpj"}
        />
        <Field
          style={{ width: "100%" }}
          title="Nome"
          component={InputField}
          name={"owner"}
        />
      </View>
      <View style={styles.containerBtn}>
        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: "#FFF", top: -10 }}>Salvar</Text>
        </TouchableOpacity>
      </View>
      <Modal
        onPress={item => {
          this.bankCode(item);

          setVisible(false);
        }}
        onTouchOutside={() => {
          setVisible(false);
        }}
        visible={visible}
      />
    </View>
  );
};

export default reduxForm({
  form: "BankInformation"
})(BankInformation);
