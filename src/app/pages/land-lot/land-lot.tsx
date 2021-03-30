import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {Count, Create, Delete, DeleteMany, Get, GetAll, GetLots, GetSubLots, Update} from './land-lot.service';
import {LandLotModel} from './land-lot.model';
import {DefaultPagination, NormalColumn, SortColumn} from '../../common-library/common-consts/const';
import {ActionsColumnFormatter} from '../../common-library/common-components/actions-column-formatter';
import {InitMasterProps,} from '../../common-library/helpers/common-function';
import {Redirect, Route, Switch} from 'react-router-dom';
import {
  MasterBodyColumns,
  ModifyForm,
  ModifyInputGroup,
  RenderInfoDetail,
  SearchModel
} from "../../common-library/common-types/common-type";
import {MasterEntityDetailDialog} from "../../common-library/common-components/master-entity-detail-dialog";
import {MasterHeader} from "../../common-library/common-components/master-header";
import {MasterBody} from "../../common-library/common-components/master-body";
import ModifyEntityDialog from "../../common-library/common-components/modify-entity-dialog";
import {DeleteEntityDialog} from "../../common-library/common-components/delete-entity-dialog";
import DeleteManyEntitiesDialog from "../../common-library/common-components/delete-many-entities-dialog";
import isNumeric from "antd/es/_util/isNumeric";

