// export const BASE_URL: string
//     = (process.env.REACT_APP_BASE_URL && process.env.REACT_APP_BASE_URL.charAt(0) == ':') ? window.location.protocol + "//" + window.location.hostname + process.env.REACT_APP_BASE_URL : window.location.origin;
// if (!BASE_URL) {
//     throw new Error('Missing BASE_URL');
// }
// export const SOCKET_BASE_URL: string
//     = (process.env.REACT_APP_SOCKET_BASE_URL && process.env.REACT_APP_SOCKET_BASE_URL.charAt(0) == ':') ?
//     (window.location.protocol == "https:" ? "wss:" : "ws:") + "//" + window.location.hostname + process.env.REACT_APP_SOCKET_BASE_URL : '';
export const IS_DEVELOPMENT = process.env.REACT_APP_ENV === 'development';
export const REACT_APP_ENV = process.env.REACT_APP_ENV;
export const CERTIFICATE_EXP = 1000 * 60 * 60;
export const PROJECT_NAME = 'vncheck';
// export const APP_TITLE: string = process.env.REACT_APP_TITLE ?? '';
export const API_BASE_URL = (() => {
  if (REACT_APP_ENV === 'mock' || REACT_APP_ENV === 'production') return '/api';
  if (process.env.REACT_APP_API_BASE_URL) {
    if (process.env.REACT_APP_API_BASE_URL.charAt(0) === ':') {
      return (
        window.location.protocol +
        '//' +
        window.location.hostname +
        process.env.REACT_APP_API_BASE_URL
      );
    }
    
    return process.env.REACT_APP_API_BASE_URL;
  }
  
  return '/api';
})();
export const BASE_URL = API_BASE_URL.indexOf('http') === 0 ? API_BASE_URL.split('/').slice(0, 3).join('/') : '';

//TODO: Pincode....
export const USE_PIN_CODE = false;
