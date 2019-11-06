import * as React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  DrawerActions,
  HeaderBackButton
} from "react-navigation";
import { Image, TouchableOpacity, View, Text } from "react-native";
import LoginPage from "./pages/Auth/index";
import LoginEmail from "./pages/Auth/LoginEmail";
import RegisterStageOne from "./pages/Auth/Register/RegisterStage";
import RegisterStageTwo from "./pages/Auth/Register/RegisterStageTwo";
import ForgotPassword from "./pages/Auth/Register/ForgotPassword";
import LoginProfilePicture from "./pages/Auth/ProfilePicture";
import UserProfile from "./pages/Login/UserProfile";
import AboutMe from "./pages/Profile/AboutMe";
import Availability from "./pages/Profile/Availability/Availability";
import AvailabilityDays from "./pages/Profile/Availability/AvailabilityDays";
import Profession from "./pages/Profile/Profession/Profession";
import AddProfession from "./pages/Profile/Profession/AddProfession";
import AddAbiliity from "./pages/Profile/Profession/AddAbiliity";
import Midia from "./pages/Profile/Midia";
import Agency from "./pages/Agency/Agency";
// import PreviewProfile from './pages/Login/PreviewProfile';
import IconMenu from "./assets/images/icon_menu.png";
import NextEvent from "./pages/NextEvent/NextEvent";
import DetailNextEvent from "./pages/NextEvent/DetailNextEvent";
// import IAnAgency from './pages/Agency/IAnAgency';
import ToExplore from "./pages/Explore/ToExplore";
import SpecialHours from "./pages/Profile/Availability/SpecialHours";
import CheckList from "./pages/NextEvent/CheckList";
import CheckOut from "./pages/NextEvent/CheckOut";
import RatingsAgency from "./pages/NextEvent/RatingsAgency";
import RatingsContractor from "./pages/NextEvent/RatingsContractor";
import drawerContentComponents from "./shared/components/drawerContentComponents";
import PhotoGallery from "~/shared/components/PhotoGallery";

const DrawerButton = props => (
  <View>
    <TouchableOpacity
      onPress={() => {
        props.navigation.dispatch(DrawerActions.openDrawer());
      }}
    >
      <Image style={{ height: 40, width: 40 }} source={IconMenu} />
    </TouchableOpacity>
  </View>
);

const AuthNavigator = createStackNavigator({
  LoginPage: {
    screen: LoginPage,
    navigationOptions: () => ({
      headerTransparent: true,
      headerLeft: null
    })
  },
  LoginEmail: {
    screen: LoginEmail,
    navigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: "#FFF",
      headerStyle: {
        marginTop: 20,
        marginLeft: 10
      }
    })
  },
  RegisterStageOne: {
    screen: RegisterStageOne,
    navigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: "#FFF",
      headerStyle: {
        marginTop: 20,
        marginLeft: 10
      }
    })
  },
  RegisterStageTwo: {
    screen: RegisterStageTwo,
    navigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: "#FFF",
      headerStyle: {
        marginTop: 20,
        marginLeft: 10
      }
    })
  },

  LoginProfilePicture: {
    screen: LoginProfilePicture,
    navigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: "#FFF",
      headerStyle: {
        marginTop: 20,
        marginLeft: 10
      }
    })
  }
});

const DrawerNavigator = createStackNavigator(
  {
    UserProfile: {
      screen: UserProfile,
      navigationOptions: () => ({
        headerTitle: "Perfil",
        headerTitleStyle: {
          marginLeft: "34%",
          color: "#FFF"
        }
      })
    },
    NextEvent: {
      screen: NextEvent,
      navigationOptions: () => ({
        headerTitle: "Proximo Evento",
        headerTitleStyle: {
          fontSize: 20,
          marginLeft: "31.5%",
          color: "#FFF"
        }
      })
    },
    ToExplore: {
      screen: ToExplore,
      navigationOptions: () => ({
        headerTitle: "Explorar",
        headerTitleStyle: {
          fontSize: 20,
          marginLeft: "31.5%",
          color: "#FFF"
        }
      })
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerButton navigation={navigation} />,
      headerStyle: {
        backgroundColor: "#18142F",
        borderColor: "#FFF"
      }
    })
  }
);

const pageNavigator = createStackNavigator({
  DrawerNavigator: {
    screen: DrawerNavigator,
    navigationOptions: () => ({
      headerTransparent: true,
      headerLeft: null
    })
  },
  PhotoGallery,
  Availability: {
    screen: Availability,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push("UserProfile")}
        />
      )
    })
  },
  AvailabilityDays: {
    screen: AvailabilityDays,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push("Availability")}
        />
      )
    })
  },
  SpecialHours: {
    screen: SpecialHours,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push("Availability")}
        />
      )
    })
  },
  Agency: {
    screen: Agency,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push("UserProfile")}
        />
      )
    })
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerTintColor: "#FFF",
      headerStyle: {
        marginTop: 20,
        marginLeft: 10
      },
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push("UserProfile")}
        />
      )
    })
  },
  Profession: {
    screen: Profession,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerTitle: "Meu Job",
      headerTitleStyle: {
        fontSize: 20,
        marginLeft: "30%",
        textAlign: "center",
        color: "#FFF"
      },
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push("UserProfile")}
        />
      )
    })
  },
  AddProfession: {
    screen: AddProfession,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerTitle: "Meu Job",
      headerTitleStyle: {
        fontSize: 20,
        marginLeft: "30%",
        textAlign: "center",
        color: "#FFF"
      },
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push("Profession")}
        />
      )
    })
  },
  AddAbiliity: {
    screen: AddAbiliity,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerTitle: "Meu Job",
      headerTitleStyle: {
        fontSize: 20,
        marginLeft: "30%",
        textAlign: "center",
        color: "#FFF"
      },
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push("Profession")}
        />
      )
    })
  },
  CheckList: {
    screen: CheckList,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push("NextEvent")}
        />
      )
    })
  },
  DetailNextEvent: {
    screen: DetailNextEvent,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push("CheckList")}
        />
      )
    })
  },
  CheckOut: {
    screen: CheckOut,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push("DetailNextEvent")}
        />
      )
    })
  },
  RatingsAgency: {
    screen: RatingsAgency,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push("CheckOut")}
        />
      )
    })
  },
  RatingsContractor: {
    screen: RatingsContractor,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push("RatingsAgency")}
        />
      )
    })
  },
  AboutMe: {
    screen: AboutMe,
    navigationOptions: ({ navigation }) => ({
      headerRight: (
        <TouchableOpacity style={{ right: 14 }}>
          <Text style={{ fontSize: 14, color: "#FFF" }}>Salvar</Text>
        </TouchableOpacity>
      ),
      headerTitle: "Sobre mim",
      headerStyle: {
        backgroundColor: "#18142F",
        borderColor: "#FFF"
      },
      headerTitleStyle: {
        fontSize: 23,
        marginLeft: "30%",
        color: "#FFF"
      },
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push("UserProfile")}
        />
      )
    })
  }
});

const DrawerNav = createDrawerNavigator(
  {
    DrawerNavigator: {
      screen: DrawerNavigator,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    UserProfile: { screen: UserProfile },
    NextEvent: { screen: NextEvent },
    ToExplore: { screen: ToExplore }
  },
  {
    contentComponent: drawerContentComponents,
    drawerWidth: 165,
    overlayColor: " rgba(0, 0, 0, 0.1)"
  }
);

const MainStack = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    Drawer: DrawerNav,
    page: pageNavigator
  },
  {
    initialRouteName: "Auth"
  }
);

const Routes = createAppContainer(MainStack);

export default Routes;
