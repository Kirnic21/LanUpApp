import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./styles";

import InputField from "~/shared/components/InputField";
import ModalSearch from "~/shared/components/ModalSearch";
import DropDown from "~/shared/components/DropDown";
import { adjust, calcWidth } from "~/assets/Dimensions";
import Modal from "~/shared/components/ModalComponent";

import { Field, reduxForm } from "redux-form";
import Icon from "react-native-vector-icons/MaterialIcons";

import { getBank } from "~/shared/services/freela.http";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

import { debounce } from "lodash";

const BankInformation = () => {
  const [infoModal, setInfoModal] = useState(false);
  const [loading, setLoading] = useState(false);

  reduxForm({ form: "BankInformation" });

  const [code, setCode] = useState([]);
  const SearchFilterFunction = (text) => {
    setLoading(true);
    getBank(text)
      .then(({ data }) => data)
      .then(({ result }) => {
        const code = result.map(({ name, code: id }) => ({
          name,
          id,
        }));
        setCode(code);
      })
      .catch((error) => AlertHelper.show("error", "Erro", error))
      .finally(() => setLoading(false));
  };

  return (
    <View>
      <View style={styles.containerInformationBank}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.TitleInformation}>Informações Bancárias</Text>
          <TouchableOpacity onPress={() => setInfoModal((prev) => !prev)}>
            <Icon name="info" size={calcWidth(8.5)} color="#FFB72B" />
          </TouchableOpacity>
        </View>
        <Field
          style={{ width: "100%" }}
          title="Tipo da conta"
          component={DropDown}
          name={"bankAccountType"}
          // heightModal={Platform.OS === 'ios' ? calcHeight(75) : calcWidth(80)}
          items={[
            { label: "Conta Corrente", value: "Conta Corrente" },
            { label: "Conta Poupança", value: "Conta Poupança" },
          ]}
        />
        <View style={{ alignContent: "stretch", paddingBottom: "2.5%" }}>
          <Field
            component={ModalSearch}
            label="Banco:"
            handleOnSearch={debounce(SearchFilterFunction, 1000)}
            data={code}
            name={"bankCode"}
            onlyId={true}
            load={loading}
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
          mask={"cpfCnpj"}
          style={{ width: "100%" }}
          title="CPF/CNPJ do Titular:"
          component={InputMask}
          name={"cpfCnpj"}
          keyboardType="numeric"
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
      <Modal
        visible={infoModal}
        onClose={() => setInfoModal((prev) => !prev)}
        heightModal={"auto"}
      >
        <View style={{ padding: "5%", alignItems: "center" }}>
          <Text
            style={{
              fontSize: adjust(15),
              textAlign: "center",
              color: "#FFFFFF",
              letterSpacing: 0.5,
              lineHeight: adjust(17),
              fontFamily: "HelveticaNowMicro-Regular",
            }}
          >
            O aceite do termo é para que os dados bancários cadastrados seja
            exclusivamente para o recebimento dos pagamentos, conforme os
            serviços contratados, a descrição das vagas, valores, horários, e
            protocolos de segurança.
          </Text>
        </View>
      </Modal>
    </View>
  );
};

export default BankInformation;
