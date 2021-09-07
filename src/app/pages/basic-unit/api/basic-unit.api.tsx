import axios from 'axios';
import {queryParamsProps} from '../_interface/basic-unit.interface';
import {API_BASE_URL} from "../../../common-library/common-consts/enviroment";

export const BASIC_UNIT_API_URL = API_BASE_URL + '/basic-unit';
export const BASIC_UNIT_SEARCH = API_BASE_URL + '/basic-unit/search/all';

export const createBasicUnit = (data: any) => {
  return axios.post(BASIC_UNIT_API_URL, data);
};

export const getAllBasicUnit = (queryParams: queryParamsProps) => {
  const {limit, pageNumber, sortOrder, sortField} = queryParams;
  return axios.get(
    `${BASIC_UNIT_API_URL}?page=${pageNumber}&limit=${limit}&sortBy=${sortField}&sortBy=${sortOrder}`,
  );
};

export const getBasicUnit = (code: string) => {
  return axios.get(`${BASIC_UNIT_API_URL}/${code}`);
};

export const updateBasicUnit = (data: any) => {
  const {name, status, quantity} = data;
  return axios.put(`${BASIC_UNIT_API_URL}/${data.code}`, {name, status, quantity});
};

export const deleteBasicUnit = (code: string) => {
  return axios.delete(`${BASIC_UNIT_API_URL}/${code}`);
};

export const deleteManyBasicUnit = (arrayCode: string[]) => {
  return axios.delete(BASIC_UNIT_API_URL, {
    data: {
      arrayCode: arrayCode,
    },
  });
};

export const searchBasicUnit = (data: any) => {
  return axios.get(`${BASIC_UNIT_SEARCH}?code=${data.code}&name=${data.name}`);
};
