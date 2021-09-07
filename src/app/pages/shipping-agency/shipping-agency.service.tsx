import axios from 'axios';
import {API_BASE_URL} from '../../common-library/common-consts/enviroment';
import {
  CountProps,
  CreateProps,
  DeleteManyProps,
  DeleteProps,
  GetAllPropsServer,
  GetProps,
  UpdateProps,
} from '../../common-library/common-types/common-type';
import {ShippingAgencyModel} from "./shipping-agency.model";

export const API_URL = API_BASE_URL + '/shipping-agency';

export const BULK_API_URL = API_URL + '/bulk'

export const Create: CreateProps<any> = (data: any) => {
  return axios.post(API_URL, { ...data, type: '1' });
};

export const GetAll: GetAllPropsServer<any> = ({
                                                 queryProps,
                                                 sortList,
                                                 paginationProps,
                                               }) => {
  return axios.get(`${API_URL}`, {
    params: {...queryProps, ...paginationProps, sortList},
  });
};

export const Count: CountProps<any> = ({
                                         queryProps,
                                         sortList,
                                         paginationProps,
                                       }) => {
  return axios.get(`${API_URL}/count`, {
    params: {...queryProps, ...paginationProps, sortList},
  });
};

export const Get: GetProps<ShippingAgencyModel> = entity => {
  return axios.get(`${API_URL}/${entity._id}`);
};

export const GetById = (_id: string) => {
  return axios.get(`${API_URL}/${_id}`);
};
export const Update: UpdateProps<ShippingAgencyModel> = (entity: any) => {
  return axios.put(`${API_URL}/${entity._id}`, { ...entity, type: '1' });
};

export const Delete: DeleteProps<ShippingAgencyModel> = (entity: any) => {
  return axios.delete(`${API_URL}/${entity._id}`);
};

export const DeleteMany: DeleteManyProps<any> = (entities: any[]) => {
  return axios.delete(BULK_API_URL, {
    data: {listAgencies: entities},
  });
};
