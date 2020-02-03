import React, { useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, StatusBar } from "react-native";
import VacancyCard from "~/shared/components/Vacancy/VacancyCard";
import { getSchedules } from "~/shared/services/vacancy.http";
import { useState } from "react";
const Schedule = props => {
  const [listVacancy, setlistVacancy] = useState([]);
  scheduleList = () => {
    getSchedules(2)
      .then(({ data }) => {
        debugger;
        const getVacancy = data.result.value;
        setlistVacancy(getVacancy);
      })
      .catch(error => {
        error.response.data;
      });
  };

  useEffect(() => {
    scheduleList();
  }, []);
  console.log(listVacancy);
  return (
    <SafeAreaView style={styles.container}>
      <VacancyCard
        listVacancy={listVacancy}
        onPress={job =>
          props.navigation.push("VacanciesDetails", { job, status: 3 })
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "#18142F",
    flexDirection: "column"
  }
});

export default Schedule;
