import { AxiosInstance } from "axios";
import { axiosSlice } from "./axios-slice";

const { actions } = axiosSlice;

export const getAxiosInstance = (instanceName: string) => (
  dispatch: (arg0: {payload: any}) => void,
) => {
  console.log(instanceName);
  dispatch(actions.getAxiosInstance(instanceName));
}

export const addAxiosInstance = (instanceName: string) => (
  dispatch: (arg0: {payload: any}) => void,
) => {
  console.log('call axios action');
  dispatch(actions.addAxiosInstance(instanceName));
}