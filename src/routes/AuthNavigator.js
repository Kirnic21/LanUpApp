import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from "react-native";

import HomePage from "~/pages/Auth/index";
import LoginEmail from "~/pages/Auth/LoginEmail";
import RegisterStageOne from "~/pages/Auth/Register/RegisterStageOne";
import RegisterStageTwo from "~/pages/Auth/Register/RegisterStageTwo";
import SelectAvatar from "~/pages/Auth/SelectAvatar";
import Terms from "~/pages/Auth/terms";
import FeedBackExclusion from "~/pages/UserProfile/AccountSettings/DeleteAccount/feedBackExclusion";
import UseProfileNavigator from "~/routes/UseProfileRoute";

import ButtonNavigation from "~/shared/components/ButtonNavigation";

import { calcWidth } from "~/assets/Dimensions";

const Stack = createNativeStackNavigator()

const AuthNavigator = ()=> {

  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={({ navigation }) => ({
        headerTintColor: '#FFFFFF',
        headerTitle: () => null,
        headerTransparent: true,
        headerStyle: {
          height: Platform.OS === 'ios' ? calcWidth(25) : calcWidth(20),
        },
        headerLeft: () => <ButtonNavigation type="stack" navigation={navigation} />,
      })}
    >
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerLeft: () => null, // Remove the back button for this screen
        }}
      />
      <Stack.Screen name="LoginEmail" component={LoginEmail} />
      <Stack.Screen name="RegisterStageOne" component={RegisterStageOne} />
      <Stack.Screen name="RegisterStageTwo" component={RegisterStageTwo} />
      <Stack.Screen name="SelectAvatar" component={SelectAvatar} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen
        name="FeedBackExclusion"
        component={FeedBackExclusion}
        options={{
          headerTitle: () => null,
          headerTransparent: true,
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name = "UserProfile" component = {UseProfileNavigator}/>
    </Stack.Navigator>
  );
}

export default AuthNavigator;
