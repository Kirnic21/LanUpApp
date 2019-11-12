import * as React from "react";
import { createStackNavigator } from "react-navigation";

import HomePage from "~/pages/Auth/index";
import LoginEmail from "~/pages/Auth/LoginEmail";
import RegisterStageOne from "~/pages/Auth/Register/RegisterStageOne";
import RegisterStageTwo from "~/pages/Auth/Register/RegisterStageTwo";
import SelectAvatar from "~/pages/Auth/SelectAvatar";

const AuthNavigator = createStackNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: () => ({
        headerLeft: null
      })
    },
    LoginEmail,
    RegisterStageOne,
    RegisterStageTwo,
    SelectAvatar
  },
  {
    defaultNavigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: "#FFF",
      headerStyle: {
        marginTop: 20,
        marginLeft: 10
      }
    })
  }
);

export default AuthNavigator;
