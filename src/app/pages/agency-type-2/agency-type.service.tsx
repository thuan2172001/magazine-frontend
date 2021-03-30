import axios from 'axios';
import {API_BASE_URL} from '../../common-library/common-consts/enviroment';
import {
  CountProps,
  CreateProps,
  DeleteManyProps,
  DeleteProps,
  GetAllPropsServer,
  GetProps,
  UpdateProps
} from '../../common-library/common-types/common-type';
import {AgencyTypeModel} from './agency-type.model';

export const API_URL = API_BASE_URL + '/agency-type';

export const Create: CreateProps<AgencyTypeModel> = (data: AgencyTypeModel) => {
  return axios.post(API_URL, data);
};

export const GetAll: GetAllPropsServer<AgencyTypeModel> = ({queryProps, sortList, paginationProps}) => {
  return axios.get(`${API_URL}`, {
    params: {...queryProps, ...paginationProps, sortList},
    // paramsSerializer: ParamsSerializer
  });
};

export const Count: CountProps<AgencyTypeModel> = (queryProps: any) => {
  return axios.get(`${API_URL}/get/count`, {
    params: {...queryProps},
  });
};

export const Get: GetProps<AgencyTypeModel> = (entity) => {
  return axios.get(`${API_URL}/${entity._id}`);
};

export const Update: UpdateProps<AgencyTypeModel> = (entity: AgencyTypeModel) => {
  return axios.put(`${API_URL}/${entity._id}`, entity);
};

export const Delete: DeleteProps<AgencyTypeModel> = (entity: AgencyTypeModel) => {
  return axios.delete(`${API_URL}/${entity._id}`);
};

export const DeleteMany: DeleteManyProps<AgencyTypeModel> = (entities: AgencyTypeModel[]) => {
  return axios.delete(API_URL, {
    data: {arrayEntities: entities}
  });
};
