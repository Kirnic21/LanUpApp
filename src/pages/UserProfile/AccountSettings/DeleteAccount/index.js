import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import { calcWidth } from "~/assets/Dimensions";
import Card from "~/shared/components/Card";
import Checkbox from "~/shared/components/Checkbox";
import RoundButton from "~/shared/components/RoundButton";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import { checkPendingPayment, workdays } from "~/shared/services/freela.http";
import { styles } from "./styles";
import WarningModal from "./warningModal";

const DeleteAccount = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [check, setCheck] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    setStep(navigation.state.params?.step);
    return () => navigation.state.params;
  }, []);

  const checkPendencies = () => {
    const promise1 = checkPendingPayment();
    const promise2 = workdays();
    setLoading(true);
    Promise.all([promise1, promise2])
      .then(function (res) {
        const [pendingPayment, inOperation] = res;
        isInOperation(pendingPayment.value, inOperation.data.result.value);
      })
      .catch((error) => {
        error.response.data.errorMessage;
        AlertHelper.show("error", "Erro", error.response.data.errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isInOperation = (pendingPayment, inOperation) => {
    if (inOperation !== null && inOperation?.blocked) {
      AlertHelper.show(
        "error",
        "Aviso",
        "Finalize o trabalho antes de prosseguir com a exclusão"
      );
      return;
    }
    _checkPendingPayment(pendingPayment);
  };

  const _checkPendingPayment = ({ pending, agenciesAndHirers }) => {
    if (!pending) {
      navigation.navigate("ReasonExclusion");
      return;
    }
    setShowModal(true);
    setList(agenciesAndHirers);
  };

  const goReasonExclusion = () => {
    setShowModal(false);
    navigation.navigate("ReasonExclusion");
  };

  return (
    <View style={styles.container}>
      <SpinnerComponent loading={loading} />
      <ScrollView style={{ flex: 1 }}>
        {step === 1 ? (
          <Card title="Esta ação excluirá sua conta">
            <Text style={[styles.textBody]}>
              Você está prestes a iniciar o processo de exclusão da sua conta na
              LanUp. Todos os dados que temos sobre você serão removidos:
            </Text>

            <Text
              style={[
                styles.textBody,
                {
                  fontFamily: "HelveticaNowMicro-Light",
                  textAlign: "left",
                  marginVertical: calcWidth(10),
                },
              ]}
            >
              {"\u2B24 "}Nome, CPF, endereço, dados bancários, telefone, data de
              nascimento, fotos, e-mail e quaisquer outros dados que tenhamos
              solicitado em algum momento.
            </Text>
            <Text style={styles.warningText}>
              Porém manteremos um histórico das demandas em que participou. Caso
              haja algum pagamento pendente, por favor entre em contato com a
              empresa contratante para receber o valor pendente.
            </Text>
            <Text style={styles.warningText}>
              A LanUp não se responsabiliza por qualquer contratação gerada por
              terceiros através da nossa plataforma.
            </Text>
            <Text style={styles.warningText}>
              A solicitação de exclusão da sua conta entrará em vigor
              imediatamente e é irreversível. Tenha certeza da sua decisão antes
              de deletar sua conta.
            </Text>
            <Text style={styles.warningText}>
              Em caso de dúvida, entre em contato com nosso setor de suporte.
            </Text>
          </Card>
        ) : (
          <Card title="O que acontece a partir de agora?">
            <View style={{ width: "95%" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: calcWidth(5),
                }}
              >
                <Icon name="times-circle" size={calcWidth(6)} color="#F13567" />
                <Text style={[styles.textBody, { marginLeft: calcWidth(3) }]}>
                  Desloga de todos seus dispositivos.
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon name="times-circle" size={calcWidth(6)} color="#F13567" />
                <Text style={[styles.textBody, { marginLeft: calcWidth(3) }]}>
                  Todas as informações serão excluidas permanentemente.
                </Text>
              </View>
            </View>
          </Card>
        )}

        <View style={styles.wrapper}>
          {step === 1 && (
            <View
              style={{
                marginBottom: calcWidth(2),
                marginTop: calcWidth(5),
              }}
            >
              <Checkbox
                text={"Li e concordo com a declaração acima"}
                checked={check}
                onPress={() => setCheck((prev) => !prev)}
              >
                <Text style={[styles.textCheckbox]}>
                  Li e concordo com a declaração acima
                </Text>
              </Checkbox>
            </View>
          )}
          <RoundButton
            onPress={() => navigation.navigate("AccountSettings")}
            width="100%"
            style={styles.buttonCancel}
            name="Cancelar"
          />
          {step === 1 && (
            <RoundButton
              onPress={() => checkPendencies()}
              disabled={!check}
              width="100%"
              style={styles.buttonNext}
              name="Próximo"
            />
          )}
          {step === 2 && (
            <RoundButton
              onPress={() => navigation.navigate("FeedBackExclusion")}
              style={styles.buttonDelete}
              textStyle={{ color: "#F13567" }}
              width="100%"
              name="Deletar minha conta"
            />
          )}
        </View>
      </ScrollView>
      <WarningModal
        cancel={() => navigation.navigate("AccountSettings")}
        next={() => goReasonExclusion()}
        visible={showModal}
        list={list}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
};

export default DeleteAccount;
