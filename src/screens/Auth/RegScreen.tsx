import React from 'react';
import { Alert } from 'react-native';
import { strings } from '../../common/strings';
import { Form, IFormInput, FormData } from '../../components';
import {
  IUserViewProps,
  UserInfoData,
  IUserSendData,
  UserToken,
  NavigationNames,
} from '../../types';
import { userReg, userGetInfo } from '../../common/api';

const inputs = [
  {
    key: 'username',
    label: strings.userName,
    returnKeyType: 'next',
  },
  {
    key: 'email',
    label: strings.email,
    keyboardType: 'email-address',
    returnKeyType: 'next',
  },
  {
    key: 'password',
    label: strings.password,
    secureTextEntry: true,
    returnKeyType: 'next',
  },
  {
    key: 'confirmPassword',
    label: strings.confirmPassword,
    secureTextEntry: true,
    returnKeyType: 'done',
  },
] as IFormInput[];

export class RegScreenComp extends React.Component<IUserViewProps, any> {
  state = { isFetch: false };

  handleOnReg = ({ username, email, password, confirmPassword }: FormData) => {
    if (!username || !email || !password || !confirmPassword) {
      return Alert.alert(strings.error, strings.requiredValues);
    }
    if (password !== confirmPassword) {
      return Alert.alert(strings.error, strings.passwordVerify);
    }
    this.setState({ isFetch: true });
    userReg({ username, email, password } as IUserSendData)
      .then(({ id_token }: UserToken) =>
        userGetInfo(id_token).then((data: UserInfoData) => {
          this.props.userSetData({
            ...data.user_info_token,
            id_token,
          } as any);
          this.setState({ isFetch: false });
          this.props.navigation.navigate(NavigationNames.MAIN_NAVIGATOR);
        })
      )
      .catch((err: string) => {
        this.setState({ isFetch: false });
        Alert.alert(strings.error, err);
      });
  };

  render() {
    return (
      <Form
        inputs={inputs}
        onSubmit={this.handleOnReg}
        buttonLabel={strings.registration}
      />
    );
  }
}
