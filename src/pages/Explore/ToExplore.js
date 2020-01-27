import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator
} from "react-native";
import FilterToExplore from "~/pages/Explore/FilterToExplore";
import VacancyCard from "~/pages/Explore/VacancyCard";
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
      listVacancy: [],
      loading: false,
      spinner: true
    };
  }

  componentDidMount() {
    this.getFilterJob();
  }

  getFilterJob = async () => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    getJobs(token.id).then(({ data }) => {
      const GetJobs = data;
      GetJobs === null
        ? this.setState({ GetJobs: [] })
        : this.setState({ GetJobs });
      const name = GetJobs.filter(c => c.isSelected === true).map(c => c.name);
      const JobsSelected = name.map((item, id) => ({
        id: `${id}`,
        title: item
      }));
      this.setState({ JobsSelected, spinner: false });
      this.getVacancy(JobsSelected[0].title);
    });
  };

  getVacancy(e) {
    this.setState({ listVacancy: [], loading: true });
    vacancy(e)
      .then(({ data }) => {
        this.setState({ listVacancy: data.result, loading: false });
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
    console.log(listVacancy);
    return (
      <View style={styles.container}>
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
                  this.props.navigation.push("VacanciesDetails", { job })
                }
              />
            ) : (
              <View
                style={{
                  height: dimensions(250),
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: dimensions(20),
                    fontFamily: "HelveticaNowDisplay-Regular",
                    opacity: loading ? 0 : 1
                  }}
                >
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
  }
});
