import {Action} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {put, takeLatest} from 'redux-saga/effects';
import {PROJECT_NAME} from '../../../common-library/common-consts/enviroment';

export class AuthAction implements Action {
  type: any;
  payload: any;
}

export const actionTypes = {
  Login: '[Login] Action',
  SaveUserInfo: '[Login] SaveUserInfo',
  Logout: '[Logout] Action',
  Register: '[Register] Action',
  UserRequested: '[Request User] Action',
  UserLoaded: '[Load User] auth API',
  SaveCertificate: '[Login] SaveCertificate',
  SavePingErrorData: '[Login] SavePingErrorData',
  SaveNewPassword: '[Login] SaveNewPassword',
};

const initialAuthState = {};

export const reducer = persistReducer(
  {storage, key: PROJECT_NAME},
  (state = initialAuthState, action: AuthAction) => {
    switch (action.type) {
      // case actionTypes.Login: {
      //     const {authToken, privateKey, publicKey} = action.payload;
      //     return {authToken, user: undefined, privateKey, publicKey};
      // }
      case actionTypes.SaveUserInfo: {
        const payload = action.payload;
        return {...(state as {}), ...payload, _error: null};
      }
      case actionTypes.SavePingErrorData: {
        const payload = action.payload;
        return {...(state as {}), _error: payload};
      }
      case actionTypes.SaveNewPassword: {
        const payload = action.payload;
        return {...(state as {}), ...payload};
      }
      case actionTypes.SaveCertificate: {
        const payload = action.payload;
        return payload;
      }
      // case actionTypes.Register: {
      //     const {authToken, privateKey, publicKey} = action.payload;
      //     return {authToken, user: undefined, privateKey, publicKey};
      // }
      
      case actionTypes.Logout: {
        console.log(action);
        const payload = action.payload;
        return {...initialAuthState, _error: payload};
      }
      
      case actionTypes.UserLoaded: {
        const {user} = action.payload;
        return {...(state as {}), user};
      }
      
      default:
        return state;
    }
  },
);

export const actions = {
  login: (userInfo: any) => ({
    type: actionTypes.Login,
    payload: userInfo,
  }),
  saveUserInfo: (userInfo: any) => {
    return {
      type: actionTypes.SaveUserInfo,
      payload: userInfo,
    };
  },
  savePingErrorData: (data: any) => {
    return {
      type: actionTypes.SavePingErrorData,
      payload: data,
    };
  },
  saveCertificate: (certificate: any) => {
    return {
      type: actionTypes.SaveCertificate,
      payload: certificate,
    };
  },
  saveNewPassword: (data: any) => {
    return {
      type: actionTypes.SaveNewPassword,
      payload: data,
    };
  },
  register: (authToken: any, privateKey: any, publicKey: any) => ({
    type: actionTypes.Register,
    payload: {authToken, privateKey, publicKey},
  }),
  logout: () => ({type: actionTypes.Logout}),
  requestUser: (user: any | null) => ({type: actionTypes.UserRequested, payload: {user}}),
  fulfillUser: (user: any) => ({type: actionTypes.UserLoaded, payload: {user}}),
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser(null));
  });
  
  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser(null));
  });
  //
  // yield takeLatest(actionTypes.UserRequested, function* userRequested() {
  //   const data = yield getUserBySignature();
  //   console.log(data);
  //
  //   yield put(actions.fulfillUser(data.data));
  // });
}
