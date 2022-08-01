/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
// import messaging from '@react-native-firebase/messaging';


// messaging().setBackgroundMessageHandler(remoteMessage => {
//     console.log('Notification caused app to open from background state:',remoteMessage);
// });

AppRegistry.registerComponent(appName, () => App);
