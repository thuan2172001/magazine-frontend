import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {DefaultPagination, SortColumn} from '../../common-library/common-consts/const';
import {InitMasterProps} from '../../common-library/helpers/common-function';
import MultiLevelSaleBody from '../multilevel-sale/multi-sale-body';
import {UserModel} from '../user/user.model';
import {ManagementOrganizationModel} from './management-organization.model';
import {Count, Create, Delete, DeleteMany, Get, GetAll, Update} from './management-organization.service';
import * as UserService from '../user/user.service';
import * as RoleService from '../role/role.service';
import {AxiosResponse} from 'axios';

export default function ManagementOrganization() {
  const {
    entities,
    selectedEntities,
    setSelectedEntities,
    paginationProps,
    setPaginationProps,
    getAll,
  } = InitMasterProps<ManagementOrganizationModel>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update
  });
  
  const intl = useIntl();
  const [userEntities, setUserEntities] = useState<UserModel[]>([]);
  const [userTotal, setUserTotal] = useState<number>(0);
  const [convertedEntities, setConvertedEntities] = useState<any[]>([]);
  const [userLoading, setUserLoading] = useState(false);
  const [userParams, setUserParams] = useState<any>({role: {_id: ''}});
  const [errorUser, setErrorUser] = useState('');
  
  useEffect(() => {
    getAll();
  }, []);
  
  useEffect(() => {
    if(userParams?.role?._id === '') return;
    setUserLoading(true);
    UserService.GetAll({queryProps: userParams, paginationProps, })
      .then((res : AxiosResponse<{data: UserModel[]; paging: {page: number, limit: number, total: number}}>) => {
        setUserEntities(res.data.data);
        setUserLoading(false);
        setUserTotal(res.data.paging.total);
        setErrorUser('');
      }) .catch(err => {
      setUserLoading(false);
      setErrorUser(err.message);
    });
  }, [paginationProps, userParams]);
  
  const fetchUsersByRole = (entity: ManagementOrganizationModel | any) => {
    const getQueryParams = (entity: any): object => {
      if(entity.children) {
        // const roleIds = entity.children.map((entity: any) => {
        //   return entity._id;
        // });
        return {managementUnit: { _id: entity._id }};
      }
      return {role: { _id: entity._id}};
    }
    setPaginationProps(DefaultPagination);
    setUserParams(getQueryParams(entity));
  }
  
  useEffect(() => {
    if (entities?.length > 0) {
      const promises: Promise<AxiosResponse<any>> [] = entities.map((entity: any) => {
        const queryParams = {managementUnit: {_id: entity._id}};
        const promise: Promise<AxiosResponse<any>> = RoleService.GetAll({
          queryProps: queryParams,
          paginationProps: {...DefaultPagination, limit: 2000},
        });
        return promise;
      });
      Promise.all(promises).then((responses: AxiosResponse<{ data: any[]; paging: any }>[]) => {
        const _convertedEntities: any[] = responses.map((response: AxiosResponse<{ data: any[]; paging: any }>, index) => {
          return {...entities[index], children: response.data.data};
        });
        setConvertedEntities(_convertedEntities);
      });
    }
  }, [entities]);
  
  const columns = React.useMemo(() => {
    return [
      {
        dataField: '_id',
        text: `${intl.formatMessage({id: 'ORDINAL'})}`,
        formatter: (cell: any, row: any, rowIndex: number) => (
          <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
        ),
        style: {paddingTop: 20},
      },
      {
        dataField: 'fullName',
        text: `${intl.formatMessage({id: 'USER.MASTER.TABLE.DISPLAY_NAME'})}`,
        ...SortColumn,
        align: 'center',
      },
      {
        dataField: 'email',
        text: `${intl.formatMessage({id: 'USER.MASTER.TABLE.EMAIL'})}`,
        ...SortColumn,
        align: 'center',
      },
      
      {
        dataField: 'phone',
        text: `${intl.formatMessage({id: 'USER.MASTER.TABLE.PHONE'})}`,
        ...SortColumn,
        align: 'center',
      },
    ]
  }, [paginationProps]);
  
  const TreeBody = [
    {
      type: 'Tree',
      data: convertedEntities,
    },
    {
      title: 'MANAGEMENT_ORGANIZATION.MASTER.TABLE.STAFF_LIST',
      type: 'Table',
      data: userEntities,
      prop: {
        columns: columns,
        total: userTotal,
        loading: userLoading,
        paginationParams: paginationProps,
        setPaginationParams: setPaginationProps,
        onSelectMany: setSelectedEntities,
        selectedEntities: selectedEntities,
      },
    },
  ];
  
  return (
    <>
          <MultiLevelSaleBody
            title='MANAGEMENT_ORGANIZATION.MODULE_NAME'
            body={TreeBody}
            onFetchEntities={fetchUsersByRole}
          />
    </>
  )
}
