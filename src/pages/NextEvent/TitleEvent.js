import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import dimensions, { calcHeight, calcWidth } from "~/assets/Dimensions";

const TitleEvent = ({ eventName, job, status }) => {
  return (
    <View style={styles.containerTitle}>
      {status !== "without" ? (
        <View style={{ width: "88%" }}>
          <Text numberOfLines={1} style={styles.textTitle}>
            {eventName || ""}
          </Text>
          <Text style={styles.TextsubTitle}>{job}</Text>
        </View>
      ) : (
        <View style={{}}>
          <Text
            numberOfLines={1}
            style={[
              styles.textTitle,
              { textAlign: "center", paddingBottom: calcHeight(3) }
            ]}
          >
            Sem evento
          </Text>
          <Text
            style={{
              color: "#FFF",
              fontFamily: "HelveticaNowMicro-Regular",
              fontSize: calcWidth(5),
              textAlign: "center",

              lineHeight: calcHeight(3)
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
