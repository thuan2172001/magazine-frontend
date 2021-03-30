import React, {Fragment, ReactElement, useEffect, useMemo, useState} from 'react';
import {Count, Create, Delete, DeleteMany, Get, GetAll, GetById, Update} from './analyst.service';
import {LandLotModel} from '../land-lot/land-lot.model';
import {DefaultPagination, HomePageURL, NormalColumn, SortColumn} from '../../common-library/common-consts/const';
import {ActionsColumnFormatter} from '../../common-library/common-components/actions-column-formatter';
import {InitMasterProps,} from '../../common-library/helpers/common-function';
import {Link, Redirect, Route, Switch, useHistory} from 'react-router-dom';
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
import {DisplayDateTime, DisplayPercent, DisplayTable} from "../../common-library/helpers/detail-helpers";
import * as AcademicYearService from "../academic-year/academic-year.service";
import * as AnalysisService from "../analyst/analyst.service";
import {MasterEntityDetailPage} from "../../common-library/common-components/master-detail-page";
import {paddingInfo} from "../qr-management/qr.render-info";
import EntityCrudPage from "../../common-library/common-components/entity-crud-page";
import * as CategoryService from "../category/category.service";
import {ModifyEntityPage} from "../../common-library/common-components/modify-entity-page";
import * as ShippingAgencyService from "../shipping-agency/shipping-agency.service";
import {loginCryption} from "../auth/service/auth-cryptography";
import {useField} from "formik";
import {LocalGasStation} from "@material-ui/icons";

const DisplayTb = (props: any): any => {
  const [field, meta, helpers] = useField<any>(props.name);
  console.log(field.value);

  return <DisplayTable entities={field.value ?? []} columns={props.columns}/>
}

