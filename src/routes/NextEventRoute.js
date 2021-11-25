import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import ButtonNavigation from "~/shared/components/ButtonNavigation";
import { calcWidth, adjust } from "~/assets/Dimensions/index";
import NextEvent from "~/pages/NextEvent/NextEvent";
import MapsGeolocation from "~/pages/NextEvent/OnTheWay/Geolocation/MapsGeolocation";
import Rating from "~/pages/NextEvent/CheckinAndCheckout/Rating";

const NextEventRoute = createStackNavigator(
  {
    NextEvent: {
      screen: NextEvent,
      navigationOptions: ({ navigation }) => ({
        headerTransparent: true,
        headerStyle: { height: Platform.OS === "ios" ? calcWidth(25) : calcWidth(20) },
        headerTitle: "Operação",
        headerLeft: () => (
          <ButtonNavigation type="drawer" navigation={navigation} />
        ),
      }),
    },
    Rating: {
      screen: Rating,
      navigationOptions: () => ({
        headerTitle: "Avalie",
        headerLeft: () => null,
      }),
    },
    MapsGeolocation: {
      screen: MapsGeolocation,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitleAlign: "center",
      headerTintColor: "#FFFFFF",
      headerStyle: {
        height: calcWidth(12),
        backgroundColor: "#18142F",
      },
      headerTitleStyle: {
        color: "#FFFF",
        fontFamily: "HelveticaNowMicro-Regular",
        fontSize: adjust(15),
      },
      headerLeft: () => (
        <ButtonNavigation type="stack" navigation={navigation} />
      ),
    }),
  }
);
export default NextEventRoute;
