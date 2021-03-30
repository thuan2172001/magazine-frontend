import {createSlice} from '@reduxjs/toolkit';
import axios, { AxiosInstance } from "axios";
const initialFactory = {
  factory: new Map<String, AxiosInstance>()
};


export const axiosSlice = createSlice({
  name: 'axios',
  initialState: initialFactory,
  reducers: {
    getAxiosInstance: (state , action) => {
      // console.log(action.payload);
    },
    addAxiosInstance: (state, action) => {
      console.log('call axios slice')
      console.log(action.payload);
      state.factory = state.factory.set(action.payload.instanceName, axios.create());
    }
  }
});