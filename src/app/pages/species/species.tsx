import React, {Fragment, useEffect, useMemo} from 'react';
import {useIntl} from 'react-intl';
import {DefaultPagination, NormalColumn, SortColumn,} from '../../common-library/common-consts/const';
import {MasterHeader} from '../../common-library/common-components/master-header';
import {MasterBody} from '../../common-library/common-components/master-body';
import {ActionsColumnFormatter} from '../../common-library/common-components/actions-column-formatter';
import {DeleteEntityDialog} from '../../common-library/common-components/delete-entity-dialog';
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-entities-dialog';
import {InitMasterProps, InitValues,} from '../../common-library/helpers/common-function';
import {Route, Switch, useHistory} from 'react-router-dom';
import EntityCrudPage from '../../common-library/common-components/entity-crud-page';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import {SpeciesModel} from './species.model';
import * as ProductTypeService from './species.service';
import 'react-toastify/dist/ReactToastify.css';
import {MasterEntityDetailDialog} from '../../common-library/common-components/master-entity-detail-dialog';
import {
  ModifyForm,
  ModifyInputGroup,
  RenderInfoDetail,
  SearchModel,
} from '../../common-library/common-types/common-type';
import {Spinner} from 'react-bootstrap';
import {DetailImage} from "../../common-library/common-components/detail/detail-image";

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const bodyTitle = 'PRODUCT_TYPE.MASTER.BODY.TITLE';
const moduleName = 'PRODUCT_TYPE.MODULE_NAME';
const deleteDialogTitle = 'PRODUCT_TYPE.DELETE_DIALOG.TITLE';
const createTitle = 'PRODUCT_TYPE.CREATE.TITLE';
const updateTitle = 'PRODUCT_TYPE.UPDATE.TITLE';

const standardizeamedName = (name: string) => {
  let sName = name.trim();
  sName.toLowerCase();
  sName = sName.replace(/\s+/g, " ");
  return sName.toLowerCase().replace(/(^|\s)\S/g, function (l) {
    return l.toUpperCase();
  });
}

