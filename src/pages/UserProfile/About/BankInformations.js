import React, { useState } from "react";
import { View, Text } from "react-native";
import InputField from "~/shared/components/InputField";
import { Field, reduxForm } from "redux-form";
import styles from "./styles";
import bank from "./bank";
import ModalSearch from "~/shared/components/ModalSearch";

import DropDown from "~/shared/components/DropDown";
import { calcWidth } from "~/assets/Dimensions";

const BankInformation = () => {
  reduxForm({ form: "BankInformation" });

  const [code, setCode] = useState([]);
  const SearchFilterFunction = (text) => {
    const newData = bank.filter(function (item) {
      const itemData = item.description
        ? item.description.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    const code = newData.map((x) => ({
      name: x.description,
      id: x.id,
    }));
    setCode(code);
  };

  return (
    <View>
      <View style={styles.containerInformationBank}>
        <Text style={styles.TitleInformation}>Informações Bancárias</Text>
        <Field
          style={{ width: "100%" }}
          title="Tipo da conta"
          component={DropDown}
          name={"bankAccountType"}
          heightModal={calcWidth(75)}
          items={[
            { label: "Conta Corrente", value: "Conta Corrente" },
            { label: "Conta Poupança", value: "Conta Poupança" },
          ]}
        />
        <View style={{ alignContent: "stretch", paddingBottom: "2.5%" }}>
          <Field
            component={ModalSearch}
            label="Banco:"
            handleOnSearch={SearchFilterFunction}
            data={code}
            name={"bankCode"}
            onlyId={true}
            style={{ width: "47%" }}
            EmptyText="Nenhum banco encontrado"
          />

          <View style={{ position: "absolute", width: "100%", left: "53%" }}>
            <Field
              style={{ width: "47%" }}
              title="Agência:"
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
          title="Número da Conta:"
          component={InputField}
          name={"bankAccount"}
          isfocused={"#A893F2"}
          keyboardType="numeric"
          maxLength={20}
        />
        <Field
          style={{ width: "100%" }}
          title="CPF/CNPJ do Titular:"
          component={InputMask}
          name={"cpfCnpj"}
          keyboardType="numeric"
          maxLength={14}
          isfocused={"#A893F2"}
        />
        <Field
          style={{ width: "100%" }}
          title="Nome do Titular:"
          component={InputField}
          name={"owner"}
          isfocused={"#A893F2"}
        />
      </View>
    </View>
  );
};

export default BankInformation;
