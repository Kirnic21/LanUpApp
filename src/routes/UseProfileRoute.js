import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import Schedule from "~/pages/Schedules/Schedule";
import ToExplore from "~/pages/Explore/ToExplore";

const Stack = createNativeStackNavigator();

export default function PageNavigator() {

  return (
    <Stack.Navigator

      screenOptions={({ navigation }) => ({

        headerTitleAlign: "center",
        headerTintColor: "#FFFFFF",
        headerStyle: {
          backgroundColor: "#18142F",
          height: Platform.OS === "ios" ? calcWidth(25) : calcWidth(15),
        },
        headerTitleStyle: {
          color: "#FFFF",
          fontFamily: "HelveticaNowMicro-Regular",
          fontSize: adjust(Math.round(14)),
        },



      })}
    >

      <Stack.Screen

        name="UserProfile"
        component={UserProfile}
        options={({ navigation }) => ({
          headerTitle: "Perfil",
          headerLeft: () => (
            <ButtonNavigation type="drawer" navigation={navigation} />
          ),
        })}
      />
      <Stack.Screen
        name="VacanciesDetails"
        component={VacanciesDetails}
        options={{
          headerTitle: () => null,
          headerTransparent: true,
          headerStyle: { height: calcWidth(Math.round(20)) },
        }}
      />
      <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={({ navigation }) => ({
          headerTitle: "Escalas",
          headerLeft: () => (
            <ButtonNavigation type="drawer" navigation={navigation} />
          ),
        })}
      />
      <Stack.Screen
        name="ToExplore"
        component={ToExplore}
        options={({ navigation }) => ({
          headerTitle: "Vagas",
          headerLeft: () => (
            <ButtonNavigation type="drawer" navigation={navigation} />
          ),
        })}
      />
      <Stack.Screen
        name="ViewProfile"
        component={ViewProfile}
        options={{
          headerTitle: "Visualizar Perfil",
        }}
      />
      <Stack.Screen
        name="AboutMe"
        component={AboutMe}
        options={{
          headerTitle: "Sobre mim",
        }}
      />
      <Stack.Screen
        name="Agency"
        component={Agency}
        options={{
          headerTitle: "Empresas",
        }}
      />
      <Stack.Screen
        name="Profession"
        component={Profession}
        options={{
          headerTitle: "Funções que atuo",
        }}
      />
      <Stack.Screen
        name="AddProfession"
        component={AddProfession}
        options={{
          headerTitle: "Funções que atuo",
        }}
      />
      <Stack.Screen
        name="AddSkill"
        component={AddSkill}
        options={{
          headerTitle: "Funções que atuo",
        }}
      />
      <Stack.Screen
        name="PhotoGallery"
        component={PhotoGallery}
        options={{
          headerTitle: "Fotos dos trabalhos",
        }}
      />
      <Stack.Screen
        name="Certificates"
        component={Certificates}
        options={{
          headerTitle: "Certificados",
        }}
      />
      <Stack.Screen
        name="CertificateModal"
        component={CertificateModal}
        options={{
          headerTitle: () => null,
          headerTransparent: true,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Availability"
        component={Availability}
        options={({ navigation }) => ({
          headerTitle: "Disponibilidade",
          headerLeft: () => (
            <ButtonNavigation
              type="route"
              nameRoute="UserProfile"
              navigation={navigation}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AvailabilityDays"
        component={AvailabilityDays}
        options={{
          headerTitle: "Disponibilidade",
        }}
      />
      <Stack.Screen
        name="SpecialHours"
        component={SpecialHours}
        options={{
          headerTitle: "Horários Especiais",
        }}
      />
      <Stack.Screen
        name="WorkDone"
        component={WorkDone}
        options={{
          headerTitle: "Trabalhos Realizados",
        }}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{
          headerTitle: "Configurações da conta",
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="DeleteAccountStep1"
        component={DeleteAccount}
        options={{
          headerTitle: "Excluir Conta",
        }}
      />
      <Stack.Screen
        name="ReasonExclusion"
        component={ReasonExclusion}
        options={{
          headerTitle: "Motivo da exclusão",
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerTitle: () => null,
          headerTransparent: true,
          headerStyle: {
            height: Platform.OS === "ios" ? calcWidth(25) : calcWidth(20),
          },
        }}
      />
    </Stack.Navigator>
  );
}

