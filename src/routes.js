import { createAppContainer, createStackNavigator } from "react-navigation";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login/Login";
import LoginEmailPassword from "./pages/Login/LoginEmailPassword";
import LoginNickName from "./pages/Login/LoginNickName";
import LoginProfilePicture from "./pages/Login/LoginProfilePicture";
import LoginCropProfilePhoto from "./pages/Login/LoginCropProfilePhoto"; 

const StackNavigator = createStackNavigator({
  LoginPage: { screen: LoginPage, navigationOptions: { header: null } },
  LoginEmailPassword: {
    screen: LoginEmailPassword, 
    navigationOptions: {
        headerTransparent: true,
        headerTintColor: 'white'
    }
  },
  LoginNickName: {
    screen: LoginNickName,
    navigationOptions: {
        headerTransparent: true,
        headerTintColor: 'white'
    }
  },
  LoginProfilePicture: {
    screen: LoginProfilePicture,
    navigationOptions: {
        headerTransparent: true,
        headerTintColor: 'white'
    }
  },
  LoginCropProfilePhoto: {
    screen: LoginCropProfilePhoto,
    navigationOptions: {
        headerTransparent: true,
        headerTintColor: 'white',
        headerTitle: 'Cortar a foto do perfil'
    }
  },
  HomePage,
  initialRouteName: "LoginPage"
});

const Routes = createAppContainer(StackNavigator);

export default Routes;
