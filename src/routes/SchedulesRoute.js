import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import ButtonNavigation from "~/shared/components/ButtonNavigation";
import Schedule from "~/pages/Schedules/Schedule";
import { calcWidth } from "~/assets/Dimensions/index";
import VacanciesDetails from "~/pages/Explore/VacanciesDetails/VacanciesDetails";

const SchedulesRoute = createStackNavigator(
  {
    Schedule: {
      screen: Schedule,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Agendas",
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
    defaultNavigationOptions: {
      headerTitleAlign: "center",
      headerTintColor: "#FFFFFF",
      headerStyle: {
        backgroundColor: "#18142F",
        height: calcWidth(12),
      },
      headerTitleStyle: {
        color: "#FFFF",
        fontFamily: "HelveticaNowMicro-Regular",
        fontSize: calcWidth(5),
      },
      headerLeft: () => (
        <ButtonNavigation type="stack" navigation={navigation} />
      ),
    },
  }
);
export default SchedulesRoute;
