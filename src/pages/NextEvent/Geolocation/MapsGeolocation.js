import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  Dimensions,
  SafeAreaView,
  Text,
  Vibration,
} from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import mapStyles from "~/pages/NextEvent/Geolocation/stylesMaps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import IconDestination from "react-native-vector-icons/FontAwesome5";
import dimensions, { calcWidth } from "~/assets/Dimensions";
import RoundButton from "~/shared/components/RoundButton";
import MapViewDirections from "react-native-maps-directions";
import {
  arrivelOperation,
  checkpoints,
} from "~/shared/services/operations.http";
import { location } from "~/shared/services/events.http";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0099;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyBVsSKFLigzkkpRc1L-GTKCN2N0qQHWYOc";
export default class MapsGeolocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  componentDidMount() {
    const {
      id,
      eventName,
      addressId,
      address,
    } = this.props.navigation.state.params;
    location(addressId)
      .then(({ data }) => data)
      .then(({ result }) => {
        const { lat, lng } = result;
        const destination = {
          latitude: Number(lat),
          longitude: Number(lng),
        };
        this.setState({
          destination,
        });
      });
    this.setState({ id, eventName, address });
    this.watchLocation();
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.positionWatchId);
  }

  watchLocation = () => {
    const { coordinate } = this.state;
    const { id } = this.props.navigation.state.params;
    this.positionWatchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        checkpoints({
          id,
          lat: latitude.toString(),
          long: longitude.toString(),
        }).then(() => {
          this.arrived();
          const newCoordinate = {
            latitude,
            longitude,
          };
          Platform.OS === "android"
            ? this.marker &&
              this.marker._component.animateMarkerToCoordinate(
                newCoordinate,
                1000
              )
            : coordinate.timing(newCoordinate).start();

          this.setState({
            latitude,
            longitude,
            newCoordinate,
          });
        });
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 1,
      }
    );
  };

  arrived = () => {
    const { distance } = this.state;
    if (Number(distance).toFixed(2) === "0.00") {
      this.setState({ status: true });
      Vibration.vibrate(1000);
      Geolocation.clearWatch(this.positionWatchId);
    }
    return;
  };

  goOperation = () => {
    const { id } = this.state;
    arrivelOperation(id).then(() => {
      this.props.navigation.replace("NextEvent");
    });
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
              coordinate={this.state.coordinate}
            >
              <View style={styles.markerUSer}>
                <FontAwesome
                  name={"circle"}
                  size={calcWidth(3)}
                  color="#E29D01"
                />
              </View>
            </Marker.Animated>
            <MapViewDirections
              origin={this.state.newCoordinate}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeColor={"#F63535"}
              strokeWidth={4}
              onReady={(result) => {
                const { distance, duration } = result;
                this.setState({ distance, duration });
              }}
            />
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
                  {status ? "Você Chegou" : `${Number(distance).toFixed(2)}KM`}
                </Text>
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
            <RoundButton
              textStyle={{ color: "#2B2D5B" }}
              width={status ? calcWidth(40) : calcWidth(60)}
              style={{ backgroundColor: "#46C5F3" }}
              name={status ? "Okay" : "Ver regras e check list"}
              onPress={() => (status ? this.goOperation() : alert("ok"))}
            />
          </View>
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
