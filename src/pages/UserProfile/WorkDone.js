import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text, RefreshControl } from "react-native";

import { calcWidth, calcHeight, adjust } from "~/assets/Dimensions/index";
import loadingSpinner from "~/assets/loadingSpinner.json";

import VacancyCard from "~/shared/components/Vacancy/VacancyCard";

import Lottie from "lottie-react-native";

import { getSchedules } from "~/shared/services/vacancy.http";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

const WorkDone = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    getWorkDone();
  }, []);

  const formatDate = useCallback((date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const sortBy = useCallback((value) => {
    return value.sort(({ jobDate: a }, { jobDate: b }) =>
      a > b ? -1 : a < b ? 1 : 0
    );
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getWorkDone();
  };

  const getWorkDone = useCallback(() => {
    setLoading(true);

    getSchedules(4)
      .then(({ data }) => data)
      .then(({ result }) => {
        setVacancies(result.value);
      })
      .catch((error) =>
        AlertHelper.show("error", "Erro", error.response.data.errorMessage)
      )
      .finally(() => {
        setLoading(false), setRefreshing(false);
      });
  }, [setLoading, setVacancies, setRefreshing]);

  return (
    <View style={styles.container}>
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
              <Text style={[styles.textEmpty]}>Nenhum Trabalho realizado</Text>
            )}
          </View>
        }
        data={sortBy(vacancies)}
        renderItem={({ item }) => (
          <VacancyCard
            job={item.job}
            title={item.eventName}
            date={item.jobDate}
            eventCreationDate={item.eventCreationDate}
            content={`${formatDate(item.start)}  - ${formatDate(item.end)}`}
            address={item.isHomeOffice ? "Home Office" : item.address}
            picture={item.image !== null ? item.image.url : null}
            amount={item.amount}
            onPress={() =>
              navigation.navigate("VacanciesDetails", {
                job: item,
                status: item.status,
                isInvite: item?.isInvite,
              })
            }
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={() => Math.random().toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F",
    flexDirection: "column",
    paddingTop: "5%",
  },
  containerEmpty: {
    justifyContent: "center",
    alignItems: "center",
    height: calcHeight(80),
  },
  textEmpty: {
    color: "#FFF",
    fontSize: adjust(15),
    fontFamily: "HelveticaNowDisplay-Regular",
  },
});

export default WorkDone;
