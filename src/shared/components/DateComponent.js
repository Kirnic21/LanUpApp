import React from "react";
import { View, Text } from "react-native";
import { format, parseISO } from "date-fns";
import eoLocale from "date-fns/locale/pt-BR";
import { calcWidth, adjust } from "~/assets/Dimensions";

const DateComponent = ({ date }) => {
  const formatDate = (options) => {
    if (date !== undefined && date !== null) {
      const getDate = parseISO(date.substr(0, 10) || new Date());
      return format(getDate, options, {
        locale: eoLocale,
      }).toLocaleUpperCase();
    }
  };
  return (
    <View style={styles.containerDate}>
      <Text
        allowFontScaling={false}
        style={[
          styles.fontHNM_bold,
          styles.f_12,
          { textAlign: "center", color: "#18142F" },
        ]}
      >
        {formatDate("EEEEEE")}
        {"\n"}
        <Text allowFontScaling={false} style={styles.f_24}>
          {formatDate("dd")}
        </Text>
        {"\n"}
        {formatDate("MMM")}
      </Text>
    </View>
  );
};

const styles = {
  containerDate: {
    width: calcWidth(15),
    paddingVertical: calcWidth(1.5),
    backgroundColor: "#FFFFFF85",
    borderRadius: calcWidth(2),
  },
  textDate: {
    color: "#18142F",
    fontFamily: "HelveticaNowMicro-Bold",
    textAlign: "center",
    fontSize: adjust(10),
  },
  fontHNM_bold: {
    fontFamily: "HelveticaNowMicro-Bold",
  },
  f_24: {
    fontSize: adjust(22),
  },
  f_12: {
    fontSize: adjust(9),
  },
};

export default DateComponent;
