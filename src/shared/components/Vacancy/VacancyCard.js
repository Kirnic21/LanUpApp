import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions";

import backWhite from "~/assets/images/black-and-white.png";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/FontAwesome";
import { formatDistanceStrict } from "date-fns";
import eoLocale from "date-fns/locale/pt-BR";
import DateComponent from "../DateComponent";

const VacancyCard = ({
  title,
  job,
  date,
  content,
  address,
  amount,
  onPress,
  eventCreationDate,
  picture,
  agencyName,
  hirerName,
}) => {
  const creationDate = formatDistanceStrict(
    new Date(eventCreationDate || new Date()),
    new Date(),
    {
      addSuffix: true,
      locale: eoLocale,
    }
  );
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.containerImg}>
        {picture ? (
          <FastImage source={{ uri: picture }} style={styles.img} />
        ) : (
          <View style={[styles.img, styles.emptyImg]}>
            <Icon name="image" size={dimensions(35)} color="#23203F" />
          </View>
        )}
      </View>
      <View style={styles.containerContent}>
        <View style={{ height: "56%" }}>
          <Text
            numberOfLines={1}
            allowFontScaling={false}
            style={[styles.f_10, styles.colorWhite, styles.fontHND_regular]}
          >
            {job} - <Text>{creationDate}</Text>
          </Text>
          <Text
            numberOfLines={1}
            allowFontScaling={false}
            style={[
              styles.colorPeriwinkle,
              styles.fontHND_regular,
              styles.f_17,
              { lineHeight: calcWidth(7) },
            ]}
          >
            {title || "Titulo"}
          </Text>
          <Text
            numberOfLines={1}
            allowFontScaling={false}
            style={[styles.colorWhite, styles.fontHNM_regular, styles.f_10]}
          >
            {agencyName || "--"}
          </Text>
          <Text
            numberOfLines={1}
            allowFontScaling={false}
            style={[styles.colorWhite, styles.fontHNM_regular, styles.f_10]}
          >
            {hirerName || "--"}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <DateComponent date={date} />
          <View style={{ marginLeft: calcWidth(3) }}>
            <Text
              allowFontScaling={false}
              style={[styles.fontHNM_regular, styles.f_10, styles.colorWhite]}
            >
              {content || "conteúdo"}
            </Text>
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              style={[
                styles.fontHNM_regular,
                styles.f_10,
                styles.colorWhite,
                { width: calcWidth(45) },
              ]}
            >
              {address || "endereços"}
            </Text>
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              style={[
                styles.f_10,
                styles.fontHND_regular,
                styles.colorWhite,
                {
                  width: calcWidth(40),
                  height: calcWidth(8),
                  marginTop: calcWidth(1),
                },
              ]}
            >
              Valor total:{"       "}
              <Text
                style={[styles.colorPeriwinkle, styles.f_10]}
                allowFontScaling={false}
              >
                R$<Text style={styles.f_17}>{amount || "0"}</Text>
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.containerArrow}>
        <Icon color={"#FFF"} name={"angle-right"} size={calcWidth(10)} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#23203F",
    justifyContent: "space-between",
    marginLeft: calcWidth(5),
    height: calcWidth(52),
    borderBottomLeftRadius: calcWidth(3),
    borderTopLeftRadius: calcWidth(3),
    paddingVertical: calcWidth(5),
    marginBottom: calcWidth(5),
    position: "relative",
  },
  containerImg: {
    marginLeft: calcWidth(-5),
  },
  img: {
    height: calcWidth(42),
    width: calcWidth(30),
    borderBottomRightRadius: calcWidth(4),
    borderTopRightRadius: calcWidth(4),
  },
  emptyImg: {
    backgroundColor: "#FFFFFF85",
    justifyContent: "center",
    alignItems: "center",
  },
  containerContent: {
    width: calcWidth(67),
    flexDirection: "column",
  },
  containerArrow: {
    right: 15,
    top: "50%",
    justifyContent: "center",
    position: "absolute",
  },
  colorWhite: {
    color: "#FFFFFF",
  },
  colorPeriwinkle: { color: "#d2d0ff" },
  fontHNM_bold: {
    fontFamily: "HelveticaNowMicro-Bold",
  },
  fontHND_regular: {
    fontFamily: "HelveticaNowDisplay-Regular",
  },
  fontHNM_regular: {
    fontFamily: "HelveticaNowMicro-Regular",
  },
  f_17: {
    fontSize: adjust(17),
  },
  f_12: {
    fontSize: adjust(10),
  },
  f_10: {
    fontSize: adjust(10),
  },
  date: {
    width: calcWidth(15),
    paddingVertical: calcWidth(1.5),
    backgroundColor: "#FFFFFF85",
    borderRadius: calcWidth(2),
  },
});

export default VacancyCard;
