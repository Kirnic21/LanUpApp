import * as React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AuthNavigator from "~/routes/AuthNavigator";
import { DrawerNav } from "~/routes/DrawerNavigator";
import UseProfileNavigator from "~/routes/UseProfileRoute";

// CheckList: {
//   screen: CheckList,
//   navigationOptions: ({ navigation }) => ({
//     headerTransparent: true,
//     headerLeft: (
//       <HeaderBackButton
//         tintColor="#FFf"
//         onPress={() => navigation.push("NextEvent")}
//       />
//     )
//   })
// },
// DetailNextEvent: {
//   screen: DetailNextEvent,
//   navigationOptions: ({ navigation }) => ({
//     headerTransparent: true,
//     headerLeft: (
//       <HeaderBackButton
//         tintColor="#FFf"
//         onPress={() => navigation.push("CheckList")}
//       />
//     )
//   })
// },
// CheckOut: {
//   screen: CheckOut,
//   navigationOptions: ({ navigation }) => ({
//     headerTransparent: true,
//     headerLeft: (
//       <HeaderBackButton
//         tintColor="#FFf"
//         onPress={() => navigation.push("DetailNextEvent")}
//       />
//     )
//   })
// },
// RatingsAgency: {
//   screen: RatingsAgency,
//   navigationOptions: ({ navigation }) => ({
//     headerTransparent: true,
//     headerLeft: (
//       <HeaderBackButton
//         tintColor="#FFf"
//         onPress={() => navigation.push("CheckOut")}
//       />
//     )
//   })
// },
// RatingsContractor: {
//   screen: RatingsContractor,
//   navigationOptions: ({ navigation }) => ({
//     headerTransparent: true,
//     headerLeft: (
//       <HeaderBackButton
//         tintColor="#FFf"
//         onPress={() => navigation.push("RatingsAgency")}
//       />
//     )
//   })
// },

const MainStack = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    Drawer: DrawerNav,
    pageUseProfile: UseProfileNavigator
  },
  {
    initialRouteName: "Auth"
  }
);

const Routes = createAppContainer(MainStack);

export default Routes;
