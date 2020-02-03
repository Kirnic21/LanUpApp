import * as React from "react";
import { createStackNavigator, HeaderBackButton } from "react-navigation";
import NavigationTitle from "~/shared/components/NavigationTitle";
import DrawerButton from "~/shared/components/DrawerButton";
import Schedule from "~/pages/Schedules/Schedule";
import dimensions from "~/assets/Dimensions/index";

const SchedulesRoute = createStackNavigator(
  {
    Schedule: {
      screen: Schedule,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        headerTitle: (
          <NavigationTitle title="Agendas" marginHorizontal={dimensions(-23)} />
        ),
        headerStyle: {
          backgroundColor: "#18142F",
          height: dimensions(40)
        },
        headerLeft: <DrawerButton navigation={navigation} />
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
export default SchedulesRoute;
