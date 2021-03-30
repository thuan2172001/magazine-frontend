import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {DefaultPagination, NormalColumn, SortColumn,} from '../../common-library/common-consts/const';
import {MasterHeader} from '../../common-library/common-components/master-header';
import {MasterBody} from '../../common-library/common-components/master-body';
import {ActionsColumnFormatter} from '../../common-library/common-components/actions-column-formatter';
import {DeleteEntityDialog} from '../../common-library/common-components/delete-entity-dialog';
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-entities-dialog';
import {
  ModifyForm,
  ModifyInputGroup,
  RenderInfoDetail,
  SearchModel,
} from '../../common-library/common-types/common-type';
import {InitMasterProps,} from '../../common-library/helpers/common-function';
import {Route, Switch, useHistory} from 'react-router-dom';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import {ProductPackagingModel} from './product-packaging.model';
import * as ProductPackagingService from './product-packaging.service';
import {GetAll} from './product-packaging.service';
import * as ProductTypeService from '../species/species.service';
import _ from 'lodash';
import ModifyEntityDialog from '../../common-library/common-components/modify-entity-dialog';
import {MasterEntityDetailDialog} from "../../common-library/common-components/master-entity-detail-dialog";

const headerTitle = 'PRODUCT_PACKAGING.MASTER.HEADER.TITLE';
const bodyTitle = 'PRODUCT_PACKAGING.MASTER.BODY.TITLE';
const moduleName = 'PRODUCT_PACKAGING.MODULE_NAME';
const deleteDialogTitle = 'PRODUCT_PACKAGING.DELETE_DIALOG.TITLE';
const createTitle = 'PRODUCT_PACKAGING.CREATE.TITLE';
const updateTitle = 'PRODUCT_PACKAGING.UPDATE.TITLE';
const viewTitle = 'PRODUCT_PACKAGING.VIEW.TITLE';
const homeURL = `${window.location.pathname}`;

const ProductPackagingSchema = Yup.object().shape({
  species: Yup.mixed()
    .test('test name', 'SPECIES_NAME_IS_INVALID', function(value) {
      console.log(value);
      return value;
    }),
  weight: Yup.number()
    .min(0, 'GRAM_MUST_BE_MORE_THAN_0')
    .typeError('INPUT_NUMBER'),
});

