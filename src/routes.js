import * as React from 'react';
import {
  createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator, DrawerItems,
} from 'react-navigation';
import {
  SafeAreaView, ScrollView, ImageBackground, Image, TouchableOpacity,
} from 'react-native';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import LoginEmailPassword from './pages/Login/LoginEmailPassword';
import LoginNickName from './pages/Login/LoginNickName';
import LoginProfilePicture from './pages/Profile/ProfilePicture';
import LoginPerfil from './pages/Login/LoginPerfil';
import AboutMe from './pages/Profile/AboutMe';
import Availability from './pages/Profile/Availability';
import AvailabilityDays from './pages/Profile/AvailabilityDays';
import Profession from './pages/Profile/Profession';
import Midia from './pages/Profile/Midia';
import Agency from './pages/Agency/Agency';
import PreviewProfile from './pages/Login/PreviewProfile';
import ImageBack from './assets/images/Grupo_518.png';
import IconMenu from './assets/images/icon_menu.png';
import NextEvent from './pages/NextEvent/NextEvent';
import DetailNextEvent from './pages/NextEvent/DetailNextEvent';
import IAnAgency from './pages/Agency/IAnAgency';
import ToExplore from './pages/Explore/ToExplore';
import SpecialHours from './pages/Profile/SpecialHours';
import CheckList from './pages/NextEvent/CheckList';
import CheckOut from './pages/NextEvent/CheckOut';
import RatingsAgency from './pages/NextEvent/RatingsAgency';
import RatingsContractor from './pages/NextEvent/RatingsContractor';

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
    LoginPerfil,
    NextEvent,
    ToExplore,
  },
  {
    drawerType: 'slide',
    drawerWidth: 200,
    contentComponent: CustomDrawerContentComponent,
  },
);

const DrawerContainer = createStackNavigator(
  {
    DrawerNavigator,
  },
  {
    defaultNavigationOptions: {
      headerTitle: <TouchableOpacity><Image style={{ height: 40, width: 40 }} source={IconMenu} /></TouchableOpacity>,
      headerStyle: {
        backgroundColor: '#18142F',
      },
    },
  },
);

const StackNavigator = createStackNavigator({
  LoginPage: { screen: LoginPage, navigationOptions: { header: null } },
  LoginEmailPassword: {
    screen: LoginEmailPassword,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: 'white',
    },
  },
  LoginNickName: {
    screen: LoginNickName,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: 'white',
    },
  },
  LoginProfilePicture: {
    screen: LoginProfilePicture,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: 'white',
    },
  },
  PreviewProfile: {
    screen: PreviewProfile,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: 'white',
    },
  },
  Profession: {
    screen: Profession,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitle: 'Profissão',
    },
  },
  Availability: {
    screen: Availability,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitle: 'Disponibilidade',
    },
  },
  AvailabilityDays: {
    screen: AvailabilityDays,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitle: 'Disponibilidade',
    },
  },
  Midia: {
    screen: Midia,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitle: 'Midias',
    },
  },
  SpecialHours: {
    screen: SpecialHours,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitle: 'Disponibilidade',
    },
  },
  Agency: {
    screen: Agency,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitle: 'Sou Agência',
    },
  },
  AboutMe: {
    screen: AboutMe,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitle: 'Sobre mim',
    },
  },
  CheckList: {
    screen: CheckList,
    mode: 'modal',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitleStyle: {
        textAlign: 'center',
      },
      headerTitle: 'Check List',
    },
  },
  DetailNextEvent: {
    statusBarStyle: 'light-content',
    screen: DetailNextEvent,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: 'white',
    },
  },
  CheckOut: {
    screen: CheckOut,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: 'white',
    },
  },
  RatingsAgency: {
    headerLayoutPreset: 'center',
    screen: RatingsAgency,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: false,
      headerTintColor: '#FFF',
      title: 'Avalie',
    },
  },
  RatingsContractor: {
    headerLayoutPreset: 'center',
    screen: RatingsContractor,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#18142F',
      },
      headerTransparent: false,
      headerTintColor: '#FFF',
      title: 'Avalie',
    },
  },
  IAnAgency: {
    screen: IAnAgency,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: 'white',
    },
  },
  HomePage,
  initialRouteName: 'LoginPage',
});

const MainStack = createSwitchNavigator(
  {
    Home: StackNavigator,
    Drawer: DrawerContainer,
  },
  {
    initialRouteName: 'Home',
  },
);

const Routes = createAppContainer(MainStack);

export default Routes;
