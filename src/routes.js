import { createAppContainer, createStackNavigator } from "react-navigation";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import LoginEmailPassword from "./pages/Login/LoginEmailPassword";
import LoginNickName from "./pages/Login/LoginNickName";
import LoginProfilePicture from "./pages/Login/LoginProfilePicture";
import LoginPerfil from "./pages/Login/LoginPerfil";
import InfoProfile from "./pages/Login/InfoProfile";

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
  InfoProfile: {
    screen: InfoProfile,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: 'white'
    }
  },
  LoginPerfil: {
    screen: LoginPerfil,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitle: 'Perfil'
    }
  },
  HomePage,
  initialRouteName: "LoginPage"
});

const Routes = createAppContainer(StackNavigator);

export default Routes;
