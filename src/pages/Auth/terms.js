import React from "react";
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import imgTerms from "../../assets/images/terms-and-conditions.png";
import { adjust, calcWidth } from "~/assets/Dimensions";

import Button from "~/shared/components/ButtonCompoent";
import Icon from "react-native-vector-icons/FontAwesome";

import env from "react-native-config";

const Terms = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.font]}>Termos de Serviços</Text>
      <Image
        source={imgTerms}
        style={{ width: calcWidth(25), height: calcWidth(25) }}
      />
      <Text style={[styles.font, styles.subTitle]}>
        Ao se registrar, você conﬁrma que leu, compreendeu e aceita os termos de
        uso e política de privacidade.
      </Text>
      <View style={{ width: "100%" }}>
        <TouchableOpacity
          style={styles.btnCard}
          onPress={() =>
            Linking.openURL(`${env.REACT_LANUP_URL}termos/termos-de-uso`)
          }
        >
          <Text style={[styles.textCard, styles.font]}>Termos de uso</Text>
          <Icon color={"#FFF"} name={"angle-right"} size={adjust(25)} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnCard}
          onPress={() =>
            Linking.openURL(
              `${env.REACT_LANUP_URL}termos/politicas-de-privacidade`
            )
          }
        >
          <Text style={[styles.textCard, styles.font]}>
            Política de privacidade
          </Text>
          <Icon color={"#FFF"} name={"angle-right"} size={adjust(25)} />
        </TouchableOpacity>
      </View>
      {/* <RoundButton style={[styles.btn]} name="Aceitar e continuar" /> */}
      <View style={styles.btn}>
        <Button
          isSelected={true}
          title={"Aceitar e continuar"}
          selectedColor={"#46C5F3"}
          onPress={() => navigation.navigate("RegisterStageOne")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: calcWidth(30),
    backgroundColor: "#18142F",
    paddingHorizontal: calcWidth(5),
  },
  title: {
    fontSize: adjust(16),
    marginBottom: calcWidth(8),
  },
  subTitle: {
    fontSize: adjust(12),
    marginVertical: calcWidth(8),
    textAlign: "center",
    fontFamily: "HelveticaNowMicro-Light",
  },
  font: {
    color: "#FFFFFF",
    fontFamily: "HelveticaNowMicro-Regular",
  },
  textCard: {
    fontSize: adjust(12),
    color: "#d2d0ff",
  },
  btnCard: {
    width: "100%",
    padding: calcWidth(4),
    borderRadius: 5,
    marginBottom: calcWidth(6),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#24203B",
  },

  btn: {
    marginTop: calcWidth(5),
  },
});

export default Terms;
