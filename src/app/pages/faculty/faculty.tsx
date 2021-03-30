import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {Count, Create, Delete, DeleteMany, Get, GetAll,  Update} from './faculty.service';
import {LandLotModel} from '../land-lot/land-lot.model';
import {DefaultPagination, HomePageURL, NormalColumn, SortColumn} from '../../common-library/common-consts/const';
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
import * as UserService from "../user/user.service"
import isNumeric from "antd/es/_util/isNumeric";
import {DisplayDateTime} from "../../common-library/helpers/detail-helpers";
import * as FacultyService from "../faculty/faculty.service";
import * as RoleService from "../role/role.service";

function Faculty() {
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
  
  const moduleName = 'FACULTY.MODULE_NAME';
  const headerTitle = 'FACULTY.MASTER.HEADER.TITLE';
  const bodyTitle = 'FACULTY.MASTER.BODY.TITLE';
  const createTitle = 'FACULTY.CREATE.TITLE';
  const updateTitle = 'FACULTY.EDIT.TITLE';
  const viewTitle = 'FACULTY.VIEW.TITLE';
  
  useEffect(() => {
    getAll(filterProps);
    
  }, [paginationProps, filterProps]);
  const columns = useMemo((): MasterBodyColumns => ({
    faculty: {
      dataField: 'faculty',
      text: `${intl.formatMessage({id: 'FACULTY.MASTER.HEADER.FACULTY'})}`,
      ...SortColumn,
    },
    user: {
      dataField: 'user.fullName',
      text: `${intl.formatMessage({id: 'FACULTY.MASTER.HEADER.COORDINATORCODE'})}`,
      ...SortColumn,
    },
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'FACULTY.MASTER.HEADER.CODE'})}`,
      ...SortColumn,
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'FACULTY.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        intl,
        onShowDetail: (entity: any) => {
          get(entity);
          setShowDetail(true);
        },
        onDelete: (entity: any) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
        onEdit: (entity: any) => {
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
        faculty: {title: 'FACULTY.MASTER.HEADER.FACULTY_NAME'},
        'user.fullName': {title: 'FACULTY.MASTER.HEADER.COORDINATORCODE'},
        code: {title: 'FACULTY.MASTER.HEADER.CODE'},
      },
      titleClassName: 'col-3'
    },
  ], []);
  
  const initSearchModel = useMemo<SearchModel>(() => (
    {
      faculty: {
        type: 'search-select',
        label: 'Faculty',
        onSearch: FacultyService.GetAll,
        keyField: 'faculty',
      },
    }), []);
  const [searchModel, setSearchModel] = useState(initSearchModel);
  const [group1, setGroup1] = useState<ModifyInputGroup>({
    _subTitle: '',
    faculty: {
      _type: 'string',
      label: 'FACULTY.MASTER.HEADER.FACULTY',
    },
    user: {
      _type: 'search-select',
      label: 'FACULTY.MASTER.HEADER.COORDINATORCODE',
      onSearch: async ({queryProps, paginationProps}: any): Promise<any> => {
        const {role} = queryProps
        const coordinatorRole = await RoleService.GetAll({
          queryProps: {...role, role: 'coordinator'}
        })
        return UserService.GetAll({
          queryProps: {...queryProps, role: coordinatorRole.data.data[0]},
          paginationProps,
        })
      },
      keyField: 'fullName',
    },
    code: {
      _type: 'string',
      label: 'FACULTY.MASTER.HEADER.CODE',
      disabled: true,
    },
    // lot: {
    //   _type: 'search-select',
    //   label: 'LAND_LOT.MASTER.HEADER.LOT_CODE',
    //   onSearch: GetLots,
    //   required: true,
    //   disabled: false,
    //   onChange: (value, {setFieldValue, setFieldTouched}) => {
    //     setFieldValue('code', value ?? '');
    //     setFieldValue('subLot', '');
    //     setFieldTouched('subLot', true);
    //     setGroup1({...group1})
    //   }
    // },
    // subLot: {
    //   _type: 'search-select',
    //   label: 'LAND_LOT.MASTER.HEADER.SUB_LOT_CODE',
    //   required: true,
    //   onSearch: GetSubLots,
    //   disabled: (values) => {
    //     return !values.lot || values.lot.length !== 1
    //   },
    //   onChange: (value, {setFieldValue, values}) => {
    //     values.lot && setFieldValue('code', value ? values.lot + value: '');
    //   },
    // },
  });
  
  const createForm = useMemo((): ModifyForm => ({
    _header: createTitle,
    panel1: {
      _title: '',
      group1: group1
    },
  }), [group1]);
  
  const updateForm = useMemo((): ModifyForm => ({...createForm, _header: updateTitle}), [createForm]);
  
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
        <Route path={`${HomePageURL.faculty}`}>
          <MasterHeader
            title={headerTitle}
            onSearch={(value) => {
              setPaginationProps(DefaultPagination);
              if (value.faculty !== undefined) setFilterProps({...value, faculty: value.faculty.faculty})
              else setFilterProps(value)
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


export default Faculty;
