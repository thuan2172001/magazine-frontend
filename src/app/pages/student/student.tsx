import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {Count, Create, Delete, DeleteMany, Get, GetAll,  Update} from './student.service';
import {LandLotModel} from '../land-lot/land-lot.model';
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
import {DisplayDateTime, DisplayDownloadLink} from "../../common-library/helpers/detail-helpers";
import Faculty from "../faculty/faculty";
import * as FacultyService from "../faculty/faculty.service";
import {DetailImage} from "../../common-library/common-components/detail/detail-image";
import {UploadFile} from "../../common-library/forms/upload-file";

function Student() {
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
  
  const moduleName = 'STUDENT.MODULE_NAME';
  const headerTitle = 'STUDENT.MASTER.HEADER.TITLE';
  const bodyTitle = 'STUDENT.MASTER.BODY.TITLE';
  const createTitle = 'STUDENT.CREATE.TITLE';
  const updateTitle = 'STUDENT.EDIT.TITLE';
  const viewTitle = 'STUDENT.VIEW.TITLE';
  
  useEffect(() => {
    getAll(filterProps);
    
  }, [paginationProps, filterProps]);
  const columns = useMemo((): MasterBodyColumns => ({
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'STUDENT.MASTER.HEADER.CODE'})}`,
      ...SortColumn,
    },
    email: {
      dataField: 'email',
      text: `${intl.formatMessage({id: 'STUDENT.MASTER.HEADER.EMAIL'})}`,
      ...SortColumn,
    },
    gender: {
      dataField: 'gender',
      text: `${intl.formatMessage({id: 'STUDENT.MASTER.HEADER.GENDER'})}`,
      formatter: (number) => number === '1' ? 'Female' : 'Male',
      ...SortColumn,
    },
    birthDay: {
      dataField: 'birthDay',
      text: `${intl.formatMessage({id: 'STUDENT.MASTER.HEADER.BIRTHDAY'})}`,
      formatter: input => <DisplayDateTime input={input} _format={'dd/MM/yyyy'} />,
      ...SortColumn,
    },
    fullName: {
      dataField: 'fullName',
      text: `${intl.formatMessage({id: 'STUDENT.MASTER.HEADER.FULLNAME'})}`,
      ...SortColumn,
    },
    faculty: {
      dataField: 'faculty.faculty',
      text: `${intl.formatMessage({id: 'STUDENT.MASTER.HEADER.FACULTY'})}`,
      ...SortColumn,
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'STUDENT.MASTER.TABLE.ACTION_COLUMN'})}`,
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
      className: 'col-md-6 col-12',
      dataClassName: 'col-md-12 col-12 text-lg-center',
      data: {
        image: {
          formatter: (input) => <DetailImage images={input} width={200} height={200}/>
        },
      },
    },
    {
      className: 'col-md-6 col-12',
      dataClassName: 'col-md-8 col-12',
      data: {
        fullName: {title: 'STUDENT.MASTER.HEADER.FULLNAME'},
        gender: {
          title: 'STUDENT.MASTER.HEADER.GENDER',
          formatter: (numb,jj) => (<>{numb === '1' ? 'Female' : 'Male'}</>),
        },
        birthDay: {
          title: 'STUDENT.MASTER.HEADER.BIRTHDAY',
          formatter: input => <DisplayDateTime input={input} _format={'dd/MM/yyyy'} />,
        },
        'faculty.faculty': { title: 'FACULTY'},
        file: {
          title: 'FILE_NAME',
          formatter: (input) => {
            console.log(input)
            const Format = ({input, key, name}:{input: any, key?: string, name?: string})=>DisplayDownloadLink(input, key, name);
            return (<>{input?.map((x: any,index:number) => {
              const [_, ...nameArr] = x.path.split('-');
              const nameFile = nameArr.join('');
              return (<Format input={'/' + x.path} name={nameFile} key={`tt${index}`}/>)
          })}</>)}
        },

      },
    },
  ], []);
  
  const initSearchModel = useMemo<SearchModel>(() => (
      {
        fullName: {
          type: 'string',
          label: 'STUDENT.MASTER.HEADER.FULLNAME',
        },
        code: {
          type: 'string',
          label: 'STUDENT.MASTER.HEADER.CODE',
        },
        birthDay: {
          type: 'date-time',
          label: 'STUDENT.MASTER.HEADER.BIRTHDAY',
        },
        faculty: {
          type: 'search-select',
          label: 'STUDENT.MASTER.HEADER.FACULTY',
          onSearch: FacultyService.GetAll,
          keyField: 'faculty',
        },
      }), []);
  const [searchModel, setSearchModel] = useState(initSearchModel);

  const [group1, setGroup1] = useState<ModifyInputGroup>({
    _subTitle: '',
    code: {
      _type: 'string',
      label: 'STUDENT.MASTER.HEADER.CODE',
    },
    email: {
      _type: 'string',
      label: 'STUDENT.MASTER.HEADER.EMAIL',
    },
    birthDay: {
      _type: "date-time",
      label: 'STUDENT.MASTER.HEADER.BIRTHDAY',
    },
    gender: {
      _type: 'radio',
      options: [
        {label: 'USER.MODIFY.GENDER_OPTION.MALE', value: '0'},
        {label: 'USER.MODIFY.GENDER_OPTION.FEMALE', value: '1'}
      ],
      label: 'STUDENT.MASTER.HEADER.GENDER',
    },
    fullName: {
      _type: 'string',
      label: 'STUDENT.MASTER.HEADER.FULLNAME',
    },
    faculty: {
      _type: 'search-select',
      label: 'PRODUCT_PACKAGING.MASTER.TABLE.NAME_COLUMN',
      onSearch: FacultyService.GetAll,
      disabled: false,
      required: true,
      keyField: 'faculty',
    },
    image: {
      _type: 'image',
      maxNumber: 1,
      label: 'USER.MODIFY.IMAGE',
      isArray: false,
    },
    file: {
      _type: 'file',
      label: 'FILE',
      maxNumber: 3,
      isArray: true,
    }

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
        <Redirect from="/account/student/edit" to="/account/student"/>
        <Route path="/account/student">`
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


export default Student;
