import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  DeviceEventEmitter,
  Vibration,
} from "react-native";

import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Icon from "react-native-vector-icons/MaterialIcons";
import Geolocation from "react-native-geolocation-service";

import dimensions, { calcWidth, adjust } from "~/assets/Dimensions";
import AlertModal from "~/shared/components/AlertModal";
import mapStyles from "~/pages/NextEvent/Geolocation/stylesMaps";
import RoundButton from "~/shared/components/RoundButton";

import { AlertHelper } from "~/shared/helpers/AlertHelper";
import { location } from "~/shared/services/events.http";
import {
  arrivelOperation,
  checkpoints,
} from "~/shared/services/operations.http";
import env from "react-native-config";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
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
    this.lastTimeout = setTimeout;

    this.subscription = DeviceEventEmitter.addListener(
      "location_received",
      (e) => {
        this.watchPosition(e);
      }
    );
  }

  async componentDidMount() {
    this.getCurrentPosition();
  }

  getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const {
          id,
          address,
          eventName,
          addressId,
        } = this.props.navigation.state.params;
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
          await this.watchPosition({ latitude, longitude });
        } catch (error) {
          console.log(error);
          AlertHelper.show("error", "Erro", error.message);
        }
      }
    );
  };

  componentWillUnmount() {
    this.subscription.remove();
  }

  watchPosition = ({ latitude, longitude }) => {
    const { destination } = this.state;
    clearTimeout(this.lastTimeout);
    this.lastTimeout = setTimeout(() => {
      this.sendLocationApi({ latitude, longitude });
    }, 60000);

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

  sendLocationApi = async ({ latitude, longitude }) => {
    const { id } = this.state;
    try {
      await checkpoints({
        id,
        lat: latitude.toString(),
        long: longitude.toString(),
      });
    } catch (error) {
      AlertHelper.show("error", "Erro", error.message);
    }
  };

  arrived = (distance) => {
    const { id, status } = this.state;
    if (distance * 1000 <= 1000 && status === false) {
      this.setState({ status: true }, async () => {
        Vibration.vibrate(1000);
        this.subscription.remove();
        try {
          await arrivelOperation(id);
        } catch (error) {
          AlertHelper.show("error", "Erro", error.message);
        }
      });
    }
    return;
  };

  goNextStep = () => {
    const { id } = this.state;
    this.setState({ loading: true });
    arrivelOperation(id)
      .then(() => {
        this.props.navigation.replace("NextEvent");
      })
      .catch((error) => {
        AlertHelper.show("error", "Erro", error.message);
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const {
      status,
      distance,
      duration,
      address,
      eventName,
      visible,
      loading,
    } = this.state;
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
            apikey={env.GOOGLE_MAPS_API_KEY}
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
