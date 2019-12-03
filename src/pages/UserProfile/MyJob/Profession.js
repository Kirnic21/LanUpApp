import React, { Component } from "react";

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image
} from "react-native";
import arrow from "~/assets/images/arrowRight.png";
import { Chip } from "react-native-paper";
import InputLabel from "~/shared/components/InputLabel";
import { decodeToken, getSkills, getJobs } from "~/shared/services/freela.http";
import AsyncStorage from "@react-native-community/async-storage";

class Profession extends Component {
  state = {
    GetSkill: [],
    GetJobs: [],
    JobsSelected: []
  };

  async componentDidMount() {
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    getSkills(token.id).then(({ data }) => {
      const GetSkill = data.result.value;
      GetSkill === null
        ? this.setState({ GetSkill: [] })
        : this.setState({ GetSkill });
    });
    getJobs(token.id).then(({ data }) => {
      const GetJobs = data;
      debugger;
      GetJobs === null
        ? this.setState({ GetJobs: [] })
        : this.setState({ GetJobs });
      const name = GetJobs.filter(c => c.isSelected === true).map(c => c.name);
      this.setState({ JobsSelected: name });
    });

    debugger;
  }

  openAddProfession = () => {
    const { GetJobs, JobsSelected } = this.state;
    this.props.navigation.navigate("AddProfession", { GetJobs, JobsSelected });
  };

  openAddAbiliity = () => {
    const { GetSkill } = this.state;
    this.props.navigation.navigate("AddSkill", { GetSkill });
  };

  render() {
    const { GetSkill, JobsSelected } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.containerReceive}>
            <Text style={{ color: "#FFF", fontSize: 15 }} x>
              Recebo no mínimo até:
            </Text>
            <InputLabel
              style={{ width: "100%" }}
              component={InputField}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.containerProfessionAndSkill}>
            <View style={{ flexDirection: "row", marginBottom: "2%" }}>
              <Text style={{ color: "#FFF", fontSize: 15 }}>Profissão</Text>
              <Text style={styles.jobNumber}>{JobsSelected.length}/3</Text>
            </View>
            {JobsSelected.length ? (
              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  width: "100%"
                }}
              >
                {JobsSelected.map((name, id) => (
                  <Chip
                    key={id}
                    style={styles.chip}
                    textStyle={{ color: "#FFFFFF", paddingRight: "3%" }}
                  >
                    {name}
                  </Chip>
                ))}
              </View>
            ) : (
              <Text style={styles.notJobsText}>Não há nenhuma profissão</Text>
            )}
            <TouchableOpacity
              onPress={this.openAddProfession}
              style={styles.btnArrow}
            >
              <Image source={arrow} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>
          <View style={styles.containerProfessionAndSkill}>
            <Text style={{ color: "#FFF", fontSize: 15, paddingBottom: "3%" }}>
              Habilidades
            </Text>
            {GetSkill.length ? (
              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  width: "95%"
                }}
              >
                {GetSkill.map((c, id) => (
                  <Chip
                    key={id}
                    style={[styles.chip, { backgroundColor: "#46C5F3" }]}
                    textStyle={{ color: "#18142F" }}
                  >
                    {c}
                  </Chip>
                ))}
              </View>
            ) : (
              <Text style={styles.notJobsText}>Não há nenhuma habilidade</Text>
            )}
            <TouchableOpacity
              onPress={this.openAddAbiliity}
              style={styles.btnArrow}
            >
              <Image source={arrow} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F",
    width: "100%"
  },
  containerReceive: {
    backgroundColor: "#24203B",
    marginHorizontal: "5%",
    padding: "5%",
    borderRadius: 15
  },
  containerProfessionAndSkill: {
    backgroundColor: "#24203B",
    marginLeft: "5%",
    marginTop: "10%",
    padding: "5%",
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15
  },
  chip: {
    backgroundColor: "#865FC0",
    margin: "1.0%"
  },
  jobNumber: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 13,
    marginTop: "1.1%",
    marginLeft: "2%"
  },
  notJobsText: {
    color: "#FFF",
    fontSize: 15,
    textAlignVertical: "center",
    padding: "10%",
    paddingLeft: "15%",
    top: "-3%"
  },
  btnArrow: {
    width: "50%",
    height: "100%",
    position: "absolute",
    left: "100%",
    top: "85%"
  }
});

export default Profession;
