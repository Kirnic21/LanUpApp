import React from "react";
import { View, Text, ImageBackground, StatusBar } from "react-native";
import ImageBack from "~/assets/images/Grupo_518.png";
import { SafeAreaView } from "react-navigation";

const CheckList = ({}) => {
  return (
    <ImageBackground source={ImageBack} style={{ flex: 1 }}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor="transparent" />
        <Text>aaaaa</Text>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CheckList;
