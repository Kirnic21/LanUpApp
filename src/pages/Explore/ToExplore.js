import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import Lottie from "lottie-react-native";

import { calcWidth, calcHeight, adjust } from "~/assets/Dimensions";
import loadingSpinner from "~/assets/loadingSpinner.json";

import FilterToExplore from "~/pages/Explore/FilterToExplore";
import VacancyCard from "~/shared/components/Vacancy/VacancyCard";
import ExclusionModal from "~/shared/components/ExclusionModal";

import { vacancy } from "~/shared/services/events.http";
import { decodeToken, getJobs } from "~/shared/services/freela.http";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

export default class ToExplore extends Component {
  state = {
    GetJobs: [],
    loading: false,
    visible: false,
  };

  componentDidMount() {
    this.getFilterJob();
  }

  getFilterJob = async () => {
    this.setState({ loading: true });
    getJobs()
      .then((GetJobs) => {
        const name = GetJobs.filter((c) => c.isSelected === true).map(
          (c) => c.name
        );
        const JobsSelected = name.map((item) => ({ title: item }));
        if (JobsSelected.length) {
          this.setState({
            JobsSelected: [...JobsSelected, { title: "Todas Vagas" }],
          });
          this.getVacancy(JobsSelected[0].title);
        } else {
          this.props.navigation.push("Profession");
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  getVacancy(e) {
    vacancy(e === "Todas Vagas" ? "" : e)
      .then(({ data }) => {
        this.setState({ listVacancy: data.result });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  filterVacancy = (e) => {
    this.setState({ listVacancy: [], loading: true });
    this.getVacancy(e);
  };

  render() {
    const { JobsSelected, listVacancy, loading, visible } = this.state;
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
                  onPress={(item) => this.filterVacancy(item.title)}
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
                      width: calcWidth(30),
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
                job={item.job}
                title={item.eventName}
                date={item.jobDate.substr(0, 19)}
                eventCreationDate={item.eventCreationDate}
                content={`${item.workShiftQuantity} turnos e ${item.totalVacancy} vagas`}
                address={item.isHomeOffice ? "Home Office" : item.address}
                picture={item.picture !== null ? item.picture.url : null}
                amount={item.amount}
                onPress={() =>
                  this.props.navigation.navigate("VacanciesDetails", {
                    job: item,
                    status: 0,
                    isInvite: item?.isInvite
                  })
                }
              />
            )}
            keyExtractor={() => Math.random().toString()}
          />
        </View>
        <ExclusionModal
          visible={visible}
          onClose={() => this.setState({ visible: false })}
          onPress={() => this.props.navigation.push("Profession")}
          title="Para continuar defina uma Profissão!"
        />
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
    flexDirection: "column",
  },
  containerEmpty: {
    justifyContent: "center",
    alignItems: "center",
    height: calcHeight(65),
  },
  textEmpty: {
    color: "#FFF",
    fontSize: adjust(18),
    fontFamily: "HelveticaNowDisplay-Regular",
  },
});
