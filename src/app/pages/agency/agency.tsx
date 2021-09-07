import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import { InitMasterProps, InitValues } from '../../common-library/helpers/common-function';

import * as AgencyService from './agency.service';
import { Count, Create, Delete, DeleteMany, Get, GetAll, Update } from './agency.service';
import { AgencyModel } from './agency.model';
import { MasterHeader } from '../../common-library/common-components/master-header';
import { MasterBody } from '../../common-library/common-components/master-body';
import {
  ActionsColumnFormatter,
  TickColumnFormatter,
} from '../../common-library/common-components/actions-column-formatter';

import {
  DefaultPagination,
  HomePageURL,
  iconStyle,
  NormalColumn,
  SortColumn,
} from '../../common-library/common-consts/const';

import { DeleteEntityDialog } from '../../common-library/common-components/delete-entity-dialog';
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-entities-dialog';
import { Route, Switch, useHistory } from 'react-router-dom';
import * as MultilevelSaleService from '../multilevel-sale/multilevel-sale.service';
import * as RoleService from '../role/role.service';
import * as ManagementUnitService from '../management-organization/management-organization.service';
import {
  ModifyForm,
  ModifyInputGroup,
  RenderInfoDetail,
  SearchModel,
} from '../../common-library/common-types/common-type';
import { MasterEntityDetailDialog } from '../../common-library/common-components/master-entity-detail-dialog';
import { GetCity, GetDistrict, GetState } from '../address/address.service';
import EntityCrudPage from '../../common-library/common-components/entity-crud-page';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { AgencyShippingAddress } from './agency-shipping-address';
import * as Yup from 'yup';
import AddIcon from '@material-ui/icons/Add';
import _ from 'lodash';
import { DisplayAddress } from '../../common-library/helpers/detail-helpers';
import { Spinner } from 'react-bootstrap';

const headerTitle = 'AGENCY.MASTER.HEADER.TITLE';
const tableTitle = 'SHIPPING_AGENCY.MASTER.TABLE.TITLE';
const detailDialogTitle = 'SHIPPING_AGENCY.DETAIL_DIALOG.TITLE';
const moduleName = 'AGENCY.MODULE_NAME';
const deleteDialogTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.TITLE';
const deleteDialogBodyTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.BODY_TITLE';
const createTitle = 'SHIPPING_AGENCY.CREATE.HEADER';
const updateTitle = 'SHIPPING_AGENCY.UPDATE.HEADER';

// const createTitle = 'PURCHASE_ORDER.CREATE.TITLE';
// const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
const bodyTitle = 'AGENCY.MASTER.BODY.TITLE';

