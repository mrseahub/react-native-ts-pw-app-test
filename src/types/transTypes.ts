export interface ITransData {
    id: number;
	username: string;
	balance: number;
	amount: number;
}

export interface ITransSendData {
	name: string;
	amount: number;
}

export type TransReduxAction = { type: TransReduxActionType; payload: ITransData | ITransData[] };

export type TransRequestData = {
    trans_token: ITransData[];
}

export enum TransReduxActionType {
	TRANS_SET = 'TRANS_SET',
	TRANS_ADD = 'TRANS_ADD'
}