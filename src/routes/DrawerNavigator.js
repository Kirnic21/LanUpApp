import * as React from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerActions
} from "react-navigation";
import { Image, TouchableOpacity, View } from "react-native";
import IconMenu from "~/assets/images/icon_menu.png";

import UserProfile from "~/pages/UserProfile/UserProfile";
import NextEvent from "~/pages/NextEvent/NextEvent";
import ToExplore from "~/pages/Explore/ToExplore";
import drawerContentComponents from "~/shared/components/drawerContentComponents";

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

export { DrawerNav, DrawerNavigator };