function LandLot() {
  const {
    entities,
    intl,
    deleteEntity,
    setDeleteEntity,
    editEntity,
    setEditEntity,
    createEntity,
    selectedEntities,
    setSelectedEntities,
    detailEntity,
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
    loading,
    error,
    setError,
    add,
    update,
    get,
    deleteMany,
    deleteFn,
    getAll,
  } = InitMasterProps<LandLotModel>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update,
  });
  
  const moduleName = 'LAND_LOT.MODULE_NAME';
  const headerTitle = 'LAND_LOT.MASTER.HEADER.TITLE';
  const bodyTitle = 'LAND_LOT.MASTER.BODY.TITLE';
  const createTitle = 'LAND_LOT.CREATE.TITLE';
  const updateTitle = 'LAND_LOT.EDIT.TITLE';
  const viewTitle = 'LAND_LOT.VIEW.TITLE';
  
  useEffect(() => {
    getAll(filterProps);
    
  }, [paginationProps, filterProps]);
  const columns = useMemo((): MasterBodyColumns => ({
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'LAND_LOT.MASTER.HEADER.CODE'})}`,
      formatter: (cell: any, row: any) => {
        return (<Fragment>{row.lot + row.subLot}</Fragment>);
      },
      ...SortColumn,
    },
    lot: {
      dataField: 'lot',
      text: `${intl.formatMessage({id: 'LAND_LOT.MASTER.HEADER.LOT_CODE'})}`,
      ...SortColumn,
    },
    subLot: {
      dataField: 'subLot',
      text: `${intl.formatMessage({id: 'LAND_LOT.MASTER.HEADER.SUB_LOT_CODE'})}`,
      ...SortColumn,
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        intl,
        onShowDetail: (entity: LandLotModel) => {
          get(entity);
          setShowDetail(true);
        },
        onDelete: (entity: LandLotModel) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
        onEdit: (entity: LandLotModel) => {
          get(entity).then(result => {
            setEditEntity(result.data);
            setShowEdit(true);
          });
        },
      },
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  }), []);
  
  const masterEntityDetailDialog: RenderInfoDetail = useMemo((): RenderInfoDetail => [
    {
      data: {
        code: {title: 'LAND_LOT.MASTER.HEADER.CODE'},
        lot: {title: 'LAND_LOT.MASTER.HEADER.LOT_CODE'},
        subLot: {title: 'LAND_LOT.MASTER.HEADER.SUB_LOT_CODE'},
      },
      titleClassName: 'col-3'
    },
  ], []);
  
  const initSearchModel = useMemo<SearchModel>(() => (
    {
      code: {
        type: 'string',
        label: 'LAND_LOT.MASTER.HEADER.CODE',
        disabled: (values) => {
          return ((values.lot || values.subLot) && (!values.code || values.code === ''))
        },
        onChange: (value, {setFieldValue}) => {
          const innerValue = value.target.value.toUpperCase();
          setFieldValue('code', innerValue);
          if (innerValue !== '') {
            if (innerValue[0].charAt(0) < 'A'.charCodeAt(0) || innerValue[0].charAt(0) > 'Z'.charCodeAt(0)) {
              setError({error: 'LAND_LOT.ERROR.INVALID_LOT_SEARCH'});
              return;
            }
            setFieldValue('lot', innerValue[0]);
            if (innerValue.length === 1) {
              setFieldValue('subLot', '');
              return;
            }
            if (innerValue.length > 3) {
              setError({error: 'LAND_LOT.ERROR.INVALID_LENGTH_SEARCH'});
              setFieldValue('code', innerValue.substring(0, 3));
              return;
            }
            const subLot = innerValue.substr(1, 2);
            if (!isNumeric(subLot)) {
              setError({error: 'LAND_LOT.ERROR.INVALID_SUB_LOT_SEARCH'});
              return;
            }
            setFieldValue('subLot', subLot);
          } else {
            setFieldValue('lot', '');
            setFieldValue('subLot', '');
          }
          setSearchModel(searchModel);
        }
      },
      lot: {
        type: 'search-select',
        label: 'LAND_LOT.MASTER.HEADER.LOT_CODE',
        onSearch: GetLots,
        disabled: (values) => values.code,
      },
      subLot: {
        type: 'search-select',
        label: 'LAND_LOT.MASTER.HEADER.SUB_LOT_CODE',
        onSearch: GetSubLots,
        disabled: (values) => values.code,
      },
    }), []);
  const [searchModel, setSearchModel] = useState(initSearchModel);
  const [group1, setGroup1] = useState<ModifyInputGroup>({
    _subTitle: '',
    code: {
      _type: 'string',
      label: 'LAND_LOT.MASTER.HEADER.CODE',
      placeholder: 'EMPTY',
      disabled: true,
    },
    lot: {
      _type: 'search-select',
      label: 'LAND_LOT.MASTER.HEADER.LOT_CODE',
      onSearch: GetLots,
      required: true,
      disabled: false,
      onChange: (value, {setFieldValue, setFieldTouched}) => {
        setFieldValue('code', value ?? '');
        setFieldValue('subLot', '');
        setFieldTouched('subLot', true);
        setGroup1({...group1})
      }
    },
    subLot: {
      _type: 'search-select',
      label: 'LAND_LOT.MASTER.HEADER.SUB_LOT_CODE',
      required: true,
      onSearch: GetSubLots,
      disabled: (values) => {
        return !values.lot || values.lot.length !== 1
      },
      onChange: (value, {setFieldValue, values}) => {
        values.lot && setFieldValue('code', value ? values.lot + value: '');
      },
    },
  });
  
  const createForm = useMemo((): ModifyForm => ({
    _header: createTitle,
    panel1: {
      _title: '',
      group1: group1
    },
  }), [group1]);
  
  const updateForm = useMemo((): ModifyForm => ({...createForm, _header: updateTitle}), [createForm]);
  
  console.log(createEntity)
  return (
    <Fragment>
      <MasterEntityDetailDialog
        title={viewTitle}
        moduleName={moduleName}
        show={showDetail}
        entity={detailEntity}
        renderInfo={masterEntityDetailDialog}
        onHide={() => {
          setShowDetail(false);
        }}
      />
      <DeleteEntityDialog
        moduleName={moduleName}
        entity={deleteEntity}
        onDelete={deleteFn}
        isShow={showDelete}
        onHide={() => {
          setShowDelete(false);
          setFilterProps({...filterProps});
        }}
        loading={loading}
        error={error}
      />
      <DeleteManyEntitiesDialog
        moduleName={moduleName}
        selectedEntities={selectedEntities}
        loading={loading}
        error={error}
        isShow={showDeleteMany}
        onDelete={deleteMany}
        onHide={() => {
          setShowDeleteMany(false);
          setFilterProps({...filterProps});
        }}
      />
      <ModifyEntityDialog
        formModel={createForm}
        show={showCreate}
        onModify={add}
        onHide={() => {
          setShowCreate(false);
        }}
        loading={loading}
      />
      <ModifyEntityDialog
        formModel={updateForm}
        show={showEdit}
        entity={editEntity}
        onModify={update}
        onHide={() => {
          setShowEdit(false);
        }}
        loading={loading}
      />
      <Switch>
        <Redirect from="/land-lot/edit" to="/land-lot"/>
        <Route path="/land-lot">
          <MasterHeader
            title={headerTitle}
            onSearch={(value) => {
              setPaginationProps(DefaultPagination);
              setFilterProps(value);
            }}
            searchModel={searchModel}
          />
          <MasterBody
            title={bodyTitle}
            onCreate={() => {
              // setCreateEntity({} as any);
              
              // setEditEntity(null);
              setShowCreate(true);
              // history.push(`${window.location.pathname}/new`);
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
            isShowId={true}
          />
          
          {/* <MasterGoogleMap location={location} /> */}
          
          {/* <MasterMap /> */}
        </Route>
      </Switch>
    </Fragment>
  );
}

export default LandLot;
