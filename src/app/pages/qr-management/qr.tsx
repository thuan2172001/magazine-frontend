import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import {useIntl} from 'react-intl';
import {Link, Route, Switch} from 'react-router-dom';
import * as UserService from '../user/user.service';
import {InitMasterProps} from "../../common-library/helpers/common-function";
import {Count, Create, Delete, DeleteMany, Get, GetAll, GetType, QrTypeList, Update, QrTypeStatus} from './qr.service';
import {QrModel} from './qr.model';
import {MasterHeader} from "../../common-library/common-components/master-header";
import {MasterBody} from "../../common-library/common-components/master-body";

import {DefaultPagination, NormalColumn, SortColumn} from '../../common-library/common-consts/const';
import {
  MasterBodyColumns,
  ModifyForm,
  RenderInfoDetail,
  SearchModel
} from "../../common-library/common-types/common-type";
import {MasterEntityDetailPage} from "../../common-library/common-components/master-detail-page";
import {
  cleaningInfo,
  commonInfo,
  harvestingInfo,
  packingInfo,
  paddingInfo,
  plantingInfo,
  preliminaryTreatmentInfo,
  preservationInfo,
  producerInfo,
  seedingInfo,
  sellStatus,
} from "./qr.render-info";
import ModifyEntityDialog from "../../common-library/common-components/modify-entity-dialog";
import {
  Display3Info,
  DisplayArray,
  DisplayDate,
  DisplayDateTime,
  DisplayInnerLink,
  DisplayPersonName,
  DisplayTable
} from "../../common-library/helpers/detail-helpers";
import 'react-toastify/dist/ReactToastify.css';
import {AxiosResponse} from 'axios';
import {ActionsColumnFormatter} from "../../common-library/common-components/actions-column-formatter";
import {MasterEntityDetailDialog} from "../../common-library/common-components/master-entity-detail-dialog";
import * as Yup from "yup";
import {format} from "date-fns";
import {DetailImage} from "../../common-library/common-components/detail/detail-image";
import EntityCrudPage from "../../common-library/common-components/entity-crud-page";
import UserBody from "../user/user-body";
import '../user/style.scss'

const headerTitle = 'QR.MASTER.HEADER.TITLE';
const detailBodyTitle = 'QR.DETAIL.TITLE';
const detailHeaderTitle = 'QR.HEADER.DETAIL.TITLE';
const moduleName = 'QR.MODULE_NAME';
const createTitle = 'QR.CREATE.HEADER';

// const createTitle = 'PURCHASE_ORDER.CREATE.TITLE';
// const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
const bodyTitle = 'QR.MASTER.BODY.TITLE';

const QR_PRODUCT_TYPE = {
  root: 1,
  landlot: 2
}

const TAB_QR = {
  product: '0',
  packaging: '1'
}


