import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import { adjust, calcWidth } from "~/assets/Dimensions";

import TitleEvent from "../TitleEvent";
import Ticket from "~/shared/components/Ticket";

const CheckinCheckoutQrCode = ({
  statusOperation,
  freelaId,
  job,
  eventName,
  date,
  agencyName,
  hirerName,
  vacancyId,
  vacancyCode,
  eventId,
  navigation,
  hirerId,
}) => {
  const type = statusOperation > 4 ? "checkout" : "checkin";

  const qrcodeValue = JSON.stringify({
    vacancyId,
    freelaId,
    job,
    eventId,
    type,
  });

  useEffect(() => {
    console.log(statusOperation)
    if (statusOperation === 7) {
      navigation.replace("Rating", { hirerId, eventName });
    }
  }, [statusOperation]);

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
