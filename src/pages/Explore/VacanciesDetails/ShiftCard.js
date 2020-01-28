import React from "react";
import { View, Text, StyleSheet } from "react-native";
import dimensions from "~/assets/Dimensions";

const ShiftCard = ({
  title,
  titleStyle,
  subTitle,
  subTitleStyle,
  valueStyle,
  value,
  contentTextStyle,
  content
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1
        }}
      >
        <View style={{ width: "65%" }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.title, titleStyle, styles.colorTextAndFontSize]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.subTitle,
              subTitleStyle,
              styles.colorTextAndFontSize
            ]}
          >{`(${subTitle})`}</Text>
        </View>
        <View style={{ width: "30%" }}>
          <Text style={[styles.colorTextAndFontSize, styles.titleValue]}>
            Valor total:
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.colorTextAndFontSize, styles.value]}
          >
            R$
            <Text style={[valueStyle, { fontSize: dimensions(20) }]}>
              {value}
            </Text>
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {content.map((c, i) => (
          <View key={i}>
            <Text
              style={[
                styles.colorTextAndFontSize,
                styles.TextContent,
                contentTextStyle
              ]}
            >
              {c.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#23203F",
    padding: "5%",
    marginTop: "5%",
    borderRadius: dimensions(10)
  },
  title: {
    fontSize: dimensions(30),
    width: "100%"
  },
  subTitle: {
    fontSize: dimensions(11),
    top: "-10%"
  },
  colorTextAndFontSize: {
    color: "#FFF",
    fontFamily: "HelveticaNowDisplay-Regular"
  },
  titleValue: {
    fontSize: dimensions(11)
  },
  value: {
    color: "#46C5F3",
    fontSize: dimensions(12),
    width: "100%"
  },
  TextContent: {
    fontSize: dimensions(12)
  }
});

export default ShiftCard;
