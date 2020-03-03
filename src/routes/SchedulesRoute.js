import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import DrawerButton from "~/shared/components/DrawerButton";
import Schedule from "~/pages/Schedules/Schedule";
import dimensions, { calcWidth } from "~/assets/Dimensions/index";

const SchedulesRoute = createStackNavigator(
  {
    Schedule: {
      screen: Schedule,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Agendas",
        headerLeft: () => <DrawerButton navigation={navigation} />
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: "center",
      headerTintColor: "#FFFFFF",
      headerStyle: {
        backgroundColor: "#18142F",
        height: calcWidth(12)
      },
      headerTitleStyle: {
        color: "#FFFF",
        fontFamily: "HelveticaNowMicro-Regular",
        fontSize: calcWidth(5)
      }
    }
  }
);
export default SchedulesRoute;
