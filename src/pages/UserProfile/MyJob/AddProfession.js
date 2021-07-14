import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AlertHelper } from "~/shared/helpers/AlertHelper";

import dimensions, { adjust } from "~/assets/Dimensions/index";
import ButtonRightNavigation from "~/shared/components/ButtonRightNavigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  jobSuccess,
  updateServices,
} from "~/store/ducks/Profession/Job/job.actions";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import InputSearch from "~/shared/components/InputSearch";
class AddProfession extends Component {
  state = {
    services: [],
  };

  componentDidMount() {
    const { navigation, services } = this.props;
    navigation.setParams({
      SaveJob: () => this.SaveJob(),
    });
    this.setState({ services });
  }

  componentDidUpdate(prevProps) {
    prevProps.errorUpdate !== this.props.errorUpdate && this.props.goBack();
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: () => (
        <ButtonRightNavigation
          title="Salvar"
          onPress={() => params.SaveJob()}
        />
      ),
    };
  };

  selectJob = (index) => {
    const { jobSuccess, services:job } = this.props;
    const { services } = this.state;
    const buttonSelected = services[index];
    buttonSelected.isSelected = !buttonSelected.isSelected;

    this.setState((prev) => ({ ...prev, services }));
    jobSuccess([...job]);
  };

  SaveJob = async () => {
    const { updateServices, services, servicesSelected, navigation } =
      this.props;

    !servicesSelected.length
      ? AlertHelper.show("error", "Erro", "Adicione pelo menos uma profissão!")
      : await updateServices({ services, jobs: servicesSelected }).then(() => {
          navigation.goBack();
        });
  };

  searchService = (term) => {
    const { services } = this.props;
    const _filter = services.filter(function (item) {
      const _item = item.name ? item.name.toUpperCase() : "".toUpperCase();
      return _item.indexOf(term.toUpperCase()) > -1;
    });
    this.setState({ services: _filter.length ? _filter : services });
  };

  render() {
    const { servicesSelected, loading } = this.props;
    const { services } = this.state;
    return (
      <View style={styles.container}>
        <SpinnerComponent loading={loading} />
        <ScrollView>
          <View style={styles.containerJob}>
            <Text
              style={{
                color: "#FFF",
                paddingTop: "5%",
                fontSize: adjust(20),
                fontFamily: "HelveticaNowMicro-Regular",
              }}
            >
              Profissão
            </Text>

            <Text style={styles.numberJobText}>
              {servicesSelected.length}/3
            </Text>
            <InputSearch
              placeholder="Procura função"
              inputStyles={{ marginVertical: "5%" }}
              handleOnSearch={(text) => this.searchService(text)}
            />
            <View
              style={{ flexWrap: "wrap", flexDirection: "row", width: "100%", }}
            >
              {services.map(({ name, isSelected }, id) => (
                <View key={id}>
                  <TouchableOpacity
                    disabled={
                      isSelected === false && servicesSelected.length === 3
                    }
                    style={[
                      styles.chip,
                      isSelected == true
                        ? styles.chipActive
                        : styles.chipDisabled,
                    ]}
                    onPress={() => this.selectJob(id)}
                  >
                    <Text
                      style={{
                        color: isSelected === true ? "#FFF" : "#24203B",
                        fontSize: adjust(10),
                        fontFamily: "HelveticaNowMicro-Regular",
                        padding: dimensions(6),
                        paddingTop: dimensions(7),
                        textAlign: "center",
                      }}
                    >
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
    width: "100%",
  },
  containerJob: {
    marginHorizontal: "5%",
  },
  chip: {
    backgroundColor: "#6C757D",
    margin: "2.5%",
    height: dimensions(30),
    borderRadius: 20,
  },
  chipActive: {
    backgroundColor: "#865FC0",
  },
  chipDisabled: {
    backgroundColor: "#FFFFFF5C",
  },
  numberJobText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: adjust(14),
    position: "absolute",
    left: "90%",
    top: dimensions(20),
    fontFamily: "HelveticaNowMicro-ExtraLight",
  },
});

const mapStateToProps = (state) => {
  const { services, loading } = state.jobs;
  return {
    services,
    loading,
    servicesSelected: services
      ?.filter((job) => job.isSelected === true)
      .map(({ isSelected, name }) => ({
        isSelected,
        name,
      })),
  };
};

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    {
      jobSuccess,
      updateServices,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionToProps)(AddProfession);
