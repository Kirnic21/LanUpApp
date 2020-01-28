import * as React from "react";
import { createStackNavigator, HeaderBackButton } from "react-navigation";
import VacanciesDetails from "~/pages/Explore/VacanciesDetails/VacanciesDetails";
import NavigationTitle from "~/shared/components/NavigationTitle";
import DrawerButton from "~/shared/components/DrawerButton";
import ToExplore from "~/pages/Explore/ToExplore";
import dimensions from "~/assets/Dimensions/index";

const ToExplorerRoute = createStackNavigator(
  {
    ToExplore: {
      screen: ToExplore,
      navigationOptions: ({ navigation }) => ({
        headerTitle: (
          <NavigationTitle
            title="Explorar"
            marginHorizontal={dimensions(-23)}
          />
        ),
        headerStyle: {
          backgroundColor: "#18142F",
          height: dimensions(40)
        },
        headerLeft: <DrawerButton navigation={navigation} />
      })
    },
    VacanciesDetails: {
      screen: VacanciesDetails,
      navigationOptions: ({ navigation }) => ({
        headerTransparent: true,
        headerStyle: {
          marginTop: 20
        },
        headerLeft: (
          <HeaderBackButton
            tintColor="#FFf"
            onPress={() => navigation.goBack()}
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
export default ToExplorerRoute;
