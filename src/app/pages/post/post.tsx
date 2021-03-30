import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {Count, Create, Delete, DeleteMany, Get, GetAll,  Update} from './post.service';
import {
  DefaultPagination,
  HomePageURL,
  iconStyle,
  NormalColumn,
  SortColumn
} from '../../common-library/common-consts/const';
import {ActionsColumnFormatter} from '../../common-library/common-components/actions-column-formatter';
import {InitMasterProps,} from '../../common-library/helpers/common-function';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
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
import {DeleteEntityDialog} from "../../common-library/common-components/delete-entity-dialog";
import DeleteManyEntitiesDialog from "../../common-library/common-components/delete-many-entities-dialog";
import {DisplayDateTime, DisplayDownloadLink} from "../../common-library/helpers/detail-helpers";
import {DetailImage} from "../../common-library/common-components/detail/detail-image";
import EntityCrudPage from "../../common-library/common-components/entity-crud-page";
import {Spinner} from "react-bootstrap";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import * as Yup from "yup";
import {GetById, GetType, PostTypeStatus} from "./post.service";
import Category from "../category/category";
import * as CategoryService from "../category/category.service";
import * as UserService from "../user/user.service"
import * as PostService from "../post/post.service";
import {RootStateOrAny, useSelector} from "react-redux";
import _ from "lodash";

