import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AuthNavigator from "~/routes/AuthNavigator";
import { DrawerNav } from "~/routes/DrawerNavigator";

const Routes = (userlogged = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Auth: AuthNavigator,
        Drawer: DrawerNav,
        // ToExplore: ToExploreRoute
      },
      {
        initialRouteName: userlogged ? "Drawer" : "Auth",
      }
    )
  );

export default Routes;