function Species() {
  const intl = useIntl();
  
  const history = useHistory();
  const {
    entities,
    deleteEntity,
    setDeleteEntity,
    editEntity,
    setEditEntity,
    setCreateEntity,
    selectedEntities,
    setSelectedEntities,
    detailEntity,
    setDetailEntity,
    showDelete,
    setShowDelete,
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
    add,
    update,
    get,
    deleteMany,
    deleteFn,
    getAll,
  } = InitMasterProps<SpeciesModel>({
    getServer: ProductTypeService.Get,
    countServer: ProductTypeService.Count,
    createServer: ProductTypeService.Create,
    deleteServer: ProductTypeService.Delete,
    deleteManyServer: ProductTypeService.DeleteMany,
    getAllServer: ProductTypeService.GetAll,
    updateServer: ProductTypeService.Update,
  });

  const [trigger, setTrigger] = React.useState(false)

  useEffect(() => {
    getAll(filterProps);
  }, [paginationProps, filterProps, trigger]);
  
  const columns = {
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN'})}`,
      ...SortColumn,
      classes: 'text-center',
    },
    name: {
      dataField: 'name',
      text: `${intl.formatMessage({id: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN'})}`,
      ...SortColumn,
      classes: 'text-center',
    },
    
    barcode: {
      dataField: 'barcode',
      text: `${intl.formatMessage({id: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN'})}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        intl,
        onShowDetail: (entity: SpeciesModel) => {
          get(entity);
          setShowDetail(true);
          setDetailEntity(entity);
        },
        onDelete: (entity: SpeciesModel) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
        onEdit: (entity: SpeciesModel) => {
          get(entity);
          // setShowEdit(true);
          setEditEntity(entity);
          history.push(`${window.location.pathname}/${entity._id}`);
        },
      },
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  };

  console.log(editEntity)
  
  const schema = Yup.object().shape({
    name: Yup.string().test('Exists validate', 'SPECIES_NAME_WAS_EXISTED', function (value) {
      console.log(editEntity)
        if (editEntity) {
          const validArr = entities.filter(item => item._id !== editEntity._id);
          const index = validArr.findIndex(el => el.name === value);
          return index === -1;
        }
      
        const index = entities.findIndex(el => el.name === value);
        return index === -1;
      }),
    barcode: Yup.string()
      .max(13, 'MAX_13_CHARACTERS')
      .min(8, 'MIN_CHARACTERS')
      .matches(/^[0-9]+$/u, {
        message: '"GTIN_IS_INVALID',
      })
      .test('Exists validate', 'GTIN_WAS_EXISTED', function (value) {
        if (editEntity) {
          const validArr = entities.filter(item => item._id !== editEntity._id);
          const index = validArr.findIndex(el => el.barcode === value);
          return index === -1;
        }
        const index = entities.findIndex(el => el.barcode === value);
        return index === -1;
      }),
    growingDays: Yup.number()
      .min(1, 'DAYS_MUST_BE_MORE_THAN_1')
      .typeError('INPUT_NUMBER'),
    plantingDays: Yup.number()
      .min(1, 'DAYS_MUST_BE_MORE_THAN_1')
      .typeError('INPUT_NUMBER'),
    expiryDays: Yup.number()
      .min(1, 'DAYS_MUST_BE_MORE_THAN_1')
      .typeError('INPUT_NUMBER'),
  });
  
  const masterEntityDetailDialog: RenderInfoDetail = [
    {
      data: {
        image: {
          formatter: (data, values) => (<DetailImage width={'270px'} height={'270px'} images={data} values={values}/>),
        },
      },
      className: 'col-lg-6 col-md-12 d-flex justify-content-right align-items-center mr-5 ml-5',
      dataClassName: 'd-flex',
    },
    {
      data: {
        code: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.CODE'},
        name: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.NAME'},
        barcode: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.BARCODE'},
        growingDays: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW'},
        plantingDays: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING'},
        expiryDays: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY'},
      },
      dataClassName: 'col-lg-5 col-md-8',
      titleClassName: 'col-lg-7 col-md-4',
      className: 'col-lg-5 col-md-12',
    },
  ];
  
  const productTypeSearchModel: SearchModel = {
    code: {
      type: 'string',
      label: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
    },
    name: {
      type: 'string',
      label: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
    },
  };
  
  const group1 = useMemo((): ModifyInputGroup => ({
    _subTitle: 'THÔNG TIN CHUNG',
    _className: 'col-6 pr-xl-15 pr-md-10 pr-5',
    code: {
      _type: 'string',
      label: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
      required: false,
      disabled: true,
    },
    name: {
      _type: 'string',
      required: true,
      label: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
    },
    barcode: {
      _type: 'string-number',
      required: true,
      label: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
    },
    image: {
      _type: 'image',
      isArray: false,
      label: 'PRODUCT_TYPE.MASTER.IMAGE',
      maxNumber: 1,
    },
    // avatar: {
    //   type: 'image',
    //   placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
    //   label: 'Album 2',
    // },
  }), []);
  const group2 = useMemo((): ModifyInputGroup => ({
    _subTitle: 'THÔNG TIN VÒNG ĐỜI',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    growingDays: {
      _type: 'number',
      label: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
      required: true,
    },
    plantingDays: {
      _type: 'number',
      label: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
      required: true,
    },
    expiryDays: {
      _type: 'number',
      label: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
      required: true,
    },
  }), [entities, selectedEntities, setSelectedEntities]);
  
  const createForm = useMemo(
    (): ModifyForm => ({
      _header: createTitle,
      panel1: {
        _title: '',
        group1: group1,
        group2: group2,
      },
    }),
    [group1, group2],
  );
  const updateForm = useMemo((): ModifyForm => ({...createForm, _header: updateTitle}), [createForm]);
  
  
  const allFormButton: any = {
    type: 'inside',
    data: {
      save: {
        role: 'submit',
        type: 'submit',
        linkto: undefined,
        className: 'btn btn-primary mr-5 pl-8 pr-8',
        label: 'SAVE_BTN_LABEL',
        icon: <SaveOutlinedIcon/>,
        loading: <Spinner animation="border" variant="light" size="sm"/>
      },
      cancel: {
        role: 'link-button',
        type: 'button',
        linkto: '/species',
        className: 'btn btn-outline-primary mr-2 pl-8 pr-8',
        label: 'CANCEL_BTN_LABEL',
        icon: <CancelOutlinedIcon/>,
        loading: <Spinner animation="border" variant="success" size="sm"/>
      },
    },
  };
  const initValues = useMemo(() =>( {
    ...InitValues(createForm), code: undefined
  }), [createForm]);
  
  return (
    <Fragment>
      <MasterEntityDetailDialog
        show={showDetail}
        entity={detailEntity}
        renderInfo={masterEntityDetailDialog}
        onHide={() => {
          setShowDetail(false);
        }}
        moduleName={moduleName}
        size={'lg'}
      />
      <DeleteEntityDialog
        moduleName={moduleName}
        entity={deleteEntity}
        onDelete={deleteFn}
        isShow={showDelete}
        loading={loading}
        error={error}
        onHide={() => {
          setShowDelete(false);
        }}
        title={deleteDialogTitle}
      />
      <DeleteManyEntitiesDialog
        moduleName={moduleName}
        selectedEntities={selectedEntities}
        loading={loading}
        isShow={showDeleteMany}
        onDelete={deleteMany}
        error={error}
        onHide={() => {
          setShowDeleteMany(false);
          setTrigger(!trigger)
        }}
      />
      
      <Switch>
        <Route path="/species/new">
          <EntityCrudPage
            entity={initValues}
            onModify={(values: SpeciesModel) => {
              if (values.name) {
                values.name = standardizeamedName(values.name)
              }
              return add(values)
            }}
            get={() => null}
            formModel={createForm}
            actions={allFormButton}
            validation={schema}
            loading={loading}
            
          />
        </Route>
        <Route path={`/species/:code`}>
          {({match}) => (
            <EntityCrudPage
              onModify={(values: SpeciesModel) => {
                if (values.name) {
                  values.name = standardizeamedName(values.name)
                }
                return update(values)
              }}
              code={match?.params.code}
              get={ProductTypeService.GetById}
              formModel={updateForm}
              actions={allFormButton}
              validation={schema}
              loading={loading}
              setEditEntity={setEditEntity}
            />
          )}
        </Route>
        <Route path="/species">
          <MasterHeader
            title={headerTitle}
            onSearch={value => {
              setPaginationProps(DefaultPagination);
              setFilterProps(value);
            }}
            searchModel={productTypeSearchModel}
          />
          <MasterBody
            title={bodyTitle}
            onCreate={() => {
              setCreateEntity(null);
              setEditEntity(null);
              // setShowCreate(true);
              history.push(`${window.location.pathname}/new`);
            }}
            onDeleteMany={() => setShowDeleteMany(true)}
            selectedEntities={selectedEntities}
            onSelectMany={setSelectedEntities}
            entities={entities}
            total={total}
            columns={columns as any}
            loading={loading}
            paginationParams={paginationProps}
            setPaginationParams={setPaginationProps}
            isShowId={true}
          />
          
          {/* <MasterTreeStructure /> */}
        </Route>
      </Switch>
    </Fragment>
  );
}

export default Species;
