import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import SadFace from "~/assets/images/sad_face.png";
import Logo from "~/assets/images/logoLanUp.png";
import { adjust, calcWidth } from "~/assets/Dimensions";

const FeedBackExclusion = ({ navigation }) => {
  useEffect(() => {
    const SECOND = 5;
    const MILLISECOND = SECOND * 1000;

    const timeout = setTimeout(() => {
      navigation.navigate("HomePage");
    }, MILLISECOND);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          flex: 0.2,
        }}
      >
        <Image
          source={Logo}
          resizeMode="contain"
          style={{ width: calcWidth(50), height: calcWidth(30) }}
        />
      </View>
      <View
        style={{
          flex: 0.5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={SadFace}
          resizeMode="contain"
          style={{ width: calcWidth(60), height: calcWidth(50) }}
        />
        <Text style={styles.title}>A LanUp fica triste de ver você partir</Text>
        <Text style={styles.subTitle}>
          Obrigado por usar a LanUp. Esperamos te ver em breve.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F",
    alignItems: "center",
    padding: calcWidth(5),
  },
  title: {
    color: "#FFFFFF",
    fontSize: adjust(16),
    textAlign: "center",
    fontFamily: "HelveticaNowMicro-Medium",
    marginBottom: calcWidth(5),
  },
  subTitle: {
    color: "#FFFFFF",
    fontSize: adjust(13),
    textAlign: "center",
    fontFamily: "HelveticaNowMicro-Regular",
    lineHeight: calcWidth(6),
  },
});

export default FeedBackExclusion;
