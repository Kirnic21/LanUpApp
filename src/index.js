import React, { useState, useEffect ,useReducer, useMemo} from "react";
import { StatusBar, Platform, NativeModules } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { LogLevel, OneSignal } from 'react-native-onesignal';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropdownAlert from 'react-native-dropdownalert';

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import store from "./store";
import Routes from "~/routes/routes";
import { initMomentPtBr } from "~/shared/helpers";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import { calcWidth } from "./assets/Dimensions";
import env from "react-native-config";
import { NativeBaseProvider } from "@gluestack-ui/themed-native-base";
import { createContext } from "react";
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;

initMomentPtBr();

const ONE_SIGNAL_ID = "974fc0c7-12f6-4d7a-8aca-c07d519c7dc1";
export const AuthContext = createContext();
const App = () => {
  const [userChecked, setUserChecked] = useState(false);


  // Reducer for authentication state management
  const [state, dispatch] = useReducer(
    (prevState, action) => {

      switch (action.type) {
        case 'RESTORE_TOKEN':

          return {
            ...prevState,
            userLogged: !!action.token,

            isLoading: false,
          };
        case 'SIGN_IN':

          return {
            ...prevState,
            userLogged: true,

          };
        case 'SIGN_OUT':

          return {
            ...prevState,
            userLogged: false,           // User is logged out
                   // Clear the token
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      userLogged: false,  // Changed from `isSignout` to `userLogged`
      userToken: null,
    }
  );

  // Memoize the auth context to prevent unnecessary rerenders
  const authContext = useMemo(
    () => ({
      signIn: async (data) => {

        // Dispatch the signIn action with the token
        dispatch({ type: 'SIGN_IN', token:data}); // Use apiToken from AsyncStorage for consistency
      },

      signOut: () => {
        console.log('Signing out');
        dispatch({ type: 'SIGN_OUT' });
      },

      signUp: async (data) => {
        console.log("SignUp data:", data);
        const token = data.token; // Ensure you have the token from the data



        // Dispatch the signIn action with the token
        dispatch({ type: 'SIGN_IN', token });
      },
    }),
    []
  );

  // Combined useEffect hook for initialization and token restoration
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize OneSignal
        await OneSignal.initialize(ONE_SIGNAL_ID);
        await OneSignal.Debug.setLogLevel(LogLevel.Verbose);

        // Restore token from AsyncStorage
        const token = await AsyncStorage.getItem('API_TOKEN');
        const deviceId = await OneSignal.User.getOnesignalId();
        await AsyncStorage.setItem('DEVICE_ID', deviceId);
        console.log(deviceId)
        // Dispatch the token restore action
        dispatch({ type: 'RESTORE_TOKEN', token });

        // Set user checked and logged state
        setUserChecked(true);

        // Handle network connectivity changes
        NetInfo.addEventListener((state) => {
          if (!state.isConnected) {
            AlertHelper.show('error', 'Erro', 'Sem conexão com a internet');
          }
        });

        // Handle in-app update if in production
        if (env.IS_PRODUCTION && Platform.OS === 'android') {
          NativeModules.InAppUpdate.checkUpdate();
        }
      } catch (error) {
        console.error('Component Mount error:', error);
      }
    };

    initializeApp();

    return () => {
      // Cleanup if necessary
    };
  }, []);  // Only run on mount


  if (!userChecked) return null;

  return (
    <AuthContext.Provider value={authContext}>
      <NativeBaseProvider>
        <>
          <NavigationContainer>
            <StatusBar backgroundColor="#18142F" barStyle="light-content" />
            <Provider store={store}>
              <Routes userLogged={state.userLogged} />
            </Provider>
          </NavigationContainer>
          {/* DropdownAlert should be outside NavigationContainer but inside the parent container */}
          <DropdownAlert
                    defaultContainer={{ padding: calcWidth(3), paddingTop: calcWidth(5) }}
                    updateStatusBar={false}
                    useNativeDriver
                    ref={(ref) => AlertHelper.setDropDown(ref)}
                    onClose={() => AlertHelper.invokeOnClose()}
                  />
        </>
      </NativeBaseProvider>
    </AuthContext.Provider>
  );
};

export default App;
