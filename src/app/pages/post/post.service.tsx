import axios from 'axios';
import {API_BASE_URL} from '../../common-library/common-consts/enviroment';
import {
    ApproveProps,
    CountProps,
    CreateProps,
    DeleteManyProps,
    DeleteProps,
    GetAllPropsServer,
    GetProps,
    UpdateProps,
} from '../../common-library/common-types/common-type';
import {GetCompareFunction} from "../../common-library/helpers/common-function";

export const API_URL = API_BASE_URL + '/post';

export const BULK_API_URL = API_URL + '/bulk'

export const API_FILE_URL = API_BASE_URL + '/file';

export const Approve: ApproveProps<any> = (entity: any, data: any) => {
    return axios.put(`${API_URL}/${entity._id}`, data);
};

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
    // paramsSerializer: ParamsSerializer
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
    data: {data:entities},
  });
};

export const Comments = (entity: any, data: any) => {
    return axios.put(`${API_URL}/${entity._id}/comments`, data);
};

export const SentMail = (data: any, status: any) => {
    return axios.post(`${API_BASE_URL}/mail`, data, status);
}

export const PostTypeStatus = [{code: "1", name: "pending"}, {code: "2", name: "accept"}, {code: "3", name: "reject"}];

export const GetType = ({queryProps, paginationProps}: any): Promise<any> => {
  console.log(queryProps);
  return new Promise((resolve, reject) => {
    const totalData = PostTypeStatus.filter((val, index, arr) => {
      return Object.values(queryProps).some((query: any) => val.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
    const data = totalData.sort(GetCompareFunction({
      key: paginationProps.sortBy,
      orderType: paginationProps.sortType === 'asc' ? 1 : -1
    })).slice((paginationProps.page - 1) * paginationProps.limit, paginationProps.page * paginationProps.limit);
    // console.log(data);
    resolve({
      code: 200,
      data: {
        data: data,
        paging: {page: paginationProps.page, limit: paginationProps.limit, total: totalData.length}
      },
      success: true
    })
  })
}