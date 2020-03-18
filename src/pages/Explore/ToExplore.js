import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StatusBar
} from "react-native";
import FilterToExplore from "~/pages/Explore/FilterToExplore";
import VacancyCard from "~/shared/components/Vacancy/VacancyCard";
import { vacancy } from "~/shared/services/events.http";
import { decodeToken, getJobs } from "~/shared/services/freela.http";
import AsyncStorage from "@react-native-community/async-storage";
import dimensions from "~/assets/Dimensions";
import SpinnerComponent from "~/shared/components/SpinnerComponent";

export default class ToExplore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: [{ id: 1, title: "a" }],
      GetJobs: [],
      loading: false,
      spinner: false,
      listVacancy: []
    };
  }

  componentDidMount() {
    this.getFilterJob();
  }

  getFilterJob = async () => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    this.setState({ spinner: true });
    getJobs(token.id)
      .then(({ data }) => {
        const GetJobs = data;
        GetJobs === null
          ? this.setState({ GetJobs: [] })
          : this.setState({ GetJobs });
        const name = GetJobs.filter(c => c.isSelected === true).map(
          c => c.name
        );
        const JobsSelected = name.map((item, id) => ({
          id: `${id}`,
          title: item
        }));
        this.setState({ JobsSelected });
        this.getVacancy(JobsSelected[0].title);
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  };

  getVacancy(e) {
    this.setState({ listVacancy: [], loading: true });
    vacancy(e)
      .then(({ data }) => {
        const vacancies = data.result.filter(
          c => c.jobDate.substr(0, 10) >= new Date().toJSON().substr(0, 10)
        );
        debugger;
        this.setState({ listVacancy: vacancies, loading: false });
      })
      .catch(error => {
        error.response.data;
      });
  }

  filterVacancy = e => {
    this.getVacancy(e);
  };

  render() {
    const { JobsSelected, listVacancy, loading, spinner } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#18142F" />
        <SpinnerComponent loading={spinner} />
        <ScrollView>
          <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
            <FilterToExplore
              onSelectedColor="#FFB72B"
              onTextSelectedColor="#18142F"
              filterJob={JobsSelected}
              onPress={e => this.filterVacancy(e)}
            />
          </View>
          <View>
            {listVacancy.length ? (
              <VacancyCard
                listVacancy={listVacancy}
                onPress={job =>
                  this.props.navigation.navigate("VacanciesDetails", {
                    job,
                    status: 2
                  })
                }
              />
            ) : (
              <View style={[styles.containerEmpty]}>
                <Text style={[styles.textEmpty, { opacity: loading ? 0 : 1 }]}>
                  Nenhuma vaga disponivel
                </Text>
                <ActivityIndicator
                  color="#FFF"
                  animating={loading}
                  size="large"
                />
              </View>
            )}
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
  },
  containerEmpty: {
    height: dimensions(250),
    justifyContent: "flex-end",
    alignItems: "center"
  },
  textEmpty: {
    color: "#FFF",
    fontSize: dimensions(20),
    fontFamily: "HelveticaNowDisplay-Regular"
  }
});
