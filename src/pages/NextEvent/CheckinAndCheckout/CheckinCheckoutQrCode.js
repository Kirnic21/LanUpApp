import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { AlertHelper } from "~/shared/helpers/AlertHelper";
import { operationsChecklists } from "~/shared/services/operations.http";
import { adjust, calcWidth } from "~/assets/Dimensions";

import TitleEvent from "../TitleEvent";
import ModalCheckList from "./ModalCheckList";
import Ticket from "~/shared/components/Ticket";
import ModalNews from "./ModalNews";
import RoundButton from "~/shared/components/RoundButton";

const CheckinCheckoutQrCode = ({
  statusOperation,
  operationId,
  freelaId,
  isHomeOffice,
  checkout,
  job,
  action,
  eventName,
  date,
  agencyName,
  hirerName,
  checkListCheckIn,
  vacancyId,
  vacancyCode,
  eventId,
  openQrCheckout,
  navigation,
  hirerId,
}) => {
  const [openModalCheckin, setOpenModalCheckin] = useState(false);
  const [openModalNews, setOpenModalNews] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const type = statusOperation > 4 ? "checkout" : "checkin";

  const qrcodeValue = JSON.stringify({
    vacancyId,
    freelaId,
    job,
    eventId,
    type,
  });

  useEffect(() => {
    showModalNews();
  }, []);

  useEffect(() => {
    if (statusOperation === 4) {
      setOpenModalCheckin(true);
    }

    if (statusOperation === 7) {
      navigation.replace("Rating", { hirerId, eventName });
    }
  }, [statusOperation]);

  const showModalNews = async () => {
    const getNewCheckin = await AsyncStorage.getItem("NEW_CHECKIN");
    const new_checkin = JSON?.parse(getNewCheckin);
    setOpenModalNews(!new_checkin);
  };

  const confirmChecklist = useCallback(() => {
    setLoading(true);
    operationsChecklists({ id: operationId, origin: 1, job })
      .then(() => {
        AlertHelper.show(
          "success",
          "Sucesso",
          "Tudo certo ao iniciar o trabalho. Boa sorte!"
        );
        action({ operationId, freelaId, isHomeOffice, checkout });
      })
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => setLoading(false));
  }, [loading, freelaId, isHomeOffice, checkout, job, action]);

  return (
    <View style={styles.container}>
      <TitleEvent
        eventName={eventName}
        job={job}
        date={date}
        agencyName={agencyName}
        hirerName={hirerName}
        status={statusOperation}
      />
      <View style={styles.content}>
        <Text style={styles.subTitle}>
          Para {type === "checkout" ? "finalizar" : "iniciar"} o trabalho, o
          gestor precisa fazer a leitura do seu QRCODE
        </Text>
        <Ticket value={qrcodeValue} codeQrCode={vacancyCode} />
      </View>

      <ModalCheckList
        visible={openModalCheckin}
        loading={loading}
        titleCheck="Entrada"
        job={job}
        checkList={checkListCheckIn}
        pressConfirm={() => confirmChecklist()}
        onPressCheck={() => setChecked((prev) => !prev)}
        checked={checked}
        eventName={eventName}
        onClose={() => setOpenModalCheckin(false)}
      />
      <ModalNews
        visible={openModalNews}
        onPress={() => setOpenModalNews(false)}
        onClose={() => setOpenModalNews(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F",
  },
  content: {
    width: "100%",
    paddingHorizontal: calcWidth(8),
    marginTop: "10%",
  },
  subTitle: {
    color: "white",
    fontFamily: "HelveticaNowDisplay-Regular",
    fontSize: adjust(13),
    lineHeight: calcWidth(5),
    marginBottom: "5%",
  },
  btn: {
    marginTop: "10%",
    borderColor: "white",
    borderWidth: 1,
    // paddingHorizontal: "5%",
  },
});

export default CheckinCheckoutQrCode;
