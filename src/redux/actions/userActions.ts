import { UserReduxActionType, UserDefaultState } from '../../types';

export const userSetData = (payload: UserDefaultState) => (
	dispatch: any
) => {
	dispatch({
		type: UserReduxActionType.USER_SET,
		payload
	});
};
