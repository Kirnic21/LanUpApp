import * as React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
  NavigationActions
} from "react-navigation";
import { Text, View } from "react-native";

import { DrawerNavigator } from "~/routes/DrawerNavigator";
import ChangePassword from "~/pages/UserProfile/ChangePassword";
import AboutMe from "~/pages/UserProfile/About/AboutMe";
import Profession from "~/pages/UserProfile/MyJob/Profession";
import AddProfession from "~/pages/UserProfile/MyJob/AddProfession";
import AddSkill from "~/pages/UserProfile/MyJob/AddSkill/AddSkill";
import Availability from "~/pages/UserProfile/Availability/Availability";
import AvailabilityDays from "~/pages/UserProfile/Availability/AvailabilityDays";
import SpecialHours from "~/pages/UserProfile/Availability/SpecialHours/SpecialHours";
// import Agency from "~/pages/UserProfile/Agency/Agency";
// import Agencies from "~/pages/UserProfile/Agencies";
// import PreviewProfile from "~/pages/UserProfile/PreviewProfile";
import PhotoGallery from "~/shared/components/PhotoGallery";

import dimensions from "~/assets/Dimensions/index";
import NavigationTitle from "~/shared/components/NavigationTitle";

const pageNavigator = createStackNavigator(
  {
    DrawerNavigator: {
      screen: DrawerNavigator,
      navigationOptions: () => ({
        headerTransparent: true,
        headerLeft: null
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
    AboutMe: {
      screen: AboutMe,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <NavigationTitle title="Sobre mim" />,
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
        headerTitle: <NavigationTitle title="Meu Job" marginHorizontal="-8%" />,
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
        headerTitle: <NavigationTitle title="Meu Job" />,
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
        headerTitle: <NavigationTitle title="Meu Job" />,
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
    // Agencies: {
    //   screen: Agencies,
    //   navigationOptions: ({ navigation }) => ({
    //     title: "Agência",
    //     headerStyle: {
    //       backgroundColor: "#18142F",
    //       height: 70,
    //       elevation: -2
    //     },
    //     headerTitleStyle: {
    //       textAlign: "center",
    //       alignSelf: "center",
    //       width: "75%",
    //       fontFamily: "Montserrat-Bold",
    //       color: "#FFFFFF",
    //       fontSize: 20
    //     },
    //     headerLeft: (
    //       <HeaderBackButton
    //         tintColor="#FFf"
    //         onPress={() => navigation.push("UserProfile")}
    //       />
    //     )
    //   })
    // },
    PhotoGallery: {
      screen: PhotoGallery,
      navigationOptions: ({ navigation }) => ({
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
        headerTitle: (
          <NavigationTitle title="Disponibilidade" marginHorizontal="-7%" />
        ),
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
        headerTitle: <NavigationTitle title="Disponibilidade" />,
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
        headerTitle: <NavigationTitle title="Horários Especiais" />,
        headerLeft: (
          <HeaderBackButton
            tintColor="#FFf"
            onPress={() => navigation.push("Availability")}
          />
        )
      })
    },

    // Agency: {
    //   screen: Agency,
    //   navigationOptions: ({ navigation }) => ({
    //     title: "Sou Agência",
    //     headerStyle: {
    //       backgroundColor: "#18142F",
    //       height: 70,
    //       elevation: -2
    //     },
    //     headerTitleStyle: {
    //       textAlign: "center",
    //       alignSelf: "center",
    //       width: "75%",
    //       fontFamily: "Montserrat-Bold",
    //       color: "#FFFFFF",
    //       fontSize: 20
    //     },
    //     headerLeft: (
    //       <HeaderBackButton
    //         tintColor="#FFf"
    //         onPress={() => navigation.push("UserProfile")}
    //       />
    //     )
    //   })
    // },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: ({ navigation }) => ({
        headerTransparent: true,
        headerTintColor: "#FFF",
        headerStyle: {
          marginTop: dimensions(30),
          marginLeft: dimensions(10)
        },
        headerLeft: (
          <HeaderBackButton
            tintColor="#FFf"
            onPress={() => navigation.push("UserProfile")}
          />
        )
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#18142F",
        height: dimensions(70),
        elevation: -2
      }
    }
  }
);
export default pageNavigator;
