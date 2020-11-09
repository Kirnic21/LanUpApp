import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { calcHeight, adjust } from "~/assets/Dimensions";

const TitleEvent = ({ eventName, job, status, date }) => {
  const convertDate = (date) => {
    const data = date || '0000-00-00'
    var arrDate = data?.split("-");
    return `${arrDate[2]}/${arrDate[1]}/${arrDate[0]}`;
  };
  return (
    <View style={styles.containerTitle}>
      {status !== "without" ? (
        <View style={{ width: "88%" }}>
          <Text numberOfLines={1} style={styles.textTitle}>
            {eventName || ""}
          </Text>
          <Text style={styles.TextsubTitle}>{job}</Text>
          <Text style={[styles.textTitle, { fontSize:adjust(11) }]}>
            Data da operação: {convertDate(date?.split("T")[0])}
          </Text>
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
