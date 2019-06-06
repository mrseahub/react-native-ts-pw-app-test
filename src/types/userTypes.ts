export interface IUserData {
    id: number;
	name: string;
	email: string;
	balance: number;
}

export interface IUserSendData {
    token: string;
	username: string;
	email: string;
	password: string;
}

export type UserToken = {id_token:string}

export type UserInfoData = {
    user_info_token: IUserData;
}

export type UserReduxAction = { type: UserReduxActionType; payload: IUserData };

export enum UserReduxActionType {
	USER_SET = 'USER_SET'
}