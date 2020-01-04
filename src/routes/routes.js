import * as React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  HeaderBackButton,
  NavigationActions
} from "react-navigation";
import { TouchableOpacity, Text } from "react-native";

import AuthNavigator from "~/routes/AuthNavigator";
import { DrawerNav, DrawerNavigator } from "~/routes/DrawerNavigator";

import ChangePassword from "~/pages/UserProfile/ChangePassword";
import AboutMe from "~/pages/UserProfile/About/AboutMe";
import Profession from "~/pages/UserProfile/MyJob/Profession";
import AddProfession from "~/pages/UserProfile/MyJob/AddProfession";
import AddSkill from "~/pages/UserProfile/MyJob/AddSkill/AddSkill";
import Availability from "~/pages/UserProfile/Availability/Availability";
import AvailabilityDays from "~/pages/UserProfile/Availability/AvailabilityDays";
import SpecialHours from "~/pages/UserProfile/Availability/SpecialHours/SpecialHours";
import Agency from "~/pages/UserProfile/Agency/Agency";
import Agencies from "~/pages/UserProfile/Agencies";
// import PreviewProfile from "~/pages/UserProfile/PreviewProfile";

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
          onPress={() => navigation.goBack()}
        />
      )
    })
  },
  Availability: {
    screen: Availability,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Disponibilidade",
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
  AvailabilityDays: {
    screen: AvailabilityDays,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Disponibilidade",
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
          onPress={() =>
            navigation.reset(
              [NavigationActions.navigate({ routeName: "Availability" })],
              0
            )
          }
        />
      )
    })
  },
  SpecialHours: {
    screen: SpecialHours,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Horários Especiais",
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
          onPress={() => navigation.push("Availability")}
        />
      )
    })
  },
  // TODO: essa rota está pausada. será descomentada assim que retorna-la
  // PreviewProfile: {
  //   screen: PreviewProfile,
  //   navigationOptions: ({ navigation }) => ({
  //     headerTransparent: true,
  //     headerStyle: {
  //       marginTop: 20
  //     },
  //     headerLeft: (
  //       <HeaderBackButton
  //         tintColor="#FFf"
  //         onPress={() => navigation.push("UserProfile")}
  //       />
  //     )
  //   })
  // },
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
  Agencies: {
    screen: Agencies,
    navigationOptions: ({ navigation }) => ({
      title: "Agência",
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
      headerTitle: "Meu Job",
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
  AddProfession: {
    screen: AddProfession,
    navigationOptions: ({ navigation }) => ({
      // headerTransparent: true,
      headerTitle: "Meu Job",
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
          onPress={() => navigation.navigate("Profession")}
        />
      )
    })
  },
  AddSkill: {
    screen: AddSkill,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Meu Job",
      headerStyle: {
        backgroundColor: "#18142F",
        height: 70,
        elevation: -2
      },
      headerTitleStyle: {
        textAlign: "center",
        alignSelf: "center",
        width: "70%",
        fontFamily: "Montserrat-Bold",
        color: "#FFFFFF",
        fontSize: 20
      },
      headerLeft: (
        <HeaderBackButton
          tintColor="#FFf"
          onPress={() =>
            navigation.reset(
              [NavigationActions.navigate({ routeName: "Profession" })],
              0
            )
          }
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
        width: "88%",
        fontFamily: "Montserrat-Bold",
        color: "#FFFFFF",
        fontSize: 18
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
