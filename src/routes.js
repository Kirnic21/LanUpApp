import * as React from "react";
import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator, DrawerItems } from "react-navigation";
import { SafeAreaView, ScrollView, Image, Dimensions } from "react-native";
import CoreTemplate from "./shared/components/CoreTemplate"
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
import Agency from "./pages/Login/Agency";
import PreviewProfile from "./pages/Login/PreviewProfile";

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      // style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <CoreTemplate>
        <DrawerItems {...props} />
      </CoreTemplate>
    </SafeAreaView>
  </ScrollView>
);

const DrawerNavigator = createDrawerNavigator(
  {
    LoginPerfil,
    Profession
  },
  {
    drawerType: 'slide',
    drawerWidth: 200,
    contentComponent: CustomDrawerContentComponent,
  }
);

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
  PreviewProfile: {
    screen: PreviewProfile,
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
      headerTitle: 'Midias'
    }
  },
  Agency: {
    screen: Agency,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitle: 'Midia'
    }
  },
  // LoginPerfil: {
  //   screen: LoginPerfil,
  //   navigationOptions: {
  //     headerStyle: {
  //       backgroundColor: '#18142F',
  //     },
  //     headerTransparent: true,
  //     headerTintColor: 'white',
  //     headerTitle: 'Perfil'
  //   }
  // },
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

const MainStack = createSwitchNavigator(
  {
    Home: StackNavigator,
    Drawer: DrawerNavigator
  },
  {
    initialRouteName: 'Home'
  }
);

const Routes = createAppContainer(MainStack);

export default Routes;