function ProductPackaging() {
  const intl = useIntl();

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
    add,
    update,
    get,
    deleteMany,
    deleteFn,
    getAll,
  } = InitMasterProps<ProductPackagingModel>({
    getServer: ProductPackagingService.Get,
    countServer: ProductPackagingService.Count,
    createServer: ProductPackagingService.Create,
    deleteServer: ProductPackagingService.Delete,
    deleteManyServer: ProductPackagingService.DeleteMany,
    getAllServer: ProductPackagingService.GetAll,
    updateServer: ProductPackagingService.Update,
  });

  const [trigger, setTrigger] = React.useState(false)

  useEffect(() => {
    getAll({ ...filterProps });
  }, [paginationProps, filterProps, trigger]);

  const columns = {
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({ id: 'PRODUCT_PACKAGING.MASTER.TABLE.CODE_COLUMN' })}`,
      ...SortColumn,
      classes: 'text-center',
    },
    name: {
      dataField: 'species.name',
      text: `${intl.formatMessage({ id: 'PRODUCT_PACKAGING.MASTER.TABLE.NAME_COLUMN' })}`,
      ...SortColumn,
      formatter: (cell: any, row: any) => {
        return <p>{row.species ? row.species.name : 'Không có thông tin nha'}</p>;
      },
      classes: 'text-center',
    },

    weight: {
      dataField: 'weight',
      text: `${intl.formatMessage({ id: 'PRODUCT_PACKAGING.MASTER.TABLE.GRAM_COLUMN' })}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN' })}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        intl,
        onShowDetail: (entity: ProductPackagingModel) => {
          get(entity);
          setShowDetail(true);
          setDetailEntity(entity);
        },
        onDelete: (entity: ProductPackagingModel) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
        onEdit: (entity: ProductPackagingModel) => {
          get(entity);
          setShowEdit(true);
          setEditEntity(entity);
        },
      },
      ...NormalColumn,
      style: { minWidth: '130px' },
    },
  };
  const masterEntityDetailDialog: RenderInfoDetail = useMemo((): RenderInfoDetail => [
    {
      data: {
        code: { title: 'PRODUCT_PACKAGING.MASTER.DETAIL_DIALOG.CODE' },
        'species.name': { title: 'PRODUCT_PACKAGING.MASTER.DETAIL_DIALOG.NAME'},
        weight: { title: 'PRODUCT_PACKAGING.MASTER.DETAIL_DIALOG.GRAM' },
      },
    },
  ],[]);

  const productTypeSearchModel: SearchModel = {
    code: {
      type: 'string',
      placeholder: 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
      label: 'PRODUCT_PACKAGING.MASTER.TABLE.CODE_COLUMN',
      onSearch: GetAll,
      // selectField: 'code',
    },
    species: {
      type: 'search-select',
      placeholder: 'COMMON_COMPONENT.SELECT.PLACEHOLDER',
      label: 'PRODUCT_PACKAGING.MASTER.TABLE.NAME_COLUMN',
      onSearch: ProductTypeService.GetAll,
      selectField: '_id',
      keyField: 'name',
    },
  };

  const modifyModel = [
    {
      title: '',
      data: {
        code: {
          type: 'string',
          label: 'c',
          required: false,
          disabled: true,
        },
        species: {
          type: 'search-select',
          required: true,
          label: 'PRODUCT_PACKAGING.MASTER.TABLE.NAME_COLUMN',
          onSearch: ProductTypeService.GetAll,
          keyField: 'name',
          // refs: true
        },
        weight: {
          type: 'string',
          required: true,
          label: 'PRODUCT_PACKAGING.MASTER.TABLE.GRAM_COLUMN',
        },
      },
    },
  ];


  const [group1] = useState<ModifyInputGroup>({
    _subTitle: '',
    code: {
      _type: 'string',
      label: 'PRODUCT_PACKAGING.MASTER.TABLE.CODE_COLUMN',
      disabled: true,
    },
    species: {
      _type: 'search-select',
      label: 'PRODUCT_PACKAGING.MASTER.TABLE.NAME_COLUMN',
      onSearch: ProductTypeService.GetAll,
      disabled: false,
      required: true,
      keyField: 'name',
    },
    weight: {
      _type: 'string',
      required: true,
      label: 'PRODUCT_PACKAGING.MASTER.TABLE.GRAM_COLUMN',
    },
  });

  const createForm = useMemo(
    (): ModifyForm => ({
      _header: createTitle,
      panel1: {
        _title: '',
        group1: group1,
      },
    }),
    [],
  );

  const updateForm = useMemo((): ModifyForm => ({ ...createForm, _header: updateTitle }), [
    createForm,
  ]);

  const actions: any = {
    save: {
      role: 'submit',
      type: 'submit',
      linkto: undefined,
      className: 'btn btn-primary mr-2',
      label: 'SAVE_BTN_LABEL',
      icon: <SaveOutlinedIcon/>,
    },
    cancel: {
      role: 'link-button',
      type: 'button',
      linkto: '/product-packaging',
      className: 'btn btn-outline-primary mr-2',
      label: 'CANCEL_BTN_LABEL',
      icon: <CancelOutlinedIcon/>,
    },
  };

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
      <ModifyEntityDialog
        show={showCreate}
        onModify={(values: any) => {
          const cvEntity = { ...values };
          if (values.species && _.isObject(values.species)) {
            cvEntity.species = values.species._id;
          }
          return add(cvEntity);
        }}
        onHide={() => {
          setShowCreate(false);
        }}
        formModel={createForm}
        actions={actions}
        validation={ProductPackagingSchema}
        error={error}
        loading={loading}
        homePage={homeURL}
      />
      <ModifyEntityDialog
        show={showEdit}
        entity={editEntity}
        onModify={(values: any) => {
          const cvEntity = { ...values };

          if (values.species && _.isObject(values.species)) {
            cvEntity.species = values.species._id;
          }
          return update(cvEntity);
        }}
        onHide={() => {
          setShowEdit(false);
        }}
        formModel={updateForm}
        actions={actions}
        validation={ProductPackagingSchema}
        error={error}
        loading={loading}
        homePage={homeURL}
      />
      <Switch>
        <Route path="/product-packaging">
          <MasterHeader
            title={headerTitle}
            onSearch={value => {
              // const cvEntity = JSON.parse(JSON.stringify(value))

              // if (value.species && _.isObject(value.species)) {
              //   cvEntity.species = {}

              //   cvEntity.species._id = value.species._id;
              // }

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
              setShowCreate(true);
              //   history.push(`${window.location.pathname}/new`);
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

export default ProductPackaging;
