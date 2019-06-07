import { connect } from 'react-redux';
import { LoginScreenComp } from './LoginScreen';
import { RegScreenComp } from './RegScreen';
import { bindActionCreators } from 'redux';
import { userSetData } from '../../redux/actions/userActions';

export const LoginScreen = connect(
  null,
  dispatch => bindActionCreators({ userSetData }, dispatch)
)(LoginScreenComp);

export const RegScreen = connect(
  null,
  dispatch => bindActionCreators({ userSetData }, dispatch)
)(RegScreenComp);
