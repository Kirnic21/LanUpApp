import React, { Component } from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import CardImageVacancies from "./CardImageVacancies";
import { SafeAreaView } from "react-native";
import CardDeitailsVacancies from "./CardDeitailsVacancies";
import dimensions from "~/assets/Dimensions";
import { ScrollView } from "react-native-gesture-handler";
import ShiftCard from "./ShiftCard";

class VacanciesDetails extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent />
        <ScrollView style={{ flex: 1 }}>
          <View>
            <CardImageVacancies />
          </View>
          <View style={{ marginHorizontal: "5%" }}>
            <ShiftCard
              title="Bartender"
              subTitle="4 vagas"
              value="140,00"
              content={<Text>Turno 22:00 às 01:00</Text>}
            />
            <CardDeitailsVacancies
              title="Detalhes do Evento"
              TitleStyle={{ color: "#FFF", fontSize: dimensions(20) }}
              contentTextStyle={{ color: "#FFF" }}
              isModalOn={false}
            />
            <CardDeitailsVacancies
              title="Minhas Responsabilidades"
              TitleStyle={{ color: "#FFF", fontSize: dimensions(20) }}
              contentTextStyle={{ color: "#FFF" }}
              isModalOn={false}
            />
            <CardDeitailsVacancies
              title="Check list"
              TitleStyle={{ color: "#FFF", fontSize: dimensions(20) }}
              contentTextStyle={{ color: "#FFF" }}
              isModalOn={false}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: "100%",
    justifyContent: "space-between",
    backgroundColor: "#18142F",
    flexDirection: "column"
  }
});

export default VacanciesDetails;
