import { TextInputProps } from 'react-native';

export interface IFormInput extends TextInputProps {
	key: string;
	label?: string;
	autoComplete?(value: string): Promise<any>;
}

export type FormData = {
	[key: string]: string;
};

export interface IFormProps {
	inputs: IFormInput[];
	buttonLabel: string;
	isFetch?: boolean;
	onSubmit(data: FormData): void;
}

export interface IFormInputAutoComplete {
	key: string;
	value: string;
}

export interface IFormState {
	autoCompleteData: IFormInputAutoComplete[];
	focusedInputIndex: number | null;
}
