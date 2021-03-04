import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import Lottie from "lottie-react-native";

import { calcWidth, calcHeight, adjust } from "~/assets/Dimensions/index";
import loadingSpinner from "~/assets/loadingSpinner.json";

import VacancyCard from "~/shared/components/Vacancy/VacancyCard";
import FilterToExplore from "../Explore/FilterToExplore";

import { getSchedules } from "~/shared/services/vacancy.http";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

export default class Schedule extends React.Component {
  state = {
    spinner: false,
    listVacancy: [],
    listFilter: [
      { id: 2, title: "Escalados" },
      { id: 3, title: "candidatados" },
      { id: 8, title: "convites" },
      { id: 5, title: "Pagos" },
    ],
  };

  componentDidMount() {
    const { listFilter } = this.state;
    this.scheduleList(listFilter[0].id);
  }

  getFilters = async (e) => {
    try {
      const {
        data: {
          result: { value },
        },
      } = await getSchedules(e);
      const listVacancy = value.sort(({ jobDate: a }, { jobDate: b }) =>
        a > b ? -1 : a < b ? 1 : 0
      );
      this.setState({ listVacancy });
    } catch (error) {
      AlertHelper.show("error", "Erro", error.response.data.errorMessage);
    } finally {
      this.setState({ loading: false });
    }
  };

  scheduleList = (e) => {
    this.setState({ listVacancy: [], loading: true }, () => {
      this.getFilters(e);
    });
  };

  formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {hour:'2-digit', minute:'2-digit'});
  }


  render() {
    const { loading, listVacancy, listFilter } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ margin: calcWidth(5) }}>
          <Text
            style={{
              color: "#FFF",
              fontFamily: "HelveticaNowMicro-Regular",
              fontSize: adjust(15),
            }}
          >
            Próximos Eventos:
          </Text>
          <FilterToExplore
            filterJob={listFilter}
            onSelectedColor="#FFB72B"
            onTextSelectedColor="#18142F"
            onPress={(e) => this.scheduleList(e.id)}
          />
        </View>

        <FlatList
          ListEmptyComponent={
            <View style={styles.containerEmpty}>
              {loading ? (
                <Lottie
                  autoSize
                  style={{
                    height: calcWidth(30),
                    width: calcWidth(30),
                  }}
                  resizeMode="cover"
                  source={loadingSpinner}
                  loop
                  autoPlay
                />
              ) : (
                <Text style={[styles.textEmpty]}>Nenhuma vaga disponivel</Text>
              )}
            </View>
          }
          data={listVacancy}
          renderItem={({ item }) => (
            <VacancyCard
              title={item.eventName}
              date={item.jobDate}
              eventCreationDate={item.eventCreationDate}
              content={`${this.formatDate(item.start)}  - ${this.formatDate(item.end)}`}
              address={item.address}
              picture={item.image !== null ? item.image.url : null}
              amount={item.amount}
              onPress={() =>
                this.props.navigation.navigate("VacanciesDetails", {
                  job: item,
                  status: item.status,
                })
              }
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F",
    flexDirection: "column",
  },
  containerEmpty: {
    justifyContent: "center",
    alignItems: "center",
    height: calcHeight(65),
  },
  textEmpty: {
    color: "#FFF",
    fontSize: adjust(15),
    fontFamily: "HelveticaNowDisplay-Regular",
  },
});
