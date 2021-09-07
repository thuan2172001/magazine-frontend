import React, {Fragment, useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {DefaultPagination, HomePageURL, iconStyle, NormalColumn, SortColumn} from '../../common-library/common-consts/const';
import {MasterHeader} from '../../common-library/common-components/master-header';
import {MasterBody} from '../../common-library/common-components/master-body';
import {
  ActionsColumnFormatter,
  TickColumnFormatter
} from '../../common-library/common-components/actions-column-formatter';
import {DeleteEntityDialog} from '../../common-library/common-components/delete-entity-dialog';
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-entities-dialog';
import {
  ModifyForm,
  ModifyInputGroup,
  RenderInfoDetail,
  SearchModel
} from '../../common-library/common-types/common-type';
import {InitMasterProps, InitValues,} from '../../common-library/helpers/common-function';
import {Route, Switch, useHistory} from 'react-router-dom';
import EntityCrudPage from '../../common-library/common-components/entity-crud-page';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as ShippingAgencyService from './shipping-agency.service'
import {ShippingAgencyModel} from './shipping-agency.model';
import {MasterEntityDetailDialog} from "../../common-library/common-components/master-entity-detail-dialog";
import {GetCity, GetDistrict, GetState} from "../address/address.service";
import * as RoleService from "../role/role.service";
import * as Yup from "yup";
import * as ManagementUnitService from '../management-organization/management-organization.service';

import {Spinner} from "react-bootstrap";

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const tableTitle = 'SHIPPING_AGENCY.MASTER.TABLE.TITLE';
const detailDialogTitle = 'SHIPPING_AGENCY.DETAIL_DIALOG.TITLE';
const moduleName = 'SHIPPING_AGENCY.MODULE_NAME';
const deleteDialogTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.TITLE';
const deleteDialogBodyTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.BODY_TITLE';
const createTitle = 'SHIPPING_AGENCY.CREATE.HEADER';
const updateTitle = 'SHIPPING_AGENCY.UPDATE.HEADER';

function ShippingAgency() {
  const intl = useIntl();
  
  const history = useHistory();
  const {
    entities,
    deleteEntity,
    setDeleteEntity,
    editEntity,
    selectedEntities,
    setSelectedEntities,
    detailEntity,
    setDetailEntity,
    showDelete,
    setShowDelete,
    showCreate,
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
  } = InitMasterProps<ShippingAgencyModel>({
    getServer: ShippingAgencyService.Get,
    countServer: ShippingAgencyService.Count,
    createServer: ShippingAgencyService.Create,
    deleteServer: ShippingAgencyService.Delete,
    deleteManyServer: ShippingAgencyService.DeleteMany,
    getAllServer: ShippingAgencyService.GetAll,
    updateServer: ShippingAgencyService.Update,
  });
  
  useEffect(() => {
    getAll({ ...filterProps, type: '1' });
  }, [paginationProps, filterProps]);
  
  const columns = useMemo(() => {
    return {
      code: {
        dataField: 'code',
        text: `${intl.formatMessage({id: 'SHIPPING_AGENCY.MASTER.TABLE.CODE_COLUMN'})}`,
        ...SortColumn,
        align: 'center',
      },
      name: {
        dataField: 'name',
        text: `${intl.formatMessage({id: 'SHIPPING_AGENCY.MASTER.TABLE.NAME_COLUMN'})}`,
        ...SortColumn,
        align: 'center',
      },
      phone: {
        dataField: 'phone',
        text: `${intl.formatMessage({id: 'SHIPPING_AGENCY.MASTER.TABLE.PHONE_COLUMN'})}`,
        ...SortColumn,
        align: 'center',
      },
      status: {
        dataField: 'status',
        text: `${intl.formatMessage({id: 'SHIPPING_AGENCY.MASTER.TABLE.STATUS_COLUMN'})}`,
        formatter: TickColumnFormatter,
        ...SortColumn,
        align: 'center',
      },
      action: {
        dataField: 'action',
        text: `${intl.formatMessage({id: 'SHIPPING_AGENCY.MASTER.TABLE.ACTION_COLUMN'})}`,
        formatter: ActionsColumnFormatter,
        formatExtraData: {
          intl,
          onShowDetail: (entity: ShippingAgencyModel) => {
            get(entity);
            setShowDetail(true);
            setDetailEntity(entity);
          },
          onDelete: (entity: ShippingAgencyModel) => {
            setDeleteEntity(entity);
            setShowDelete(true);
          },
          onEdit: (entity: ShippingAgencyModel) => {
            history.push(`${window.location.pathname}/${entity._id}`);
          },
        },
        ...NormalColumn,
        style: {minWidth: '130px'},
      },
    }
  }, []);
  
  const masterEntityDetailDialog: RenderInfoDetail = useMemo((): RenderInfoDetail => [
    {
      header: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.SUBTITLE',
      className: 'col-7',
      dataClassName: 'col-7',
      data: {
        code: {title: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.CODE'},
        name: {title: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.NAME'},
        address: {
          title: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.ADDRESS',
          formatter: (address: any) => {
            const addressString = `${address.address}, ${address.district}, ${address.city}, ${address.state}`;
            return (<>{addressString}</>);
          }
        },
        phone: {title: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.PHONE_NUMBER'},
        status: {
          title: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.STATUS',
          formatter: TickColumnFormatter
        },
      },
    },
    {
      header: 'SHIPPING_AGENCY.DETAIL_DIALOG.OWNER.SUBTITLE',
      className: 'col-5',
      titleClassName: 'col-5',
      dataClassName: 'col-7',
      data: {
        fullName: {
          title: 'SHIPPING_AGENCY.DETAIL_DIALOG.OWNER.FULL_NAME',
          keyField: 'owner.fullName'
        }, email: {
          title: 'SHIPPING_AGENCY.DETAIL_DIALOG.OWNER.EMAIL',
          keyField: 'owner.email'
        }, phone: {
          title: 'SHIPPING_AGENCY.DETAIL_DIALOG.OWNER.PHONE_NUMBER',
          keyField: 'owner.phone'
        },
      },
    },
  ], []);
  
  const searchModel: SearchModel = {
    code: {
      type: 'string',
      label: 'SHIPPING_AGENCY.MASTER.SEARCH.CODE',
    },
    name: {
      type: 'string',
      label: 'SHIPPING_AGENCY.MASTER.SEARCH.NAME',
    },
    phone: {
      type: 'string-number',
      label: 'SHIPPING_AGENCY.MASTER.SEARCH.PHONE',
    },
  };

  const [initOwner, setInitOwner] = useState({})
  const [state, setState] = useState<string | null | undefined>(null);
  const [city, setCity] = useState<string | null | undefined>(null);
  const [ownerState, setOwnerState] = useState<string | null | undefined>(null);
  const [ownerCity, setOwnerCity] = useState<string | null | undefined>(null);
  const [managementUnit, setManagementUnit] = useState<any>(null);

  useEffect(() => {
    setState(editEntity?.address?.state);
    setCity(editEntity?.address?.city);
  }, [editEntity]);

  useEffect(() => {
    const owner: any = {}
    ManagementUnitService.getAll({ queryProps: { ...filterProps }, paginationProps: {...paginationProps, limit: 100} }).then(res => {
      const index = res.data.data.findIndex(value => (value.name === 'Phòng Vận chuyển' || value.code === '00006'))
      if (index !== -1) {
        owner.managementUnit = res.data.data[index]
        RoleService.GetAll({
          queryProps: { ...filterProps, managementUnit: { ...owner.managementUnit } },
          paginationProps,
        }).then(ress => {
          const roleIndex = ress.data.data.findIndex(value => value.name === 'Chủ đơn vị vận chuyển')
          if (roleIndex !== -1) {
            owner.role = ress.data.data[roleIndex]
            setInitOwner(owner)
          }
         
        });
      }
    })
  }, [])

  const getCity = useCallback(({queryProps, paginationProps}: any): Promise<any> => {
    return GetCity({queryProps: {...queryProps, state}, paginationProps})
  }, [state]);
  const getDistrict = useCallback(({queryProps, paginationProps}: any): Promise<any> => {
    return GetDistrict({queryProps: {...queryProps, city}, paginationProps})
  }, [city]);
  const getOwnerCity = useCallback(
    ({ queryProps, paginationProps }: any): Promise<any> => {
      console.log(ownerState);
      return GetCity({ queryProps: { ...queryProps, state: ownerState }, paginationProps });
    },
    [ownerState],
  );
  const getOwnerDistrict = useCallback(
    ({ queryProps, paginationProps }: any): Promise<any> => {
      return GetDistrict({ queryProps: { ...queryProps, city: ownerCity }, paginationProps });
    },
    [ownerCity],
  );
  
  const group1 = useMemo((): ModifyInputGroup => ({
    _subTitle: 'THÔNG TIN CHUNG',
    _className: 'col-6 pr-xl-15 pr-md-10 pr-5',
    code: {
      _type: 'string',
      label: 'SHIPPING_AGENCY.MODIFY.CODE',
      disabled: true,
    },
    name: {
      _type: 'string',
      required: true,
      label: 'SHIPPING_AGENCY.MODIFY.NAME',
    },
    address: {
      _type: 'object',
      state: {
        _type: 'search-select',
        onSearch: GetState,
        disabled: (values: any) => {
          console.log(values)
        },
        onChange: (value: any, {setFieldValue, setFieldTouched}: any) => {
          console.log(state, value);
          if (!value || state != value) {
            setCity(null);
            setFieldValue('address.city', '');
            setFieldTouched('address.city', false);
            setFieldValue('address.district', '');
            setFieldTouched('address.district', false);
          }
          setState(value);
        },
        required: true,
        label: 'SHIPPING_AGENCY.MODIFY.STATE',
      },
      city: {
        _type: 'search-select',
        onSearch: getCity,
        // selectField: 'code',
        required: true,
        onChange: (value: any, {setFieldValue, setFieldTouched}: any) => {
          if (!value || city != value) {
            setFieldValue('address.district', '');
            setFieldTouched('address.district', false);
          }
          setCity(value);
        },
        disabled: (values: any) => {
          return (values?.address?.state === '');
        },
        label: 'SHIPPING_AGENCY.MODIFY.CITY',
      },
      district: {
        _type: 'search-select',
        onSearch: getDistrict,
        // selectField: 'code',
        required: true,
        disabled: (values: any) => {
          return (values?.address?.city === '');
        },
        label: 'SHIPPING_AGENCY.MODIFY.DISTRICT',
      },
      address: {
        _type: 'string',
        required: true,
        label: 'SHIPPING_AGENCY.MODIFY.ADDRESS',
      },
    },
    status: {
      _type: 'boolean',
      label: 'SHIPPING_AGENCY.MODIFY.STATUS',
    },
    phone: {
      _type: 'string-number',
      required: true,
      label: 'SHIPPING_AGENCY.MODIFY.PHONE_NUMBER',
    },
    taxId: {
      _type: 'string-number',
      required: true,
      label: 'SHIPPING_AGENCY.MODIFY.TAX_NUMBER',
    },
    images: {
      _type: 'image',
      label: 'SHIPPING_AGENCY.MODIFY.IMAGE',
    },
  }), [getCity, getDistrict]);
  const group2 = useMemo(() :ModifyInputGroup => ({
    _subTitle: 'THÔNG TIN CHỦ ĐƠN VỊ',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    owner: {
      _type: 'object',
      code: {
        _type: 'string',
        label: 'AGENCY.MODIFY.USER_CODE',
        disabled: true
      },
      username: {
        _type: 'string',
        label: 'SHIPPING_AGENCY.MODIFY.USER_NAME',
        required: true,
      },
      fullName: {
        _type: 'string',
        required: true,
        label: 'SHIPPING_AGENCY.MODIFY.DISPLAY_NAME',
      },
      phone: {
        _type: 'string-number',
        required: true,
        label: 'SHIPPING_AGENCY.MODIFY.PHONE_NUMBER',
      },
      email: {
        _type: 'email',
        required: true,
        label: 'SHIPPING_AGENCY.MODIFY.EMAIL',
      },
      gender: {
        _type: 'radio',
        required: true,
        options: [
          {label: 'SHIPPING_AGENCY.MODIFY.GENDER_OPTION.MALE', value: '1'},
          {label: 'SHIPPING_AGENCY.MODIFY.GENDER_OPTION.FEMALE', value: '0'}
        ],
        label: 'SHIPPING_AGENCY.MODIFY.GENDER',
      },
      birthDay: {
        _type: 'date-time',
        required: true,
        label: 'SHIPPING_AGENCY.MODIFY.DATE_OF_BIRTH',
      },
      address: {
        _type: 'object',
        state: {
          _type: 'search-select',
          onSearch: GetState,
          disabled: (values: any) => {
            console.log(values);
          },
          onChange: (value: any, { setFieldValue, setFieldTouched }: any) => {
            if (ownerState != value) {
              setOwnerCity(null);
              setFieldValue('owner.address.city', '');
              setFieldTouched('owner.address.city', false);
              setFieldValue('owner.address.district', '');
              setFieldTouched('owner.address.district', false);
            }
            setOwnerState(value);
          },
          required: true,
          label: 'AGENCY.MODIFY.STATE',
        },
        city: {
          _type: 'search-select',
          onSearch: getOwnerCity,
          // selectField: 'code',
          required: true,
          onChange: (value: any, { setFieldValue, setFieldTouched }: any) => {
            if (ownerCity != value) {
              setFieldValue('owner.address.district', '');
              setFieldTouched('owner.address.district', false);
            }
            setOwnerCity(value);
          },
          disabled: (values: any) => {
            return values?.owner?.address?.state === '';
          },
          label: 'AGENCY.MODIFY.CITY',
        },
        district: {
          _type: 'search-select',
          onSearch: getOwnerDistrict,
          // selectField: 'code',
          required: true,
          disabled: (values: any) => {
            return values?.owner?.address?.city === '';
          },
          label: 'AGENCY.MODIFY.DISTRICT',
        },
        address: {
          _type: 'string',
          required: true,
          label: 'AGENCY.MODIFY.ADDRESS',
        },
      },
      managementUnit: {
        _type: 'search-select',
        label: 'USER.MODIFY.MANAGEMENT_UNIT',
        keyField: 'name',
        required: true,
        onSearch: ManagementUnitService.getAll,
        onChange: (value: any, { setFieldValue }: any) => {
          if (managementUnit != value) {
            setFieldValue('role', null);
          }
          setManagementUnit(value);
        },
        disabled: true
      },
      role: {
        _type: 'search-select',
        label: 'USER.MODIFY.ROLE',
        keyField: 'name',
        onSearch: ({ queryProps, paginationProps }: any, values: any): Promise<any> => {
          return RoleService.GetAll({
            queryProps: { ...queryProps, managementUnit: { ...values?.managementUnit } },
            paginationProps,
          });
        },
        disabled: true,
      },
      image: {
        _type: 'image',
        isArray: false,
        maxNumber: 1,
        label: 'SHIPPING_AGENCY.MODIFY.REPRESENT_IMAGE',
      },
    }
  }), [showCreate, getOwnerCity, getOwnerDistrict, managementUnit]);
  
  const createForm = useMemo((): ModifyForm => ({
    _header: createTitle,
    panel1: {
      _title: '',
      group1: group1,
      group2: group2,
    },
  }), [group1, group2]);
  const updateForm = useMemo((): ModifyForm => {
    return ({...createForm, _header: updateTitle});
  }, [createForm]);
  const validationSchema = useMemo(() => Yup.object().shape({
    phone: Yup.string()
      .max(11, 'VALIDATE.ERROR.INVALID_INPUT')
      .min(8, 'VALIDATE.ERROR.INVALID_INPUT'),
    taxId: Yup.string()
      .min(10, 'VALIDATE.ERROR.INVALID_INPUT')
      .max(13, 'VALIDATE.ERROR.INVALID_INPUT'),
    owner: Yup.object().shape({
      phone: Yup.string()
        .max(11, 'VALIDATE.ERROR.INVALID_INPUT')
        .min(8, 'VALIDATE.ERROR.INVALID_INPUT'),
      birthDay: Yup.date().max(new Date(),'VALIDATE.ERROR.MUST_LESS_THAN_TODAY')
    })
  }), []);
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
        linkto: '/shipping-agency',
        className: 'btn btn-outline-primary fixed-btn-width',
        label: 'CANCEL_BTN_LABEL',
        icon: <CancelOutlinedIcon/>,
      }
    }
  }), [loading]);

  const initCreateValues = useMemo((): any => ({ ...InitValues(createForm), status: '0',}), [
    createForm,
  
  ]);

  const _init = useMemo(() => ({ ...initCreateValues, owner: { ...initCreateValues.owner, ...initOwner } }), [initCreateValues, initOwner])

  
  return (
    <Fragment>
      <Switch>
        <Route path="/shipping-agency/new">
          <EntityCrudPage
            moduleName={moduleName}
            onModify={add}
            formModel={createForm}
            entity={_init}
            actions={actions}
            validation={validationSchema}
            homePageUrl={HomePageURL.shippingAgency}
          />
        </Route>
        <Route path={`/shipping-agency/:code`}>
          {({match}) => (
            <EntityCrudPage
              onModify={update}
              moduleName={moduleName}
              //  modifyModel={modifyModel}
              code={match?.params.code}
              get={ShippingAgencyService.GetById}
              formModel={updateForm}
              actions={actions}
              validation={validationSchema}
              homePageUrl={HomePageURL.shippingAgency}
            />
          )}
        </Route>
        <Route path="/shipping-agency">
          <MasterHeader
            title={headerTitle}
            onSearch={(value) => {
              setPaginationProps(DefaultPagination)
              setFilterProps(value)
            }}
            searchModel={searchModel}
          />
          <MasterBody
            title={tableTitle}
            onCreate={() => {
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
      <MasterEntityDetailDialog
        title={detailDialogTitle}
        moduleName={moduleName}
        entity={detailEntity}
        onHide={() => {
          setShowDetail(false);
        }}
        show={showDetail}
        size={'lg'}
        renderInfo={masterEntityDetailDialog}/>
      <DeleteEntityDialog
        entity={deleteEntity}
        onDelete={deleteFn}
        isShow={showDelete}
        loading={loading}
        error={error}
        onHide={() => {
          setShowDelete(false);
        }}
        title={deleteDialogTitle}
        bodyTitle={deleteDialogBodyTitle}
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
        }}
      />
    </Fragment>
  );
}

export default ShippingAgency
