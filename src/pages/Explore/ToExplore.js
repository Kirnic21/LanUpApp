import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import FilterToExplore from "~/pages/Explore/FilterToExplore";
import VacancyCard from "~/shared/components/Vacancy/VacancyCard";
import { vacancy } from "~/shared/services/events.http";
import { decodeToken, getJobs } from "~/shared/services/freela.http";
import AsyncStorage from "@react-native-community/async-storage";
import dimensions, { calcWidth, calcHeight } from "~/assets/Dimensions";
import Lottie from "lottie-react-native";
import loadingSpinner from "~/assets/loadingSpinner.json";

export default class ToExplore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: [{ id: 1, title: "a" }],
      GetJobs: [],
      loading: false
    };
  }

  componentDidMount() {
    this.getFilterJob();
  }

  getFilterJob = async () => {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    this.setState({ loading: true });
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
        this.setState({ loading: false });
      });
  };

  getVacancy(e) {
    vacancy(e)
      .then(({ data }) => {
        const vacancies = data.result.filter(
          c =>
            new Date(`${c.jobDate.substr(0, 11)}03:00:00.000Z`) >=
            new Date(new Date().setHours(0, 0, 0, 0))
        );
        this.setState({ listVacancy: vacancies });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  filterVacancy = e => {
    this.setState({ listVacancy: [], loading: true });
    this.getVacancy(e);
  };

  render() {
    const { JobsSelected, listVacancy, loading } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <FlatList
            ListHeaderComponent={
              <View style={{ padding: calcWidth(3) }}>
                <FilterToExplore
                  onSelectedColor="#FFB72B"
                  onTextSelectedColor="#18142F"
                  filterJob={JobsSelected}
                  onPress={e => this.filterVacancy(e)}
                />
              </View>
            }
            ListEmptyComponent={
              <View style={styles.containerEmpty}>
                {loading ? (
                  <Lottie
                    autoSize
                    style={{
                      height: calcWidth(30),
                      width: calcWidth(30)
                    }}
                    resizeMode="cover"
                    source={loadingSpinner}
                    loop
                    autoPlay
                  />
                ) : (
                  <Text style={[styles.textEmpty]}>
                    Nenhuma vaga disponivel
                  </Text>
                )}
              </View>
            }
            data={listVacancy}
            renderItem={({ item, index }) => (
              <VacancyCard
                title={item.eventName}
                date={item.jobDate.substr(0, 19)}
                eventCreationDate={item.eventCreationDate}
                content={`${item.workShiftQuantity} turnos e ${item.totalVacancy} vagas`}
                address={item.address}
                picture={item.picture !== null ? item.picture.url : null}
                amount={item.amount}
                onPress={() =>
                  this.props.navigation.navigate("VacanciesDetails", {
                    job: item,
                    status: 2
                  })
                }
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    height: calcHeight(65)
  },
  textEmpty: {
    color: "#FFF",
    fontSize: dimensions(20),
    fontFamily: "HelveticaNowDisplay-Regular"
  }
});
