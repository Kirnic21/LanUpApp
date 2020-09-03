import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import NumberFormat from "react-number-format";
import AsyncStorage from "@react-native-community/async-storage";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  decodeToken,
  getSkills,
  getJobs,
  received,
} from "~/shared/services/freela.http";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions/index";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import { setAbout } from "~/store/ducks/aboutMe/about.actions";

const currencyFormatter = (value) => {
  if (!Number(value)) return "";

  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
  return `${amount}`;
};

class Profession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GetSkill: [],
      GetJobs: [],
      JobsSelected: [],
      isFocused: null,
      spinner: false,
    };
    this.props.navigation.addListener("willFocus", () => {
      this.getProfession();
    });
  }

  getProfession = async () => {
    this.setState({ spinner: true }, async () => {
      try {
        const { id } = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
        const { minimumValueToWork } = this.props.aboutMe;
        const {
          data: {
            result: { value: GetSkill },
          },
        } = await getSkills(id);
        const { data: GetJobs } = await getJobs(id);

        GetJobs === null && [];
        GetSkill === null && [];

        const JobsSelected = GetJobs.filter((c) => c.isSelected === true).map(
          (c) => c.name
        );

        this.setState({
          GetSkill,
          GetJobs,
          JobsSelected,
          ValueToWork: minimumValueToWork.toString(),
        });
        console.log(GetSkill);
      } catch (error) {
        AlertHelper.show("error", "Erro", error);
      } finally {
        this.setState({ spinner: false });
      }
    });
  };

  componentDidMount() {
    this.getProfession();
  }

  openAddProfession = () => {
    const { GetJobs, JobsSelected } = this.state;
    this.props.navigation.navigate("AddProfession", { GetJobs, JobsSelected });
  };

  openAddAbiliity = () => {
    const { GetSkill } = this.state;
    this.props.navigation.navigate("AddSkill", { GetSkill });
  };

  handleInputFocus = () =>
    this.setState({ isFocused: true, isValueWork: false });

  handleInputBlur = async () => {
    this.setState({ isFocused: false });
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    const { ValueToWork } = this.state;
    const { aboutMe } = this.props;
    const valueReceived = Number(ValueToWork.replace(/[^0-9.-]+/g, ""));
    const r = {
      freelaId: token.id,
      minimumValueToWork: valueReceived,
    };
    received(r)
      .then(() => {
        this.props.setAbout({ ...aboutMe, minimumValueToWork: valueReceived });
        this.setState({ isValueWork: true });
      })
      .catch((error) => {
        AlertHelper.show("error", "Erro", error.response.data.errorMessage);
      });
  };

  render() {
    const {
      GetSkill,
      JobsSelected,
      ValueToWork,
      isFocused,
      spinner,
      isValueWork,
    } = this.state;
    return (
      <View style={styles.container}>
        <SpinnerComponent loading={spinner} />
        <ScrollView>
          <View style={styles.containerReceive}>
            <Text style={styles.Title}>Recebo por dia no mínimo:</Text>
            <NumberFormat
              value={ValueToWork}
              displayType={"text"}
              format={currencyFormatter}
              decimalScale={2}
              thousandSeparator={true}
              renderText={(value) => (
                <TextInput
                  onChangeText={(ValueToWork) => this.setState({ ValueToWork })}
                  onFocus={this.handleInputFocus}
                  onBlur={this.handleInputBlur}
                  style={[
                    { borderColor: isFocused === true ? "#46C5F3" : "#FFF" },
                    styles.inputCurrency,
                  ]}
                  value={value}
                  keyboardType="numeric"
                  placeholderTextColor="#46C5F3"
                />
              )}
            />
            {isValueWork && (
              <View style={styles.TextSaveValue}>
                <Icon name="check-circle" size={calcWidth(5)} color="#03DAC6" />
                <Text style={[styles.Title, { color: "#03DAC6" }]}>
                  Salvo com sucesso
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={this.openAddProfession}
            style={styles.containerProfessionAndSkill}
          >
            <View style={{ flexDirection: "row", marginBottom: "2%" }}>
              <Text style={styles.Title}>Profissão</Text>
              <Text style={styles.jobNumber}>{JobsSelected.length}/3</Text>
            </View>
            {JobsSelected.length ? (
              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                {JobsSelected.map((name, id) => (
                  <View
                    key={id}
                    style={styles.chip}
                    textStyle={{ color: "#FFFFFF", paddingRight: "3%" }}
                  >
                    <Text style={styles.textChip}>{name}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.notJobsText}>Não há nenhuma profissão</Text>
            )}
            <View style={styles.btnArrow}>
              <Icon color={"#FFF"} name={"angle-right"} size={dimensions(35)} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.openAddAbiliity}
            style={styles.containerProfessionAndSkill}
          >
            <Text style={[styles.Title, { paddingBottom: "3%" }]}>
              Habilidades
            </Text>
            {GetSkill ? (
              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  width: "95%",
                }}
              >
                {GetSkill.map((c, id) => (
                  <View
                    key={id}
                    style={[styles.chip, { backgroundColor: "#46C5F3" }]}
                  >
                    <Text style={[styles.textChip, { color: "#18142F" }]}>
                      {c}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.notJobsText}>Não há nenhuma habilidade</Text>
            )}
            <View style={styles.btnArrow}>
              <Icon color={"#FFF"} name={"angle-right"} size={dimensions(35)} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18142F",
    width: "100%",
  },
  containerReceive: {
    backgroundColor: "#24203B",
    marginHorizontal: "5%",
    padding: "5%",
    borderRadius: 15,
    marginTop: calcWidth(3),
  },
  containerProfessionAndSkill: {
    backgroundColor: "#24203B",
    marginLeft: "5%",
    marginTop: "10%",
    padding: dimensions(15),
    borderBottomLeftRadius: dimensions(15),
    borderTopLeftRadius: dimensions(15),
  },
  chip: {
    backgroundColor: "#865FC0",
    margin: "1%",
    height: dimensions(30),
    borderRadius: 20,
  },
  textChip: {
    color: "#FFF",
    fontSize: adjust(10),
    fontFamily: "HelveticaNowMicro-Regular",
    padding: dimensions(10),
    paddingTop: dimensions(7),
  },
  TextSaveValue: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "58%",
    marginTop: calcWidth(2),
    marginLeft: calcWidth(4),
  },
  jobNumber: {
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "HelveticaNowMicro-ExtraLight",
    fontSize: adjust(8),
    marginTop: "1.5%",
    marginLeft: "2%",
  },
  notJobsText: {
    color: "#FFF",
    fontSize: adjust(12),
    fontFamily: "HelveticaNowMicro-Regular",
    textAlignVertical: "center",
    padding: "10%",
    paddingLeft: "15%",
    top: "-3%",
  },
  btnArrow: {
    width: "50%",
    height: "100%",
    position: "absolute",
    left: "100%",
    top: "60%",
  },
  Title: {
    color: "#FFF",
    fontSize: adjust(12),
    fontFamily: "HelveticaNowMicro-Regular",
  },
  inputCurrency: {
    width: "100%",
    color: "#46C5F3",

    borderWidth: 2,
    borderRadius: 25,
    marginTop: "3%",
    height: dimensions(43),
    fontSize: adjust(10),
    fontFamily: "HelveticaNowMicro-Regular",
    paddingHorizontal: "7%",
  },
});

const mapStateToProps = (state) => {
  const { aboutMe } = state;
  return {
    aboutMe,
  };
};

const mapActionToProps = (dispatch) =>
  bindActionCreators({ setAbout }, dispatch);

export default connect(mapStateToProps, mapActionToProps)(Profession);
