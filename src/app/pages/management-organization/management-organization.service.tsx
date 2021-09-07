import axios from 'axios';
import _ from 'lodash';
import { API_BASE_URL } from '../../common-library/common-consts/enviroment';
import {
  CountProps,
  CreateProps,
  DeleteManyProps,
  DeleteProps,
  GetAllPropsServer,
  GetProps,
  UpdateProps,
} from '../../common-library/common-types/common-type';

export const API_URL = API_BASE_URL + '/management-unit';

export const API_USER_URL = API_BASE_URL + '/user';

export const API_URL_TREE_FORMAT = API_URL + '/tree';

export const BULK_API_URL = API_URL + '/bulk';

export const API_FILE_URL = API_BASE_URL + '/file';

export const Create: CreateProps<any> = (data: any) => {
  return axios.post(API_URL, data);
};

export const getAll: GetAllPropsServer<any> = ({ queryProps, sortList, paginationProps }) => {
  return axios
    .get(`${API_URL}`, {
      params: { ...queryProps, ...paginationProps, sortList },
      // paramsSerializer: ParamsSerializer
    }).then(res => {
      if (_.isArray(res.data)) {
        const mArr = res.data
        res.data = {}

        if (paginationProps?.page && paginationProps?.limit) {
          res.data.data = mArr.slice((paginationProps.page - 1) * paginationProps.limit, paginationProps.page * paginationProps.limit)
          res.data.paging = {
            page: paginationProps.page, 
            limit: paginationProps.limit, 
            total: mArr.length
          }
        }
      }
  
      return res
    })
};

export const GetAll: GetAllPropsServer<any> = ({ queryProps, sortList, paginationProps }) => {
  return axios.get(`${API_URL_TREE_FORMAT}`, {
    params: { ...queryProps, ...paginationProps, sortList },
    // paramsSerializer: ParamsSerializer
  });
};

export const GetUser = ({ userParams, paginationProps }: any) => {
  return axios.get(`${API_USER_URL}`, {
    params: { ...userParams, ...paginationProps },
  });
};

export const Count: CountProps<any> = ({ queryProps, sortList, paginationProps }) => {
  return axios.get(`${API_URL}/count`, {
    params: { ...queryProps, ...paginationProps, sortList },
  });
};

export const Get: GetProps<any> = entity => {
  return axios.get(`${API_URL}/${entity._id}`);
};

export const GetById = (_id: string) => {
  return axios.get(`${API_URL}/${_id}`);
};
export const Update: UpdateProps<any> = (entity: any) => {
  return axios.put(`${API_URL}/${entity._id}`, entity);
};

export const Delete: DeleteProps<any> = (entity: any) => {
  return axios.delete(`${API_URL}/${entity._id}`);
};

export const DeleteMany: DeleteManyProps<any> = (entities: any[]) => {
  return axios.delete(BULK_API_URL, {
    data: { listSpecies: entities },
  });
};

export const DeleteUser = (entity: any) => {
  return axios.delete(`${API_USER_URL}/${entity._id}`);
};
