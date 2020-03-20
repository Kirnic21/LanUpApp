import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import dimensions, { calcWidth } from "~/assets/Dimensions";
import audienceBand from "~/assets/images/audience-band.png";
import backWhite from "~/assets/images/black-and-white.png";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/FontAwesome";
import { format, formatDistanceStrict } from "date-fns";
import eoLocale from "date-fns/locale/pt-BR";

const VacancyCard = ({
  title,
  date,
  content,
  address,
  amount,
  onPress,
  eventCreationDate,
  picture
}) => {
  const formatDate = options => {
    return format(new Date(date || new Date()), options, {
      locale: eoLocale
    }).toLocaleUpperCase();
  };
  const creationDate = formatDistanceStrict(
    new Date(eventCreationDate || new Date()),
    new Date(),
    {
      addSuffix: true,
      locale: eoLocale
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
        <View style={{ height: "50%" }}>
          <View style={{ flexDirection: "row" }}>
            <FastImage
              source={backWhite}
              style={{
                width: calcWidth(5),
                height: calcWidth(5),
                marginRight: calcWidth(1)
              }}
            />
            <Text
              numberOfLines={1}
              style={[styles.f_11, styles.colorWhite, styles.fontHND_regular]}
            >
              {title} - <Text>{creationDate}</Text>
            </Text>
          </View>
          <Text
            numberOfLines={1}
            style={[
              styles.colorWhite,
              styles.fontHND_regular,
              styles.f_24,
              { height: calcWidth(10) }
            ]}
          >
            {title || "Titulo"}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.date}>
            <Text
              style={[
                styles.fontHNM_bold,
                styles.f_12,
                { textAlign: "center", color: "#18142F" }
              ]}
            >
              {formatDate("EEE")}
              {"\n"}
              <Text style={styles.f_24}>{formatDate("dd")}</Text>
              {"\n"}
              {formatDate("MMM")}
            </Text>
          </View>
          <View style={{ marginLeft: calcWidth(3) }}>
            <Text
              style={[styles.fontHNM_regular, styles.f_11, styles.colorWhite]}
            >
              {content || "conteúdo"}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                styles.fontHNM_regular,
                styles.f_11,
                styles.colorWhite,
                { width: calcWidth(32) }
              ]}
            >
              {address || "endereços"}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                styles.f_11,
                styles.fontHND_regular,
                styles.colorWhite,
                { width: calcWidth(40), height: calcWidth(8) }
              ]}
            >
              Valor total:{"       "}
              <Text style={[{ color: "#46C5F3" }, styles.f_12]}>
                R$<Text style={styles.f_24}>{amount || "0"}</Text>
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.containerArrow}>
        <Icon color={"#FFF"} name={"angle-right"} size={calcWidth(13)} />
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
    height: calcWidth(48),
    borderBottomLeftRadius: calcWidth(3),
    borderTopLeftRadius: calcWidth(3),
    paddingVertical: calcWidth(5),
    marginBottom: calcWidth(5)
  },
  containerImg: {
    marginLeft: calcWidth(-5)
  },
  img: {
    height: calcWidth(38),
    width: calcWidth(35),
    borderBottomRightRadius: calcWidth(4),
    borderTopRightRadius: calcWidth(4)
  },
  emptyImg: {
    backgroundColor: "#FFFFFF85",
    justifyContent: "center",
    alignItems: "center"
  },
  containerContent: {
    width: calcWidth(52),
    flexDirection: "column"
  },
  containerArrow: {
    width: calcWidth(7),
    justifyContent: "center"
  },
  colorWhite: {
    color: "#FFFFFF"
  },
  fontHNM_bold: {
    fontFamily: "HelveticaNowMicro-Bold"
  },
  fontHND_regular: {
    fontFamily: "HelveticaNowDisplay-Regular"
  },
  fontHNM_regular: {
    fontFamily: "HelveticaNowMicro-Regular"
  },
  f_24: {
    fontSize: dimensions(24)
  },
  f_12: {
    fontSize: dimensions(12)
  },
  f_11: {
    fontSize: dimensions(11)
  },
  date: {
    width: calcWidth(15),
    paddingVertical: calcWidth(1.5),
    backgroundColor: "#FFFFFF85",
    borderRadius: calcWidth(2)
  }
});

export default VacancyCard;
