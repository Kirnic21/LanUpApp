import React from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ModalComponent from "../ModalComponent";
import { notifyVacancy } from "~/store/ducks/vacancies/vacancies.actions";
import dimensions, { calcWidth, calcHeight } from "~/assets/Dimensions";
import ButtonPulse from "~/shared/components/ButtonPulse";
import Geolocation from "react-native-geolocation-service";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";

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
  textDistance: {
    fontFamily: "HelveticaNowMicro-Bold",
    color: "#FFB72B",
    fontSize: dimensions(20),
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

  async componentDidMount() {
    const { vacancy } = this.props;
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.getDistance(latitude, longitude, vacancy[0].location);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  getDistance = async (lat, lng, location) => {
    this.setState({ spinner: true });
    const origin = lat + "," + lng;
    const destination = location;

    const ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";
    const params = `origins=${origin}&destinations=${destination}&language=PT&key=AIzaSyBVsSKFLigzkkpRc1L-GTKCN2N0qQHWYOc`; // you need to get a key
    const finalApiURL = `${ApiURL}${encodeURI(params)}`;
    axios
      .get(finalApiURL)
      .then((response) => {
        const { data } = response;
        const {
          distance: { value: km },
          duration: { text: time },
        } = data.rows[0].elements[0];
        this.setState({ km, time });
      })
      .catch((message) => console.log(message))
      .finally(() => this.setState({ spinner: false }));
  };

  showDetails = () => {
    this.props.navigation.navigate("VacanciesDetails");
  };

  onClose = () => {
    this.setState({ isVisible: false });
    this.props.navigation.goBack();
  };

  render() {
    const { isVisible, km, time, spinner } = this.state;
    const { vacancy } = this.props;
    return (
      <ModalComponent
        heightModal={calcWidth(135)}
        onClose={this.onClose}
        visible={isVisible}
      >
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
            {vacancy[1].eventName}
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
          <Text style={styles.textValue}>R${vacancy[0].payment}</Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({ isVisible: false }),
                this.props.navigation.navigate("VacanciesDetails", {
                  job: vacancy[1],
                  getDeitails: vacancy[0],
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
          <Text style={styles.textAddress}>{vacancy[0].location}</Text>
          <View style={{ flexDirection: "row", marginTop: calcWidth(15) }}>
            <FontAwesome
              name="location-arrow"
              size={calcWidth(7)}
              color="#FFB72B"
              style={{ left: calcWidth(-1) }}
            />
            {spinner && <ActivityIndicator color="#FFB72B" size="large" />}
            {!spinner && (
              <Text style={styles.textDistance}>
                {(km / 1000).toFixed(1)}KM
                <Text style={{ fontSize: dimensions(10) }}>/{time}</Text>
              </Text>
            )}
          </View>
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
