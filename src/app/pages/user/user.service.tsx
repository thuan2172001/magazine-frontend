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
import {UserModel} from "./user.model";
import {RoleArrayToObject, RoleObjectToArray} from "../../common-library/helpers/common-function";
import _ from "lodash";


export const API_URL = API_BASE_URL + '/user';

export const BULK_API_URL = API_URL + '/bulk'

// export const Create: CreateProps<any> = (data: any) => {
//   const sendData = _.cloneDeep(data);
//   sendData.scopes = RoleObjectToArray(sendData.scopes);
//   console.log(sendData)
//   return axios.post(API_URL, sendData);
// };

export const Create: CreateProps<any> = (data: any) => {
  return axios.post(API_URL, data);
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

export const Count: CountProps<UserModel> = (queryProps) => {
  return axios.get(`${API_URL}/get/count`, {
    params: {...queryProps},
  });
};

// export const GetById = (id: string) => {
//   return axios.get(`${API_URL}/${id}`).then(res => {
//     if (_.isArray(res.data.scopes)) {
//       let scopeArray = res.data.scopes;
//       scopeArray = _.isEqual(scopeArray, res.data.addedScope.enable) ? [...scopeArray] : [...scopeArray, ...res.data.addedScope.enable];
//       scopeArray = scopeArray.filter((s: string) => {
//         return !res.data.addedScope.disable.some((d: string) => (s === d));
//       });
//       res.data.scopes = RoleArrayToObject(scopeArray);
//     }
//     console.log(res)
//     return res;
//   });
// };

export const GetById = (_id: string) => {
  return axios.get(`${API_URL}/${_id}`);
};

export const Get: GetProps<UserModel> = (entity) => {
  return axios.get(`${API_URL}/${entity._id}`);
};

// export const Update: UpdateProps<any> = (entity) => {
//   const sendData = _.cloneDeep(entity);
//   sendData.scopes = RoleObjectToArray(sendData.scopes);
//   return axios.put(`${API_URL}/${entity._id}`, sendData);
// };

export const Update: UpdateProps<any> = (entity: any) => {
  return axios.put(`${API_URL}/${entity._id}`, entity);
};

export const Delete: DeleteProps<any> = (entity: any) => {
  return axios.delete(`${API_URL}/${entity._id}`);
};

export const DeleteMany: DeleteManyProps<any> = (entities: any[]) => {
  return axios.delete(BULK_API_URL, {
    data: {data:entities},
  });
};

// export const Delete: DeleteProps<UserModel> = (entity) => {
//   //Lười sửa nên viết như này cho nhanh
//   return axios.put(`${API_URL}/${entity._id}`, {...entity, status: '0'});
// };
//
// export const DeleteMany: DeleteManyProps<UserModel> = (entities) => {
//   return axios.delete(API_URL, {
//     data: {arrayEntities: entities}
//   });
// };

