import * as React from 'react';
import { userAutoComplete, userSendTrans } from '../../common/api';
import { strings } from '../../common/strings';
import { Form, FormData } from '../../components';
import { IFormInput } from '../../components/Form/types';
import {
	ITransSendData,
	IUserData,
	IUserViewProps,
	TransRequestToken
} from '../../types';

import { UserTransScreenCompProps, UserTransScreenState } from './types';

const inputs = (props: IUserViewProps) =>
	[
		{
			key: 'amount',
			label: strings.amount,
			keyboardType: 'numeric',
			defaultValue: __DEV__ && '12',
			returnKeyType: 'next'
		},
		{
			key: 'name',
			label: strings.recipient,
			returnKeyType: 'done',
			autoComplete: (text: string) =>
				userAutoComplete(props.id_token, text).then(
					(data: IUserData[]) =>
						data.map(user => ({ key: user.id, value: user.name }))
				)
		}
	] as IFormInput[];

export class AddTransScreenComp extends React.Component<
	UserTransScreenCompProps,
	UserTransScreenState
> {
	state = { isFetch: false };

	handleOnSendTrans = ({ amount, name }: FormData) => {
		userSendTrans(this.props.id_token, {
			amount: parseFloat(amount),
			name
		} as ITransSendData).then(
			({
				trans_token: { id, date, username, amount, balance }
			}: TransRequestToken) => {
				this.props.transAddData({ id, date, username, amount });
				this.props.userSetData({ balance } as IUserData);
				this.props.navigation.goBack(null);
			}
		);
	};

	render() {
		return (
			<Form
				isFetch={this.state.isFetch}
				inputs={inputs(this.props)}
				onSubmit={this.handleOnSendTrans}
				buttonLabel={strings.send}
			/>
		);
	}
}
