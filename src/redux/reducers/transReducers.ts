import { TransReduxAction, TransReduxActionType, ITransData } from '../../types';

export const transDefaultState: ITransData[] = [];

export const transReducer = (
	state = transDefaultState,
	{ type, payload }: TransReduxAction
): ITransData[] => {
	if (!(type in TransReduxActionType)) {
		return state;
	}
	switch (type) {
		case TransReduxActionType.TRANS_SET:
			return payload;

		case TransReduxActionType.TRANS_ADD:
            const trans = payload[0];
			const transExistsIndex = state.findIndex(
				t => t.id === trans.id
			);
			let newTransState = [...state];
			if (transExistsIndex > -1) {
				newTransState[transExistsIndex] = trans;
			} else {
				newTransState.unshift(trans);
			}
			return newTransState;

		default:
			return state;
	}
};