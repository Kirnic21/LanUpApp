import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { adjust } from "~/assets/Dimensions/index";

export default PresentationPictures = ({ children, BoxItem, onPress }) => {
  return (
    <View style={styles.containerPresentationPhoto}>
      <Text style={[styles.TitleInformation, { paddingBottom: "3%" }]}>
        Fotos de apresentação
      </Text>
      <Text
        style={{
          color: "#ffffffad",
          paddingBottom: "5%",
          fontSize: adjust(8),
          fontFamily: "HelveticaNowMicro-Light",
        }}
      >
        2 de perfil (sozinho) e 2 de corpo inteiro
      </Text>
      <View style={{ flexDirection: "row" }}>
        {BoxItem.map(({ icon, id, photo }) => (
          <TouchableOpacity
            key={id}
            onPress={(e) => {
              onPress(id);
            }}
            style={styles.thumbnail}
          >
            <Image source={icon} style={styles.photo} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
