import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { adjust, calcWidth } from "~/assets/Dimensions";
import loadingSpinner from "~/assets/scan.json";

import QRCodeScanner from "react-native-qrcode-scanner";
import { Overlay } from "react-native-elements";
import Lottie from "lottie-react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RNCamera } from "react-native-camera";

const QRCode = ({ onPress, visible, close }) => {
  const [flash, setFlash] = useState("flash-off");

  return (
    <Overlay overlayStyle={styles.container} isVisible={visible}>
      <QRCodeScanner
        onRead={onPress}
        showMarker={true}
        vibrate={true}
        flashMode={
          flash === "flash-on"
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        checkAndroid6Permissions={true}
        topContent={
          <View style={styles.containerTop}>
            <TouchableOpacity
              onPress={() =>
                setFlash(flash === "flash-on" ? "flash-off" : "flash-on")
              }
            >
              <Icon name={flash} size={calcWidth(10)} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={close}>
              <Icon name="close" size={calcWidth(11)} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        }
        bottomViewStyle={{ flex: 1 }}
        topViewStyle={{ flex: 0.7, justifyContent: "flex-start" }}
        cameraStyle={{ flex: 1.9 }}
        bottomContent={
          <View style={styles.bottomContent}>
            <Text style={styles.subtitle}>
              Para iniciar o checkin, escaneia o QR code.
            </Text>
          </View>
        }
        customMarker={
          <View style={styles.rectangleContainer}>
            <Lottie
              autoSize
              style={{
                height: calcWidth(90),
                width: calcWidth(90),
              }}
              resizeMode="cover"
              source={loadingSpinner}
              loop
              autoPlay
              speed={0.6}
            />
          </View>
        }
      />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#23203F",
  },
  containerTop: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: calcWidth(5),
    width: "90%",
  },
  title: {
    color: "#FFFFFF",
    fontSize: adjust(20),
    fontFamily: "HelveticaNowMicro-Medium",
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: adjust(18),
    fontFamily: "HelveticaNowMicro-Medium",
    textAlign: "center",
    lineHeight: adjust(30),
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  rectangle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  bottomContent: {
    padding: adjust(10),
  },
});

export default QRCode;
