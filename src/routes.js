import { createAppContainer, createStackNavigator } from "react-navigation";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login/login";

const StackNavigator = createStackNavigator({
    LoginPage,
    HomePage,
    initialRouteName: "LoginPage"
});

const Routes = createAppContainer(StackNavigator);

export default Routes;