function Post() {
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
    setDetailEntity,
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
    notifySuccess
  } = InitMasterProps<any>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update,
  });

  const moduleName = 'POST.MODULE_NAME';
  const headerTitle = 'POST.MASTER.HEADER.TITLE';
  const bodyTitle = 'POST.MASTER.BODY.TITLE';
  const createTitle = 'POST.CREATE.TITLE';
  const updateTitle = 'POST.EDIT.TITLE';
  const viewTitle = 'POST.VIEW.TITLE';
  const userInfo = useSelector(({auth}: { auth: RootStateOrAny }) => auth);
  const validationSchema = useMemo(() => Yup.object().shape({
  }), []);
  const history = useHistory();

  const canModifyPost = ['student','admin'].includes(userInfo.role.role)

  const approve = (entity: any) => {
    const data = {...entity, status: 'accept'};
    return PostService.Approve(entity, data);
  };

  const refuse = (entity: any) => {
    const data = {...entity, status: 'reject'};
    return PostService.Approve(entity, data);
  };

  const adminAllFormButton: any = {
    type: 'outside',
    data: {
      approve: {
        role: 'special',
        type: 'button',
        linkto: undefined,
        className: 'btn btn-primary mr-8 fixed-btn-width',
        label: 'Accept',
        onClick: (entity: any) => {
          if (entity) {
            approve(entity)
                .then(() => {
                  notifySuccess('Accept successfully');
                  history.push(HomePageURL.post);
                  setPaginationProps(DefaultPagination);
                  setFilterProps({});
                })
                .catch(() => {
                });

          } else {
            notifySuccess(`Can't access to the server. Please try again`);
          }
        },
      },
      refuse: {
        role: 'button',
        type: 'button',
        linkto: undefined,
        className: 'btn btn-outline-primary fixed-btn-width btn-danger',
        label: 'Reject',
        onClick: (entity: any) => {
          if (entity) {
            refuse(entity)
                .then(() => {
                  notifySuccess('Post is rejected');
                  history.push(HomePageURL.post);
                  setPaginationProps(DefaultPagination);
                  setFilterProps({});
                })
                .catch(error => {
                  console.log(error);
                });
          } else {
            notifySuccess(`Can't access to the server. Please try again`);
          }
        },
      },
    },
  };

  const actions: any = useMemo(() => ({
    type: 'inside',
    data: {
      save: {
        role: 'submit',
        type: 'submit',
        linkto: undefined,
        className: 'btn btn-primary mr-8 fixed-btn-width',
        label: 'SAVE_BTN_LABEL',
        icon: loading ? (<Spinner style={iconStyle} animation="border" variant="light" size="sm"/>) :
            (<SaveOutlinedIcon style={iconStyle}/>)
      },
      cancel: {
        role: 'link-button',
        type: 'button',
        linkto: '/post',
        className: 'btn btn-outline-primary fixed-btn-width',
        label: 'CANCEL_BTN_LABEL',
        icon: <CancelOutlinedIcon/>,
      }
    }
  }), [loading]);


  useEffect(() => {
    getAll(filterProps);
    
  }, [paginationProps, filterProps]);
  const columns = useMemo((): MasterBodyColumns => ({
    faculty: {
      dataField: 'user.faculty.faculty',
      text: `${intl.formatMessage({id: 'POST.MASTER.HEADER.FACULTY'})}`,
      ...SortColumn,
    },
    title: {
      dataField: 'title',
      text: `${intl.formatMessage({id: 'POST.MASTER.TABLE.TITLE'})}`,
      ...SortColumn,
    },
    name: {
      dataField: 'user.fullName',
      text: `${intl.formatMessage({id: 'POST.MASTER.HEADER.STUDENT_NAME'})}`,
      ...SortColumn,
    },
    code: {
      dataField: 'user.code',
      text: `${intl.formatMessage({id: 'POST.MASTER.HEADER.STUDENT_CODE'})}`,
      ...SortColumn,
    },
    category: {
      dataField: 'category.category',
      text: `${intl.formatMessage({id: 'POST.MASTER.HEADER.CATEGORY'})}`,
      ...SortColumn,
    },
    date_upload: {
      dataField: 'date_upload',
      text: `${intl.formatMessage({id: 'POST.MASTER.HEADER.DATE_UPLOAD'})}`,
      formatter: input => <DisplayDateTime input={input} _format={'dd/MM/yyyy'} />,
      ...SortColumn,
    },
    status: {
      dataField: 'status',
      text: `${intl.formatMessage({id: 'POST.MASTER.HEADER.STATUS'})}`,
      ...SortColumn,
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'POST.MASTER.TABLE.ACTION_COLUMN'})}`,
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
          history.push(`${window.location.pathname}/${entity._id}`);
          // get(entity).then(result => {
          //   setEditEntity(result.data);
          //   setShowEdit(true);
          // });
        },
      },
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  }), []);

  const masterEntityDetailDialog: RenderInfoDetail = useMemo((): RenderInfoDetail => [
    {
      className: 'col-md-12 col-12',
      dataClassName: 'col-md-6 col-12',
      data: {
        title: {title: 'POST.MASTER.TABLE.TITLE'},
        file: {
          title: 'POST',
          formatter: (input) => {
            if (!input) return <></>
            const [_, ...nameArr] = input.path.split('-');
            const nameFile = nameArr.join('');
            return DisplayDownloadLink('/'+input.path, undefined, nameFile)
          }
        },
        'user.faculty.faculty': {
          title: 'POST.MASTER.HEADER.FACULTY',
        },
        'user.fullName': {title: 'POST.MASTER.HEADER.STUDENT_NAME'},
        'user.code': {title: 'POST.MASTER.HEADER.STUDENT_CODE'},
        // code: {title: 'POST.MASTER.HEADER.CODE'},
        'category.category': {title: 'POST.MASTER.HEADER.CATEGORIES'},
        'academicYear.name': {title: 'POST.MASTER.HEADER.ACADEMIC_YEAR'},
        date_upload: {
          title: 'POST.MASTER.HEADER.DATE_UPLOAD',
          formatter: input => <DisplayDateTime input={input} _format={'dd/MM/yyyy'} />,
        },
        status: {title: 'POST.MASTER.HEADER.STATUS'},
        description: {title: 'POST.MASTER.HEADER.DESCRIPTION'},
        image: {
          formatter: (input) => <DetailImage images={input} width={200} height={200}/>
        },
      },
    },
  ], []);

  const initSearchModel = useMemo<SearchModel>(() => (
      {
        title: {
          type: 'string',
          label: 'Title',
        },
        user: {
          type: 'search-select',
          label: 'User',
          onSearch: UserService.GetAll,
          keyField: 'code',
        },
        date_upload: {
          type: 'date-time',
          label: 'Date',
        },
        category: {
          type: 'search-select',
          label: 'Category',
          onSearch: CategoryService.GetAll,
          keyField: 'category',
        },
        status: {
          type: 'search-select',
          label: 'Status',
          // onSearch: ({queryProps, paginationProps}) => GetType(PostTypeStatus, {queryProps, paginationProps}),
          onSearch: GetType,
          keyField: 'name',
          selectField: 'code'
          // onChange: (e, {setFieldValue}) => {
          //   console.log('onChange')
          //   setFieldValue('status', e?.status);
          //   console.log(e?.status)
          // }
        },
      }), []);
  const [searchModel, setSearchModel] = useState(initSearchModel);

  const [group1, setGroup1] = useState<ModifyInputGroup>({
    _subTitle: '',
    user: {
      _type: 'string',
      label: 'POST.MASTER.HEADER.USER',
      disabled: true,
    },
    code: {
      _type: 'string',
      label: 'POST.MASTER.TABLE.CODE',
      disabled: true,
    },
    title: {
      _type: 'string',
      label: 'POST.MASTER.TABLE.TITLE',
    },
    category: {
      _type: 'search-select',
      label: 'POST.MASTER.HEADER.CATEGORY',
      onSearch: CategoryService.GetAll,
      required: true,
      keyField: 'category',
    },
    file: {
      _type: 'file',
      label: 'POST',
      maxNumber: 1,
      isArray: false,
    },
    description: {
      _type: 'string',
      label: 'POST.MASTER.TABLE.DESCRIPTION',
    },
    image: {
      _type: 'image',
      maxNumber: 3,
      label: 'USER.MODIFY.IMAGE',
      isArray: true,
    },
    condition: {
      _type: 'checkbox',
      label: 'POST.MASTER.TABLE.CONDITION',
    }
  });

  const modifyModel: ModifyPanel = {
    _title: '',
    commonInfo: {
      _subTitle: 'INFORMATION',
      _className: 'col-6 pl-xl-15 pl-md-10 pl-5 text-primary',
      user : {
        _type: 'object',
        _inputClassName: 'col-6',
        _className: 'row mb-5',
        fullName: {
          _type: 'string',
          label: 'POST.MASTER.HEADER.USER',
          disabled: true,
        },
        code: {
          _type: 'string',
          label: 'POST.MASTER.HEADER.USER_CODE',
          // onSearch: UserService.GetAll,
          disabled: true,
        },
      },
      title: {
        _type: 'string',
        label: 'POST.MASTER.TABLE.TITLE',
      },
      category: {
        _type: 'search-select',
        label: 'POST.MASTER.HEADER.CATEGORY',
        onSearch: CategoryService.GetAll,
        required: true,
        keyField: 'category',
      },
      file: {
        _type: 'file',
        label: 'FILE',
        maxNumber: 1,
        isArray: false,
      },
      description: {
        _type: 'string',
        label: 'POST.MASTER.TABLE.DESCRIPTION',
      },
      image: {
        _type: 'image',
        maxNumber: 3,
        label: 'USER.MODIFY.IMAGE',
        isArray: true,
      },
      condition: {
        _type: 'boolean',
        label: 'POST.MASTER.TABLE.CONDITION',
        trueFalse: {
          true: '1',
          false: '0',
        },
      }
    },
  };

  const createForm = useMemo((): ModifyForm => ({
    _header: createTitle,
    panel1: modifyModel,
  }), [group1]);
  
  const updateForm = useMemo((): ModifyForm => ({...createForm, _header: updateTitle}), [createForm]);

  const createPost = () => {
    // setCreateEntity(initCreateValues);
    history.push(`${window.location.pathname}/0000000`);
  }
  const createPostFunction = canModifyPost ? createPost : undefined

  const onDeleteMany = () => setShowDeleteMany(true)
  const onDeleteManyFunction = canModifyPost ? onDeleteMany : undefined
  
  return (
    <Fragment>
      <Switch>
        <Redirect from={`${HomePageURL.post}/edit`} to={`${HomePageURL.post}`}/>
        <Route path={`${HomePageURL.post}/0000000`}>
          <EntityCrudPage
              mode={"vertical"}
              moduleName={moduleName}
              onModify={add}
              formModel={createForm}
              entity={createEntity}
              actions={actions}
              validation={validationSchema}
              homePageUrl={HomePageURL.post}
          />
        </Route>
        <Route path={`${HomePageURL.post}/:code`}>
          {({match}) => (
              <EntityCrudPage
                  mode={"vertical"}
                  onModify={update}
                  setEditEntity={setEditEntity}
                  moduleName={moduleName}
                  code={match?.params.code}
                  get={GetById}
                  formModel={updateForm}
                  actions={canModifyPost && actions}
                  validation={validationSchema}
                  onComments={PostService.Comments}
                  homePageUrl={HomePageURL.post}
                  allFormButton={userInfo.role.role === 'coordinator' && adminAllFormButton}
              />
          )}
        </Route>
        <Route path={`${HomePageURL.post}`}>`
          <MasterHeader
            title={headerTitle}
            onSearch={(value) => {
              setPaginationProps(DefaultPagination);
              const cvValue = JSON.parse(JSON.stringify(value));
              if (value && value.status && !_.isString(value.status)) {
                cvValue.status = value.status.name;
              }
              setFilterProps(cvValue);
            }}
            searchModel={searchModel}
          />
          <MasterBody
            title={bodyTitle}
            onCreate={createPostFunction}
            onDeleteMany={onDeleteManyFunction}
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
    </Fragment>
  );
}


export default Post;
