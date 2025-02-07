import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VacanciesDetails from "~/pages/Explore/VacanciesDetails/VacanciesDetails";
import ButtonNavigation from "~/shared/components/ButtonNavigation";
import ToExplore from "~/pages/Explore/ToExplore";
import { calcWidth, adjust } from "~/assets/Dimensions/index";
import AboutMe from '~/pages/UserProfile/About/AboutMe';

const Stack = createNativeStackNavigator()
const ToExplorerRoute = () => {
  return (

      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: "#18142F",
            height: Platform.OS === "ios" ? calcWidth(25) : calcWidth(15),
          },
          headerTitleStyle: {
            color: "#FFFF",
            fontFamily: "HelveticaNowMicro-Regular",
            fontSize: adjust(15),
          },
        }}
      >
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
          name="AboutMe"
          component={AboutMe}
          options={{
            headerTitle: "Sobre mim",
          }}
        />
        <Stack.Screen
          name="VacanciesDetails"
          component={VacanciesDetails}
          options={{
            headerTitle: null,
            headerTransparent: true,
            headerStyle: { height: calcWidth(21) },
          }}
        />
      </Stack.Navigator>

  );
};

export default ToExplorerRoute;

