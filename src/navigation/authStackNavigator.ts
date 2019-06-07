import { createStackNavigator } from 'react-navigation';
import { stackConfig } from './configs';
import { NavigationNames } from '../types';
import {RegScreen, LoginScreen} from '../screens';
import { strings } from '../common/strings';

export const authStackNavigator = createStackNavigator(
	{
		[NavigationNames.LOGIN_SCREEN]: {
			screen: LoginScreen,
			navigationOptions:{
				title: strings.login
			}
		},
		[NavigationNames.REG_SCREEN]: {
			screen: RegScreen,
			navigationOptions:{
				title: strings.registration
			}
		}
	},
	stackConfig
);
