import { createAppContainer } from 'react-navigation';
import { authSwitchNavigator } from './authSwitchNavigator';

export const AppContainer = createAppContainer(authSwitchNavigator)