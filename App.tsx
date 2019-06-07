import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { AppContainer } from './src/navigation';

export default class App extends React.Component {
	public render() {
		return (
			<Provider store={store}>
				<AppContainer />
			</Provider>
		);
	}
}