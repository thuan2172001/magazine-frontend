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
import {AgencyModel} from './agency.model';

export const API_URL = API_BASE_URL + '/agency';

export const Create: CreateProps<AgencyModel> = (data: AgencyModel) => {
  return axios.post(API_URL, { ...data, type: '0' });
};

// const convertAddress = (address: any) => {
//   let convertURL: string = `${API_URL}?`
//
//   Object.keys(address).forEach((key: string, index: number) => {
//     convertURL = convertURL + `address.${key}=${address[key]}`
//
//     if (index !== Object.keys(address).length - 1) {
//       convertURL = convertURL + '&'
//     }
//   })
//
//   return convertURL
// }
//
export const GetAll: GetAllPropsServer<AgencyModel> = ({queryProps, sortList, paginationProps}) => {
  return axios.get(`${API_URL}`, {
    params: {...queryProps, ...paginationProps, sortList, storeLevel: {_id: queryProps?.storeLevel?._id}},
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

export const Get: GetProps<AgencyModel> = entity => {
  return axios.get(`${API_URL}/${entity._id}`);
};

export const GetById = (id: string) => {
  return axios.get(`${API_URL}/${id}`);
};

export const Update: UpdateProps<AgencyModel> = (entity: AgencyModel) => {
  return axios.put(`${API_URL}/${entity._id}`, { ...entity, type: '0' });
};

export const Delete: DeleteProps<AgencyModel> = (entity: AgencyModel) => {
  return axios.delete(`${API_URL}/${entity._id}`);
};

export const DeleteMany: DeleteManyProps<AgencyModel> = (entities: AgencyModel[]) => {
  return axios.delete(`${API_URL}/bulk`, {
    data: {listAgencies: entities},
  });
};
