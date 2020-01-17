import React, { Component } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import FilterToExplore from "~/pages/Explore/FilterToExplore";
import VacancyCard from "~/pages/Explore/VacancyCard";

export default class ToExplore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: [{ id: 1, title: "a" }]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
            <FilterToExplore
              onSelectedColor="#FFB72B"
              onTextSelectedColor="#18142F"
              // filterJob={this.state.filter}
              // onPress={e => alert(e)}
            />
          </View>
          <View>
            <VacancyCard
              onPress={() => this.props.navigation.navigate("VacanciesDetails")}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "#18142F",
    flexDirection: "column"
  }
});
