import { MainScreenComp } from './MainScreen';
import { connect } from 'react-redux';
import { AppState } from '../../redux/rootReducer';
import { AddTransScreenComp } from './AddTransScreen';
import { bindActionCreators } from 'redux';
import { transSetData, transAddData } from '../../redux/actions/transActions';
import { userSetData } from '../../redux/actions/userActions';

export const MainScreen = connect(
  (state: AppState) => ({ ...state.user, transactions: state.trans }),
  dispatch =>
    bindActionCreators({ transSetData, transAddData, userSetData }, dispatch)
)(MainScreenComp);

export const AddTransScreen = connect(
  (state: AppState) => ({ ...state.user }),
  dispatch => bindActionCreators({ transAddData, userSetData }, dispatch)
)(AddTransScreenComp);
