import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import HomePage from "~/pages/Auth/index";
import LoginEmail from "~/pages/Auth/LoginEmail";
import RegisterStageOne from "~/pages/Auth/Register/RegisterStageOne";
import RegisterStageTwo from "~/pages/Auth/Register/RegisterStageTwo";
import SelectAvatar from "~/pages/Auth/SelectAvatar";
import Terms from "~/pages/Auth/terms";
import FeedBackExclusion from "~/pages/UserProfile/AccountSettings/DeleteAccount/feedBackExclusion";


import ButtonNavigation from "~/shared/components/ButtonNavigation";

import { calcWidth } from "~/assets/Dimensions";

const AuthNavigator = createStackNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: () => ({ headerLeft: () => null }),
    },
    LoginEmail,
    RegisterStageOne,
    RegisterStageTwo,
    SelectAvatar,
    Terms,
    FeedBackExclusion: {
      screen: FeedBackExclusion,
      navigationOptions: () => ({
        headerTitle: () => null,
        headerTransparent: true,
        headerLeft: () => null,
        gestureEnabled: false,
      }),
    },
  },
  {
    initialRouteName: "HomePage",
    defaultNavigationOptions: ({ navigation }) => ({
      headerTintColor: "#FFFFFF",
      headerTitle: () => null,
      headerTransparent: true,
      headerStyle: {
        height: Platform.OS === "ios" ? calcWidth(25) : calcWidth(20),
      },
      headerLeft: () => (
        <ButtonNavigation type="stack" navigation={navigation} />
      ),
    }),
    mode: "card",
    headerMode: "float",
  }
);

export default AuthNavigator;
