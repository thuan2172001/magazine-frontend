import React, {Fragment, useCallback, useEffect, useMemo, useState} from 'react';
import {Count, Create, Delete, DeleteMany, Get, GetAll,  Update} from './academic-year.service';
import {
  DefaultPagination,
  HomePageURL,
  iconStyle,
  NormalColumn,
  SortColumn
} from '../../common-library/common-consts/const';
import {ActionsColumnFormatter} from '../../common-library/common-components/actions-column-formatter';
import {InitMasterProps,} from '../../common-library/helpers/common-function';
import {Redirect, Route, Switch} from 'react-router-dom';
import {
  MasterBodyColumns,
  ModifyForm,
  ModifyInputGroup, ModifyPanel,
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
import {DisplayDateTime} from "../../common-library/helpers/detail-helpers";
import * as AcademicYearService from "../academic-year/academic-year.service";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from "@material-ui/icons/Add";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

function AcademicYear() {
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
  } = InitMasterProps<any>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update,
  });
  
  const moduleName = 'ACADEMIC_YEAR.MODULE_NAME';
  const headerTitle = 'ACADEMIC_YEAR.MASTER.HEADER.TITLE';
  const bodyTitle = 'ACADEMIC_YEAR.MASTER.BODY.TITLE';
  const createTitle = 'ACADEMIC_YEAR.CREATE.TITLE';
  const updateTitle = 'ACADEMIC_YEAR.EDIT.TITLE';
  const viewTitle = 'ACADEMIC_YEAR.VIEW.TITLE';
  
  useEffect(() => {
    getAll(filterProps);
    
  }, [paginationProps, filterProps]);
  const columns = useMemo((): MasterBodyColumns => ({
    name: {
      dataField: 'name',
      text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.NAME'})}`,
      ...SortColumn,
    },
    alertDays: {
      dataField: 'alertDays',
      text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.ALERT_DAYS'})}`,
      ...SortColumn,
    },
    startDate: {
      dataField: 'startDate',
      text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.START_DATE'})}`,
      formatter: input => <DisplayDateTime input={input} _format={'dd/MM/yyyy'} />,
      ...SortColumn,
    },
    closureDate: {
      dataField: 'closureDate',
      text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.CLOSURE_DATE'})}`,
      formatter: input => <DisplayDateTime input={input} _format={'dd/MM/yyyy'} />,
      ...SortColumn,
    },
    finalClosureDate: {
      dataField: 'finalClosureDate',
      text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.FINAL_CLOSURE_DATE'})}`,
      formatter: input => <DisplayDateTime input={input} _format={'dd/MM/yyyy'} />,
      ...SortColumn,
    },
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.CODE'})}`,
      ...SortColumn,
    },
    status: {
      dataField: 'status',
      text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.STATUS'})}`,
      ...SortColumn,
    },
    // action: {
    //   dataField: 'additionalActionComponent',
    //   text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.TABLE.ACTION_COLUMN'})}`,
    //   formatter: ActionsColumnFormatter,
    //   formatExtraData: {
    //     intl,
    //     // onShowDetail: (entity: any) => {
    //     //   get(entity);
    //     //   setShowDetail(true);
    //     // },
    //     // onDelete: (entity: any) => {
    //     //   setDeleteEntity(entity);
    //     //   setShowDelete(true);
    //     // },
    //     // onEdit: (entity: any) => {
    //     //   get(entity).then(result => {
    //     //     setEditEntity(result.data);
    //     //     setShowEdit(true);
    //     //   });
    //     // },
    //   },
    //   ...NormalColumn,
    //   style: {minWidth: '130px'},
    // },
  }), []);

  const masterEntityDetailDialog: RenderInfoDetail = useMemo((): RenderInfoDetail => [
    {
      data: {
        startDate: {
          title: 'ACADEMIC_YEAR.MASTER.HEADER.START_DATE',
          formatter: input => <DisplayDateTime input={input} _format={'dd/MM/yyyy'} />,
        },
        closureDate: {
          title: 'ACADEMIC_YEAR.MASTER.HEADER.CLOSURE_DATE',
          formatter: input => <DisplayDateTime input={input} _format={'dd/MM/yyyy'} />,
        },
        finalClosureDate: {
          title: 'ACADEMIC_YEAR.MASTER.HEADER.FINAL_CLOSURE_DATE',
          formatter: input => <DisplayDateTime input={input} _format={'dd/MM/yyyy'} />,
        },
        alertDays: {title: 'ACADEMIC_YEAR.MASTER.HEADER.ALERT_DAYS'},
        code: {title: 'ACADEMIC_YEAR.MASTER.HEADER.CODE'},
        name: {title: 'ACADEMIC_YEAR.MASTER.HEADER.NAME'},
        status: {title: 'ACADEMIC_YEAR.MASTER.HEADER.STATUS'}
      },
      titleClassName: 'col-3'
    },
  ], []);
  
  const initSearchModel = useMemo<SearchModel>(() => (
    {
      // faculty: {
      //   type: 'search-select',
      //   label: 'Analyst',
      //   onSearch: AcademicYearService.GetAll,
      //   keyField: 'faculty',
      // },
      name: {
        type: 'search-select',
        label: 'Name',
        onSearch: AcademicYearService.GetAll,
        keyField: 'name',
      },
      startDate: {
        type: 'date-time',
        label: 'Start Date'
      },
      finalClosureDate: {
        type: 'date-time',
        label: 'Final Closure Date'
      },
    }), []);
  const [searchModel, setSearchModel] = useState(initSearchModel);
  const [group1, setGroup1] = useState<ModifyInputGroup>({
    _subTitle: '',
    startDate: {
      _type: 'date-time',
      label: 'ACADEMIC_YEAR.MASTER.HEADER.START_DATE',
    },
    closureDate: {
      _type: 'date-time',
      label: 'ACADEMIC_YEAR.MASTER.HEADER.CLOSURE_DATE',
    },
    finalClosureDate: {
      _type: 'date-time',
      label: 'ACADEMIC_YEAR.MASTER.HEADER.FINAL_CLOSURE_DATE',
    },
    alertDays: {
      _type: 'string',
      label: 'ACADEMIC_YEAR.MASTER.HEADER.ALERT_DAYS',
    },
    code: {
      _type: 'string',
      label: 'ACADEMIC_YEAR.MASTER.HEADER.CODE',
      disabled: true,
    },
    name: {
      _type: 'string',
      label: 'ACADEMIC_YEAR.MASTER.HEADER.NAME',
    },
  });

  const modifyModel: ModifyPanel = {
    _title: headerTitle,
    commonInfo: {
      _subTitle: 'EMPTY',
      _className: 'col-12 row text-primary',
      _inputClassName: 'col-4',
      'academicYear._id.academicYear.name': {
        _type: 'string',
        label: 'ACADEMIC_YEAR.MASTER.HEADER.NAME',
        disabled: true,
      },
      'academicYear._id.academicYear.startDate': {
        _type: 'date-time',
        label: 'ACADEMIC_YEAR.MASTER.HEADER.START_DATE',
        // onSearch: UserService.GetAll,
        disabled: true,
      },
    },
  };

  const createForm = useMemo((): ModifyForm => ({
    _header: createTitle,
    panel1: {
      _title: '',
      group1: group1
    },
  }), [group1]);
  const additionalActionComponent = () => {
    return (
        <>
        <button
          type="button"
          className="btn btn-primary fixed-btn-width mr-8"
          onClick={() => {
            const activeAcademicYear = entities.filter(
                item => item.status === 'Active')[0]
            if (activeAcademicYear) get(activeAcademicYear).then(result => {
              setEditEntity(result.data);
              setShowEdit(true);
            });
          }}>
          <EditIcon style={iconStyle} />
          {intl.formatMessage({ id: 'ACADEMIC_YEAR.HEADER.EDIT_BTN' })}
        </button>
        <button
          type="button"
          className="btn btn-danger mr-8"
          onClick={() => {
            const activeAcademicYear = entities.filter(
                item => item.status === 'Active')[0]
            AcademicYearService.Update({...activeAcademicYear, status: 'Complete'})
                .then(() => {
                  setPaginationProps(DefaultPagination);
                  setFilterProps({});
                })
          }}>
          <CheckCircleOutlineIcon style={iconStyle} />
          {intl.formatMessage({ id: 'ACADEMIC_YEAR.HEADER.END_BTN' })}
        </button>
        </>);
  } ;
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
        <Route path={`${HomePageURL.academicYear}`}>
          <MasterHeader
            title={headerTitle}
            onSearch={(value) => {
              setPaginationProps(DefaultPagination);
              if (value.name !== undefined) setFilterProps({...value, name: value.name.name})
              else setFilterProps(value)
            }}
            searchModel={searchModel}
          />
          <MasterBody
            title={bodyTitle}
            onCreate={() => {
              setShowCreate(true);
            }}
            entities={entities}
            total={total}
            columns={columns}
            loading={loading}
            paginationParams={paginationProps}
            setPaginationParams={setPaginationProps}
            isShowId={true}
            additionalActionComponent={additionalActionComponent}
          />
        </Route>
      </Switch>
    </Fragment>
  );
}


export default AcademicYear;
