import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import DrawerButton from "~/shared/components/DrawerButton";
import { calcWidth } from "~/assets/Dimensions/index";
import NextEvent from "~/pages/NextEvent/NextEvent";
import MapsGeolocation from "~/pages/NextEvent/Geolocation/MapsGeolocation";
import Rating from "~/pages/NextEvent/Rating";

const NextEventRoute = createStackNavigator(
  {
    NextEvent: {
      screen: NextEvent,
      navigationOptions: ({ navigation }) => ({
        headerTransparent: true,
        headerStyle: { height: calcWidth(20) },
        headerTitle: "Próximo Evento",
        headerLeft: () => <DrawerButton navigation={navigation} />,
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
    defaultNavigationOptions: {
      headerTitleAlign: "center",
      headerTintColor: "#FFFFFF",
      headerStyle: {
        height: calcWidth(12),
        backgroundColor: "#18142F",
      },
      headerTitleStyle: {
        color: "#FFFF",
        fontFamily: "HelveticaNowMicro-Regular",
        fontSize: calcWidth(5),
      },
    },
  }
);
export default NextEventRoute;
