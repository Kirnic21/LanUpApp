import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import DrawerButton from "~/shared/components/DrawerButton";
import Schedule from "~/pages/Schedules/Schedule";
import dimensions, { calcWidth } from "~/assets/Dimensions/index";
import VacanciesDetails from "~/pages/Explore/VacanciesDetails/VacanciesDetails";

const SchedulesRoute = createStackNavigator(
  {
    Schedule: {
      screen: Schedule,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Agendas",
        headerLeft: () => <DrawerButton navigation={navigation} />
      })
    },
    VacanciesDetails: {
      screen: VacanciesDetails,
      navigationOptions: () => ({
        headerTitle: () => null,
        headerTransparent: true,
        headerStyle: { height: calcWidth(20) }
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: "center",
      headerTintColor: "#FFFFFF",
      headerStyle: {
        backgroundColor: "#18142F",
        height: calcWidth(12)
      },
      headerTitleStyle: {
        color: "#FFFF",
        fontFamily: "HelveticaNowMicro-Regular",
        fontSize: calcWidth(5)
      }
    }
  }
);
export default SchedulesRoute;
