import React from 'react';
import { Alert, Button } from 'react-native';
import { userGetInfo, userLogin } from '../../common/api';
import { strings } from '../../common/strings';
import { Form, FormData, IFormInput } from '../../components';
import { IUserSendData, IUserViewProps, NavigationNames, UserInfoData, UserToken } from '../../types';

const inputs = [
	{
		key: 'email',
		label: strings.email,
		defaultValue: __DEV__ && 'test18364532@mail.ru',
		keyboardType:'email-address',
		returnKeyType: 'next'
	},
	{
		key: 'password',
		label: strings.password,
		secureTextEntry: true,
		defaultValue: __DEV__ && '123456',
		returnKeyType: 'done'
	}
] as IFormInput[];

export class LoginScreenComp extends React.Component<IUserViewProps, any> {
	state = { isFetch: false };

	handleOnLogin = ({ email, password }: FormData) => {
		this.setState({ isFetch: true });
		userLogin({ email, password } as IUserSendData)
			.then(({ id_token }: UserToken) =>
				userGetInfo(id_token).then((data: UserInfoData) => {
					this.setState({ isFetch: false });
					this.props.userSetData({...data.user_info_token, id_token} as any);
					this.props.navigation.navigate(
						NavigationNames.MAIN_NAVIGATOR,
						{userName: data.user_info_token.name}
					);
				})
			)
			.catch((err: string) => {
				this.setState({ isFetch: false });
				Alert.alert(strings.error, err);
			});
	};

	handleGoToReg = () => {
		this.props.navigation.navigate(NavigationNames.REG_SCREEN);
	};

	render() {
		return (
			<>
				<Form
					isFetch={this.state.isFetch}
					inputs={inputs}
					onSubmit={this.handleOnLogin}
					buttonLabel={strings.login}
				/>
				<Button
					title={strings.registration}
					onPress={this.handleGoToReg}
				/>
			</>
		);
	}
}
