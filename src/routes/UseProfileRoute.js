import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";

import UserProfile from "~/pages/UserProfile/UserProfile";
import AboutMe from "~/pages/UserProfile/About/AboutMe";
import Profession from "~/pages/UserProfile/MyJob/Profession";
import AddProfession from "~/pages/UserProfile/MyJob/AddProfession";
import AddSkill from "~/pages/UserProfile/MyJob/AddSkill";
import Agency from "~/pages/UserProfile/Agency/Agency";
import PhotoGallery from "~/shared/components/PhotoGallery";
import Certificates from "~/pages/UserProfile/Certificate/Certificates";
import ChangePassword from "~/pages/UserProfile/ChangePassword";
import Availability from "~/pages/UserProfile/Availability/Availability";
import AvailabilityDays from "~/pages/UserProfile/Availability/AvailabilityDays";
import SpecialHours from "~/pages/UserProfile/Availability/SpecialHours";

import { calcWidth } from "~/assets/Dimensions/index";
import ButtonNavigation from "~/shared/components/ButtonNavigation";
import VacanciesDetails from "~/pages/Explore/VacanciesDetails/VacanciesDetails";
import CertificateModal from "~/pages/UserProfile/Certificate/CertificateModal";

export const CertificateRoute = createStackNavigator(
  {
    CertificateModal: {
      screen: CertificateModal,
    },
  },
  {
    headerMode: "none",
    mode: "modal",
  }
);

const pageNavigator = createStackNavigator(
  {
    UserProfile: {
      screen: UserProfile,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Perfil",
        headerLeft: () => (
          <ButtonNavigation type="drawer" navigation={navigation} />
        ),
      }),
    },
    VacanciesDetails: {
      screen: VacanciesDetails,
      navigationOptions: () => ({
        headerTitle: () => null,
        headerTransparent: true,
        headerStyle: { height: calcWidth(20) },
      }),
    },
    AboutMe: {
      screen: AboutMe,
      navigationOptions: () => ({
        headerTitle: "Sobre mim",
      }),
    },
    Profession: {
      screen: Profession,
      navigationOptions: () => ({ headerTitle: "Meu Job" }),
    },
    Agency: {
      screen: Agency,
      navigationOptions: () => ({ headerTitle: "Agência" }),
    },
    AddProfession: {
      screen: AddProfession,
      navigationOptions: () => ({ headerTitle: "Meu Job" }),
    },
    AddSkill: {
      screen: AddSkill,
      navigationOptions: () => ({ headerTitle: "Meu Job" }),
    },
    PhotoGallery: {
      screen: PhotoGallery,
      navigationOptions: () => ({ headerTitle: "Galeria" }),
    },
    Certificates: {
      screen: Certificates,
      navigationOptions: () => ({ headerTitle: "Certificados" }),
    },
    CertificateModal: {
      screen: CertificateRoute,
      navigationOptions: ({ navigation }) => ({
        headerTitle: () => null,
        headerTransparent: true,
        headerLeft: () => null,
      }),
    },
    Availability: {
      screen: Availability,
      navigationOptions: () => ({ headerTitle: "Disponibilidade" }),
    },
    AvailabilityDays: {
      screen: AvailabilityDays,
      navigationOptions: () => ({ headerTitle: "Disponibilidade" }),
    },
    SpecialHours: {
      screen: SpecialHours,
      navigationOptions: () => ({ headerTitle: "Horários Especiais" }),
    },

    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: () => ({
        headerTitle: null,
        headerTransparent: true,
        headerStyle: { height: calcWidth(20) },
      }),
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitleAlign: "center",
      headerTintColor: "#FFFFFF",
      headerStyle: {
        backgroundColor: "#18142F",
        height: calcWidth(15),
      },
      headerTitleStyle: {
        color: "#FFFF",
        fontFamily: "HelveticaNowMicro-Regular",
        fontSize: calcWidth(5),
      },
      headerLeft: () => (
        <ButtonNavigation type="stack" navigation={navigation} />
      ),
    }),
  },
  {
    mode: "modal",
    headerMode: "none",
  }
);
export default pageNavigator;
