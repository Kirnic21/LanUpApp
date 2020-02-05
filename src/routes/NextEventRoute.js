import * as React from "react";
import { createStackNavigator } from "react-navigation";
import NavigationTitle from "~/shared/components/NavigationTitle";
import DrawerButton from "~/shared/components/DrawerButton";
import dimensions from "~/assets/Dimensions/index";
import NextEvent from "~/pages/NextEvent/NextEvent";
import MapsGeolocation from "~/pages/NextEvent/MapsGeolocation";
const NextEventRoute = createStackNavigator({
  NextEvent: {
    screen: NextEvent,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerTitle: (
        <NavigationTitle
          title="Proximo Evento"
          marginHorizontal={dimensions(-23)}
          style={{ marginTop: dimensions(30) }}
        />
      ),
      headerLeft: (
        <DrawerButton
          navigation={navigation}
          style={{ marginTop: dimensions(30) }}
        />
      )
    })
  },
  MapsGeolocation: {
    screen: MapsGeolocation,
    navigationOptions: {
      header: null
    }
  }
});
export default NextEventRoute;