function QrPage() {
  // const history = useHistory();
  const intl = useIntl();
  const {
    entities,
    setEntities,
    showCreate,
    setShowCreate,
    paginationProps,
    setPaginationProps,
    filterProps,
    setFilterProps,
    total,
    loading,
    setShowDetail,
    setDetailEntity,
    setDeleteEntity,
    setShowDelete,
    add, get, getAll, refreshData,
  } = InitMasterProps<QrModel>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update
  });

  const [showImage, setShowImage] = useState<boolean>(false);
  const [logisticImageDetail, setLogisticImage] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState<string | undefined>(TAB_QR.product);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [QrProductType, setQrProductType] = useState(QR_PRODUCT_TYPE.root)
  const [searchForm, setSearchForm] = useState<SearchModel>()
  
  useEffect(() => {
    getAll(filterProps);
  }, [paginationProps, filterProps, trigger, currentTab]);
  
  
  useEffect(() => {
    setSearchForm(rootSearchModel)
  }, [])
  
  const columns = useMemo(() => {
    return {
      order: {
        dataField: 'order',
        text: 'STT',
        formatter: (cell: any, row: any, rowIndex: number) => (
          <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
        ),
        classes: 'mr-3',
        style: { paddingTop: 20 },
      },
      landlot: {
        dataField: 'landlot',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.LANDLOT'})}`,
        ...SortColumn,
        align: 'center',
      },
      'createdBy': {
        dataField: 'createdBy.fullName',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CREATED_BY'})}`,
        ...SortColumn,
        align: 'center',
        formatter: (cell: any, row: any) => (row?.createdBy ?
          <DisplayPersonName {...row.createdBy}/> : (<>{intl.formatMessage({id: 'NO_INFORMATION'})}</>)),
      },
      createdAt: {
        dataField: 'createdAt',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CREATED_DATE'})}`,
        ...SortColumn,
        formatter: (input: any) => (<DisplayDate input={input}/>),
        align: 'center',
      },
      status: {
        dataField: 'status',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.STATUS'})}`,
        ...SortColumn,
        align: 'center',
      },
      distributionTime: {
        dataField: 'distributionTime',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.DISTRIBUTION_TIME'})}`,
        ...SortColumn,
        formatter: (input: any) => (<DisplayDateTime input={input}/>),
        align: 'center',
      },
      expiry: {
        dataField: 'expiry',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.EXPIRY'})}`,
        ...SortColumn,
        formatter: (input: any) => (<DisplayDateTime input={input}/>),
        align: 'center',
      },
      distributionLocation: {
        dataField: 'distributionLocation',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.DISTRIBUTION_LOCATION'})}`,
        ...SortColumn,
        align: 'center',
      },
      action: {
        dataField: 'action',
        text: `${intl.formatMessage({id: 'SHIPPING_AGENCY.MASTER.TABLE.ACTION_COLUMN'})}`,
        formatter: ActionsColumnFormatter,
        formatExtraData: {
          intl,
          onShowDetail: (entity: QrModel) => {
            get(entity);
            setDetailEntity(entity);
            setQrProductType(QR_PRODUCT_TYPE.landlot)
            setPaginationProps(DefaultPagination)
          },
          onEdit: (entity: QrModel) => {
          },
        },
        ...NormalColumn,
        style: {minWidth: '130px'},
      },
    }
  }, []);

  const landLotColumn = useMemo(() => ({
    
      order: {
        dataField: 'order',
        text: 'STT',
        formatter: (cell: any, row: any, rowIndex: number) => (
          <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
        ),
        classes: 'mr-3',
        style: { paddingTop: 20 },
      },
      _id: {
        dataField: '_id',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CODE'})}`,
        ...SortColumn,
        align: 'center',
        formatter: (cell: string, row: any) => {
          console.log(row.type === '1');
          return <Link to={'qr/' + (row.codeType === '1' ? '' : '') + row._id}>{cell}</Link>
        },
      },
      'createdBy': {
        dataField: 'createdBy.fullName',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CREATED_BY'})}`,
        ...SortColumn,
        align: 'center',
        formatter: (cell: any, row: any) => (row?.createdBy ?
          <DisplayPersonName {...row.createdBy}/> : (<>{intl.formatMessage({id: 'NO_INFORMATION'})}</>)),
      },
      createdAt: {
        dataField: 'createdAt',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CREATED_DATE'})}`,
        ...SortColumn,
        formatter: (input: any) => (<DisplayDate input={input}/>),
        align: 'center',
      },
      'activeBy': {
        dataField: 'activeBy.fullName',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.ACTIVE_BY'})}`,
        ...SortColumn,
        align: 'center',
        formatter: (cell: any, row: any) => (row?.activeBy ?
          <DisplayPersonName {...row.activeBy}/> : (<>{intl.formatMessage({id: 'NO_INFORMATION'})}</>)),
      },
      activeAt: {
        dataField: 'activeAt',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.ACTIVE_AT'})}`,
        ...SortColumn,
        formatter: (input: any) => (<DisplayDateTime input={input}/>),
        align: 'center',
      },
      type: {
        dataField: 'type',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CODE_TYPE'})}`,
        ...SortColumn,
        formatter: (cell: any) =>
          (<>{QrTypeList.find(t => t.code === cell)?.name}</>),
        align: 'center',
      },
      action: {
        dataField: 'action',
        text: `${intl.formatMessage({id: 'SHIPPING_AGENCY.MASTER.TABLE.ACTION_COLUMN'})}`,
        formatter: ActionsColumnFormatter,
        formatExtraData: {
          intl,
          onShowDetail: (entity: QrModel) => {
            get(entity);
            setShowDetail(true);
            setDetailEntity(entity);
          },
        },
        ...NormalColumn,
        style: {minWidth: '130px'},
      },
    
  }), [])

  const rootSearchModel: SearchModel = {
    landlot: {
      type: 'string',
      label: 'QR.MASTER.TABLE.LANDLOT',
    },
    createdBy: {
      type: 'search-select',
      label: 'QR.MASTER.TABLE.CREATED_BY',
      selectField: '_id',
      keyField: 'fullName',
      onSearch: UserService.GetAll,
    },
    __type: {
      type: 'search-select',
      label: 'QR.MASTER.TABLE.STATUS',
      onSearch: ({queryProps, paginationProps}) => GetType(QrTypeStatus, {queryProps, paginationProps}),
      keyField: 'name',
      selectField: 'code',
      onChange: (e, {setFieldValue}) => {
        setFieldValue('type', e?.code);
      }
    },
    createdAt: {
      type: 'date-time',
      label: 'QR.MASTER.TABLE.CREATED_DATE',
    },
    distributionTime: {
      type: 'date-time',
      label: 'QR.MASTER.TABLE.DISTRIBUTION_TIME',
    },
    distributionLocation: {
      type: 'date-time',
      label: 'QR.MASTER.TABLE.DISTRIBUTION_LOCATION',
    },
  }
  
  
  const searchModel: SearchModel = {
    '_id': {
      type: 'string',
      label: 'QR.MASTER.SEARCH.CODE',
    },
    createdBy: {
      type: 'search-select',
      label: 'QR.MASTER.SEARCH.CREATED_BY',
      selectField: '_id',
      keyField: 'fullName',
      onSearch: UserService.GetAll,
    },
    createdAt: {
      type: 'date-time',
      label: 'QR.MASTER.SEARCH.CREATED_DATE',
    },
    activeBy: {
      type: 'search-select',
      label: 'QR.MASTER.SEARCH.ACTIVE_BY',
      selectField: '_id',
      keyField: 'fullName',
      onSearch: UserService.GetAll,
    },
    activeAt: {
      type: 'date-time',
      label: 'QR.MASTER.SEARCH.ACTIVE_AT',
    },
    __type: {
      type: 'search-select',
      label: 'QR.MASTER.SEARCH.CODE_TYPE',
      onSearch: ({queryProps, paginationProps}) => GetType(QrTypeList, {queryProps, paginationProps}),
      keyField: 'name',
      selectField: 'code',
      onChange: (e, {setFieldValue}) => {
        setFieldValue('type', e?.code);
      }
    },
  };

  const packagingSearchModel: SearchModel = {
    '_id': {
      type: 'string',
      label: 'QR.MASTER.SEARCH.CODE',
    },
    createdBy: {
      type: 'search-select',
      label: 'QR.MASTER.SEARCH.CREATED_BY',
      selectField: '_id',
      keyField: 'fullName',
      onSearch: UserService.GetAll,
    },
    createdAt: {
      type: 'date-time',
      label: 'QR.MASTER.SEARCH.CREATED_DATE',
    },
  }
  
  const shippingInfoColumns: MasterBodyColumns = [
    {
      dataField: 'exportTime',
      text: 'Thời gian xuất hàng',
      formatter: (input: any) => (<DisplayDateTime input={input}/>),
      ...SortColumn,
      align: 'center',
    },
    {
      text: 'Địa điểm xuất hàng',
      dataField: 'exportAddress',
      formatter: (input) => {
        return DisplayArray(input)
      },
      ...SortColumn,
      align: 'center',
    },
    {
      text: 'Nhân viên xuất hàng',
      dataField: 'exportStaff.fullName',
      ...SortColumn,
      align: 'center',
    },
    {
      text: 'Nhân viên vận chuyển',
      dataField: 'shipper.fullName',
      ...SortColumn,
      align: 'center',
    },
  ];
  
  
  const shippingInfo = useMemo((): RenderInfoDetail => ([{
    header: 'THÔNG TIN VẬN CHUYỂN',
    className: 'col-12',
    titleClassName: 'col-3 mb-10',
    dataClassName: 'col-12 mb-10',
    data: {
      'sellStatus': {
        title: '',
        formatter: () => {
          return <DisplayTable entities={[]} columns={shippingInfoColumns}/>
        }
      }
    },
  }]), []);
  
  
  const distributionInfoColumns: MasterBodyColumns = [
    ...shippingInfoColumns,
    {
      dataField: 'receiveTime',
      text: 'Thời gian nhận hàng',
      formatter: (input: any) => (<DisplayDateTime input={input}/>),
      ...SortColumn,
      align: 'center',
    },
    {
      text: 'Địa điểm nhận hàng',
      dataField: 'receiveAddress',
      formatter: (input) => {
        return DisplayArray(input)
      },
      ...SortColumn,
      align: 'center',
    },
    {
      dataField: 'receiveStaff.fullName',
      text: 'Nhân viên xuất hàng',
      ...SortColumn,
      align: 'center',
    },
    {
      dataField: 'image.path',
      text: 'Hình ảnh',
      formatter: (cell: any, row: any, rowIndex: number) => {
        return (
          <>
            {ActionsColumnFormatter(cell, row, rowIndex, {
              onShowDetail: () => {
                setShowImage(true);
                setLogisticImage(row);
              },
              intl
            })}
          </>
        )
      },
      ...SortColumn,
      align: 'center',
    },
  ];
  const logisticImageRenderDetail = useMemo((): RenderInfoDetail => ([
    {
      className: 'col-12',
      titleClassName: 'col-12',
      dataClassName: 'col-12 mb-10',
      data: {
        'imageBefore': {
          title: 'Hình ảnh xuất kho',
          formatter: (image) => {
            const renderInfo = {
              title: 'IMAGE_INFO',
              component: Display3Info
            }
            return <DetailImage images={image} renderInfo={renderInfo} width={90} height={90} className={'mt-3 mr-3'}/>
          }
        },
        'imageAfter': {
          title: 'Hình ảnh nhập kho',
          formatter: (image) => {
            const renderInfo = {
              title: 'IMAGE_INFO',
              component: Display3Info
            }
            return <DetailImage images={image} renderInfo={renderInfo} width={90} height={90} className={'mt-3 mr-3'}/>
          }
        },
      }
    }
  ]), []);
  const validationSchema = useMemo(() => Yup.object().shape({
    total: Yup.number()
      .min(1, 'VALIDATE.ERROR.MIN_1'),
  }), []);
  
  const distributionInfo = useMemo((): RenderInfoDetail => ([{
    header: 'THÔNG TIN PHÂN PHỐI',
    className: 'col-12',
    titleClassName: 'col-3 mb-10',
    dataClassName: 'col-12 mb-10',
    data: {
      'sellStatus': {
        title: '',
        formatter: () => {
          return <DisplayTable entities={[]}
                               columns={distributionInfoColumns}/>
        }
      }
    },
  }]), []);
  const downloadQrFile = useCallback((e: QrModel) => {
    return add(e).then((res: AxiosResponse<QrModel>) => {
      const date_input = new Date();
      const a = document.createElement("a"); //Create <a>
      a.href = "data:application/octet-stream;base64," + res.data.buffers; //Image Base64 Goes here
      a.download = `qr-code-${format(date_input, 'dd-MM-yyyy-H_mma')}.tiff`; //File name Here
      a.click();
    })
  }, []);
  
  
  const parentQrInfo: RenderInfoDetail = useMemo(() => ([
    {
      header: 'THÔNG TIN LOGISTIC',
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
  
  const childQrColumns = useMemo(() => [{
    dataField: '_',
    text: `${intl.formatMessage({id: 'ORDINAL'})}`,
    align: 'center',
    formatter: (cell: string, row: any, rowIndex: number) => {
      return (<>{rowIndex + 1}</>)
    }
  }, {
    dataField: '_id',
    text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CODE'})}`,
    align: 'center',
    ...NormalColumn,
    formatter: (e: any) => <DisplayInnerLink link={`/qr/${e}`} title={e}/>
  }, {
    dataField: 'createdBy',
    text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CREATED_BY'})}`,
    ...SortColumn,
    align: 'center',
    formatter: (cell: any, row: any) => (row?.createdBy ?
      <DisplayPersonName {...cell}/> : (<>{intl.formatMessage({id: 'NO_INFORMATION'})}</>)),
  }, {
    dataField: 'createdAt',
    text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CREATED_DATE'})}`,
    ...SortColumn,
    formatter: (input: any) => (<DisplayDate input={input}/>),
    align: 'center',
  }, {
    dataField: 'activeBy',
    text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.ACTIVE_BY'})}`,
    ...SortColumn,
    align: 'center',
    formatter: (cell: any, row: any) => (row?.activeBy ?
      <DisplayPersonName {...cell}/> : (<>{intl.formatMessage({id: 'NO_INFORMATION'})}</>)),
  }, {
    dataField: 'activeAt',
    text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.ACTIVE_AT'})}`,
    ...SortColumn,
    formatter: (input: any) => (<DisplayDateTime input={input}/>),
    align: 'center',
  },], []);
  const childQrInfo: RenderInfoDetail = useMemo(() => ([
    {
      header: 'Thông tin QR con',
      className: 'col-12',
      titleClassName: 'mb-10',
      dataClassName: 'col-12 mb-10',
      data: {
        'children': {
          formatter: (entity: any[]) => {
            return <DisplayTable entities={entity ?? []} columns={childQrColumns}/>
          }
        }
      },
    }
  ]), []);
  
  const [dE, setDE] = useState<any>(null);
  
  // const headerInfo: RenderInfoDetail = useMemo(() => [
  //   {
  //     header: detailBodyTitle,
  //     className: 'col-12',
  //     titleClassName: 'mb-10',
  //     dataClassName: 'col-3 mb-10',
  //     data: {
  //       '_id': {
  //         formatter: (entity) => {
  //           return (<Formik
  //             enableReinitialize={true}
  //             initialValues={{}} onSubmit={() => {
  //           }}>
  //             <ModifyEntityPage
  //               mode={'vertical'}
  //               inputGroups={panel}/>
  //           </Formik>)
  //         }
  //       }
  //     },
  //   }
  // ], [dE]);
  const renderInfoProduct: RenderInfoDetail = useMemo(() => ([
    ...producerInfo,
    ...paddingInfo,
    ...commonInfo,
    ...paddingInfo,
    ...seedingInfo,
    ...paddingInfo,
    ...plantingInfo,
    ...paddingInfo,
    ...harvestingInfo,
    ...paddingInfo,
    ...preliminaryTreatmentInfo,
    ...paddingInfo,
    ...cleaningInfo,
    ...paddingInfo,
    ...packingInfo,
    ...paddingInfo,
    ...preservationInfo,
    ...paddingInfo,
    ...shippingInfo,
    ...paddingInfo,
    ...distributionInfo,
    ...paddingInfo,
    ...sellStatus
  ]), []);
  const renderInfoPacking: RenderInfoDetail = useMemo(() => ([
    ...parentQrInfo,
    ...paddingInfo,
    ...childQrInfo,
    ...paddingInfo,
    ...distributionInfo,
    ...paddingInfo,
    ...shippingInfo,
  ]), []);
  const [matchId, setMatchId] = useState<any>(null);
  const [renderInfo, setRenderInfo] = useState(renderInfoProduct);
  
  const createForm = useMemo((): ModifyForm => ({
    _header: createTitle,
    _panel1: {
      _title: 'EMPTY',
      group1: {
        _subTitle: 'EMPTY',
        type: {
          required: true,
          _type: 'search-select',
          onSearch: ({queryProps, paginationProps}: any) => GetType(QrTypeList, {queryProps, paginationProps}),
          keyField: 'name',
          selectField: 'code',
          label: 'QR.EDIT.CODE_TYPE',
        },
        total: {
          required: true,
          _type: 'string-number',
          onChange: (e, {setFieldValue}) => {
            setFieldValue('total', e.target.value && e.target.value !== '' && Number(e.target.value));
          },
          label: 'QR.EDIT.QUANTITY',
        },
      }
    }
  }), []);
  const detailForm = useMemo((): ModifyForm => ({
    _header: detailHeaderTitle,
    _panel1: {
      _title: 'EMPTY',
      group1: {
        _subTitle: 'EMPTY',
        _className: 'col-12 form-group row master-header-search-margin',
        _inputClassName: 'col-xxl-2 col-md-3 master-header-search-input-margin',
        _id: {
          _type: 'string',
          disabled: true,
          label: 'Mã QR',
        }, createdBy: {
          _type: 'object',
          fullName: {
            _type: 'string',
            disabled: true,
            label: 'Người tạo mã',
          },
        }, createdAt: {
          _type: 'date-time',
          disabled: true,
          label: 'Ngày tạo mã',
        }, type: {
          _type: 'string',
          disabled: true,
          formatter: (e) => (e ? QrTypeList.find((val) =>
            val.code.toLowerCase().indexOf(e.toLowerCase()) > -1
          )?.name : ''),
          label: 'Loại mã',
        },
      }
    }
  }), []);
  
  useEffect(() => {
    matchId && get({_id: matchId} as any).then(e => {
      const qr = e.data;
      setRenderInfo(qr.type === '1' ? renderInfoProduct : renderInfoPacking);
      setDE(qr);
    });
  }, [matchId]);

  const TabData = useMemo(() =>  ([
    {
      tabTitle: 'QR Sản phẩm',
      entities: entities,
      columns: QrProductType === QR_PRODUCT_TYPE.root ? columns : landLotColumn,
      total: total,
      loading: loading,
      paginationParams: paginationProps,
      setPaginationParams: setPaginationProps,
      button: QrProductType === QR_PRODUCT_TYPE.root ? [
        {
          label: 'Thêm mới',
          onClick: () => {
            setShowCreate(true);
          }
        }
      ] : []
    },
    {
      tabTitle: 'QR Đóng gói',
      entities: entities,
      columns: columns,
      total: total,
      loading: loading,
      paginationParams: paginationProps,
      setPaginationParams: setPaginationProps,
      button: [
        {
          label: 'Thêm mới',
          onClick: () => {
            setShowCreate(true);
          }
        }
      ]
    },
  ]), [QrProductType, columns, entities, landLotColumn, loading, paginationProps, setPaginationProps, setShowCreate, total]);
  
  return (
    <Fragment>
      <Switch>
      <Route exact path="/qr/:code">
          {({match}) => {
            setMatchId(match?.params.code);
            return (
              <>
                <EntityCrudPage
                  onModify={(() => {
                  }) as any}
                  moduleName={moduleName}
                  formModel={detailForm}
                  mode={'vertical'}
                  entity={dE}
                />
                <MasterEntityDetailPage
                  entity={dE}
                  header={detailBodyTitle}
                  renderInfo={renderInfo}
                />
                <MasterEntityDetailDialog
                  title='EMPTY'
                  show={showImage}
                  entity={logisticImageDetail}
                  renderInfo={logisticImageRenderDetail}
                  onHide={() => {
                    setShowImage(false)
                  }
                  }
                  size='sm'
                />
              </>
            );
          }}
        </Route>
        <Route path="/qr" exact={true}>
          <MasterHeader
            title={headerTitle}
            onSearch={(value) => {
              setPaginationProps(DefaultPagination)
              setFilterProps(value)
            }}
            onClickBack={currentTab === TAB_QR.product && QrProductType === QR_PRODUCT_TYPE.landlot ? () => setQrProductType(QR_PRODUCT_TYPE.root) : undefined}
            searchModel={currentTab === TAB_QR.packaging ? packagingSearchModel : QrProductType === QR_PRODUCT_TYPE.root ? rootSearchModel : searchModel}
          />
          <div className="user-body">
            <UserBody
              tabData={TabData}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              setEntities={setEntities}
              setPaginationProps={setPaginationProps}
              setTrigger={setTrigger}
              trigger={trigger}
              title="Danh mục vai trò"
            />
          </div>
          {/* <MasterBody
            title={bodyTitle}
            onCreate={() => {
              // history.push(`${window.location.pathname}/0000000`);
              setShowCreate(true);
            }}
            // entities={bodyEntities}
            entities={entities}
            total={total}
            columns={columns}
            loading={loading}
            paginationParams={paginationProps}
            setPaginationParams={setPaginationProps}
          /> */}
          <ModifyEntityDialog
            show={showCreate}
            validation={validationSchema}
            formModel={createForm}
            loading={loading}
            onHide={refreshData}
            onModify={downloadQrFile}
          />
        </Route>
        
      </Switch>
    </Fragment>
  );
}

export default QrPage;
