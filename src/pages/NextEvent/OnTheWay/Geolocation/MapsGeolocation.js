import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Vibration,
  Platform,
} from "react-native";
import BackgroundFetch from "react-native-background-fetch";
import env from "react-native-config";
import Geolocation from "react-native-geolocation-service";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Icon from "react-native-vector-icons/MaterialIcons";

import dimensions, { calcWidth, adjust } from "~/assets/Dimensions";
import AlertModal from "~/shared/components/AlertModal";
import RoundButton from "~/shared/components/RoundButton";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import { hasLocationPermission } from "~/shared/helpers/PermissionGeolocation";
import { location } from "~/shared/services/events.http";
import {
  arrivelOperation,
  checkpoints,
} from "~/shared/services/operations.http";

import mapStyles from "./stylesMaps";

const errors = {
  1: "A permissão de localização não foi concedida",
  2: "O provedor de localização não está disponível",
  3: "A solicitação de localização expirou",
  4: "O serviço Google Play não está instalado ou tem uma versão mais antiga",
  5: "O serviço de localização não está ativado ou o modo de localização não é apropriado para a solicitação atual",
};

const options = {
  accuracy: {
    android: "high",
    ios: "best",
  },
  enableHighAccuracy: true,
  timeout: 15000,
  forceRequestLocation: true,
  forceLocationManager: false,
  showLocationDialog: true,
};

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const apikey =
  Platform.OS === "ios"
    ? env.GOOGLE_IOS_MAPS_API_KEY
    : env.GOOGLE_ANDROID_MAPS_API_KEY;
class MapsGeolocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      status: false,
      coordinates: [],
      distance: 0,
      duration: 0,
      position: {
        latitude: 0,
        longitude: 0,
      },
      destination: {
        latitude: 0,
        longitude: 0,
      },
    };
    this.mapView = null;
    this.watchId = null;
    this.interval = setInterval;
  }

  async componentDidMount() {
    this.initialPosition();
    this.initBackgroundFetch(); //redundance
  }

  async initBackgroundFetch() {
    const onEvent = async (taskId) => {
      console.log("[BackgroundFetch] task: ", taskId);
      await this.addEvent(taskId);
      BackgroundFetch.finish(taskId);
    };

    const onTimeout = async (taskId) => {
      console.warn("[BackgroundFetch] TIMEOUT task: ", taskId);
      BackgroundFetch.finish(taskId);
    };

    let status = await BackgroundFetch.configure(
      { minimumFetchInterval: 1 },
      onEvent,
      onTimeout
    );

    console.log("[BackgroundFetch] configure status: ", status);
  }

  _getCurrentPosition = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      stopBackground.stop();
      return;
    }

    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.updatePosition({ latitude, longitude });
      },
      (error) => {
        AlertHelper.show(
          "error",
          "Erro",
          `${
            errors[error?.code] || "Ocorreu um erro, por favor tente mais tarde"
          }`
        );
      },
      {
        ...options,
        maximumAge: 10000,
      }
    );
  };

  addEvent(taskId) {
    return new Promise((resolve, reject) => {
      this._getCurrentPosition();
      resolve();
    });
  }

  watchPosition = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    this.watchId = Geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        this.updatePosition({ latitude, longitude });
      },
      (error) => {
        AlertHelper.show(
          "error",
          "Erro",
          `${
            errors[error?.code] || "Ocorreu um erro, por favor tente mais tarde"
          }`
        );
      },
      {
        ...options,
        distanceFilter: 100,
        interval: 10000,
        fastestInterval: 2000,
        useSignificantChanges: false,
      }
    );
  };

  initialPosition = async () => {
    const { id, address, eventName, addressId, latitude, longitude } =
      this.props.navigation.state.params;
    try {
      const {
        data: {
          result: { lat, lng },
        },
      } = await location(addressId);
      this.setState({
        destination: {
          latitude: Number(lat),
          longitude: Number(lng),
        },
        address,
        eventName,
        id,
      });
      this.updatePosition({ latitude, longitude });
      this.sendLocationApi();
      this.watchPosition();
    } catch (error) {
      AlertHelper.show("error", "Erro", error.message);
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    Geolocation.clearWatch(this.watchId);
  }

  updatePosition = ({ latitude, longitude }) => {
    const { destination } = this.state;
    this.setState({
      coordinates: [
        {
          latitude,
          longitude,
        },
        destination,
      ],
      position: {
        latitude,
        longitude,
      },
    });
  };

  sendLocationApi = async () => {
    this.interval = setInterval(async () => {
      const {
        id,
        position: { latitude, longitude },
      } = this.state;
      try {
        await checkpoints({
          id,
          lat: latitude.toString(),
          long: longitude.toString(),
        });
      } catch (error) {
        AlertHelper.show("error", "Erro", error.message);
      }
    }, 60000);
  };

  arrived = (distance) => {
    const { id, status } = this.state;
    const { eventId, vacancyId, job } = this.props.navigation.state.params;
    if (distance * 1000 <= 1000 && status === false) {
      this.setState({ status: true }, async () => {
        Vibration.vibrate(1000);
        try {
          await arrivelOperation({ id, eventId, vacancyId, job });
        } catch (error) {
          AlertHelper.show("error", "Erro", error.message);
        }
      });
    }
    return;
  };

  goNextStep = () => {
    const { id } = this.state;
    const { eventId, vacancyId, job } = this.props.navigation.state.params;
    this.setState({ loading: true });
    arrivelOperation({ id, eventId, vacancyId, job })
      .then(() => {
        this.props.navigation.replace("NextEvent");
      })
      .catch((error) => {
        AlertHelper.show("error", "Erro", error.message);
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { status, distance, duration, address, eventName, visible, loading } =
      this.state;
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={StyleSheet.absoluteFill}
          customMapStyle={mapStyles}
          ref={(c) => (this.mapView = c)}
        >
          <MapView.Marker coordinate={this.state.position}>
            <View style={styles.iconStyle}>
              <Icon name={"lens"} size={calcWidth(4)} color={"#FFB72B"} />
            </View>
          </MapView.Marker>
          <MapView.Marker coordinate={this.state.destination}>
            <Icon name={"place"} size={calcWidth(14)} color={"#F63535"} />
          </MapView.Marker>

          <MapViewDirections
            origin={this.state.coordinates[0]}
            destination={
              this.state.coordinates[this.state.coordinates.length - 1]
            }
            apikey={apikey}
            strokeWidth={3}
            strokeColor="#F63535"
            optimizeWaypoints={true}
            onReady={(result) => {
              const { distance, duration } = result;
              this.setState({
                distance,
                duration,
              });

              this.arrived(distance);

              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / dimensions(20),
                  bottom: height / dimensions(20),
                  left: width / dimensions(20),
                  top: height / dimensions(20),
                },
              });
            }}
            onError={(errorMessage) => {
              AlertHelper.show("error", "Erro", errorMessage);
            }}
          />
        </MapView>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={styles.container}>
            <Text
              numberOfLines={2}
              style={[
                styles.eventName,
                {
                  fontSize: eventName?.length > 14 ? adjust(20) : adjust(25),
                },
              ]}
            >
              {eventName}
            </Text>
            <Text numberOfLines={2} style={styles.address}>
              {address}
            </Text>
            <Text style={styles.distance}>
              <Icon name="near-me" size={calcWidth(7)} color="#FFB72B" />
              {status ? "Você chegou" : `${Number(distance).toFixed(2)}KM`}
              {!status && (
                <Text style={{ fontSize: adjust(8) }}>
                  / {Math.round(duration)}min
                </Text>
              )}
            </Text>
            <View style={{ top: calcWidth(4) }}>
              <RoundButton
                textStyle={{ color: "#2B2D5B" }}
                width={status ? calcWidth(40) : calcWidth(60)}
                style={{ backgroundColor: "#46C5F3" }}
                name={status ? "Okay" : "Pular essa etapa"}
                onPress={() =>
                  status
                    ? this.props.navigation.replace("NextEvent")
                    : this.setState({ visible: true })
                }
              />
              <AlertModal
                onClose={() => this.setState({ visible: false })}
                visible={visible}
                title="Confirmar chegada !!"
                subtitle="Deseja pular essa etapa e ir para o check-In ?"
                iconName="place"
                colorIcon="#F63535"
                nameButton="Pular etapa"
                onPress={() => this.goNextStep()}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#24203B",
    minHeight: calcWidth(70),
    alignItems: "center",
  },
  iconStyle: {
    borderRadius: calcWidth(10),
    backgroundColor: "#EFBC2C48",
    borderColor: "#FFB72B",
    borderWidth: 2,
    padding: calcWidth(3),
    alignItems: "center",
    justifyContent: "center",
  },
  eventName: {
    color: "#FFFFFF",
    fontFamily: "HelveticaNowMicro-Bold",
    margin: calcWidth(3),
  },
  address: {
    color: "#FFFFFF",
    fontFamily: "HelveticaNowMicro-Regular",
    marginHorizontal: calcWidth(5),
    textAlign: "center",
    fontSize: adjust(13),
    minHeight: calcWidth(10),
  },
  distance: {
    color: "#FFB72B",
    fontFamily: "HelveticaNowMicro-Bold",
    fontSize: adjust(18),
    top: calcWidth(4),
  },
};

export default MapsGeolocation;
