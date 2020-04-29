/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import createAppContainer from "./js/navigator/AppNavigators"
import { name as appName } from './app.json';
AppRegistry.registerComponent(appName, () => createAppContainer);
