import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ButtonNavigation from "~/shared/components/ButtonNavigation";
import Schedule from "~/pages/Schedules/Schedule";
import { calcWidth, adjust } from "~/assets/Dimensions/index";
import VacanciesDetails from "~/pages/Explore/VacanciesDetails/VacanciesDetails";


const Stack = createNativeStackNavigator()

const SchedulesRoute = ()=>{

     return (

          <Stack.Navigator
            screenOptions={({ navigation }) => ({

              headerTitleAlign: "center",
              headerTintColor: "#FFFFFF",
              headerStyle: {
                backgroundColor: "#142b2f",
                height: Platform.OS === "ios" ? calcWidth(25) : calcWidth(15),
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
          >
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
              name="VacanciesDetails"
              component={VacanciesDetails}
              options={({ navigation }) => ({
                headerTitle: "Detalhes da Vaga",
                headerTransparent: true,
                headerStyle: { height: calcWidth(15) },
              })}
            />
          </Stack.Navigator>

      );}
export default SchedulesRoute;
