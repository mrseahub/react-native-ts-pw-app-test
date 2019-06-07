import { combineReducers } from 'redux';
import { userReducer } from './reducers/userReducers';
import { transReducer } from './reducers/transReducers';

export const rootReducer = combineReducers({
    user: userReducer,
    trans: transReducer
})

export type AppState = ReturnType<typeof rootReducer>