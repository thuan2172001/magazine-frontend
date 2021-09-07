import {SignMessage} from '../app/pages/auth/service/auth-cryptography';
import {actionTypes} from '../app/pages/auth/_redux/auth-redux';
import {AxiosStatic} from 'axios';
import {EnhancedStore} from '@reduxjs/toolkit';
import * as url from "url";

const qs = require('qs');
const GetActionModule = (_url: string) => {
  const pathname = _url[0] === '/' ? _url : new URL(_url).pathname;
  return pathname.replaceAll('/', '-').substring(1);
};

export default function setupAxios(axios: AxiosStatic, store: EnhancedStore) {
  axios.interceptors.request.use(
    config => {
      config.paramsSerializer = params => {
        // Qs is already included in the Axios package
        return qs.stringify(params, {allowDots: true, arrayFormat: 'comma', encode: false});
      };
      const {auth} = store.getState();
      if (auth._id) {
        config.headers.Authorization = `${JSON.stringify(auth._certificate)}`;
      const getActionType = () => {
        return (config.method + '_' + GetActionModule(config.url ?? '/')).toUpperCase();
      }
      if (config.method !== 'GET') {
        if (config.data) {
          if (auth._privateKey) {
            if (config.data instanceof FormData) {
              config.data.append('_timestamp',new Date().toISOString());
              config.data.append('_actionType',getActionType());
              const sig = JSON.stringify(Object.fromEntries(config.data));
              const signature = SignMessage(auth._privateKey, sig);
              config.headers['Content-Type'] = 'multipart/form-data';
              config.data.append('_signature', signature);
              return config;
            } else {
              config.data = {
                ...config.data,
                _actionType: getActionType(),
                _timestamp: new Date(),
              };
              const signature = SignMessage(auth._privateKey, config.data);
              config.data = {
                ...config.data,
                _signature: signature,
              };
            }
          }
        } else {
          config.data = {
            ...config.data,
            _actionType: getActionType(),
            _timestamp: new Date(),
          };
          const signature = SignMessage(auth._privateKey, config.data);
          config.data = {
            ...config.data,
            _signature: signature,
          };
        }
      }}
      return config;
    },
    err => Promise.reject(err),
  );
  axios.interceptors.response.use(
    next => {
      const nextData = next.data;
      // console.log(nextData);
      if (nextData && (nextData.success === false || nextData.success === 'false')) {
        if (nextData.reason === 'AUTH.ERROR.NEED_TO_CHANGE_PASSWORD') {
        } else if (nextData.reason.indexOf('AUTH.ERROR.') > -1) {
          store.dispatch({type: actionTypes.Logout, payload: nextData.reason});
        }
        return Promise.reject({response: {data: nextData.reason}});
      }
      return Promise.resolve(nextData);
    },
    error => {
      if (!error.response) return Promise.reject(error);
      const errorCode = error.response.data;
      //const responseRegex = /\bAUTH.ERROR./i;
      if (errorCode === 'AUTH.ERROR.NEED_TO_CHANGE_PASSWORD') {
      } else if (errorCode.indexOf('AUTH.ERROR.') > -1) {
        // console.log(errorCode);
        store.dispatch({type: actionTypes.Logout, payload: errorCode});
      }
      return Promise.reject(error);
    },
  );
}
