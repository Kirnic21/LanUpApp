import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  StyleSheet
} from "react-native";
import ImageBack from "~/assets/images/Grupo_518.png";
import dimensions from "~/assets/Dimensions";

class NextEvent extends React.Component {
  render() {
    return (
      <ImageBackground source={ImageBack} style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <View style={styles.containerTitle}>
            <Text>Balada TheWeek</Text>
            <Text>Bartender</Text>
          </View>
          <View style={styles.containerCircle}>
            <Text
              style={{ color: "#Fff", borderWidth: 2, borderColor: "#FFF" }}
            >
              Próximo Evento
            </Text>
          </View>
          <View style={styles.containerButton}>
            <Text>aaaaa</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch"
  },
  containerTitle: {
    height: "40%",
    borderWidth: dimensions(2),
    borderColor: "#FFF"
  },
  containerCircle: {
    height: "37%",
    borderWidth: dimensions(30),
    borderColor: "#373361",
    marginHorizontal: "10%",
    borderRadius: dimensions(250),
    justifyContent: "center",
    alignItems: "center"
  },
  containerButton: {
    height: "30%",
    borderWidth: dimensions(2),
    borderColor: "#FFF"
  }
});

export default NextEvent;
