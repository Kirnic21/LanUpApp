import * as React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  DrawerActions,
} from 'react-navigation';
import {
  Image, TouchableOpacity, View, Text,
} from 'react-native';
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
import drawerContentComponents from './shared/components/drawerContentComponents';

const DrawerButton = props => (
  <View>
    <TouchableOpacity onPress={() => { props.navigation.dispatch(DrawerActions.openDrawer()); }}>
      <Image style={{ height: 40, width: 40 }} source={IconMenu} />
    </TouchableOpacity>
  </View>
);

const DrawerNavigator = createStackNavigator(
  {
    LoginPerfil: {
      screen: LoginPerfil,
      navigationOptions: () => ({
        headerTitle: 'Perfil',
        headerTitleStyle: {
          marginLeft: '34%',
          color: '#FFF',
        },
      }),
    },
    NextEvent,
    ToExplore: {
      screen: ToExplore,
      navigationOptions: () => ({
        headerTitle: 'Explorar',
        headerTitleStyle: {
          fontSize: 20,
          marginLeft: '31.5%',
          color: '#FFF',
        },
      }),
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerButton navigation={navigation} />,
      headerStyle: {
        backgroundColor: '#18142F',
        borderColor: '#FFF',
      },
    }),
  },
);

const AuthNavigator = createStackNavigator({
  LoginPage: {
    screen: LoginPage,
    navigationOptions: () => ({
      headerTransparent: true,
    }),
  },
  LoginEmailPassword: {
    screen: LoginEmailPassword,
    navigationOptions: () => ({
      headerTintColor: '#FFF',
      headerTransparent: true,
    }),
  },
  LoginNickName: {
    screen: LoginNickName,
    navigationOptions: () => ({
      headerTintColor: '#FFF',
      headerTransparent: true,
    }),
  },
  LoginProfilePicture: {
    screen: LoginProfilePicture,
    navigationOptions: () => ({
      headerTintColor: '#FFF',
      headerTransparent: true,
    }),
  },
  AboutMe: {
    screen: AboutMe,
    navigationOptions: () => ({
      headerTintColor: '#FFF',
      headerRight: <TouchableOpacity style={{ right: 14 }}><Text style={{ fontSize: 14, color: '#FFF' }}>Salvar</Text></TouchableOpacity>,
      headerTitle: 'Sobre mim',
      headerStyle: {
        backgroundColor: '#18142F',
        borderColor: '#FFF',
      },
      headerTitleStyle: {
        fontSize: 23,
        marginLeft: '30%',
        color: '#FFF',
      },
    }),
  },
});

const DrawerNav = createDrawerNavigator(
  {
    DrawerNavigator: {
      screen: DrawerNavigator,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    LoginPerfil: { screen: LoginPerfil },
    NextEvent: { screen: NextEvent },
    ToExplore: { screen: ToExplore },

  },
  {
    contentComponent: drawerContentComponents,
    drawerWidth: 165,
    overlayColor: ' rgba(0, 0, 0, 0.1)',
  },
);

const MainStack = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    Drawer: DrawerNav,
  },
  {
    initialRouteName: 'Auth',
  },
);

const Routes = createAppContainer(MainStack);

export default Routes;
