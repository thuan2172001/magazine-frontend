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
import {ProductPackagingModel} from './product-packaging.model';

export const API_URL = API_BASE_URL + '/packing';

export const BULK_API_URL = API_URL + '/bulk'

export const API_FILE_URL = API_BASE_URL + '/file';

export const Create: CreateProps<ProductPackagingModel> = (data: ProductPackagingModel) => {
  return axios.post(API_URL, data);
};

export const GetAll: GetAllPropsServer<ProductPackagingModel> = ({
                                                                   queryProps,
                                                                   sortList,
                                                                   paginationProps,
                                                                 }) => {
  return axios.get(`${API_URL}`, {
    params: { ...paginationProps, ...queryProps },
    // paramsSerializer: ParamsSerializer
  });
};

export const Count: CountProps<ProductPackagingModel> = ({
                                                           queryProps,
                                                           sortList,
                                                           paginationProps,
                                                         }) => {
  return axios.get(`${API_URL}/count`, {
    params: {...queryProps, ...paginationProps, sortList},
  });
};

export const Get: GetProps<ProductPackagingModel> = entity => {
  return axios.get(`${API_URL}/${entity._id}`);
};

export const GetById = (_id: string) => {
  return axios.get(`${API_URL}/${_id}`);
};
export const Update: UpdateProps<ProductPackagingModel> = (entity: ProductPackagingModel) => {
  return axios.put(`${API_URL}/${entity._id}`, entity);
};

export const Delete: DeleteProps<ProductPackagingModel> = (entity: ProductPackagingModel) => {
  console.log(entity)
  return axios.delete(`${API_URL}/${entity._id}`);
};

export const DeleteMany: DeleteManyProps<ProductPackagingModel> = (entities: ProductPackagingModel[]) => {
  return axios.delete(BULK_API_URL, {
    data: {listPacking: entities},
  });
};

export const uploadImage = (image: any) => {
  console.log('run updload');
  console.log(image);
  let formData = new FormData();
  formData.append('image', image);
  return axios({
    method: 'POST',
    url: API_FILE_URL,
    data: formData,
  });
};
