import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, StatusBar, View, Text } from "react-native";
import VacancyCard from "~/shared/components/Vacancy/VacancyCard";
import { getSchedules } from "~/shared/services/vacancy.http";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import dimensions from "~/assets/Dimensions/index";

export default class Schedule extends React.Component {
  state = {
    listVacancy: [],
    spinner: true
  };

  componentDidMount() {
    this.scheduleList();
  }

  scheduleList = () => {
    getSchedules(2)
      .then(({ data }) => {
        const getVacancy = data.result.value;
        this.setState({ listVacancy: getVacancy, spinner: false });
      })
      .catch(error => {
        error.response.data;
      });
  };

  render() {
    const { spinner, listVacancy } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#18142F" />
        <SpinnerComponent loading={spinner} />
        {listVacancy.length ? (
          <VacancyCard
            listVacancy={listVacancy}
            onPress={job =>
              this.props.navigation.push("VacanciesDetails", {
                job,
                status: 3
              })
            }
          />
        ) : (
          <View style={styles.containerEmpty}>
            <Text style={styles.textEmpty}>Nenhuma vaga disponivel</Text>
          </View>
        )}
      </SafeAreaView>
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
  },
  containerEmpty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textEmpty: {
    color: "#FFF",
    fontSize: dimensions(20),
    fontFamily: "HelveticaNowDisplay-Regular"
  }
});
