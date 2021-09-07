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
import { CustomersModel } from './customers.model';

export const API_URL = API_BASE_URL + '/customer';

export const API_ORDER_DETAIL = API_BASE_URL + '/customer-order'

export const BULK_API_URL = API_URL + '/bulk'

export const API_FILE_URL = API_BASE_URL + '/file';

export const Create: CreateProps<CustomersModel> = (data: CustomersModel) => {
  return axios.post(API_URL, data);
};

export const GetAll: GetAllPropsServer<CustomersModel> = ({
                                                          queryProps,
                                                          sortList,
                                                          paginationProps,
                                                        }) => {
  return axios.get(`${API_URL}`, {
    params: {...queryProps, ...paginationProps, sortList},
    // paramsSerializer: ParamsSerializer
  });
};

export const Count: CountProps<CustomersModel> = ({
                                                  queryProps,
                                                  sortList,
                                                  paginationProps,
                                                }) => {
  return axios.get(`${API_URL}/count`, {
    params: {...queryProps, ...paginationProps, sortList},
  });
};

export const GetOrders = (_id: string, {
  queryProps,
  paginationProps,
  sortField
}: any) => {
  console.log(paginationProps)
  return axios.get(`${API_URL}/${_id}/orders`, { params: {...queryProps, ...paginationProps, ...sortField}, });
}

export const GetOrderDetail = (_id: string,  {
  queryProps,
  paginationProps,
}: any) => {
  return axios.get(`${API_ORDER_DETAIL}/${_id}`, { params: {...queryProps, ...paginationProps} })
}

export const Get: GetProps<CustomersModel> = entity => {
  return axios.get(`${API_URL}/${entity._id}`);
};

export const GetById = (_id: string) => {
  return axios.get(`${API_URL}/${_id}`);
};
export const Update: UpdateProps<CustomersModel> = (entity: CustomersModel) => {
  return axios.put(`${API_URL}/${entity._id}`, entity);
};

export const Delete: DeleteProps<any> = (entity: CustomersModel) => {
  return axios.delete(`${API_URL}/${entity._id}`);
};

export const DeleteMany: DeleteManyProps<CustomersModel> = (entities: CustomersModel[]) => {
  return axios.delete(BULK_API_URL, {
    data: {listSpecies: entities},
  });
};