import RNFetchBlob, { FetchBlobResponse } from 'react-native-fetch-blob';
import { strings } from './strings';
import { IUserSendData, ITransSendData } from '../types';

console.disableYellowBox = true;

export const debug = __DEV__
  ? console
  : { warn: () => {}, log: () => {}, error: () => {} };

export type Methods = 'POST' | 'GET' | 'DELETE' | 'PUT';

export const fetchApi = (
  url: string,
  method: Methods,
  token: string,
  data?: any
) => {
  const config = {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  debug.log('fetchApi => ', url, config);
  const errorStatuses = [400, 401];
  return RNFetchBlob.fetch(
    method,
    strings.baseUrl + url,
    config,
    data && JSON.stringify(data)
  )
    .then((res: FetchBlobResponse) => {
      debug.log('fetchApi => fetch => res', res);
      if (errorStatuses.indexOf(res.respInfo.status) > -1) {
        throw res.data;
      }
      debug.log('fetchApi => fetch =>  res.json()', res.json());
      return res.json();
    })
    .catch((err: any) => {
      debug.log('fetchApi => catch => ', url, err);
      throw `${err}`;
    });
};

export const userLogin = (data: IUserSendData) =>
  fetchApi(strings.loginUrl, 'POST', '', data);
export const userReg = (data: IUserSendData) =>
  fetchApi(strings.registrationUrl, 'POST', '', data);
export const userGetInfo = (id_token: string) =>
  fetchApi(strings.userUrl, 'GET', id_token);

export const userGetTrans = (id_token: string) =>
  fetchApi(strings.transactionsUrl, 'GET', id_token);
export const userSendTrans = (id_token: string, data: ITransSendData) =>
  fetchApi(strings.transactionsUrl, 'POST', id_token, data);

export const userAutoComplete = (id_token: string, filter: string) =>
  fetchApi(strings.filtredUsersUrl, 'POST', id_token, { filter });
