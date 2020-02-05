import { createDrawerNavigator } from "react-navigation";
import NextEventRoute from "~/routes/NextEventRoute";
import ToExplorerRoute from "~/routes/ToExplorerRoute";
import drawerContentComponents from "~/shared/components/drawerContentComponents";
import dimensions from "~/assets/Dimensions/index";
import UseProfileNavigator from "~/routes/UseProfileRoute";
import SchedulesRoute from "~/routes/SchedulesRoute";

const DrawerNav = createDrawerNavigator(
  {
    UserProfile: { screen: UseProfileNavigator },
    NextEvent: { screen: NextEventRoute },
    ToExplore: { screen: ToExplorerRoute },
    Schedule: { screen: SchedulesRoute }
  },
  {
    contentComponent: drawerContentComponents,
    drawerWidth: dimensions(130),
    overlayColor: " rgba(0, 0, 0, 0.5)",
    unmountInactiveRoutes: true
  }
);

export { DrawerNav };
