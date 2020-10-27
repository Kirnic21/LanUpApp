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
import { connect } from "react-redux";

import { received } from "~/shared/services/freela.http";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions/index";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import Lottie from "lottie-react-native";
import loadingSpinner from "~/assets/loadingSpinner.json";

const currencyFormatter = (value) => {
  if (!Number(value)) return "";

  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
  return `${amount}`;
};

class Profession extends Component {
  state = {
    isFocused: null,
    spinner: false,
  };

  componentDidMount() {
    const { minimumValueToWork } = this.props;
    this.setState({
      ValueToWork: minimumValueToWork?.toString(),
    });
  }

  handleInputFocus = () =>
    this.setState({ isFocused: true, isValueWork: false });

  handleInputBlur = async () => {
    this.setState({ isFocused: false });
    const { ValueToWork } = this.state;
    const valueReceived = Number(ValueToWork.replace(/[^0-9.-]+/g, ""));
    received({ minimumValueToWork: valueReceived })
      .then(() => {
        this.setState({ isValueWork: true });
      })
      .catch((error) => {
        AlertHelper.show("error", "Erro", error.response.data.errorMessage);
      });
  };

  renderLoading = () => {
    return (
      <View style={styles.containerLoading}>
        <Lottie
          autoSize
          style={{
            height: calcWidth(14),
            width: calcWidth(14),
          }}
          resizeMode="cover"
          source={loadingSpinner}
          loop
          autoPlay
        />
      </View>
    );
  };

  renderServices = (services) => {
    return (
      <View>
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            width: "100%",
          }}
        >
          {services.map((name, id) => (
            <View
              key={id}
              style={styles.chip}
              textStyle={{ color: "#FFFFFF", paddingRight: "3%" }}
            >
              <Text style={styles.textChip}>{name}</Text>
            </View>
          ))}
        </View>

        {!services?.length && (
          <Text style={styles.notJobsText}>Não há nenhuma profissão</Text>
        )}
      </View>
    );
  };

  renderSkills = (skill) => {
    return (
      <View>
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            width: "95%",
          }}
        >
          {skill.map((c, id) => (
            <View
              key={id}
              style={[styles.chip, { backgroundColor: "#46C5F3" }]}
            >
              <Text style={[styles.textChip, { color: "#18142F" }]}>{c}</Text>
            </View>
          ))}
        </View>
        {!skill?.length && (
          <Text style={styles.notJobsText}>Não há nenhuma habilidade</Text>
        )}
      </View>
    );
  };

  render() {
    const { ValueToWork, isFocused, spinner, isValueWork } = this.state;
    const {
      services,
      navigation,
      skill,
      loadingServices,
      loadingSkills,
    } = this.props;
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
            onPress={() => navigation.navigate("AddProfession")}
            style={styles.containerProfessionAndSkill}
          >
            <View style={{ flexDirection: "row", marginBottom: "2%" }}>
              <Text style={styles.Title}>Profissão</Text>
              <Text style={styles.jobNumber}>{services.length}/3</Text>
            </View>

            {loadingServices
              ? this.renderLoading()
              : this.renderServices(services)}

            <View style={styles.btnArrow}>
              <Icon color={"#FFF"} name={"angle-right"} size={dimensions(35)} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddSkill")}
            style={styles.containerProfessionAndSkill}
          >
            <Text style={[styles.Title, { paddingBottom: "3%" }]}>
              Habilidades
            </Text>
            {loadingSkills ? this.renderLoading() : this.renderSkills(skill)}
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
    height: calcWidth(40),
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
  containerLoading: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "80%",
  },
});

const mapStateToProps = (state) => {
  const { services, loading: loadingServices } = state.jobs;
  const { skill, loading: loadingSkills } = state.skills;
  const { about } = state.aboutMe;
  return {
    minimumValueToWork: about.minimumValueToWork,
    services: services
      ?.filter((job) => job.isSelected === true)
      .map((job) => job.name),
    skill,
    loadingServices,
    loadingSkills,
  };
};

export default connect(mapStateToProps)(Profession);
