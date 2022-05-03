import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { adjust, calcWidth } from '~/assets/Dimensions';

import TicketQrcode from "~/assets/images/ticket-qrcode.png";

const Ticket = ({value, codeQrCode}) => {
  return (
    <ImageBackground
      resizeMode="contain"
      source={TicketQrcode}
      style={styles.ticket}
    >
      <View style={{ paddingHorizontal: "5%", width: "50%" }}>
        <QRCode size={130} value={value} />
      </View>
      <View
        style={{
          width: "50%",
          paddingHorizontal: "5%",
        }}
      >
        <Text style={styles.titleQrcode}>Número do QR Code:</Text>
        <Text
          style={[
            styles.titleQrcode,
            { color: "#000000", fontSize: adjust(12) },
          ]}
        >
          {codeQrCode}
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  ticket: {
    width: "100%",
    height: calcWidth(50),
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  titleQrcode: {
    color: "#865fc0",
    fontFamily: "HelveticaNowDisplay-Regular",
    fontSize: adjust(10),
  },
});

export default Ticket;
