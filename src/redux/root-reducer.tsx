import {all} from 'redux-saga/effects';
import {combineReducers} from 'redux';

import * as auth from '../app/pages/auth/_redux/auth-redux';

export const rootReducer: any = combineReducers({
  auth: auth.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
