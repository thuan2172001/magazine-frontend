import React, {Fragment, useEffect} from 'react';
import {useIntl} from 'react-intl';
import {Count, Create, Delete, DeleteMany, Get, GetAll, Update} from './purchase-order.service';
import {PurchaseOrderModel} from './purchase-order.model';
import {DefaultPagination, NormalColumn, SortColumn, StatusValue,} from '../../common-library/common-consts/const';
import {MasterHeader} from '../../common-library/common-components/master-header';
import {MasterEntityDetailDialog} from '../../common-library/common-components/master-entity-detail-dialog';
import {MasterBody} from '../../common-library/common-components/master-body';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import {ActionsColumnFormatter} from '../../common-library/common-components/actions-column-formatter';
import {DeleteEntityDialog} from '../../common-library/common-components/delete-entity-dialog';
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-entities-dialog';
import ModifyEntityDialog from '../../common-library/common-components/modify-entity-dialog';
import {SearchModel} from '../../common-library/common-types/common-type';
import {GenerateAllFormField, InitMasterProps,} from '../../common-library/helpers/common-function';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import EntityCrudPage from '../../common-library/common-components/entity-crud-page';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import GalleryImage from '../../common-library/forms/gallery-image';
import * as AgencyService from './agency.service';

const DataExample: any = [
  {
    _id: 'dlc1',
    code: 'zz_1',
    title: 'Đại lý cấp 1',
    child: [
      {
        _id: 'xxx-xxx',
        code: 'cccc',
        title: 'Đại lý cấp 2',
        parentId: 'dlc1',
      },
    ],
  },
  {
    _id: 'sieuthi',
    code: 'abcxyz',
    title: 'Siêu thị',
    child: [],
  },
  {
    _id: 'bigC',
    code: 'dcvf',
    title: 'Big C',
    child: [
      {
        _id: 'xxx-xxx4',
        code: 'cvfv',
        title: 'Đại lý cấp 4',
        parentId: 'bigC',
      },
      {
        _id: 'xxx-xxx5',
        code: 'dfs',
        title: 'Đại lý cấp 5',
        parentId: 'bigC',
      },
    ],
  },
];

// const validateSchema = {
//   code: {
//     required: true,
//   },
//   phone: {
//     required: true,

//   }
// }

// const ValidationByNguyenMinhHieu = (data: any, validateSchema: any) => {

//   const _validationResult = {}

//   Object.keys(validateSchema).map(key => {
//     switch(validateSchema[key])
//   })
// }

const PurchaseOrderSchema = Yup.object().shape({
  // code: Yup.string()
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .required('Code không được để trống'),
  // // dateofbirth: Yup.mixed()
  // //   .nullable(false)
  // //   .required('Date of Birth is required'),
  // agencyAddress: Yup.string().required('Vui lòng nhập Agency Address'),
  phoneNumber: Yup.string()
    .required('Last name không được để trống')
    .matches(/[0-9]$/u, {
      message: 'Vui lòng nhập tên đúng định dạng',
    }),
  // time: Yup.date().required('Vui lòng nhập date'),
  // time2: Yup.date().required('Vui lòng nhập date'),
  // quantity: Yup.number().required('Vui lòng nhập số lượng'),
  agency: Yup.object().shape({
    name: Yup.string().required('Name ko đc để trống'),
    name2: Yup.string().required('Name2 ko đc để trống'),
    taxId: Yup.object().shape({
      taxName: Yup.string().required('Tax name ko đc để trống'),
      taxNumber: Yup.string().required('Tax number ko đc để trống'),
    })
  }),
  // staff: Yup.array().min(1, 'Nhân viên ko đc để trống'),
});

