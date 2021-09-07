import * as utils from './local-storage-helpers';
import { GetStorage, RemoveStorage } from './local-storage-helpers';

const localStorageLastLocationKey = 'metronic-lastLocation';

const AcceptLocation = (lastLocation: any) => {
  if (
    lastLocation &&
    lastLocation.pathname &&
    lastLocation.pathname !== '/' &&
    lastLocation.pathname.indexOf('auth') === -1 &&
    lastLocation.pathname !== '/logout'
  ) {
    return true;
  }

  return false;
};

export const SaveLastLocation = (lastLocation: any) => {
  if (AcceptLocation(lastLocation)) {
    utils.setStorage(localStorageLastLocationKey, JSON.stringify(lastLocation), 120);
  }
};

export const ForgotLastLocation = () => {
  RemoveStorage(localStorageLastLocationKey);
};

export const getLastLocation = () => {
  const defaultLocation = { pathname: '/', title: 'Dashboard' };
  const localStorateLocations = GetStorage(localStorageLastLocationKey);

  if (!localStorateLocations) {
    return { pathname: '/', title: 'Dashboard' };
  }
  try {
    return JSON.parse(localStorateLocations);
  } catch (error) {
    console.error(error);
    return defaultLocation;
  }
};

export const GetCurrentUrl = (location: any) => {
  return location.pathname.split(/[?#]/)[0];
};

export const CheckIsActive = (location: any, url: any) => {
  const current = GetCurrentUrl(location);

  if (!current || !url) {
    return false;
  }
  if (current === url) {
    return true;
  }
  return current.indexOf(url) > -1;
};
