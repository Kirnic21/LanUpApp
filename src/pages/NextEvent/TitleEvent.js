import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { calcHeight, adjust } from "~/assets/Dimensions";

const TitleEvent = ({
  eventName,
  job,
  status,
  date,
  agencyName,
  hirerName,
}) => {
  const convertDate = (date) => {
    if (!date) return "00/00/0000"; // Default value when date is undefined or null

    const arrDate = date.split("T")[0]?.split("-");
    return arrDate ? `${arrDate[2]}/${arrDate[1]}/${arrDate[0]}` : "00/00/0000";
  };

  return (
    <View style={styles.containerTitle}>
      {status && status !== 1 ? (
        <View style={{ width: "100%" }}>
          <Text
            style={[
              styles.textTitle,
              { fontSize: adjust(10), textAlign: "center", color: "#FFFFFF" },
            ]}
          >
            Data da operação: {convertDate(date ? date.split("T")[0] : "")}
          </Text>
          <Text numberOfLines={1} style={styles.textTitle}>
            {eventName || ""}
          </Text>
          {agencyName && (
            <Text numberOfLines={1} style={styles.TextHirer}>
              Empresa: {agencyName}
            </Text>
          )}
          {!agencyName && hirerName && (
            <Text
              numberOfLines={1}
              style={[styles.TextHirer, { paddingBottom: "5%" }]}
            >
              Contratante: {hirerName}
            </Text>
          )}
          <Text style={styles.TextsubTitle}>{job}</Text>
        </View>
      ) : (
        <View style={{}}>
          <Text
            numberOfLines={1}
            style={[
              styles.textTitle,
              { textAlign: "center", paddingBottom: calcHeight(3) },
            ]}
          >
            Sem evento
          </Text>
          <Text
            style={{
              color: "#FFF",
              fontFamily: "HelveticaNowMicro-Regular",
              fontSize: adjust(15),
              textAlign: "center",

              lineHeight: calcHeight(3),
            }}
          >
            Você não possui nenhum{"\n"}próximo evento
          </Text>
        </View>
      )}
    </View>
  );
};

export default TitleEvent;
