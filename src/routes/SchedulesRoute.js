import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import ButtonNavigation from "~/shared/components/ButtonNavigation";
import Schedule from "~/pages/Schedules/Schedule";
import { calcWidth, adjust } from "~/assets/Dimensions/index";
import VacanciesDetails from "~/pages/Explore/VacanciesDetails/VacanciesDetails";

const SchedulesRoute = createStackNavigator(
  {
    Schedule: {
      screen: Schedule,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Escalas",
        headerLeft: () => (
          <ButtonNavigation type="drawer" navigation={navigation} />
        ),
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
    defaultNavigationOptions: ({ navigation }) => ({
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
      headerLeft: () => (
        <ButtonNavigation type="stack" navigation={navigation} />
      ),
    }),
  }
);
export default SchedulesRoute;
