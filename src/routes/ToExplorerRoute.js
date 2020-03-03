import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import VacanciesDetails from "~/pages/Explore/VacanciesDetails/VacanciesDetails";
import DrawerButton from "~/shared/components/DrawerButton";
import ToExplore from "~/pages/Explore/ToExplore";
import { calcWidth } from "~/assets/Dimensions/index";

const ToExplorerRoute = createStackNavigator(
  {
    ToExplore: {
      screen: ToExplore,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Vagas",
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
export default ToExplorerRoute;
