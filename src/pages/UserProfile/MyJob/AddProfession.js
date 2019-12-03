import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Chip } from "react-native-paper";
import DropdownAlert from "react-native-dropdownalert";

import AsyncStorage from "@react-native-community/async-storage";
import { decodeToken, updateJobs } from "~/shared/services/freela.http";

class AddProfession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      jobs: [],
      GetJobs: this.props.navigation.state.params.GetJobs,
      JobsSelected: this.props.navigation.state.params.JobsSelected
    };
  }

  setModalViisible(status) {
    this.setState({ modalVisible: status });
  }

  componentDidMount() {
    this.props.navigation.setParams({
      SaveJob: () => this.SaveJob()
    });
  }

  click = (e, index) => {
    const buttons = this.state.GetJobs;
    const buttonSelected = buttons[index];
    buttonSelected.isSelected = !buttonSelected.isSelected;
    if (this.state.jobs.length === 3) {
      buttonSelected.isSelected = false;
    }
    this.setState(prev => ({ ...prev, buttons }));
    const name = buttons.filter(c => c.isSelected === true);
    this.setState({ jobs: name });
    debugger;
  };

  SaveJob = async () => {
    const { jobs } = this.state;
    if (jobs.length < 1) {
      this.dropDownAlertRef.alertWithType(
        "error",
        "Erro",
        "Adicione pelo menos uma profissão!"
      );
    } else {
      const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
      this.dropDownAlertRef.alertWithType(
        "success",
        "Sucesso",
        "Profissões adicionada com sucesso!"
      );
      updateJobs({ id: token.id, jobs })
        .then(({ data }) => {
          if (data.isSuccess) {
            debugger;
            console.log(data);
            // this.props.navigation.navigate("Profession");
          }
        })
        .catch(error => {
          debugger;
          console.log(error.response.data);
        });
      debugger;
    }
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <TouchableOpacity
          onPress={() => params.SaveJob()}
          style={{ paddingHorizontal: 29 }}
        >
          <Text style={{ color: "#FFF" }}>Salvar</Text>
        </TouchableOpacity>
      )
    };
  };

  render() {
    const { GetJobs, jobs, JobsSelected } = this.state;
    console.log(this.props.navigation.state.params);
    debugger;
    return (
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            top: "-10%",
            position: "absolute"
          }}
        >
          <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        </View>
        <ScrollView>
          <View style={styles.containerJob}>
            <Text style={{ color: "#FFF", fontSize: 30, paddingBottom: "5%" }}>
              Profissão
            </Text>
            {jobs.length ? (
              <Text style={styles.numberJobText}>{jobs.length}/3</Text>
            ) : (
              <Text style={styles.numberJobText}>{JobsSelected.length}/3</Text>
            )}
            <View
              style={{ flexWrap: "wrap", flexDirection: "row", width: "100%" }}
            >
              {GetJobs.map(({ name, isSelected }, id) => (
                <View key={id}>
                  <Chip
                    style={[
                      styles.chip,
                      isSelected == true
                        ? styles.chipActive
                        : styles.chipDisabled
                    ]}
                    onPress={e => this.click(e, id)}
                    textStyle={{
                      color: isSelected === true ? "#FFF" : "#24203B"
                    }}
                  >
                    {name}
                  </Chip>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F",
    width: "100%"
  },
  containerJob: {
    marginHorizontal: "10%"
  },
  chip: {
    backgroundColor: "#6C757D",
    margin: "2.5%"
  },
  chipActive: {
    backgroundColor: "#865FC0"
  },
  chipDisabled: {
    backgroundColor: "#FFFFFF5C"
  },
  numberJobText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 20,
    position: "absolute",
    left: "90%",
    top: "1.5%"
  }
});

export default AddProfession;
