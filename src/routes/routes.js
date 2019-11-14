import * as React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  HeaderBackButton
} from "react-navigation";
import { TouchableOpacity, Text } from "react-native";

import AuthNavigator from "~/routes/AuthNavigator";
import { DrawerNav, DrawerNavigator } from "~/routes/DrawerNavigator";

import ChangePassword from "~/pages/UserProfile/ChangePassword";
import AboutMe from "~/pages/UserProfile/AboutMe";
import Profession from "~/pages/UserProfile/MyJob/Profession";
import AddProfession from "~/pages/UserProfile/MyJob/AddProfession";
import AddSkill from "~/pages/UserProfile/MyJob/AddSkill";
import Availability from "~/pages/UserProfile/Availability/Availability";
import AvailabilityDays from "~/pages/UserProfile/Availability/AvailabilityDays";
import SpecialHours from "~/pages/UserProfile/Availability/SpecialHours";
import Agency from "~/pages/UserProfile/Agency/Agency";

import DetailNextEvent from "~/pages/NextEvent/DetailNextEvent";
import CheckList from "~/pages/NextEvent/CheckList";
import CheckOut from "~/pages/NextEvent/CheckOut";
import RatingsAgency from "~/pages/NextEvent/RatingsAgency";
import RatingsContractor from "~/pages/NextEvent/RatingsContractor";
import PhotoGallery from "~/shared/components/PhotoGallery";

const pageNavigator = createStackNavigator({
  DrawerNavigator: {
    screen: DrawerNavigator,
    navigationOptions: () => ({
      headerTransparent: true,
      headerLeft: null
    })
  },
  PhotoGallery: {
    screen: PhotoGallery,
    navigationOptions: ({ navigation }) => ({
      // headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push("UserProfile")}
        />
      )
    })
  },
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
      title: "Sou Agência",
      headerStyle: {
        backgroundColor: "#18142F",
        height: 70,
        elevation: -2
      },
      headerTitleStyle: {
        textAlign: "center",
        alignSelf: "center",
        width: "75%",
        fontFamily: "Montserrat-Bold",
        color: "#FFFFFF",
        fontSize: 20
      },
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() => navigation.push("UserProfile")}
        />
      )
    })
  },
  ChangePassword: {
    screen: ChangePassword,
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
  AddSkill: {
    screen: AddSkill,
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
      headerTitle: "Sobre mim",
      headerStyle: {
        backgroundColor: "#18142F",
        height: 50,
        elevation: -2
      },
      headerTitleStyle: {
        textAlign: "center",
        alignSelf: "center",
        width: "75%",
        fontFamily: "Montserrat-Bold",
        color: "#FFFFFF",
        fontSize: 20
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
