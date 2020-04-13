import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  Dimensions,
  SafeAreaView,
  Text,
} from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import mapStyles from "~/pages/NextEvent/Geolocation/stylesMaps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import IconDestination from "react-native-vector-icons/FontAwesome5";
import dimensions, { calcWidth } from "~/assets/Dimensions";
import { getPreciseDistance } from "geolib";
import RoundButton from "~/shared/components/RoundButton";
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
      destination: {
        latitude: -24.010471,
        longitude: -46.412599,
      },
      distance: 0,
      status: false,
    };
  }

  componentDidMount() {
    this.watchLocation();
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.positionWatchId);
  }

  watchLocation = () => {
    const { coordinate } = this.state;
    this.positionWatchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.getDistance({ latitude, longitude });
        const newCoordinate = {
          latitude,
          longitude,
        };
        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            ); // 500 is the duration to animate the marker
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }
        this.setState({
          latitude,
          longitude,
        });
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 0,
      }
    );
  };

  getDistance = (data) => {
    const { destination } = this.state;
    const km = getPreciseDistance(data, destination) / 1000;
    this.setState({ distance: km });
    if (km.toString().substr(0, 4) === "0.00") {
      this.setState({ status: true });
      Vibration.vibrate(1000);
      Geolocation.clearWatch(this.positionWatchId);
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
    const { status, destination, distance } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView
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
              Balada TheWeek
            </Text>
            <Text
              numberOfLines={2}
              style={[styles.fontHelveticaRegular, styles.textAddress]}
            >
              Av. Brigadeiro Luís Antônio, 2696 Jardim Paulista, SP - 05581-000
            </Text>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome
                name="location-arrow"
                size={calcWidth(7)}
                color="#FFB72B"
                style={{ left: calcWidth(-1) }}
              />
              <Text
                style={[
                  styles.fontHelveticaBold,
                  { fontSize: dimensions(20), color: "#FFB72B" },
                ]}
              >
                {status ? "Você Chegou" : `${distance}KM`}
              </Text>
            </View>
            <RoundButton
              textStyle={{ color: "#2B2D5B" }}
              width={status ? calcWidth(40) : calcWidth(60)}
              style={{ backgroundColor: "#46C5F3" }}
              name={status ? "Okay" : "Ver regras e check list"}
              onPress={() =>
                status
                  ? this.props.navigation.navigate("NextEvent")
                  : alert("ok")
              }
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
    width: "82%",
    color: "#FFFFFF",
  },
  fontHelveticaRegular: {
    fontFamily: "HelveticaNowMicro-Regular",
  },
  fontHelveticaBold: {
    fontFamily: "HelveticaNowMicro-Bold",
  },
});
