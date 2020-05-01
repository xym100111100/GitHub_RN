/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import createAppContainer from "./js/navigator/AppNavigators"
import { name as appName } from './app.json';
import App  from "./js/App"
AppRegistry.registerComponent(appName, () => App);
