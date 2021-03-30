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

export const API_URL = API_BASE_URL + '/analysis';


export const BULK_API_URL = API_URL + '/bulk'

export const API_FILE_URL = API_BASE_URL + '/file';

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
  }).then(res => {
      const dataArray = res.data.data[0];
      const optionData = res.data.data[1];
      const totalAllPost = optionData[0].totalPost;
      const newData = dataArray.map((item: any) => ({...item , percent: item.totalPost/totalAllPost}));
      return {...res, data: newData};
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
  return axios.get(`${API_URL}/${entity._id}`)
      .then(res => {
          const dataArray = res.data.data[0];
          const optionData = res.data.data[1];
          console.log(optionData)
          const academicYear = optionData[0]._id.academicYear;
          const newData = dataArray.map((item: any) => ({...item , academicYear}));

          console.log({...res, data: newData[0]})
          return {...res, data: newData[0]};
      });
};

export const GetById = (_id: string) => {
  return axios.get(`${API_URL}/${_id}`)
      .then(res => {
          const dataArray = res.data.data[0];
          const optionData = res.data.data[1];
          const academicYear = optionData[0];
        const totalAllPost = optionData[0].totalPost;
        const newData = dataArray.map((item: any) => ({...item , percent: item.totalPost/totalAllPost}));

        return {...res, data: {academicYear, dataArray: newData}};
      });
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