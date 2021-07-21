import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import ModalComponent from "~/shared/components/ModalComponent";
import { calcWidth, adjust } from "~/assets/Dimensions";
import InputLabel from "~/shared/components/InputLabel";
import IconAgencia from "~/assets/images/icon_agencia.png";
import Lottie from "lottie-react-native";
import loadingSpinner from "~/assets/loadingSpinner.json";

const ModalAgency = ({
  visible,
  onClose,
  onChangeText,
  code,
  onPress,
  loading,
}) => {
  return (
    <ModalComponent visible={visible} onClose={onClose} swipe={[]}>
      <View style={{ marginHorizontal: calcWidth(5) }}>
        <Text style={styles.title}>Insira seu código{"\n"}da agência</Text>
        <InputLabel
          isfocused="#46C5F3"
          onChangeText={onChangeText}
          placeholder={"@minhagencia"}
          placeholderTextColor={"#bab9c1"}
        />
        <FlatList
          data={code?.slice(0, 3) || []}
          ListEmptyComponent={
            <View style={{ mariginTop: calcWidth(5) }}>
              {loading ? (
                <View style={{ alignItems: "center" }}>
                  <Lottie
                    autoSize
                    style={{
                      height: calcWidth(20),
                      width: calcWidth(20),
                    }}
                    resizeMode="cover"
                    source={loadingSpinner}
                    loop
                    autoPlay
                  />
                </View>
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.nameAgency,
                      {
                        lineHeight: calcWidth(7),
                      },
                    ]}
                  >
                    Caso não tenha o código,{"\n"} solicite para sua Agência.
                  </Text>
                </View>
              )}
            </View>
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => onPress(item.code, item.name)}
              style={styles.container}
            >
              <Image
                source={IconAgencia}
                style={{ height: calcWidth(16), width: calcWidth(16) }}
              />
              <View style={{ left: calcWidth(2) }} adjustsFontSizeToFit={false}>
                <Text numberOfLines={1} style={styles.nameAgency}>
                  {item.name}
                </Text>
                <Text
                  adjustsFontSizeToFit={false}
                  style={[
                    styles.nameAgency,
                    { width: "100%", fontSize: adjust(8) },
                  ]}
                >
                  CNPJ: {item.cnpj}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ModalComponent>
  );
};

const styles = {
  container: {
    backgroundColor: "#FFFFFF33",
    width: "100%",
    height: calcWidth(20),
    padding: calcWidth(3),

    marginBottom: calcWidth(5),
    borderRadius: calcWidth(10),
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontFamily: "HelveticaNowMicro-Medium",
    fontSize: adjust(20),
    marginBottom: calcWidth(2),
  },
  nameAgency: {
    color: "#FFFFFF",
    fontFamily: "HelveticaNowMicro-ExtraLight",
    fontSize: adjust(13),
    width: "80%",
    textAlign: "center",
  },
};

export default ModalAgency;
