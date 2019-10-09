import * as React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  DrawerActions,
  HeaderBackButton,
} from 'react-navigation';
import {
  Image, TouchableOpacity, View, Text,
} from 'react-native';
import LoginPage from './pages/Auth/index';
import LoginEmail from './pages/Auth/LoginEmail';
import RegisterStageOne from './pages/Auth/Register/RegisterStage';
import RegisterStageTwo from './pages/Auth/Register/RegisterStageTwo';
import LoginProfilePicture from './pages/Auth/ProfilePicture';
import LoginPerfil from './pages/Login/LoginPerfil';
import AboutMe from './pages/Profile/AboutMe';
import Availability from './pages/Profile/Availability';
import AvailabilityDays from './pages/Profile/AvailabilityDays';
import Profession from './pages/Profile/Profession';
import Midia from './pages/Profile/Midia';
import Agency from './pages/Agency/Agency';
import PreviewProfile from './pages/Login/PreviewProfile';
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

const AuthNavigator = createStackNavigator(
  {
    LoginPage: {
      screen: LoginPage,
      navigationOptions: () => ({
        headerTransparent: true,
        headerLeft: null,
      }),
    },
    LoginEmail: {
      screen: LoginEmail,
      navigationOptions: () => ({
        headerTransparent: true,
        headerTintColor: '#FFF',
        headerStyle: {
          marginTop: 20,
          marginLeft: 10,
        },

      }),
    },
    RegisterStageOne: {
      screen: RegisterStageOne,
      navigationOptions: () => ({
        headerTransparent: true,
        headerTintColor: '#FFF',
        headerStyle: {
          marginTop: 20,
          marginLeft: 10,
        },

      }),
    },
    RegisterStageTwo: {
      screen: RegisterStageTwo,
      navigationOptions: () => ({
        headerTransparent: true,
        headerTintColor: '#FFF',
        headerStyle: {
          marginTop: 20,
          marginLeft: 10,
        },

      }),
    },
    LoginProfilePicture: {
      screen: LoginProfilePicture,
      navigationOptions: () => ({
        headerTransparent: true,
        headerTintColor: '#FFF',
        headerStyle: {
          marginTop: 20,
          marginLeft: 10,
        },

      }),
    },
  },
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
    NextEvent: {
      screen: NextEvent,
      navigationOptions: () => ({
        headerTitle: 'Proximo Evento',
        headerTitleStyle: {
          fontSize: 20,
          marginLeft: '31.5%',
          color: '#FFF',
        },
      }),
    },
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

const pageNavigator = createStackNavigator({
  DrawerNavigator: {
    screen: DrawerNavigator,
    navigationOptions: () => ({
      headerTransparent: true,
      headerLeft: null,
    }),
  },
  Midia: {
    screen: Midia,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push('LoginPerfil')}
        />
      ),
    }),
  },
  Availability: {
    screen: Availability,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push('LoginPerfil')}
        />
      ),
    }),
  },
  AvailabilityDays: {
    screen: AvailabilityDays,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push('Availability')}
        />
      ),
    }),
  },
  SpecialHours: {
    screen: SpecialHours,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push('Availability')}
        />
      ),
    }),
  },
  Agency: {
    screen: Agency,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push('LoginPerfil')}
        />
      ),
    }),
  },
  Profession: {
    screen: Profession,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push('LoginPerfil')}
        />
      ),
    }),
  },
  CheckList: {
    screen: CheckList,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push('NextEvent')}
        />
      ),
    }),
  },
  DetailNextEvent: {
    screen: DetailNextEvent,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push('CheckList')}
        />
      ),
    }),
  },
  CheckOut: {
    screen: CheckOut,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push('DetailNextEvent')}
        />
      ),
    }),
  },
  RatingsAgency: {
    screen: RatingsAgency,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push('CheckOut')}
        />
      ),
    }),
  },
  RatingsContractor: {
    screen: RatingsContractor,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push('RatingsAgency')}
        />
      ),
    }),
  },
  AboutMe: {
    screen: AboutMe,
    navigationOptions: ({ navigation }) => ({
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
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push('LoginPerfil')}
        />
      ),
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
    page: pageNavigator,
  },
  {
    initialRouteName: 'Auth',
  },
);

const Routes = createAppContainer(MainStack);

export default Routes;
