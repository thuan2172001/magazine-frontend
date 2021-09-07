import axios from 'axios';
import {
  CountProps,
  CreateProps,
  DeleteManyProps,
  DeleteProps,
  GetAllPropsServer,
  GetProps,
  UpdateProps,
} from '../../common-library/common-types/common-type';

import {QrModel} from './qr.model';
import {GetCompareFunction} from "../../common-library/helpers/common-function";
import {API_BASE_URL} from "../../common-library/common-consts/enviroment";

export const API_URL = API_BASE_URL + '/qrcode';

export const BULK_API_URL = API_URL + '/bulk'

export const API_FILE_URL = API_BASE_URL + '/file';

export const Create: CreateProps<QrModel> = (data: QrModel) => {
  return axios.post<QrModel>(API_URL, {...data, type: data.type.code});
};

export const GetAll: GetAllPropsServer<any> = ({
                                                 queryProps,
                                                 sortList,
                                                 paginationProps,
                                               }) => {
  return axios.get(`${API_URL}`, {
    params: {...queryProps, ...paginationProps},
    // paramsSerializer: ParamsSerializer
  });
};
export const QrTypeList = [{code: "1", name: "Sản phẩm"}, {code: "2", name: "Đóng gói"}];
export const QrTypeStatus = [{code: "1", name: "Mới tạo"}, {code: "2", name: "Đã phân phối"}, {code: "3", name: "Đã sử dụng"}];

export const GetType = (typeList: { code: string; name: string }[], {queryProps, paginationProps}: any): Promise<any> => {
  // console.log(queryProps);
  return new Promise((resolve, reject) => {
    const totalData = typeList.filter((val, index, arr) => {
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
    data: {listSpecies: entities},
  });
};
