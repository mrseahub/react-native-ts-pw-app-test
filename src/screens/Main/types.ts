import { IUserViewProps, ITransViewProps, ITransData } from '../../types';

export type UserTransScreenCompProps = IUserViewProps & ITransViewProps;

export interface UserTransScreenState {
	isFetch: boolean;
	data?: ITransData[]
}

export interface TransListItemProps {
	key: string;
	title: string;
	note: string;
	amount: string;
}