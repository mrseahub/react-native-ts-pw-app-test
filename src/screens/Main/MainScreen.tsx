import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationComponent } from 'react-navigation';
import { userGetTrans, userSendTrans } from '../../common/api';
import { strings } from '../../common/strings';
import {
  IUserData,
  NavigationNames,
  TransRequestData,
  ITransData,
  ITransRequestData,
  ITransSendData,
  TransRequestToken,
} from '../../types';
import {
  UserTransScreenCompProps,
  UserTransScreenState,
  TransListItemProps,
} from './types';

export class MainScreenComp extends React.Component<
  UserTransScreenCompProps,
  UserTransScreenState
> {
  state = {
    isFetch: false,
    data: (this.props.transactions || []) as ITransRequestData[],
  };

  static navigationOptions = ({ navigation }: NavigationComponent) => ({
    title: `Hello  ${navigation
      .dangerouslyGetParent()
      .getParam('userName', 'user')}!`,
    headerRight: (
      <Button
        title={strings.addPay}
        onPress={() => navigation.navigate(NavigationNames.ADD_TRANS_SCREEN)}
      />
    ),
  });

  handleAddTrans = () => {
    this.props.navigation.navigate(NavigationNames.ADD_TRANS_SCREEN);
  };

  handleRetryTrans = (i: number) => {
    const item = this.state.data[i];
    userSendTrans(this.props.id_token, {
      amount: item.amount,
      name: item.username,
    } as ITransSendData).then(
      ({
        trans_token: { id, date, username, amount, balance },
      }: TransRequestToken) => {
        this.props.transAddData({ id, date, username, amount });
        this.props.userSetData({ balance } as IUserData);
      }
    );
  };

  transListAdapter = (item: ITransData): TransListItemProps => ({
    key: `${item.id}`,
    title: item.username,
    note: item.date,
    amount: `${item.amount}`,
  });

  componentWillUpdate(nextProps: UserTransScreenCompProps) {
    if (nextProps.transactions !== this.props.transactions) {
      this.setState({ data: nextProps.transactions });
    }
  }

  componentDidMount() {
    this.setState({ isFetch: true });
    userGetTrans(this.props.id_token)
      .then(({ trans_token }: TransRequestData) => {
        this.props.transSetData(trans_token);
        this.setState({
          isFetch: false,
          data: trans_token,
        });
      })
      .catch((err: string) => {
        this.setState({ isFetch: false });
        Alert.alert(strings.error, err);
      });
  }

  renderItem = ({
    item,
    index,
  }: {
    item: TransListItemProps;
    index: number;
  }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemNote}>{item.note}</Text>
        </View>
        <Text style={styles.itemTitle}>{item.amount}</Text>
        <Button
          title={strings.retryPay}
          onPress={() => this.handleRetryTrans(index)}
        />
      </View>
    );
  };

  renderListEmptyComponent = () => {
    if (this.state.isFetch) {
      return <ActivityIndicator />;
    }
    return (
      <View style={styles.itemContainer}>
        <Button title={strings.addPay} onPress={() => this.handleAddTrans()} />
      </View>
    );
  };

  render() {
    const data = this.state.data.map(this.transListAdapter);
    return (
      <View style={styles.container}>
        <Text style={styles.balanceLabel}>{this.props.balance}</Text>
        <Text style={styles.yourBalanceLabel}>{strings.yourBalance}</Text>

        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item, i) => `${item.key}_${i}`}
          ListEmptyComponent={this.renderListEmptyComponent}
          initialNumToRender={10}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 100,
    fontWeight: '100',
    alignSelf: 'center',
    marginTop: 10,
  },
  yourBalanceLabel: {
    fontSize: 25,
    alignSelf: 'center',
    marginBottom: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemContainer: {
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    marginRight: 10,
  },
  itemNote: {
    fontSize: 10,
  },
});
