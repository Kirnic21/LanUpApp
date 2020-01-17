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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={[styles.title, titleStyle, styles.colorTextAndFontSize]}>
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
        <View>
          <Text style={[styles.colorTextAndFontSize, styles.titleValue]}>
            Valor total:
          </Text>
          <Text style={[styles.colorTextAndFontSize, styles.value]}>
            R$
            <Text style={[valueStyle, { fontSize: dimensions(20) }]}>
              {value}
            </Text>
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={[
            styles.colorTextAndFontSize,
            styles.TextContent,
            contentTextStyle
          ]}
        >
          {content}
        </Text>
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
    fontSize: dimensions(30)
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
    fontSize: dimensions(12)
  },
  TextContent: {
    fontSize: dimensions(12)
  }
});

export default ShiftCard;
