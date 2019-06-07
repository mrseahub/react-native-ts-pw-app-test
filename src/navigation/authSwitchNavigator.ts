import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { authStackNavigator } from './authStackNavigator';
import { mainStackNavigator } from './mainStackNavigator';
import { NavigationNames } from '../types';


class Auth extends React.Component<any> {
	componentDidMount() {
		this.props.navigation.navigate(NavigationNames.AUTH_NAVIGATOR);
	}
	public render() {
		return null;
	}
}

export const authSwitchNavigator = createSwitchNavigator({
	Auth,
	[NavigationNames.AUTH_NAVIGATOR]: authStackNavigator,
	[NavigationNames.MAIN_NAVIGATOR]: mainStackNavigator
});
