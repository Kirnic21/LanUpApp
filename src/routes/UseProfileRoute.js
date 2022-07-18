import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import UserProfile from "~/pages/UserProfile/UserProfile";
import ViewProfile from "~/pages/UserProfile/ViewProfile";
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
import WorkDone from "~/pages/UserProfile/WorkDone";

import AccountSettings from "~/pages/UserProfile/AccountSettings";
import DeleteAccount from "~/pages/UserProfile/AccountSettings/DeleteAccount";
import ReasonExclusion from "~/pages/UserProfile/AccountSettings/DeleteAccount/reasonExclusion";

import { calcWidth, adjust } from "~/assets/Dimensions/index";
import ButtonNavigation from "~/shared/components/ButtonNavigation";
import VacanciesDetails from "~/pages/Explore/VacanciesDetails/VacanciesDetails";
import CertificateModal from "~/pages/UserProfile/Certificate/CertificateModal";

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
    ViewProfile: {
      screen: ViewProfile,
      navigationOptions: () => ({
        headerTitle: "Visualizar Perfil",
      }),
    },
    AboutMe: {
      screen: AboutMe,
      navigationOptions: () => ({
        headerTitle: "Sobre mim",
      }),
    },
    Agency: {
      screen: Agency,
      navigationOptions: () => ({ headerTitle: "Empresas" }),
    },
    Profession: {
      screen: Profession,
      navigationOptions: () => ({ headerTitle: "Funções que atuo" }),
    },
    AddProfession: {
      screen: AddProfession,
      navigationOptions: () => ({ headerTitle: "Funções que atuo" }),
    },
    AddSkill: {
      screen: AddSkill,
      navigationOptions: () => ({ headerTitle: "Funções que atuo" }),
    },
    PhotoGallery: {
      screen: PhotoGallery,
      navigationOptions: () => ({ headerTitle: "Fotos dos trabalhos" }),
    },
    Certificates: {
      screen: Certificates,
      navigationOptions: () => ({ headerTitle: "Certificados" }),
    },
    CertificateModal: {
      screen: CertificateModal,
      navigationOptions: ({ navigation }) => ({
        headerTitle: () => null,
        headerTransparent: true,
        headerLeft: () => null,
      }),
    },
    Availability: {
      screen: Availability,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Disponibilidade",
        headerLeft: () => (
          <ButtonNavigation
            type="route"
            nameRoute="UserProfile"
            navigation={navigation}
          />
        ),
      }),
    },
    AvailabilityDays: {
      screen: AvailabilityDays,
      navigationOptions: () => ({ headerTitle: "Disponibilidade" }),
    },
    SpecialHours: {
      screen: SpecialHours,
      navigationOptions: () => ({ headerTitle: "Horários Especiais" }),
    },

    WorkDone: {
      screen: WorkDone,
      navigationOptions: () => ({ headerTitle: "Trabalhos Realizados" }),
    },

    AccountSettings: {
      screen: AccountSettings,
      navigationOptions: () => ({
        headerTitle: "Configurações da conta",
        gestureEnabled: true,
      }),
    },

    DeleteAccountStep1: {
      screen: DeleteAccount,
      navigationOptions: () => ({ headerTitle: "Excluir Conta" }),
    },

    DeleteAccountStep2: {
      screen: DeleteAccount,
      navigationOptions: () => ({ headerTitle: "Excluir Conta" }),
    },

    ReasonExclusion: {
      screen: ReasonExclusion,
      navigationOptions: () => ({ headerTitle: "Motivo da exclusão" }),
    },

    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: () => ({
        headerTitle: () => null,
        headerTransparent: true,
        headerStyle: {
          height: Platform.OS === "ios" ? calcWidth(25) : calcWidth(20),
        },
      }),
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitleAlign: "center",
      headerTintColor: "#FFFFFF",
      headerStyle: {
        backgroundColor: "#18142F",
        height: Platform.OS === "ios" ? calcWidth(25) : calcWidth(15),
      },
      headerTitleStyle: {
        color: "#FFFF",
        fontFamily: "HelveticaNowMicro-Regular",
        fontSize: adjust(14),
      },
      headerLeft: () => (
        <ButtonNavigation type="stack" navigation={navigation} />
      ),
    }),
    headerMode: "float",
  }
);
export default pageNavigator;
