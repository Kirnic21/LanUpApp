import * as React from "react";
import { createStackNavigator, HeaderBackButton } from "react-navigation";
import NavigationTitle from "~/shared/components/NavigationTitle";
import DrawerButton from "~/shared/components/DrawerButton";
import dimensions from "~/assets/Dimensions/index";
import NextEvent from "~/pages/NextEvent/NextEvent";
import MapsGeolocation from "~/pages/NextEvent/MapsGeolocation";
import Rating from "~/pages/NextEvent/Rating";

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
  Rating: {
    screen: Rating,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <NavigationTitle
          title="Avalie"
          marginHorizontal={dimensions(0)}
          style={{ marginTop: dimensions(5) }}
        />
      ),
      headerStyle: {
        backgroundColor: "#18142F",
        height: dimensions(40)
      },
      headerLeft: null
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