function Analyst() {
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

  const moduleName = 'ANALYST.MODULE_NAME';
  const headerTitle = 'ANALYST.MASTER.HEADER.TITLE';
  const bodyTitle = 'ANALYST.MASTER.BODY.TITLE';
  const [createTitle, setCreateTitle] = useState('ANALYST.CREATE.STATISTICS');
  const updateTitle = 'ANALYST.ElDIT.TITLE';
  const viewTitle = 'ANALYST.VIEW.TITLE';

  const history = useHistory();

  useEffect(() => {
    getAll(filterProps);

  }, [paginationProps, filterProps]);
  const columns = useMemo((): MasterBodyColumns => ({
    name: {
      dataField: '_id.name',
      text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.NAME'})}`,
      ...SortColumn,
    },
    startDate: {
      dataField: '_id.startDate',
      text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.START_DATE'})}`,
      formatter: input => <DisplayDateTime input={input} _format={'dd/MM/yyyy'}/>,
      ...SortColumn,
    },
    closureDate: {
      dataField: '_id.closureDate',
      text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.CLOSURE_DATE'})}`,
      formatter: input => <DisplayDateTime input={input} _format={'dd/MM/yyyy'}/>,
      ...SortColumn,
    },
    finalClosureDate: {
      dataField: '_id.finalClosureDate',
      text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.FINAL_CLOSURE_DATE'})}`,
      formatter: input => <DisplayDateTime input={input} _format={'dd/MM/yyyy'}/>,
      ...SortColumn,
    },
    totalStudent: {
      dataField: 'totalStudent',
      text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.TOTAL_STUDENT'})}`,
      ...SortColumn,
    },
    totalPost: {
      dataField: 'totalPost',
      text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.TOTAL_POST'})}`,
      ...SortColumn,
    },
    percent: {
      dataField: 'percent',
      text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.PERCENT'})}`,
      formatter: DisplayPercent,
      ...SortColumn,
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        intl,
        onShowDetail: (entity: LandLotModel) => {
          // get(entity._id);
          // setShowDetail(true);
          // console.log(entity)
          history.push(`${window.location.pathname}/${entity._id._id}`);
        },
      },
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  }), []);
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
      'academicYear._id.academicYear.finalClosureDate': {
        _type: 'date-time',
        label: 'ACADEMIC_YEAR.MASTER.HEADER.FINAL_CLOSURE_DATE',
        // onSearch: UserService.GetAll,
        disabled: true,
      },
        'academicYear.totalStudent': {
        _type: 'string',
        label: 'ACADEMIC_YEAR.MASTER.HEADER.TOTAL_STUDENT',
        // onSearch: UserService.GetAll,
        disabled: true,
      },
        'academicYear.totalPost': {
        _type: 'string',
        label: 'ACADEMIC_YEAR.MASTER.HEADER.TOTAL_POST',
        // onSearch: UserService.GetAll,
        disabled: true,
      },
    },
  };
  const tableModel = useMemo((): MasterBodyColumns => ({
      faculty: {
      dataField: '_id.faculty',
      text: `${intl.formatMessage({id: 'ANALYST.MASTER.HEADER.FACULTY'})}`,
      ...SortColumn,
    },
      totalStudent: {
          dataField: 'totalStudent',
          text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.TOTAL_STUDENT'})}`,
          ...SortColumn,
      },
      totalPost: {
          dataField: 'totalPost',
          text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.TOTAL_POST'})}`,
          ...SortColumn,
      },
      percent: {
          dataField: 'percent',
          text: `${intl.formatMessage({id: 'ACADEMIC_YEAR.MASTER.HEADER.PERCENT'})}`,
          formatter: DisplayPercent,
          ...SortColumn,
      },
  }), []);
  const modifyModel2: ModifyPanel = {
    _title: headerTitle,
    table: {
      _subTitle: 'EMPTY',
      _className: 'col-12 text-primary',
      '': {
        _type: 'custom',
        component: () => {
          return <DisplayTb name={'dataArray'} columns={tableModel}/>
        }
      },
    },
  };


  const createForm = useMemo((): ModifyForm => ({
    panel1: modifyModel,
    panel2: modifyModel2,
    _header: ((entity: any) => entity?.academicYear._id.academicYear.name) as any,
  }), []);

  const masterEntityDetailDialog: RenderInfoDetail = useMemo(() => ([
    {
      className: 'col-12 mb-5',
      // titleClassName: 'col-3 mb-3',
      dataClassName: 'col-12 mb-3',
      data: {
        'ss': {
          formatter: (input, entity) => {
            console.log(input, entity)
            return <EntityCrudPage onModify={null as any} formModel={createForm} entity={entity}/>
          }
        },
        // 'academicYear.name': {
        //   title: 'ACADEMIC_YEAR.HEADER.ACADEMIC_YEAR.NAME',
        //   formatter: (input: any) => {
        //     console.log(input)
        //     return <>{input}</>
        //   }
        // },
        // 'academicYear.startDate': {
        //   title: 'ACADEMIC_YEAR.HEADER.ACADEMIC_YEAR.START_DATE',
        //   formatter: input => <DisplayDateTime input={input} _format={'dd/MM/yyyy'} />,
        // },
        // 'academicYear.finalClosureDate': {
        //   title: 'ACADEMIC_YEAR.HEADER.ACADEMIC_YEAR.FINAL_CLOSURE_DATE',
        //   formatter: input => <DisplayDateTime input={input} _format={'dd/MM/yyyy'} />,
        // },
        // 'totalStudent': {
        //   title: 'ACADEMIC_YEAR.HEADER.ACADEMIC_YEAR.TOTAL_STUDENT',
        // },
        // 'totalPost': {
        //   title: 'ACADEMIC_YEAR.HEADER.ACADEMIC_YEAR.TOTAL_POST',
        // },
      },
      // titleClassName: 'col-3',
    },
  ]), []);

  const academicYearInfo: RenderInfoDetail = useMemo(() => ([
    {
      header: 'ACADEMIC_YEAR.HEADER.DETAIL_INFO',
      className: 'col-12 mb-5',
      titleClassName: 'col-3 mb-3',
      dataClassName: 'col-9 mb-3 pl-5',
      data: {
        'scanAt': {
          title: 'Ngày gán QR',
          formatter: (input: any) => (<DisplayDateTime input={input}/>),
        },
        'scanBy.fullName': {
          title: 'Người gán QR',
        },
      },
    }
  ]), []);


  const initSearchModel = useMemo<SearchModel>(() => (
    {
      name: {
        type: 'search-select',
        label: 'Academic Year',
        onSearch: AcademicYearService.GetAll,
        keyField: 'name',
      },
      startDate: {
        type: 'date-time',
        label: 'Start time',
      }
    }), []);
  const [searchModel, setSearchModel] = useState(initSearchModel);

  return (
    <Fragment>
      <Switch>
        <Route exact path="/analyst/:code">
          {({match}) => (
            <EntityCrudPage
              onModify={update}
              moduleName={moduleName}
              mode={"vertical"}
              //  modifyModel={modifyModel}
              code={match?.params.code}
              get={GetById}
              formModel={createForm}
            />
          )}
        </Route>
        <Route path="/analyst">`
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
        </Route>
      </Switch>
    </Fragment>
  );
}


export default Analyst;
