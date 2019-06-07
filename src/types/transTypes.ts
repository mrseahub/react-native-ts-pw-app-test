import { NavigationComponent } from 'react-navigation';

export interface ITransData {
	id: number;
	username: string;
	amount: number;
	date: string;
}

export interface ITransSendData {
	name: string;
	amount: number;
}

export interface ITransRequestData {
	id: number;
	amount: number;
	balance: number;
	username: string;
	date: string;
}

export type TransReduxAction = {
	type: TransReduxActionType;
	payload: ITransData[];
};

export type TransRequestData = {
	trans_token: ITransRequestData[];
};

export type TransRequestToken = {
	trans_token: ITransRequestData;
};

export interface ITransViewProps extends ITransData {
	navigation: NavigationComponent;
	transactions: ITransData[];
	transSetData(data: ITransData[]): void;
	transAddData(data: ITransData): void;
}

export enum TransReduxActionType {
	TRANS_SET = 'TRANS_SET',
	TRANS_ADD = 'TRANS_ADD'
}
