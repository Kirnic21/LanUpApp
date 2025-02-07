import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
// import Geolocation from '@react-native-community/geolocation';

if(__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

AppRegistry.registerComponent(appName, () => App);

// const LogLocation = async (data) => {
//   console.log('START');
//   Geolocation.getCurrentPosition((position) => {
//     console.log(new Date(), position);
//   });
// }

// AppRegistry.registerHeadlessTask('LogLocation', () => LogLocation);
