import * as React from 'react';
import {
  ActivityIndicator,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  FormData,
  IFormInput,
  IFormInputAutoComplete,
  IFormProps,
  IFormState,
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
      focusedInputIndex: null,
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
            autoCompleteData.length && this.setState({ autoCompleteData })
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
    const inputProps = this.props.inputs[i];
    if (
      inputProps &&
      inputProps.autoComplete &&
      this.state.autoCompleteData &&
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
                  this.handleOnChangeAutoCompleteItem(itemIndex, i)
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
              focusedInputIndex: null,
            })
          }
          onFocus={() => this.setState({ focusedInputIndex: i })}
          onEndEditing={() => this.handleOnEndEditing(i)}
          style={styles.input}
          defaultValue={input.defaultValue}
          keyboardType={input.keyboardType}
          returnKeyType={input.returnKeyType}
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
      <Button title={this.props.buttonLabel} onPress={this.handleOnSubmit} />
    );
  };

  public render() {
    const paddingBottom =
      this.state.autoCompleteData.length * styles.autoCompleteContainer.height;
    return (
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode='always'>
        <View style={[styles.container, { paddingBottom }]}>
          {this.props.inputs.map(this.renderInput)}
          <View style={styles.buttonContainer}>{this.renderButton()}</View>
          {this.props.footerComponent ? this.props.footerComponent : null}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginBottom: 0,
  },
  inputContainer: {
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    fontSize: 14,
    height: Platform.OS === 'ios' ? 30 : 40,
  },
  buttonContainer: {
    height: 40,
    marginBottom: 10,
    justifyContent: 'center',
    zIndex: -1,
  },
  autoCompleteContainer: {
    height: 60,
    top: 0,
    left: 0,
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 12,
  },
  autoCompleteItemContainer: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
