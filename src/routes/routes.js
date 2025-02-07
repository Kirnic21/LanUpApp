
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from "~/routes/AuthNavigator";
import DrawerNav from "~/routes/DrawerNavigator";
import VacancyModal from "~/shared/components/Vacancy/VacancyModal";
import UseProfileNavigator from "~/routes/UseProfileRoute";
import SchedulesRoute from "~/routes/SchedulesRoute";
import ToExplorerRoute from "~/routes/ToExplorerRoute";
import DrawerContentComponents from "~/shared/components/DrawerContentComponents";
import NextEventRoute from "~/routes/NextEventRoute";
import { NavigationContainer } from '@react-navigation/native';
import CertificateModal from "~/pages/UserProfile/Certificate/CertificateModal";

const Stack = createStackNavigator()

const AppModalStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'transparent',
          opacity: 1,
        },
      }}
    >
      <Stack.Screen name="App" component={DrawerNav} />
      <Stack.Screen
        name="Modal"
        component={VacancyModal}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

const Routes = ({userLogged = false}) =>{

  return(

         <Stack.Navigator screenOptions={{ headerShown:false }} initialRouteName={userLogged ? 'Drawer' : 'Auth'}>
           {userLogged ? (
             <Stack.Screen screenOptions={{ headerShown:false }} name="Drawer" component={AppModalStack} />
           ) : (
             <Stack.Screen screenOptions={{ headerShown:false }} name="Auth" component={AuthNavigator} />
           )}
         </Stack.Navigator>

  )
  };

export default Routes;
