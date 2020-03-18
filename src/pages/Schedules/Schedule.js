import React from "react";
import { StyleSheet, SafeAreaView, StatusBar, View, Text } from "react-native";
import VacancyCard from "~/shared/components/Vacancy/VacancyCard";
import { getSchedules } from "~/shared/services/vacancy.http";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import dimensions from "~/assets/Dimensions/index";
import FilterToExplore from "../Explore/FilterToExplore";

export default class Schedule extends React.Component {
  state = {
    spinner: false
  };

  componentDidMount() {
    this.scheduleList();
  }

  scheduleList = () => {
    this.setState({ spinner: true });
    getSchedules(2)
      .then(({ data }) => {
        const getVacancy = data.result.value;
        this.setState({ listVacancy: getVacancy });
      })
      .catch(error => {
        error.response.data;
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  };

  render() {
    const { spinner, listVacancy } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#18142F" />
        <SpinnerComponent loading={spinner} />
        {/* <View>
          <FilterToExplore filterJob={[{ id: "1", title: "Pagos" }]} />
        </View> */}
        {listVacancy ? (
          <VacancyCard
            listVacancy={listVacancy}
            onPress={job =>
              this.props.navigation.navigate("VacanciesDetails", {
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
