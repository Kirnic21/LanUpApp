import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ButtonNavigation from "~/shared/components/ButtonNavigation";
import { calcWidth, adjust } from "~/assets/Dimensions/index";
import NextEvent from "~/pages/NextEvent/NextEvent";
import MapsGeolocation from "~/pages/NextEvent/OnTheWay/Geolocation/MapsGeolocation";
import Rating from "~/pages/NextEvent/CheckinAndCheckout/Rating";

const Stack = createNativeStackNavigator();

const NextEventRoute = () => {

  return (

      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerTitleAlign: "center",
          headerTintColor: "#FFFFFF",
          headerStyle: {
            height: calcWidth(13),
            backgroundColor: "#18142F",
          },
          headerTitleStyle: {
            color: "#FFFF",
            fontFamily: "HelveticaNowMicro-Regular",
            fontSize: adjust(15),
          },
          headerLeft: () => (
            <ButtonNavigation type="stack" navigation={navigation} />
          ),
        })}
        headerMode="float"
      >
        <Stack.Screen
          name="NextEvent"
          component={NextEvent}
          options={({ navigation }) => ({
            headerTransparent: true,
            headerStyle: {
              height: Platform.OS === "ios" ? calcWidth(25) : calcWidth(24),
            },
            headerTitle: "Operação",
            headerLeft: () => (
              <ButtonNavigation type="drawer" navigation={navigation} />
            ),
          })}
        />
        <Stack.Screen
          name="Rating"
          component={Rating}
          options={{
            headerTitle: "Avalie",
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="MapsGeolocation"
          component={MapsGeolocation}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>

  );
};
export default NextEventRoute;
