import * as React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
  NavigationActions
} from "react-navigation";
import { Text, View } from "react-native";

import { DrawerNavigator } from "~/routes/DrawerNavigator";
import ChangePassword from "~/pages/UserProfile/ChangePassword";

import PhotoGallery from "~/shared/components/PhotoGallery";

import dimensions from "~/assets/Dimensions/index";
import NavigationTitle from "~/shared/components/NavigationTitle";
import VacanciesDetails from "~/pages/Explore/VacanciesDetails/VacanciesDetails";

const ToExplorerRoute = createStackNavigator(
  {
    // DrawerNavigator: {
    //   screen: DrawerNavigator,
    //   navigationOptions: () => ({
    //     headerTransparent: true,
    //     headerLeft: null
    //   })
    // },
    VacanciesDetails: {
      screen: VacanciesDetails,
      navigationOptions: ({ navigation }) => ({
        headerTransparent: true,
        headerStyle: {
          marginTop: 20
        },
        headerLeft: (
          <HeaderBackButton
            tintColor="#FFf"
            onPress={() => navigation.push("ToExplore")}
          />
        )
      })
    }
  }
  // {
  //   defaultNavigationOptions: {
  //     headerStyle: {
  //       backgroundColor: "#18142F",
  //       height: dimensions(70),
  //       elevation: -2
  //     }
  //   }
  // }
);
export default ToExplorerRoute;
