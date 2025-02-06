import React from "react";
import { Image, Platform, StyleSheet, View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "~/shared/components/ModalComponent";
import ButtonComponent from "~/shared/components/ButtonCompoent";
import debounceButton from "~/shared/helpers/debounce";
import { adjust, calcHeight, calcWidth } from "~/assets/Dimensions";
import QrCode from "~/assets/images/Qr-code.png";

const Button = debounceButton(ButtonComponent);

const confirmRead = async () => {
  await AsyncStorage.setItem("NEW_CHECKIN", "true");
};

const ModalNews = ({ visible, onClose, onPress = () => ({}) }) => {
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      heightModal={Platform.OS === "ios" ? calcHeight(95) : "auto"}
      swipe={[]}
    >
      <View style={styles.container}>
        <Image resizeMode="contain" source={QrCode} style={styles.img} />
        <View style={styles.content}>
          <Text style={styles.title}>Novidade ao iniciar Trabalho</Text>
          <Text style={styles.paragraph}>
            Nós da Lanup estamos em constante evolução e para facilitar o início
            da jornada de trabalho, basta exibir o seu QR code para o
            responsável.
          </Text>
          <Text style={styles.paragraph}>
            Você pode acessar o QR code em detalhes de cada demanda.
          </Text>
        </View>
        <Button
          buttonStyle={{ marginBottom: "5%" }}
          title="Legal, entendi!"
          isSelected
          selectedColor="#865FC0"
          onPress={() => {
            confirmRead();
            onPress();
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: "2%",
  },
  content: {
    alignItems: "center",
    marginTop: "3%",
    marginBottom: "10%",
  },
  img: {
    width: "25%",
    height: calcWidth(20),
  },
  title: {
    fontSize: adjust(15),
    fontFamily: "HelveticaNowMicro-Medium",
    color: "#d2d0ff",
  },
  paragraph: {
    color: "#FFFFFF",
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: adjust(11),
    textAlign: "center",
    marginTop: "5%",
  },
});

export default ModalNews;
