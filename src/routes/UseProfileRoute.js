import * as React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
  NavigationActions
} from "react-navigation";

import ChangePassword from "~/pages/UserProfile/ChangePassword";
import AboutMe from "~/pages/UserProfile/About/AboutMe";
import Profession from "~/pages/UserProfile/MyJob/Profession";
import AddProfession from "~/pages/UserProfile/MyJob/AddProfession";
import AddSkill from "~/pages/UserProfile/MyJob/AddSkill";
import Availability from "~/pages/UserProfile/Availability/Availability";
import AvailabilityDays from "~/pages/UserProfile/Availability/AvailabilityDays";
import SpecialHours from "~/pages/UserProfile/Availability/SpecialHours";
import PhotoGallery from "~/shared/components/PhotoGallery";
import dimensions from "~/assets/Dimensions/index";
import UserProfile from "~/pages/UserProfile/UserProfile";
import NavigationTitle from "~/shared/components/NavigationTitle";
import DrawerButton from "~/shared/components/DrawerButton";

const pageNavigator = createStackNavigator(
  {
    UserProfile: {
      screen: UserProfile,
      navigationOptions: ({ navigation }) => ({
        headerTitle: (
          <NavigationTitle title="Perfil" marginHorizontal={dimensions(-23)} />
        ),
        headerLeft: <DrawerButton navigation={navigation} />,
        headerStyle: {
          backgroundColor: "#18142F",
          height: dimensions(40)
        }
      })
    },
    AboutMe: {
      screen: AboutMe,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <NavigationTitle title="Sobre mim" />,
        headerLeft: (
          <HeaderBackButton
            tintColor="#FFf"
            onPress={() => navigation.goBack("UserProfile")}
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
