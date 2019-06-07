import { NavigationComponent } from 'react-navigation';

export interface IUserData {
  id: number;
  name: string;
  email: string;
  balance: number;
}

export interface IUserSendData {
  username: string;
  email: string;
  password: string;
}

export type UserToken = { id_token: string };

export type UserInfoData = {
  user_info_token: IUserData;
};

export type UserDefaultState = IUserData & IUserSendData & UserToken;

export interface IUserViewProps extends UserDefaultState {
  navigation: NavigationComponent;
  userSetData(data: IUserData): void;
}

export type UserReduxAction = {
  type: UserReduxActionType;
  payload: UserDefaultState;
};

export enum UserReduxActionType {
  USER_SET = 'USER_SET',
}