function PurchaseOrder() {
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
    error,
    setError,
    add,
    update,
    get,
    deleteMany,
    deleteFn,
    getAll,
    refreshData,
  } = InitMasterProps<PurchaseOrderModel>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update,
  });
  
  const moduleName = 'PURCHASE_ORDER.CUSTOM.MODULE_NAME';
  const headerTitle = 'PURCHASE_ORDER.MASTER.HEADER.TITLE';
  const createTitle = 'PURCHASE_ORDER.CREATE.TITLE';
  const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
  const history = useHistory();
  
  useEffect(() => {
    getAll(filterProps);
  }, [paginationProps, filterProps]);
  
  const columns = {
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN'})}`,
      ...SortColumn,
    },
    agencyAddress: {
      dataField: 'agencyAddress',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN'})}`,
      ...SortColumn,
    },
    
    phoneNumber: {
      dataField: 'phoneNumber',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'})}`,
      ...SortColumn,
    },
    status: {
      dataField: 'status',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.STATUS_COLUMN'})}`,
      ...SortColumn,
      formatter: (cell: any, row: any) =>
        row.status === StatusValue ? (
          <CheckCircleIcon style={{color: '#1DBE2D'}}/>
        ) : (
          <IndeterminateCheckBoxIcon/>
        ),
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        intl,
        onShowDetail: (entity: PurchaseOrderModel) => {
          get(entity);
          setShowDetail(true);
        },
        onDelete: (entity: PurchaseOrderModel) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
        onEdit: (entity: PurchaseOrderModel) => {
          get(entity);
          setShowEdit(true);
          setEditEntity(entity);
          // history.push(`${window.location.pathname}/${entity.code}`);
        },
      },
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  };
  
  const masterEntityDetailDialog = [
    {
      header: 'THÔNG TIN 1',
      data: {
        code: {title: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN'},
        agencyAddress: {title: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN'},
        phoneNumber: {title: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'},
      },
    },
    {
      header: 'THÔNG TIN 2',
      data: {
        code: {title: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN'},
        agencyAddress: {title: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN'},
        phoneNumber: {title: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'},
      },
    },
    {
      header: 'THÔNG TIN 3',
      data: {
        code: {title: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN'},
        agencyAddress: {title: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN'},
        phoneNumber: {title: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'},
      },
    },
  ];
  
  const purchaseOrderSearchModel: SearchModel = {
    code: {
      type: 'search-select',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
      onSearch: GetAll,
      keyField: 'code',
    },
    agencyAddress: {
      type: 'search-select',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      onSearch: GetAll,
      keyField: 'agencyAddress',
    },
    date: {
      type: 'date-time',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      onSearch: GetAll,
      keyField: 'agencyAddress',
    },
    agency: {
      type: 'search-select',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL',
      onSearch: AgencyService.GetAll,
      keyField: 'name',
    },
    count: {
      type: 'number',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      onSearch: GetAll,
      keyField: 'count',
    },
    tree: {
      type: 'tree-select',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      keyField: 'code',
      // data: ConvertToTreeNode(DataExample),
    },
    tree2: {
      type: 'tree-select',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      keyField: 'code',
      // data: ConvertToTreeNode(DataExample),
    },
  };
  
  const modifyModel = [
    {
      title: 'Test',
      data: {
        // code: {
        //   type: 'string',
        //   placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER' }),
        //   label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
        //   required: true,
        //   disabled: !!editEntity,
        // },
        // agencyAddress: {
        //   type: 'string',
        //   placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER' }),
        //   required: true,
        //   label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL' }),
        // },
        phoneNumber: {
          type: 'string',
          placeholder: intl.formatMessage({
            id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN',
          }),
          required: true,
          label: intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'}),
        },
        image: {
          type: 'image',
          placeholder: intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL'}),
          label: 'Album 1',
        },
        // image2: {
        //   type: 'image',
        //   placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
        //   label: 'Album 2',
        // },
        agency: {
          type: 'object',
          data: {
            name: {
              type: 'string',
              label: 'Name',
              placeholder: 'Name',
            },
            name2: {
              type: 'string',
              label: 'Name2',
              placeholder: 'Name2',
            },
            taxId: {
              type: 'object',
              data: {
                taxName: {
                  type: 'string',
                  label: 'Taxcc',
                  placeholder: 'Taxcc',
                },
                taxNumber: {
                  type: 'string',
                  label: 'Taxfds',
                  placeholder: 'Tafdsx',
                },
              },
            },
          },
        },
        staff: {
          type: 'tag',
          label: 'Nhân viên',
          placeholder: 'Nhân viên',
        },
      },
    },
    // {
    //   title: 'Test222',
    //   data: {
    //     test1: {
    //       type: 'string',
    //       placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER' }),
    //       label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
    //       disabled: !!editEntity,
    //     },
    //     test2: {
    //       type: 'string',
    //       placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER' }),
    //       label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL' }),
    //     },
    //     test3: {
    //       type: 'string',
    //       placeholder: intl.formatMessage({
    //         id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN',
    //       }),
    //       label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
    //     },
    //   },
    // },
  ];
  
  const modifyModel_3 = [
    {
      title: '',
      data: {
        time: {
          type: 'date-time',
          placeholder: 'Thời gian thu hoạch',
          label: 'Thời gian thu hoạch',
          required: true,
        },
        time2: {
          type: 'date-time',
          placeholder: 'Thời gian thu hoạch2',
          label: 'Thời gian thu hoạch2',
        },
        quantity: {
          type: 'number',
          label: 'Sản lượng thu hoạch (kg)',
          placeholder: 'Sản lượng',
          required: true,
        },
        imageDetail: {
          type: 'gallery',
          label: 'Image Gallery',
        },
      },
    },
  ];
  
  const modifyModel_2 = [
    {
      director: {
        type: 'string',
        label: 'Thông tin giám đốc',
        placeholder: 'Thông tin giám đốc',
      },
      leader: {
        type: 'string',
        label: 'Tổ trưởng gieo trồng',
        placeholder: 'Tổ trưởng gieo trồng',
      },
    },
  ];
  
  const modifyModel_4 = [
    {
      test4: {
        type: 'string',
        label: 'Test 4',
        placeholder: 'Test 4',
      },
      test5: {
        type: 'string',
        label: 'Test 5',
        placeholder: 'Test 5',
      },
    },
    {
      test6: {
        type: 'string',
        label: 'Test 6',
        placeholder: 'Test 6',
      },
      test7: {
        type: 'string',
        label: 'Test 7',
        placeholder: 'Test 7',
      },
      test8: {
        type: 'string',
        label: 'Test 8',
        placeholder: 'Test 8',
      },
    },
  ];
  
  const formPart: any = {
    form_1: {
      title: '',
      modifyModel: modifyModel,
      header: 'ĐƠN HÀNG',
    },
    // form_2: {
    //   title: 'Thông tin quản trị',
    //   modifyModel: modifyModel_2,
    // },
    form_3: {
      title: 'Thông tin thu hoạch',
      modifyModel: modifyModel_3,
    },
    // form_4: {
    //   title: 'Thông tin test',
    //   modifyModel: modifyModel_4,
    // },
    // form_5: {
    //   title: "xxx",
    //   modifyModel: modifyModel_2
    // }
  };
  
  const allFormField: any = {
    ...GenerateAllFormField(
      modifyModel,
      modifyModel_3,
      // , modifyModel_2, modifyModel_3, modifyModel_4
    ),
  };
  
  console.log(allFormField);
  
  const allFormButton: any = {
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
      linkto: '/purchase-order',
      className: 'btn btn-outline-primary mr-2',
      label: 'CANCEL_BTN_LABEL',
      icon: <CancelOutlinedIcon/>,
    },
    test: {
      role: 'button',
      type: 'button',
      linkto: undefined,
      className: 'btn btn-outline-primary',
      label: 'Test',
      icon: <CancelOutlinedIcon/>,
    },
  };
  
  const location = {
    latitude: 21.027763,
    longitude: 105.83416,
  };
  
  return (
    <Fragment>
      <MasterEntityDetailDialog
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
        loading={loading}
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
        onHide={() => {
          setShowCreate(false);
        }}
      />*/}
      <ModifyEntityDialog
        show={showEdit}
        entity={editEntity}
        onModify={update}
        formModel={formPart}
        actions={allFormButton}
        validation={PurchaseOrderSchema}
        onHide={() => {
          setShowEdit(false);
        }}
      />
      <Switch>
        <Redirect from="/purchase-order/edit" to="/purchase-order"/>
        
        <Route path="/purchase-order/new">
          {/* <ModifyEntityPage
            entity={createEntity}
            onModify={add}
            title={createTitle}
            modifyModel={modifyModel}
            reduxModel="purchaseOrder"
            code={null}
            get={() => null}
          /> */}
          <EntityCrudPage
            entity={createEntity}
            onModify={add}
            //  modifyModel={modifyModel}
            get={() => null}
            formModel={formPart}
            // allFormField={allFormField}
            actions={allFormButton}
            validation={PurchaseOrderSchema}
          />
        </Route>
        {/* <Route path={`/purchase-order/:code`}>
          {({ history, match }) => (
            // <ModifyEntityPage
            //   entity={editEntity}
            //   onModify={update}
            //   title={updateTitle}
            //   modifyModel={modifyModel}
            //   reduxModel="purchaseOrder"
            //   code={match?.params.code}
            //   get={PurchaseOrderService.GetById}
            // />
            <EntityCrudPage
              entity={editEntity}
              onModify={update}
              title={updateTitle}
              //  modifyModel={modifyModel}
              reduxModel="purchaseOrder"
              code={match?.params.code}
              get={PurchaseOrderService.GetById}
              formPart={formPart}
              allFormField={allFormField}
              allFormButton={allFormButton}
              validation={PurchaseOrderSchema}
            />
          )}
        </Route> */}
        <Route path="/purchase-order">
          <MasterHeader
            title={headerTitle}
            onSearch={value => {
              setPaginationProps({...DefaultPagination, page: 1});
              console.log(paginationProps);
              setFilterProps(value);
            }}
            searchModel={purchaseOrderSearchModel}
            initValue={{
              code: {label: 'ccc', value: 'cccc'},
              agencyAddress: null,
              agency: null,
              date: '',
              count: 15,
              tree: undefined,
              tree2: undefined,
            }}
          />
          <MasterBody
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
          
          {/* <MasterGoogleMap location={location} /> */}
          
          {/* <MasterMap /> */}
          <GalleryImage/>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default PurchaseOrder;
