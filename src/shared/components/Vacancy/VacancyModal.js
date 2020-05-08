import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ModalComponent from "../ModalComponent";
import { notifyVacancy } from "~/store/ducks/vacancies/vacancies.actions";
import dimensions, { calcWidth, calcHeight } from "~/assets/Dimensions";
import ButtonPulse from "~/shared/components/ButtonPulse";
import { emergenciesVacancies } from "~/shared/services/events.http";

const styles = {
  container: {
    alignItems: "center",
    width: "90%",
    marginHorizontal: calcWidth(5),
  },
  colorFrenchRose: {
    color: "#EB4886",
  },
  fontHelveticaRegular: {
    fontFamily: "HelveticaNowMicro-Regular",
  },
  textValue: {
    color: "#46C5F3",
    fontSize: dimensions(35),
    fontFamily: "HelveticaNowDisplay-Bold",
  },
  textAddress: {
    color: "rgba(250,250,250,0.5)",
    top: calcWidth(10),
    width: "90%",
    textAlign: "center",
    fontSize: dimensions(12),
    fontFamily: "HelveticaNowMicro-ExtraLight",
  },
};

class VacancyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobDeitails: "",
      isVisible: true,
    };
  }

  showDetails = () => {
    this.props.navigation.navigate("VacanciesDetails");
  };

  onClose = () => {
    this.setState({ isVisible: false });
    this.props.navigation.goBack();
  };

  render() {
    const { jobDeitails, isVisible } = this.state;
    const { vacancy } = this.props;
    return (
      <ModalComponent
        heightModal={calcWidth(125)}
        onClose={this.onClose}
        visible={isVisible}
      >
        <Text style={{ color: "white" }}>
          {JSON.stringify(this.props.vacancy)}
        </Text>
        <View style={styles.container}>
          <Text
            numberOfLines={1}
            style={[
              styles.fontHelveticaRegular,
              {
                color: "#FFFFFF",
                fontSize: dimensions(35),
              },
            ]}
          >
            Bartender
          </Text>
          <Text
            style={[
              styles.colorFrenchRose,
              styles.fontHelveticaRegular,
              { fontSize: dimensions(20), top: calcWidth(-3) },
            ]}
          >
            vaga urgente
          </Text>
          <Text style={styles.textValue}>R${jobDeitails.payment}</Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({ isVisible: false }),
                this.props.navigation.navigate("VacanciesDetails", {
                  job: vacancy,
                  status: 1,
                });
            }}
            style={{ top: calcWidth(5) }}
          >
            <ButtonPulse
              titleStyle={{ textAlign: "center", lineHeight: calcHeight(3.5) }}
              size="normal"
              title={`Ver${"\n"}detalhes${"\n"} da vaga`}
              color="#EB4886"
              startAnimations
            />
          </TouchableOpacity>
          <Text style={styles.textAddress}>{jobDeitails.location}</Text>
        </View>
      </ModalComponent>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vacancy: state.vacancy,
  };
};

const mapActionToProps = (dispatch) =>
  bindActionCreators({ notifyVacancy }, dispatch);

export default connect(mapStateToProps, mapActionToProps)(VacancyModal);
