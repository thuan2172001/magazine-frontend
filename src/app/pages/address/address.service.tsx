import STATE_LIST from './state.json';
import CITY_LIST from './city.json';
import DISTRICT_LIST from './district.json';
import {GetCompareFunction} from "../../common-library/helpers/common-function";

const StateList = Object.values(STATE_LIST);
const CityList = Object.values(CITY_LIST);
const DistrictList = Object.values(DISTRICT_LIST);


export const GetState = ({queryProps, paginationProps}: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const totalData = StateList.filter((val, index, arr) => {
      return Object.values(queryProps).some((query: any) => val.name_with_type.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
    const data = totalData.sort(GetCompareFunction({
      key: paginationProps.sortBy,
      orderType: paginationProps.sortType === 'asc' ? 1 : -1
    })).slice((paginationProps.page - 1) * paginationProps.limit, paginationProps.page * paginationProps.limit).map(t => t.name_with_type);
    console.log(data);
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
export const GetCity = ({queryProps, paginationProps}: any): Promise<any> => {
  console.log(queryProps)
  return new Promise((resolve, reject) => {
    const {state, ...queries} = queryProps;
    const {code} = StateList.find((val, index, arr) => {
      return val.name_with_type === state;
    }) as any;
    let totalData = CityList.filter((val, index, arr) => {
      return Object.values(queries).some((query: any) => val.name_with_type.toLowerCase().indexOf(query.toLowerCase()) > -1);
    })
    // console.log([...totalData]);
    code && (totalData = totalData.filter((val, index, arr) => {
      return val.parent_code === code;
    }));
    const data = totalData.sort(GetCompareFunction({
      key: paginationProps.sortBy,
      orderType: paginationProps.sortType === 'asc' ? 1 : -1
    })).slice((paginationProps.page - 1) * paginationProps.limit, paginationProps.page * paginationProps.limit).map(t => t.name_with_type);
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

export const GetDistrict = ({queryProps, paginationProps}: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const {city, ...queries} = queryProps;
    const {code} = CityList.find((val, index, arr) => {
      return val.name_with_type === city;
    }) as any;
    let totalData = DistrictList.filter((val, index, arr) => {
      return Object.values(queries).some((query: any) => val.name_with_type.toLowerCase().indexOf(query.toLowerCase()) > -1);
    })
    code && (totalData = totalData.filter((val, index, arr) => {
      return val.parent_code === code;
    }));
    const data = totalData.sort(GetCompareFunction({
      key: paginationProps.sortBy,
      orderType: paginationProps.sortType === 'asc' ? 1 : -1
    })).slice((paginationProps.page - 1) * paginationProps.limit, paginationProps.page * paginationProps.limit).map(t => t.name_with_type);
    
    
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
