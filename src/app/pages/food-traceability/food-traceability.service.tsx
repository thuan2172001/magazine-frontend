import axios from "axios";
import { API_BASE_URL } from "../../common-library/common-consts/enviroment";

const api = API_BASE_URL + '/qrcode'
const userApi = API_BASE_URL + '/user';

export const GetDetail = (_id: string) => {
    return axios.get(`${api}/${_id}/public`)
}

export const GetById = (id: string) => {
    return axios.get(`${userApi}/${id}`)
  };