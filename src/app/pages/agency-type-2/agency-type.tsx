import React, {useEffect} from "react";
import {useIntl} from 'react-intl';


import {InitMasterProps} from "../../common-library/helpers/common-function";

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

import {Count, Create, Delete, DeleteMany, Get, GetAll, Update} from './agency-type.service';
import {AgencyTypeModel} from './agency-type.model';
import {MasterHeader} from "../../common-library/common-components/master-header";
import {MasterBody} from "../../common-library/common-components/master-body";
import {ActionsColumnFormatter} from '../../common-library/common-components/actions-column-formatter';

import {NormalColumn, SortColumn} from '../../common-library/common-consts/const';

import {MasterBodyColumns, RenderInfoDetail, SearchModel} from "../../common-library/common-types/common-type";
import {DeleteEntityDialog} from "../../common-library/common-components/delete-entity-dialog";
import {MasterEntityDetailDialog} from "../../common-library/common-components/master-entity-detail-dialog";
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-entities-dialog';
import * as Yup from "yup";

function AgencyType() {
  
  const intl = useIntl();
  const {
    entities,
    setEntities,
    deleteEntity,
    setDeleteEntity,
    editEntity,
    setEditEntity,
    createEntity,
    setCreateEntity,
    selectedEntities,
    setSelectedEntities,
    detailEntity,
    setDetailEntity,
    showDelete,
    setShowDelete,
    showEdit,
    setShowEdit,
    showCreate,
    setShowCreate,
    showDetail,
    setShowDetail,
    showDeleteMany,
    setShowDeleteMany,
    paginationProps,
    setPaginationProps,
    filterProps,
    setFilterProps,
    total,
    setTotal,
    loading,
    setLoading,
    add, update, get, deleteMany, deleteFn, getAll, refreshData
  } = InitMasterProps<AgencyTypeModel>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update
  });
  
  useEffect(() => {
    getAll(filterProps);
  }, [paginationProps, filterProps]);
  
  
  console.log(entities);
  
  const moduleName = 'PURCHASE_ORDER.CUSTOM.MODULE_NAME';
  const headerTitle = 'PURCHASE_ORDER.MASTER.HEADER.TITLE';
  const createTitle = 'PURCHASE_ORDER.CREATE.TITLE';
  const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
  
  const columns: MasterBodyColumns = [
    {
      dataField: 'ordinal',
      text: '#',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      style: {paddingTop: 20},
    }, {
      dataField: 'type_name',
      text: 'Tên loại',
      ...SortColumn
    },
    {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN'})}`,
      ...SortColumn
    },
    {
      dataField: 'agencyAddress',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN'})}`,
      ...SortColumn
    },
    
    {
      dataField: 'phoneNumber',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'})}`,
      ...SortColumn
    },
    {
      dataField: 'status',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.STATUS_COLUMN'})}`,
      ...SortColumn,
      formatter: (cell: any, row: any) => row.status === 1 ?
        (<CheckCircleIcon style={{color: '#1DBE2D'}}/>) : (<IndeterminateCheckBoxIcon/>),
    },
    {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        intl,
        onShowDetail: (entity: AgencyTypeModel) => {
          get(entity);
          setShowDetail(true);
        },
        onDelete: (entity: AgencyTypeModel) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
        onEdit: (entity: AgencyTypeModel) => {
          setEditEntity(entity);
          setShowEdit(true);
        }
      },
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  ];
  
  const purchaseOrderSearchModel: SearchModel = {
    code: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
      keyField: 'code'
    }, name: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL',
      keyField: 'name'
    },
  };
  
  const modifyModel: any = {
    code: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
    },
    name: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL',
    },
    status: {
      type: 'string',
      placeholder: 'AGENCY.MASTER.TABLE.STATUS_COLUMN',
      label: 'AGENCY.MASTER.TABLE.STATUS_COLUMN'
    },
  };
  
  const masterEntityDetailDialog: RenderInfoDetail = [{
    data:{
      code: {title: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN'},
      name: {title: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER'},
      status: {title: 'PURCHASE_ORDER.MASTER.TABLE.STATUS_COLUMN'},
    }
  }]
  
  const agencyTypeSchema = Yup.object<AgencyTypeModel>().shape({
    // code: Yup.string().required('Vui lòng nhập mã đơn vị'),
    // agencyAddress: Yup.string().required('Vui lòng nhập tên đơn vị'),
    // phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),
  });
  
  return (
    <>
      <MasterHeader title={headerTitle} onSearch={setFilterProps} searchModel={purchaseOrderSearchModel}
                    initValue={filterProps}/>
      <MasterBody
        onCreate={() => {
          setCreateEntity(null);
          setShowCreate(true);
        }}
        onDeleteMany={() => setShowDeleteMany(true)}
        selectedEntities={selectedEntities}
        onSelectMany={setSelectedEntities}
        entities={entities}
        total={total}
        columns={columns}
        loading={loading}
        paginationParams={paginationProps}
        setPaginationParams={setPaginationProps}
      />
      
      <DeleteEntityDialog
        moduleName={moduleName}
        entity={deleteEntity}
        onDelete={deleteFn}
        isShow={showDelete}
        onHide={() => {
          setShowDelete(false);
        }}
      />
      <DeleteManyEntitiesDialog
        moduleName={moduleName}
        selectedEntities={selectedEntities}
        loading={loading}
        isShow={showDeleteMany}
        onDelete={deleteMany}
        onHide={() => {
          setShowDeleteMany(false);
        }}
      />
      {/* <ModifyEntityDialog
        isShow={showCreate}
        entity={createEntity}
        onModify={add}
        title={createTitle}
        modifyModel={modifyModel}
        // validationModel={agencyTypeSchema}
        onHide={() => {
          setShowCreate(false);
        }}
      />
      <ModifyEntityDialog
        isShow={showEdit}
        entity={editEntity}
        onModify={update}
        title={updateTitle}
        modifyModel={modifyModel}
        // validationModel={agencyTypeSchema}
        onHide={() => {
          setShowEdit(false);
        }}
      /> */}
      
      <MasterEntityDetailDialog
        show={showDetail}
        entity={detailEntity}
        renderInfo={masterEntityDetailDialog}
        onHide={() => {
          setShowDetail(false);
        }}
      />
    </>
  );
}

export default AgencyType;