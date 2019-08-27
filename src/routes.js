import { createAppContainer, createStackNavigator } from "react-navigation";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import LoginEmailPassword from "./pages/Login/LoginEmailPassword";
import LoginNickName from "./pages/Login/LoginNickName";
import LoginProfilePicture from "./pages/Login/LoginProfilePicture";
import LoginPerfil from "./pages/Login/LoginPerfil";
import InfoProfile from "./pages/Login/InfoProfile";
import AboutMe from "./pages/Login/AboutMe";
import Profession from "./pages/Login/Profession";
import Midia from "./pages/Login/Midia";

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
  Profession: {
    screen: Profession,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitle: 'Profissão'
    }
  },
  Midia: {
    screen: Midia,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitle: 'Midia'
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
  AboutMe: {
    screen: AboutMe,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitle: 'Sobre mim'
    }
  },
  HomePage,
  initialRouteName: "LoginPage"
});

const Routes = createAppContainer(StackNavigator);

export default Routes;
