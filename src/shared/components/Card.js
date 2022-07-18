import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { adjust, calcWidth } from "~/assets/Dimensions";

const Card = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24203B",
    marginBottom: calcWidth(5),
    padding: calcWidth(5),
    borderRadius: calcWidth(3),
  },
  title: {
    color: "#FFFFFF",
    fontSize: adjust(12),
    fontFamily: "HelveticaNowMicro-Bold",
    marginBottom: calcWidth(5),
    lineHeight: calcWidth(5)
  },
});

export default Card;
