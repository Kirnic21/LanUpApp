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

const _pixType = {
  CPF: { label: "CPF", mask: "cpf" },
  CNPJ: { label: "CNPJ", mask: "cnpj" },
  TELEFONE: { label: "Telefone", mask: "phone" },
  EMAIL: { label: "Email", mask: "withoutMask" },
  CHAVE_ALEATORIA: { label: "Chave aleatória", mask: "withoutMask" },
};

const BankInformation = () => {
  const [infoModal, setInfoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pixType, setPixType] = useState(null);

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
          title={
            <Text>
              Nome do Titular<Text style={styles.FieldRequired}>*</Text>
            </Text>
          }
          component={InputField}
          name={"owner"}
          isfocused={"#A893F2"}
          placeholder="Nome do titular"
        />
        <Field
          mask={"cpfCnpj"}
          style={{ width: "100%" }}
          title={
            <Text>
              CPF/CNPJ do Titular<Text style={styles.FieldRequired}>*</Text>
            </Text>
          }
          component={InputMask}
          name={"cpfCnpj"}
          keyboardType="numeric"
          isfocused={"#A893F2"}
        />
        <Field
          style={{ width: "100%" }}
          title={
            <Text>
              Tipo da conta<Text style={styles.FieldRequired}>*</Text>
            </Text>
          }
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
            label={
              <Text>
                Banco<Text style={styles.FieldRequired}>*</Text>
              </Text>
            }
            handleOnSearch={debounce(SearchFilterFunction, 1000)}
            data={code}
            name={"bankCode"}
            onlyId={true}
            load={loading}
            style={{ width: "47%" }}
            EmptyText="Nenhum banco encontrado"
            placeHolder="000"
          />

          <View style={{ position: "absolute", width: "100%", left: "53%" }}>
            <Field
              style={{ width: "47%" }}
              title={
                <Text>
                  Agência<Text style={styles.FieldRequired}>*</Text>
                </Text>
              }
              component={InputField}
              name={"bankBranch"}
              placeholder="0000"
              keyboardType="numeric"
              maxLength={5}
              isfocused={"#A893F2"}
            />
          </View>
        </View>
        <Field
          style={{ width: "100%" }}
          title={
            <Text>
              Número da Conta<Text style={styles.FieldRequired}>*</Text>
            </Text>
          }
          component={InputField}
          name={"bankAccount"}
          isfocused={"#A893F2"}
          keyboardType="numeric"
          maxLength={20}
          placeholder="000000"
        />
      </View>
      <View style={[styles.containerInformationBank, { marginBottom: "10%" }]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.TitleInformation}>Informações PIX</Text>
        </View>
        <Field
          style={{ width: "100%" }}
          title={
            <Text>
              Tipo de chave PIX<Text style={styles.FieldRequired}>*</Text>
            </Text>
          }
          component={DropDown}
          getValue={(value) => setPixType(value)}
          name={"pixType"}
          items={[
            { label: "CPF", value: "CPF" },
            { label: "CNPJ", value: "CNPJ" },
            { label: "Telefone", value: "TELEFONE" },
            { label: "Email", value: "EMAIL" },
            { label: "Chave aleatória", value: "CHAVE_ALEATORIA" },
          ]}
        />
        <Field
          style={{ width: "100%" }}
          title={
            <Text>
              Chave PIX<Text style={styles.FieldRequired}>*</Text>
            </Text>
          }
          component={InputMask}
          name={"pixKey"}
          isfocused={"#A893F2"}
          keyboardType={
            pixType === "EMAIL" || pixType === "CHAVE_ALEATORIA"
              ? "default"
              : "numeric"
          }
          mask={`${_pixType[pixType || "withoutMask"]?.mask}`}
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
