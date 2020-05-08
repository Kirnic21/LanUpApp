import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AuthNavigator from "~/routes/AuthNavigator";
import DrawerNav from "~/routes/DrawerNavigator";
import VacancyModal from "~/shared/components/Vacancy/VacancyModal";

const AppModalStack = createStackNavigator(
  {
    App: DrawerNav,
    Modal: {
      screen: VacancyModal,
    },
  },
  {
    mode: "modal",
    headerMode: "none",
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: "transparent",
        opacity: 1,
      },
      transitionConfig: () => ({
        containerStyle: {
          backgroundColor: "transparent",
        },
      }),
    },
  }
);

const Routes = (userlogged = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Drawer: AppModalStack,
        Auth: AuthNavigator,
      },
      {
        initialRouteName: userlogged ? "Drawer" : "Auth",
      }
    )
  );

export default Routes;
