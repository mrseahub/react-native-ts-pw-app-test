import { createStackNavigator } from 'react-navigation';
import { strings } from '../common/strings';
import { MainScreen, AddTransScreen } from '../screens';
import { stackConfig } from './configs';
import { NavigationNames } from '../types';

export const mainStackNavigator = createStackNavigator(
	{
		[NavigationNames.MAIN_SCREEN]: {
			screen: MainScreen
		},
		[NavigationNames.ADD_TRANS_SCREEN]: {
			screen: AddTransScreen,
			navigationOptions: {
				title: strings.newTrans
			}
		}
	},
	stackConfig
);
