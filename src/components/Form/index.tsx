import * as React from 'react';
import {
	Button,
	Text,
	TextInput,
	View,
	ActivityIndicator,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import {
	FormData,
	IFormInput,
	IFormProps,
	IFormState,
	IFormInputAutoComplete
} from './types';
export * from './types';

export class Form extends React.PureComponent<IFormProps, IFormState> {
	data: FormData;
	inputs: TextInput[];

	constructor(props: IFormProps) {
		super(props);
		this.data = {};
		this.state = {
			autoCompleteData: [],
			focusedInputIndex: null
		};
		this.props.inputs.forEach((input, i) =>
			this.handleOnChangeText(i, input.defaultValue || '')
		);
		this.inputs = [];
	}

	handleOnSubmit = () => {
		this.props.onSubmit(this.data);
	};

	handleOnChangeText = (i: number, value: string) => {
		const input = this.props.inputs[i];
		this.data[input.key] = value;
		if (value && value.length > 3 && input.autoComplete) {
			input
				.autoComplete(value)
				.then(
					(autoCompleteData: IFormInputAutoComplete[]) =>
						autoCompleteData.length &&
						this.setState({ autoCompleteData })
				)
				.catch(err => {});
		}
	};

	handleOnChangeAutoCompleteItem = (itemIndex: number, i: number) => {
		const item = this.state.autoCompleteData[itemIndex];
		this.handleOnChangeText(i, item.value);
		this.inputs[i].setNativeProps({ text: item.value });
		this.inputs[i].blur();
	};

	renderAutoComplete = (i: number) => {
		const input = this.inputs[i];
		const inputProps = this.props.inputs[i];
		if (
			input &&
			inputProps &&
			inputProps.autoComplete &&
			this.state.autoCompleteData.length &&
			this.state.focusedInputIndex === i
		) {
			return (
				<View>
					<View style={styles.autoCompleteContainer}>
						{this.state.autoCompleteData.map((item, itemIndex) => (
							<TouchableOpacity
								key={item.key}
								style={styles.autoCompleteItemContainer}
								onPress={() =>
									this.handleOnChangeAutoCompleteItem(
										itemIndex,
										i
									)
								}
							>
								<Text>{item.value}</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>
			);
		}
		return null;
	};

	handleOnEndEditing = (i: number) => {
		const inputProps = this.props.inputs[i];
		const nextIndex = i + 1;
		inputProps.returnKeyType === 'next' &&
			this.inputs[nextIndex] &&
			this.inputs[nextIndex].focus();
	};

	renderInput = (input: IFormInput, i: number) => {
		const zIndex = { zIndex: i };
		return (
			<View key={input.key} style={[styles.inputContainer, zIndex]}>
				<Text>{input.label}</Text>
				<TextInput
					ref={(ref: TextInput) => (this.inputs[i] = ref)}
					onChangeText={text => this.handleOnChangeText(i, text)}
					onBlur={() =>
						this.setState({
							autoCompleteData: [],
							focusedInputIndex: null
						})
					}
					onFocus={() => this.setState({ focusedInputIndex: i })}
					onEndEditing={() => this.handleOnEndEditing(i)}
					style={styles.input}
					{...input}
				/>
				{this.renderAutoComplete(i)}
			</View>
		);
	};

	renderButton = () => {
		if (this.props.isFetch) {
			return <ActivityIndicator />;
		}
		return (
			<Button
				title={this.props.buttonLabel}
				onPress={this.handleOnSubmit}
			/>
		);
	};

	public render() {
		return (
			<View style={styles.container}>
				{this.props.inputs.map(this.renderInput)}
				<View style={styles.buttonContainer}>
					{this.renderButton()}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 20
	},
	inputContainer: {
		marginBottom: 10,
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	input: {
		fontSize: 14,
		height: 30
	},
	buttonContainer: {
		height: 40,
		justifyContent: 'center'
	},
	autoCompleteContainer: {
		top: 0,
		left: 0,
		backgroundColor: 'white',
		position: 'absolute',
		width: '100%',
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 10
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 12
	},
	autoCompleteItemContainer: {
		padding: 10,
		borderBottomWidth: StyleSheet.hairlineWidth
	}
});
