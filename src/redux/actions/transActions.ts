import { TransReduxActionType, ITransData } from '../../types';

export const transSetData = (payload: ITransData[]) => (dispatch: any) => {
  dispatch({
    type: TransReduxActionType.TRANS_SET,
    payload,
  });
};

export const transAddData = (payload: ITransData) => (dispatch: any) => {
  dispatch({
    type: TransReduxActionType.TRANS_ADD,
    payload: [payload],
  });
};
