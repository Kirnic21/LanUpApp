import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  Dimensions,
  SafeAreaView,
  Text,
  Vibration,
  NativeModules,
  DeviceEventEmitter,
  ActivityIndicator,
} from "react-native";

import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import IconDestination from "react-native-vector-icons/FontAwesome5";
import Geolocation from "react-native-geolocation-service";

import mapStyles from "~/pages/NextEvent/Geolocation/stylesMaps";
import dimensions, { calcWidth } from "~/assets/Dimensions";
import RoundButton from "~/shared/components/RoundButton";

import MapViewDirections from "react-native-maps-directions";
import {
  arrivelOperation,
  checkpoints,
} from "~/shared/services/operations.http";
import { location } from "~/shared/services/events.http";
import ModalComingSoon from "~/shared/components/ModalComingSoon";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.09;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyBVsSKFLigzkkpRc1L-GTKCN2N0qQHWYOc";
export default class MapsGeolocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      isLoading: false,
      latitude: LATITUDE,
      longitude: LONGITUDE,
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
      status: false,
      destination: {
        latitude: 0,
        longitude: 0,
      },
    };

    lastTimeout = setTimeout;

    this.subscription = DeviceEventEmitter.addListener(
      "location_received",
      (e) => {
        this.watchLocation(e);
      }
    );
  }

  async componentDidMount() {
    try {
      const {
        navigation: {
          state: {
            params: { id, eventName, addressId, address },
          },
        },
      } = this.props;
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
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
            id,
            eventName,
            address,
            latitude,
            longitude,
            spinner: true,
          });

          setTimeout(() => {
            this.watchLocation(position.coords);
          }, 500);

          NativeModules.ForegroundModule.startForegroundService();
        },
        (error) => {
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          forceRequestLocation: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  componentWillUnmount() {
    this.subscription.remove();
  }

  watchLocation = ({ latitude, longitude }) => {
    this.sendApi({ latitude, longitude });
    const { coordinate } = this.state;
    const newCoordinate = {
      latitude,
      longitude,
    };
    this.setState(
      {
        latitude,
        longitude,
        newCoordinate,
        spinner: false,
      },
      () => {
        Platform.OS === "android"
          ? this.marker &&
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              1000
            )
          : coordinate.timing(newCoordinate).start();
        this.arrived();
      }
    );
    return;
  };

  sendApi = async ({ latitude, longitude }) => {
    const { id } = this.props.navigation.state.params;
    clearTimeout(this.lastTimeout);
    this.lastTimeout = setTimeout(async () => {
      try {
        await checkpoints({
          id,
          lat: latitude.toString(),
          long: longitude.toString(),
        });
      } catch (error) {
        console.log(error);
      }
    }, 60000);
    return;
  };

  arrived = () => {
    const { distance, id } = this.state;
    if (distance * 1000 <= 150) {
      this.setState({ status: true }, async () => {
        Vibration.vibrate(1000);
        this.subscription.remove();
        try {
          await arrivelOperation(id);
        } catch (error) {
          console.log(error);
        }
      });
    }
    return;
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  render() {
    const {
      status,
      destination,
      distance,
      duration,
      eventName,
      address,
      spinner,
      visible,
      newCoordinate,
    } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView
            zoomEnabled
            zoomControlEnabled
            zoomTapEnabled
            showsCompass
            paddingAdjustmentBehavior="automatic"
            followsUserLocation
            style={styles.map}
            showUserLocation
            followUserLocation
            loadingEnabled
            customMapStyle={mapStyles}
            region={this.getMapRegion()}
          >
            <Marker.Animated
              ref={(marker) => {
                this.marker = marker;
              }}
              coordinate={this.getMapRegion()}
            >
              <View style={styles.markerUSer}>
                <FontAwesome
                  name={"circle"}
                  size={calcWidth(3)}
                  color="#E29D01"
                />
              </View>
            </Marker.Animated>
            {newCoordinate ? (
              <MapViewDirections
                origin={newCoordinate}
                destination={address}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeColor={"#F63535"}
                strokeWidth={4}
                language="pt-BR"
                onReady={(result) => {
                  const { distance, duration } = result;
                  this.setState({ distance, duration });
                }}
              />
            ) : (
              <></>
            )}
            <Marker.Animated
              coordinate={destination}
              title={"Destino"}
              description={"Destino"}
            >
              <IconDestination
                name={"map-marker"}
                size={calcWidth(12)}
                color="#F63535"
              />
            </Marker.Animated>
          </MapView>

          <View style={styles.containerInformation}>
            <Text
              numberOfLines={1}
              style={[styles.fontHelveticaBold, styles.titleEvent]}
            >
              {eventName}
            </Text>
            <Text
              numberOfLines={2}
              style={[styles.fontHelveticaRegular, styles.textAddress]}
            >
              {address}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome
                name="location-arrow"
                size={calcWidth(7)}
                color="#FFB72B"
                style={{ left: calcWidth(-1) }}
              />
              {status ? (
                <Text
                  style={[
                    styles.fontHelveticaBold,
                    { fontSize: dimensions(20), color: "#FFB72B" },
                  ]}
                >
                  Você Chegou
                </Text>
              ) : (
                <View>
                  {spinner ? (
                    <ActivityIndicator color="#FFB72B" size="large" />
                  ) : (
                    <Text
                      style={[
                        styles.fontHelveticaBold,
                        { fontSize: dimensions(20), color: "#FFB72B" },
                      ]}
                    >
                      {Number(distance).toFixed(2)}KM
                      <Text style={{ fontSize: dimensions(10) }}>
                        / {Math.round(duration)}mins
                      </Text>
                    </Text>
                  )}
                </View>
              )}
            </View>
            <RoundButton
              textStyle={{ color: "#2B2D5B" }}
              width={status ? calcWidth(40) : calcWidth(60)}
              style={{ backgroundColor: "#46C5F3" }}
              name={status ? "Okay" : "Ver regras e check list"}
              onPress={() =>
                status
                  ? this.props.navigation.navigate("NextEvent")
                  : this.setState({ visible: true })
              }
            />
          </View>
          <ModalComingSoon
            visible={visible}
            onClose={() => this.setState({ visible: false })}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  containerInformation: {
    height: calcWidth(70),
    width: "100%",
    backgroundColor: "#24203B",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerUSer: {
    backgroundColor: "#EFBC2C48",
    height: calcWidth(10),
    width: calcWidth(10),
    borderRadius: calcWidth(5),
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E29D01",
    borderWidth: 2,
  },
  titleEvent: {
    fontSize: dimensions(29),
    paddingBottom: calcWidth(5),
    textAlign: "center",
    width: "90%",
    color: "#FFFFFF",
  },
  textAddress: {
    fontSize: dimensions(15),
    paddingBottom: calcWidth(6),
    width: "85%",
    color: "#FFFFFF",
  },
  fontHelveticaRegular: {
    fontFamily: "HelveticaNowMicro-Regular",
  },
  fontHelveticaBold: {
    fontFamily: "HelveticaNowMicro-Bold",
  },
});
