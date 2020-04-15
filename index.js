import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('bishop_nutrition0.1.9', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('bishop_nutrition0.1.9', { rootTag });
}
