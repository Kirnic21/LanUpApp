import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import AsyncStorage from "@react-native-community/async-storage";
import { decodeToken, updateJobs } from "~/shared/services/freela.http";
import dimensions from "~/assets/Dimensions/index";

class AddProfession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      jobs: this.props.navigation.state.params.JobsSelected,
      GetJobs: this.props.navigation.state.params.GetJobs
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
  };

  SaveJob = async () => {
    const { jobs } = this.state;
    if (jobs.length < 1) {
      AlertHelper.show("error", "Erro", "Adicione pelo menos uma profissão!");
    } else {
      const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
      AlertHelper.show(
        "success",
        "Sucesso",
        "Profissões adicionada com sucesso!"
      );
      updateJobs({ id: token.id, jobs })
        .then(({ data }) => {
          if (data.isSuccess) {
            console.log(data);
          }
        })
        .catch(error => {
          console.log(error.response.data);
        });
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
          <Text
            style={{
              color: "#FFF",
              fontFamily: "HelveticaNowMicro-Regular",
              fontSize: dimensions(12)
            }}
          >
            Salvar
          </Text>
        </TouchableOpacity>
      )
    };
  };

  render() {
    const { GetJobs, jobs, JobsSelected } = this.state;
    console.log(this.props.navigation.state.params);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.containerJob}>
            <Text
              style={{
                color: "#FFF",
                paddingBottom: "5%",
                fontSize: dimensions(25),
                fontFamily: "HelveticaNowMicro-Regular"
              }}
            >
              Profissão
            </Text>

            <Text style={styles.numberJobText}>{jobs.length}/3</Text>

            <View
              style={{ flexWrap: "wrap", flexDirection: "row", width: "100%" }}
            >
              {GetJobs.map(({ name, isSelected }, id) => (
                <View key={id}>
                  <TouchableOpacity
                    style={[
                      styles.chip,
                      isSelected == true
                        ? styles.chipActive
                        : styles.chipDisabled
                    ]}
                    onPress={e => this.click(e, id)}
                  >
                    <Text
                      style={{
                        color: isSelected === true ? "#FFF" : "#24203B",
                        fontSize: dimensions(12),
                        fontFamily: "HelveticaNowMicro-Regular",
                        padding: dimensions(6),
                        paddingTop: dimensions(7)
                      }}
                    >
                      {" "}
                      {name}
                    </Text>
                  </TouchableOpacity>
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
    margin: "2.5%",
    height: dimensions(30),
    borderRadius: 20
  },
  chipActive: {
    backgroundColor: "#865FC0"
  },
  chipDisabled: {
    backgroundColor: "#FFFFFF5C"
  },
  numberJobText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: dimensions(19),
    position: "absolute",
    left: "90%",
    top: dimensions(9),
    fontFamily: "HelveticaNowMicro-ExtraLight"
  }
});

export default AddProfession;
