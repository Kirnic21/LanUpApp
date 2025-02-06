
import NextEventRoute from "~/routes/NextEventRoute";

import { NavigationContainer } from '@react-navigation/native';
import ToExplorerRoute from "~/routes/ToExplorerRoute";
import DrawerContentComponents from "~/shared/components/DrawerContentComponents";
import dimensions from "~/assets/Dimensions/index";
import UseProfileNavigator from "~/routes/UseProfileRoute";
import SchedulesRoute from "~/routes/SchedulesRoute";
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator()

const DrawerNav = ()=>{

    return(

  <Drawer.Navigator
    drawerContent={(props) => <DrawerContentComponents {...props} />}
    screenOptions={{
      headerShown: false,
      drawerStyle: {
        width: 130,
      },
      overlayColor: "rgba(0, 0, 0, 0.5)", // Adds a dim overlay when the drawer is open
      unmountOnBlur: true,
    }}
  >

        <Drawer.Screen  name ="UserProfile" component={UseProfileNavigator}/>
        <Drawer.Screen name="NextEvent" component={NextEventRoute}/>
        <Drawer.Screen name ="ToExplore" component={ToExplorerRoute}/>
        <Drawer.Screen  name ="Schedule" component={SchedulesRoute}/>
</Drawer.Navigator>


)};

export default DrawerNav;
