import * as React from "react";
import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator, DrawerItems } from "react-navigation";
import { SafeAreaView, ScrollView, ImageBackground, Image, TouchableOpacity } from "react-native";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import LoginEmailPassword from "./pages/Login/LoginEmailPassword";
import LoginNickName from "./pages/Login/LoginNickName";
import LoginProfilePicture from "./pages/Login/LoginProfilePicture";
import LoginPerfil from "./pages/Login/LoginPerfil";
import InfoProfile from "./pages/Login/InfoProfile";
import AboutMe from "./pages/Login/AboutMe";
import Availability from './pages/Login/Availability';
import AvailabilityDays from './pages/Login/AvailabilityDays'
import Profession from "./pages/Login/Profession";
import Midia from "./pages/Login/Midia";
import Agency from "./pages/Login/Agency";
import PreviewProfile from "./pages/Login/PreviewProfile";
import ImageBack from "./assets/images/Grupo_518.png";
import IconMenu from "./assets/images/icon_menu.png";
import NextEvent from "./pages/Login/NextEvent";
import IAnAgency from "./pages/Login/IAnAgency";

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <ImageBackground
        source={ImageBack}
        style={{ width: '100%', height: 800 }}
      >
        <DrawerItems {...props} />
      </ImageBackground>
    </SafeAreaView>
  </ScrollView>
);

const DrawerNavigator = createDrawerNavigator(
  {
    IAnAgency,
    LoginPerfil: {
      screen: LoginPerfil,
      // navigationOptions: ({ navigation }) => ({
      //   title: 'Perfil',
      //   headerLeft: (
      //     <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      //       <Image style={{ height: 40, width: 40 }} source={IconMenu} />
      //     </TouchableOpacity>
      //   )
      // })
    },
    NextEvent
  },
  {
    drawerType: 'slide',
    drawerWidth: 200,
    contentComponent: CustomDrawerContentComponent
  }
);

const DrawerContainer = createStackNavigator(
  {
    DrawerNavigator
  },
  {
    defaultNavigationOptions: {
      headerTitle: <TouchableOpacity><Image style={{ height: 40, width: 40 }} source={IconMenu} /></TouchableOpacity>,
      headerStyle: {
        backgroundColor: '#18142F',
      },
    },
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
  Availability: {
    screen: Availability,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitle: 'Disponibilidade'
    }
  },
  AvailabilityDays: {
    screen: AvailabilityDays,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitle: 'Disponibilidade'
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
      headerTitle: 'Sou Agência'
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

const MainStack = createSwitchNavigator(
  {
    Home: StackNavigator,
    Drawer: DrawerContainer
  },
  {
    initialRouteName: 'Home'
  }
);

const Routes = createAppContainer(MainStack);

export default Routes;