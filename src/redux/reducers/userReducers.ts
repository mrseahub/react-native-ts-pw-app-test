import {
  UserDefaultState,
  UserReduxAction,
  UserReduxActionType,
} from '../../types';

const userDefaultState: UserDefaultState = {
  id: 0,
  id_token: '',
  username: '',
  name: '',
  email: '',
  password: '',
  balance: 0,
};

export const userReducer = (
  state = userDefaultState,
  { type, payload }: UserReduxAction
): UserDefaultState => {
  if (!(type in UserReduxActionType)) {
    return state;
  }
  switch (type) {
    case UserReduxActionType.USER_SET:
      return { ...state, ...payload };

    default:
      return state;
  }
};
