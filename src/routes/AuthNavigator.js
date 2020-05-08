import { createStackNavigator } from "react-navigation-stack";

import HomePage from "~/pages/Auth/index";
import LoginEmail from "~/pages/Auth/LoginEmail";
import RegisterStageOne from "~/pages/Auth/Register/RegisterStageOne";
import RegisterStageTwo from "~/pages/Auth/Register/RegisterStageTwo";
import SelectAvatar from "~/pages/Auth/SelectAvatar";
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
  },
  {
    initialRouteName: "HomePage",
    defaultNavigationOptions: {
      headerTintColor: "#FFFFFF",
      headerTitle: () => null,
      headerTransparent: true,
      headerStyle: { height: calcWidth(20) },
    },
    mode: "card",
  }
);

export default AuthNavigator;