function AgencyPage() {
  const history = useHistory();
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
  } = InitMasterProps<AgencyModel>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update,
  });

  useEffect(() => {
    getAll({ ...filterProps, type: '0' });
  }, [paginationProps, filterProps]);

  const columns = useMemo(() => {
    return {
      code: {
        dataField: 'code',
        text: `${intl.formatMessage({ id: 'AGENCY.MASTER.TABLE.CODE_COLUMN' })}`,
        ...SortColumn,
        align: 'center',
      },
      name: {
        dataField: 'name',
        text: `${intl.formatMessage({ id: 'AGENCY.MASTER.TABLE.NAME_COLUMN' })}`,
        ...SortColumn,
        align: 'center',
      },
      storeLevel: {
        dataField: 'storeLevel.name',
        text: `${intl.formatMessage({ id: 'AGENCY.MASTER.TABLE.STORE_LEVEL_COLUMN' })}`,
        ...SortColumn,
        align: 'center',
      },
      address: {
        dataField: 'address',
        text: `${intl.formatMessage({ id: 'AGENCY.MASTER.TABLE.AGENCY_ADDRESS_COLUMN' })}`,
        formatter: DisplayAddress,
        ...NormalColumn,
        align: 'center',
      },
      status: {
        dataField: 'status',
        text: `${intl.formatMessage({ id: 'AGENCY.MASTER.TABLE.STATUS_COLUMN' })}`,
        formatter: TickColumnFormatter,
        ...SortColumn,
        align: 'center',
      },
      action: {
        dataField: 'action',
        text: `${intl.formatMessage({ id: 'AGENCY.MASTER.TABLE.ACTION_COLUMN' })}`,
        formatter: ActionsColumnFormatter,
        formatExtraData: {
          intl,
          onShowDetail: (entity: AgencyModel) => {
            get(entity).then(e => {
              setShowDetail(true);
            });
          },
          onDelete: (entity: AgencyModel) => {
            setDeleteEntity(entity);
            setShowDelete(true);
          },
          onEdit: (entity: AgencyModel) => {
            history.push(`${window.location.pathname}/${entity._id}`);
          },
        },
        ...NormalColumn,
        style: { minWidth: '130px' },
      },
    };
  }, []);

  const masterEntityDetailDialog: RenderInfoDetail = useMemo(
    (): RenderInfoDetail => [
      {
        header: 'AGENCY.DETAIL_DIALOG.SHIPPING.SUBTITLE',
        className: 'col-7',
        data: {
          code: { title: 'AGENCY.DETAIL_DIALOG.SHIPPING.CODE' },
          name: { title: 'AGENCY.DETAIL_DIALOG.SHIPPING.NAME' },
          address: {
            title: 'AGENCY.DETAIL_DIALOG.SHIPPING.ADDRESS',
            formatter: (address: any, row: any) => {
              const addressString = `${address.address}, ${address.district}, ${address.city}, ${address.state}`;
              return <>{addressString}</>;
            },
          },
        },
      },
      {
        header: 'EMPTY',
        className: 'col-5 pl-xl-15 pl-md-10 pl-5',
        data: {
          phone: { title: 'AGENCY.DETAIL_DIALOG.SHIPPING.PHONE_NUMBER' },
          status: {
            title: 'AGENCY.DETAIL_DIALOG.SHIPPING.STATUS',
            formatter: TickColumnFormatter,
          },
        },
      },
      {
        header: 'AGENCY.DETAIL_DIALOG.OWNER.SUBTITLE',
        className: 'col-7',
        data: {
          fullName: {
            title: 'AGENCY.DETAIL_DIALOG.OWNER.FULL_NAME',
            keyField: 'owner.fullName',
          },
          email: {
            title: 'AGENCY.DETAIL_DIALOG.OWNER.EMAIL',
            keyField: 'owner.email',
          },
          phone: {
            title: 'AGENCY.DETAIL_DIALOG.OWNER.PHONE_NUMBER',
            keyField: 'owner.phone',
          },
        },
      },
      {
        header: 'AGENCY.DETAIL_DIALOG.SHIPPING_ADDRESS',
        className: 'col-12',
        dataClassName: 'col-12',
        data: {
          shippingAddress: {
            keyField: 'shippingAddress',
            formatter: (addresses: any[], row: any) => {
              let address = addresses.find(address => address.isDefault);
              address = address ?? addresses[0];

              if (!address) return <></>

              const addressString = `${address.address}, ${address.district}, ${address.city}, ${address.state}`;
              return (
                <>
                  {addressString}
                  <span style={{ color: '#B5B5C3' }} className={'ml-5'}>
                    [{intl.formatMessage({ id: 'AGENCY.VIEW.LABEL.DEFAULT_SHIPPING_ADDRESS' })}]
                  </span>
                </>
              );
            },
          },
        },
      },
    ],
    [],
  );

  const [initOwner, setInitOwner] = useState({})
  const [state, setState] = useState<string | null | undefined>(null);
  const [city, setCity] = useState<string | null | undefined>(null);
  const [ownerState, setOwnerState] = useState<string | null | undefined>(null);
  const [ownerCity, setOwnerCity] = useState<string | null | undefined>(null);
  const [managementUnit, setManagementUnit] = useState<any>(null);
  const [role, setRole] = useState<any>(null);

  useEffect(() => {
    setState(editEntity?.address?.state);
    setCity(editEntity?.address?.city);
    setOwnerState(editEntity?.owner?.address?.state);
    setOwnerCity(editEntity?.owner?.address?.city);
  }, [editEntity]);

  useEffect(() => {
    const owner: any = {}
    ManagementUnitService.getAll({ queryProps: { ...filterProps }, paginationProps: {...paginationProps, limit: 100} }).then(res => {
      const index = res.data.data.findIndex(value => (value.name === 'Phòng Bán hàng' || value.code === '00005'))
      if (index !== -1) {
        owner.managementUnit = res.data.data[index]
        RoleService.GetAll({
          queryProps: { ...filterProps, managementUnit: { ...owner.managementUnit } },
          paginationProps: {...paginationProps, limit: 100},
        }).then(ress => {
          const roleIndex = ress.data.data.findIndex(value => value.name === 'Chủ đơn vị bán hàng')
          if (roleIndex !== -1) {
            owner.role = ress.data.data[roleIndex]
            setInitOwner(owner)
          }
        });
      }
    })
  }, [])

  const getCity = useCallback(
    ({ queryProps, paginationProps }: any): Promise<any> => {
      return GetCity({ queryProps: { ...queryProps, state }, paginationProps });
    },
    [state],
  );
  const getDistrict = useCallback(
    ({ queryProps, paginationProps }: any): Promise<any> => {
      return GetDistrict({ queryProps: { ...queryProps, city }, paginationProps });
    },
    [city],
  );
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

  const searchModel: SearchModel = {
    code: {
      type: 'string',
      label: 'AGENCY.MASTER.SEARCH.CODE',
    },
    name: {
      type: 'string',
      label: 'AGENCY.MASTER.SEARCH.NAME',
    },
    storeLevel: {
      type: 'tree-select',
      label: 'AGENCY.MASTER.SEARCH.STORE_LEVEL',
      onSearch: ({ queryProps, sortList, paginationProps }) => {
        return MultilevelSaleService.GetAll({ queryProps }).then(e => {
          return e.data;
        });
      },
    },
    state: {
      type: 'search-select',
      label: 'AGENCY.MASTER.SEARCH.STATE',
      name: 'address.state',
      onSearch: GetState,
      onChange: (value: any, { setFieldValue }: any) => {
        console.log(value);
        if (state != value) {
          setCity(null);
          setFieldValue('address.city', null);
          setFieldValue('address.district', null);
        }
        setState(value);
      },
    },
    city: {
      type: 'search-select',
      label: 'AGENCY.MASTER.SEARCH.CITY',
      name: 'address.city',
      onSearch: getCity,
      // selectField: 'code',
      onChange: (value: any, { setFieldValue }: any) => {
        if (city != value) {
          setFieldValue('address.district', null);
        }
        setCity(value);
      },
      disabled: (values: any) => {
        return !values.address?.state;
      },
    },
    district: {
      type: 'search-select',
      label: 'AGENCY.MASTER.SEARCH.DISTRICT',
      name: 'address.district',
      onSearch: getDistrict,
      // selectField: 'code',
      disabled: (values: any) => {
        return !values.address?.city;
      },
    },
  };

  const group1 = useMemo(
    (): ModifyInputGroup => ({
      _subTitle: 'AGENCY.MODIFY.GENERAL_INFO',
      _className: 'col-6 pr-xl-15 pr-md-10 pr-5',
      code: {
        _type: 'string',
        label: 'AGENCY.MODIFY.CODE',
        disabled: true,
      },
      name: {
        _type: 'string',
        required: true,
        label: 'AGENCY.MODIFY.NAME',
      },
      storeLevel: {
        _type: 'tree-select',
        required: true,
        label: 'AGENCY.MODIFY.STORE_LEVEL',
        onSearch: ({ queryProps, sortList, paginationProps }: any) => {
          return MultilevelSaleService.GetAll({ queryProps }).then(e => {
            return e.data;
          });
        },
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
            if (state != value) {
              setCity(null);
              setFieldValue('address.city', '');
              setFieldTouched('address.city', false);
              setFieldValue('address.district', '');
              setFieldTouched('address.district', false);
            }
            setState(value);
          },
          required: true,
          label: 'AGENCY.MODIFY.STATE',
        },
        city: {
          _type: 'search-select',
          onSearch: getCity,
          // selectField: 'code',
          required: true,
          onChange: (value: any, { setFieldValue, setFieldTouched }: any) => {
            if (city != value) {
              setFieldValue('address.district', '');
              setFieldTouched('address.district', false);
            }
            setCity(value);
          },
          disabled: (values: any) => {
            return values?.address?.state === '';
          },
          label: 'AGENCY.MODIFY.CITY',
        },
        district: {
          _type: 'search-select',
          onSearch: getDistrict,
          // selectField: 'code',
          required: true,
          disabled: (values: any) => {
            return values?.address?.city === '';
          },
          label: 'AGENCY.MODIFY.DISTRICT',
        },
        address: {
          _type: 'string',
          required: true,
          label: 'AGENCY.MODIFY.ADDRESS',
        },
      },
      status: {
        _type: 'boolean',
        label: 'AGENCY.MODIFY.STATUS',
        trueFalse: {
          true: '1',
          false: '0',
        },
      },
      phone: {
        _type: 'string-number',
        required: true,
        label: 'AGENCY.MODIFY.PHONE_NUMBER',
      },
      taxId: {
        _type: 'string-number',
        required: true,
        label: 'AGENCY.MODIFY.TAX_NUMBER',
      },
      images: {
        _type: 'image',
        label: 'AGENCY.MODIFY.IMAGE',
      },
      '': {
        _type: 'object',
        '': {
          _type: 'object',
          _subTitle: 'AGENCY.MODIFY.SHIPPING_ADDRESS',
          shippingAddress: {
            _type: 'radio',
            required: true,
            label: 'AGENCY.MODIFY.SHIPPING_ADDRESS',
            labelWidth: 0,
            optionsClassName: 'col-12 mr-0',
            value: (value: any) => {
              const t = _.isString(value) ? null : value?.find((v: any) => v.isDefault);
              console.log(t);
              return t ? JSON.stringify(t) : t;
            },
            onChange: (e: any, { setFieldValue, values }: any) => {
              const addresses = values['shippingAddress'];
              setFieldValue('shippingAddress', [
                ...addresses.map((addr: any) => ({
                  ...addr,
                  isDefault: JSON.stringify(addr) === e.target.value,
                })),
              ]);
            },
            options: ({ field, values, setFieldValue, setFieldTouched }: any) => {
              return field.value
                ? field.value.map((address: any, index: number) => {
                    return {
                      label: ({ setFieldValue, handleChange, values, handleBlur }: any) => {
                        return (
                          <div>
                            <div className={'pr-23'} style={{ display: 'inline-block' }}>
                              {`${address.address}, ${address.district}, ${address.city}, ${address.state}`}
                            </div>
                            <span
                              style={{ position: 'absolute', right: 0, top: 'calc(50% - 15px)' }}>
                              {ActionsColumnFormatter(
                                address,
                                { field, values, setFieldValue, setFieldTouched },
                                1,
                                {
                                  onDelete: () => {
                                    setDeleteShippingAddress(address);
                                    setDeleteShippingAddressFn(() => () => {
                                      const addresses = field.value;
                                      setFieldValue(
                                        'shippingAddress',
                                        addresses.filter(
                                          (addr: any) =>
                                            JSON.stringify(addr) !== JSON.stringify(address),
                                        ),
                                      );
                                      setShowDeleteShippingAddress({ show: false });
                                    });
                                    setShowDeleteShippingAddress({ show: true });
                                  },
                                  onEdit: () => {
                                    setUpdateShippingAddress(address);
                                    setUpdateShippingAddressFn(() => (e: any) => {
                                      field.value[index] = e;
                                      setFieldValue('shippingAddress', [...field.value]);
                                      setShowUpdateShippingAddress({ show: false });
                                    });
                                    setShowUpdateShippingAddress({ show: true });
                                  },
                                  intl,
                                },
                              )}
                            </span>
                          </div>
                        );
                      },
                      value: JSON.stringify(address),
                    };
                  })
                : [];
            },
          },
        },
        _addShippingAgencyBtn: {
          _type: 'custom',
          component: ({ values, setFieldValue }: any) => {
            return (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setCreateShippingAddressFn(() => (e: any) => {
                    const addresses = values['shippingAddress'];
                    setFieldValue('shippingAddress', [e, ...addresses]);
                    setShowCreateShippingAddress({ show: false });
                  });
                  setShowCreateShippingAddress({ show: true });
                }}>
                <AddIcon style={iconStyle} />
                {intl.formatMessage({ id: 'AGENCY.MODIFY.ADD_SHIPPING_ADDRESS' })}
              </button>
            );
          },
        },
      },
    }),
    [getCity, getDistrict],
  );

  const [showCreateShippingAddress, setShowCreateShippingAddress] = useState({ show: false });
  const [showUpdateShippingAddress, setShowUpdateShippingAddress] = useState({ show: false });
  const [showDeleteShippingAddress, setShowDeleteShippingAddress] = useState({ show: false });
  const [deleteShippingAddress, setDeleteShippingAddress] = useState({});
  const [updateShippingAddress, setUpdateShippingAddress] = useState({});
  const [createShippingAddressFn, setCreateShippingAddressFn] = useState(() => console.log);
  const [updateShippingAddressFn, setUpdateShippingAddressFn] = useState(() => console.log);
  const [deleteShippingAddressFn, setDeleteShippingAddressFn] = useState(() => console.log);
  const group2 = useMemo(
    (): ModifyInputGroup => ({
      _subTitle: 'AGENCY.MODIFY.OWNER_INFO',
      _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
      // '': {
      //   _type: 'object',
        owner: {
          _type: 'object',
          code: {
            _type: 'string',
            label: 'AGENCY.MODIFY.USER_CODE',
            disabled: true
          },
          username: {
            _type: 'string',
            label: 'AGENCY.MODIFY.USER_NAME',
            required: true,
          },
          fullName: {
            _type: 'string',
            required: true,
            label: 'AGENCY.MODIFY.DISPLAY_NAME',
          },
          phone: {
            _type: 'string-number',
            required: true,
            label: 'AGENCY.MODIFY.PHONE_NUMBER',
          },
          email: {
            _type: 'email',
            required: true,
            label: 'AGENCY.MODIFY.EMAIL',
          },
          gender: {
            _type: 'radio',
            required: true,
            options: [
              { label: 'AGENCY.MODIFY.GENDER_OPTION.MALE', value: '1' },
              { label: 'AGENCY.MODIFY.GENDER_OPTION.FEMALE', value: '0' },
            ],
            label: 'AGENCY.MODIFY.GENDER',
          },
          birthDay: {
            _type: 'date-time',
            required: true,
            label: 'AGENCY.MODIFY.DATE_OF_BIRTH',
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
            label: 'AGENCY.MODIFY.REPRESENT_IMAGE',
          },
        },
      // },
    }),
    [getOwnerCity, getOwnerDistrict, ownerState, ownerCity, managementUnit],
  );

  const actions: any = useMemo(
    () => ({
      type: 'inside',
      data: {
        save: {
          role: 'submit',
          type: 'submit',
          linkto: undefined,
          className: 'btn btn-primary mr-8 fixed-btn-width',
          label: 'SAVE_BTN_LABEL',
          icon: loading ? (
            <Spinner style={iconStyle} animation="border" variant="light" size="sm" />
          ) : (
            <SaveOutlinedIcon style={iconStyle} />
          ),
        },
        cancel: {
          role: 'link-button',
          type: 'button',
          linkto: '/agency',
          className: 'btn btn-outline-primary fixed-btn-width',
          label: 'CANCEL_BTN_LABEL',
          icon: <CancelOutlinedIcon />,
        },
      },
    }),
    [loading],
  );
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
  
  const updateForm = useMemo((): ModifyForm => {
    return { ...createForm, _header: updateTitle };
  }, [createForm]);

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
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
          birthDay: Yup.date().max(new Date(), 'VALIDATE.ERROR.MUST_LESS_THAN_TODAY'),
        }),
      }),
    [],
  );
  const initCreateValues = useMemo((): any => ({ ...InitValues(createForm), status: '0',}), [
    createForm,
  
  ]);

  const _init = useMemo(() => ({ ...initCreateValues, owner: { ...initCreateValues.owner, ...initOwner } }), [initCreateValues, initOwner])

  return (
    <Fragment>
      <AgencyShippingAddress
        showCreate={showCreateShippingAddress}
        showEdit={showUpdateShippingAddress}
        showDelete={showDeleteShippingAddress}
        onCreate={createShippingAddressFn}
        onEdit={updateShippingAddressFn}
        onDelete={deleteShippingAddressFn}
        editEntity={updateShippingAddress}
        deleteEntity={deleteShippingAddress}
      />
      <DeleteEntityDialog
        moduleName={moduleName}
        entity={deleteEntity}
        onDelete={deleteFn}
        isShow={showDelete}
        onHide={() => {
          setShowDelete(false);
        }}
        loading={loading}
        error={error}
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
        error={error}
      />

      <Switch>
        {/* <Redirect from="/agency/:code" to="/agency" /> */}
        <Route path="/agency" exact={true}>
          {/* <MasterHeader title={headerTitle} onSearch={setFilterProps} searchModel={purchaseOrderSearchModel} */}
          {/* initValue={filterProps}/> */}
          <MasterHeader
            title={headerTitle}
            onSearch={value => {
              setPaginationProps(DefaultPagination);
              setFilterProps(value);
            }}
            searchModel={searchModel}
          />
          <MasterBody
            title={bodyTitle}
            onCreate={() => {
              history.push(`${window.location.pathname}/new`);
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
          />
        </Route>
        <Route path="/agency/new">
          <EntityCrudPage
            moduleName={moduleName}
            onModify={add}
            formModel={createForm}
            actions={actions}
            entity={_init}
            validation={validationSchema}
            homePageUrl={HomePageURL.agency}
          />
        </Route>
        <Route path="/agency/:code">
          {({ history, match }) => (
            <EntityCrudPage
              onModify={update}
              moduleName={moduleName}
              code={match?.params.code}
              get={AgencyService.GetById}
              formModel={updateForm}
              actions={actions}
              validation={validationSchema}
              homePageUrl={HomePageURL.agency}
            />
          )}
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
        renderInfo={masterEntityDetailDialog}
      />
    </Fragment>
  );
}

export default AgencyPage;
