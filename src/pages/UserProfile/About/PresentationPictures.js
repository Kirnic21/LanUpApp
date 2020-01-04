import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import dimensions from "~/assets/Dimensions/index";

export default PresentationPictures = ({ children }) => {
  return (
    <View style={styles.containerPresentationPhoto}>
      <Text
        style={{
          color: "#FFF",
          fontSize: dimensions(14),
          paddingBottom: "3%",
          fontFamily: "HelveticaNowMicro-Regular"
        }}
      >
        Fotos de apresentação
      </Text>
      <Text
        style={{
          color: "#ffffffad",
          paddingBottom: "5%",
          fontSize: dimensions(10),
          fontFamily: "HelveticaNowMicro-Light"
        }}
      >
        2 de perfil (sozinho) e 2 de corpo inteiro
      </Text>
      <View style={{ flexDirection: "row" }}>{children}</View>
    </View>
  );
};
