import { createAppContainer, createStackNavigator } from "react-navigation";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login/login";
import LogIntoPage from "./pages/Login/logInto";

const StackNavigator = createStackNavigator({
  LoginPage: { screen: LoginPage, navigationOptions: { header: null } },
  LogIntoPage: {
    screen: LogIntoPage,
    navigationOptions: {
        headerTransparent: true
    }
  },
  HomePage,
  initialRouteName: "LoginPage"
});

const Routes = createAppContainer(StackNavigator);

export default Routes;
