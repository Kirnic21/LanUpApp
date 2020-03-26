import React from "react";
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import { View, PermissionsAndroid, Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

class MapsGeolocation extends React.Component {
  state = {
    destination: {
      latitude: 41.5547347,
      longitude: -8.3770546,
    },
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  }

  async componentDidMount() {
    await this.requestLocationPermision()

    this.positionWatchId = Geolocation.watchPosition(this.onWatchPositionSuccess,
      this.onWatchPositionError,
      {
        distanceFilter: 100, //metros,
        interval: 10000 // milisegundos: 10000 = 10 segundos
      })
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.positionWatchId)
  }

  requestLocationPermision = async () => {
    // Mover esse código para a primeira tela do aplicativo,
    // assim quando o usuário abrir a aplicação ja terá todas as
    // permissões necessárias.

    if (Platform.OS === "android") {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    }
  }

  onWatchPositionSuccess = data => {
    // TODO: Enviar localização para API
    this.setState({
      region: this.getRegionForCoordinates([data.coords, this.state.destination])
    })
  }


  getRegionForCoordinates(points) {
    let minX, maxX, minY, maxY;

    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = Math.abs((maxX - minX));
    const deltaY = Math.abs((maxY - minY));

    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY
    };
  }

  onWatchPositionError = error => {
    debugger
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.mapView = map}
          loadingEnabled={true}
          toolbarEnabled={true}
          zoomControlEnabled={true}
          style={styles.map}
          region={this.state.region}
        >
          {/* Ping do usuário */}
          <Marker
            coordinate={this.state.region}
            title={"Xablau"}
            description={"Xablei"}
          />

          {/* Pin do destino */}
          <Marker
            coordinate={this.state.destination}
            title={"Destino"}
            description={"Destino"}
          />
        </MapView>
      </View>
    )
  }
}

export default MapsGeolocation;
