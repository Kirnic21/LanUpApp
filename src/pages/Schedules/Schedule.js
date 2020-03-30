import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import VacancyCard from "~/shared/components/Vacancy/VacancyCard";
import { getSchedules } from "~/shared/services/vacancy.http";
import dimensions, { calcWidth, calcHeight } from "~/assets/Dimensions/index";
import FilterToExplore from "../Explore/FilterToExplore";
import Lottie from "lottie-react-native";
import loadingSpinner from "~/assets/loadingSpinner.json";
import SwiperComponent from "~/shared/components/SwiperComponent";

export default class Schedule extends React.Component {
  state = {
    spinner: false,
    listVacancy: [],
    listFilter: [
      { id: "0", title: "Escalados" },
      { id: "2", title: "Pagos" }
    ]
  };

  componentDidMount() {
    this.scheduleList("Escalados");
  }

  scheduleList = e => {
    const filter = e === "Pagos" ? 5 : 2;
    this.setState({ loading: true });
    getSchedules(filter)
      .then(({ data }) => {
        const getVacancy = data.result.value;
        this.setState({ listVacancy: getVacancy });
      })
      .catch(error => {
        error.response.data;
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { spinner, loading, listVacancy, listFilter } = this.state;
    return (
      <View style={styles.container}>
        {/* <SwiperComponent
          loading={false}
          // list={[{ title: "Janeiro de 2020" }, { title: "fevereiro de 2020" }]}
        /> */}
        <View style={{ margin: calcWidth(5) }}>
          <Text
            style={{
              color: "#FFF",
              fontFamily: "HelveticaNowMicro-Regular",
              fontSize: calcWidth(5)
              // marginBottom: calcWidth(3)
            }}
          >
            Próximos Eventos:
          </Text>
          <FilterToExplore
            filterJob={listFilter}
            onSelectedColor="#FFB72B"
            onTextSelectedColor="#18142F"
            onPress={e => this.scheduleList(e)}
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
                    width: calcWidth(30)
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
              content={`${item.start.substr(0, 5)} - ${item.end.substr(0, 5)}`}
              address={item.address}
              picture={item.image !== null ? item.image.url : null}
              amount={item.amount}
              onPress={() =>
                this.props.navigation.navigate("VacanciesDetails", {
                  job: item,
                  status: 6
                })
              }
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
