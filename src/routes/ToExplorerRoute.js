import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import VacanciesDetails from "~/pages/Explore/VacanciesDetails/VacanciesDetails";
import ButtonNavigation from "~/shared/components/ButtonNavigation";
import ToExplore from "~/pages/Explore/ToExplore";
import { calcWidth, adjust } from "~/assets/Dimensions/index";
import AboutMe from '~/pages/UserProfile/About/AboutMe';

const ToExplorerRoute = createStackNavigator(
  {
    ToExplore: {
      screen: ToExplore,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Vagas",
        headerLeft: () => (
          <ButtonNavigation type="drawer" navigation={navigation} />
        ),
      }),
    },
    AboutMe: {
      screen: AboutMe,
      navigationOptions: () => ({
        headerTitle: "Sobre mim",
      }),
    },
    VacanciesDetails: {
      screen: VacanciesDetails,
      navigationOptions: () => ({
        headerTitle: () => null,
        headerTransparent: true,
        headerStyle: { height: calcWidth(20) },
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: "center",
      headerTintColor: "#FFFFFF",
      headerStyle: {
        backgroundColor: "#18142F",
        height: Platform.OS === "ios" ? calcWidth(25) : calcWidth(15),
      },
      headerTitleStyle: {
        color: "#FFFF",
        fontFamily: "HelveticaNowMicro-Regular",
        fontSize: adjust(15),
      },
    },
    headerMode: "float",
  }
);
export default ToExplorerRoute;
