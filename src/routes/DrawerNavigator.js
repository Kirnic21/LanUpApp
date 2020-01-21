import * as React from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerActions
} from "react-navigation";
import { Image, TouchableOpacity, View } from "react-native";
import NextEvent from "~/pages/NextEvent/NextEvent";
import ToExplorerRoute from "~/routes/ToExplorerRoute";
import drawerContentComponents from "~/shared/components/drawerContentComponents";
import dimensions from "~/assets/Dimensions/index";
import UseProfileNavigator from "~/routes/UseProfileRoute";

// const DrawerNavigator = createStackNavigator(
//   {

//     NextEvent: {
//       screen: NextEvent,
//       navigationOptions: () => ({
//         headerTitle: "Proximo Evento",
//         headerTitleStyle: {
//           fontSize: 20,
//           marginLeft: "31.5%",
//           color: "#FFF"
//         }
//       })
//     },
//     ToExplore: {
//       screen: ToExplore,
//       navigationOptions: () => ({
//         headerTitle: (
//           <NavigationTitle
//             title="Explorar"
//             marginHorizontal={dimensions(-23)}
//           />
//         ),
//         headerTitleStyle: {
//           fontSize: 20,
//           marginLeft: "31.5%",
//           color: "#FFF"
//         }
//       })
//     }
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       headerLeft: <DrawerButton navigation={navigation} />,
//       headerStyle: {
//         backgroundColor: "#18142F",
//         borderColor: "#FFF"
//       }
//     })
//   }
// );

const DrawerNav = createDrawerNavigator(
  {
    UserProfile: { screen: UseProfileNavigator },
    NextEvent: { screen: NextEvent },
    ToExplore: { screen: ToExplorerRoute }
  },
  {
    contentComponent: drawerContentComponents,
    drawerWidth: dimensions(130),
    overlayColor: " rgba(0, 0, 0, 0.5)"
  }
);

export { DrawerNav };
