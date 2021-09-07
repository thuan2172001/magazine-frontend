import React from 'react';
import {ColumnDescription} from 'react-bootstrap-table-next';
import {SortColumn} from '../../../common-library/common-consts/const';
import {RenderInfoDetail, RenderInfoDetailColumn} from '../../../common-library/common-types/common-type';
import {
  Display3Info,
  DisplayCelcius,
  DisplayCoordinates,
  DisplayDateTime,
  DisplayDiffTime,
  DisplayImage,
  DisplayInnerLink,
  DisplayPercent,
  DisplayPersonNameByArray,
  DisplayTable
} from '../../../common-library/helpers/detail-helpers';

const seedingCode: RenderInfoDetailColumn = {
  'seeding.code': {
    title: 'SEEDING.CODE',
    formatter: (e, entity) => <DisplayInnerLink link={`/production-plan/seeding/${entity._id}`} title={e}/>
  }
};
const plantingCode: RenderInfoDetailColumn = {
  'planting.code': {
    title: 'PRODUCTION_PLAN.PLANT_CODE',
    formatter: (e, entity) => <DisplayInnerLink link={`/production-plan/planting/${entity._id}`} title={e}/>
  },
};
const harvestingCode: RenderInfoDetailColumn = {
  'harvesting.code': {
    title: 'PRODUCTION_PLAN.HARVESTING_CODE',
    formatter: (e, entity) => <DisplayInnerLink link={`/production-plan/harvesting/${entity._id}`} title={e}/>
  },
};
const preliminaryTreatmentCode: RenderInfoDetailColumn = {
  'preliminaryTreatment.code': {
    title: 'PRODUCTION_PLAN.PreliminaryTreatment_CODE',
    formatter: (e, entity) => <DisplayInnerLink link={`/production-management/preliminaryTreatment/${entity._id}`}
                                                title={e}/>
  },
};
const cleaningCode: RenderInfoDetailColumn = {
  'cleaning.code': {
    title: 'PRODUCTION_PLAN.CLEANING.CODE',
    formatter: (e, entity) => <DisplayInnerLink link={`/production-management/cleaning/${entity._id}`} title={e}/>
  },
};
const packingCode: RenderInfoDetailColumn = {
  'packing.code': {
    title: 'PRODUCTION_PLAN.PACKING.CODE',
    formatter: (e, entity) => <DisplayInnerLink link={`/production-management/packing/${entity._id}`} title={e}/>
  },
};

export const harvestingDetail: RenderInfoDetail = [
  {
    header: 'GENERAL_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    style: '1',
    data: {
      ...seedingCode,
      'harvesting.time': {
        keyField: 'harvesting', title: 'PRODUCTION_PLAN.HARVEST_DATE',
        formatter: (e) => (<DisplayDiffTime startTime={e?.startTime} endTime={e?.endTime}/>)
      },
      // 'planting.estimatedHarvestTime': { title: 'PRODUCTION_PLAN.HARVEST_DATE' },
      ...plantingCode,
      'harvesting.address': {
        keyField: 'harvesting.imageInProgress', title: 'HARVESTING_LOCATION',
        formatter: (e) => (<>{e && e[0]?.location && DisplayCoordinates(e[0].location.coordinates)}</>)
      },
      // 'planting.farmLocation.[coordinates]': { title: 'HARVESTING_LOCATION', formatter: DisplayCoordinates, },
      'harvesting.code': {title: 'PRODUCTION_PLAN.HARVESTING_CODE'},
      'planting.landLot.code': {
        title: 'PLANTING_LAND_LOT',
        formatter: (cell: any, row: any) => cell.toUpperCase(),
      },
      'seeding.species.name': {title: 'PRODUCTION_PLAN.SPECIES_NAME'},
      'harvesting.quantity': {title: 'HARVESTING.QUANTITY'},
      'seeding.species.barcode': {title: 'GTIN'},
    },
  },
  {
    header: 'ENVIRONMENT_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-10 col-8 mb-10 pl-5',
    data: {
      'harvesting.temperature': {title: 'TEMPERATURE', formatter: DisplayCelcius,},
      'harvesting.humidity': {title: 'HUMIDITY', formatter: DisplayPercent,},
      'harvesting.porosity': {title: 'POROSITY', formatter: DisplayPercent,},
    },
  },
  {
    header: 'ADMIN_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-10 col-8 mb-10 pl-5',
    data: {
      'harvesting.[leader]': {title: 'HARVESTING_LEADER', formatter: DisplayPersonNameByArray,},
      'harvesting.[worker]': {title: 'HARVESTING_WORKER', formatter: DisplayPersonNameByArray,},
      'harvesting.[technical]': {title: 'ROLE.TECHNICIAN', formatter: DisplayPersonNameByArray,},
    },
  },
  {
    header: 'IMAGE_STORAGE',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'harvesting.imageBefore': {
        title: 'HARVESTING_IMAGE_BEFORE', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'harvesting.imageAfter': {
        title: 'HARVESTING_IMAGE_AFTER', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'harvesting.imageInProgress': {
        title: 'HARVESTING_IMAGE_PROCESSING', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
    },
  },
];

export const PreliminaryTreatmentDetail: RenderInfoDetail = [
  {
    header: 'GENERAL_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      ...seedingCode,
      'seeding.species.name': { title: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' },
      ...plantingCode,
      'seeding.species.barcode': { title: 'GTIN' },
      ...harvestingCode,
      'preliminaryTreatment.time': {
        keyField: 'preliminaryTreatment', title: 'PRELIMINARY_TREATMENT_TIME',
        formatter: (e) => (<DisplayDiffTime startTime={e?.startTime} endTime={e?.endTime}/>)
      },
      'preliminaryTreatment.code': { title: 'PRODUCTION_PLAN.PreliminaryTreatment_CODE' },
      'preliminaryTreatment.address': {
        keyField: 'preliminaryTreatment.imageInProgress', title: 'PRELIMINARYTREATMENT_LOCATION',
        formatter: (e) => {
          const master = e?.filter((item: any) => item.isMaster === true)
          return <>{master && master[0]?.location && DisplayCoordinates(master[0]?.location?.coordinates)}</>
        }
      },
      '': { title: 'EMPTY' },
      'preliminaryTreatment.quantity': { title: 'PRELIMINARY_TREATMENT' },
      
    },
  },
  {
    header: 'ADMIN_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-10 col-8 mb-10 pl-5',
    data: {
      'preliminaryTreatment.[leader]': {title: 'PRELIMINARY_TREATMENT_LEADER', formatter: DisplayPersonNameByArray,},
      'preliminaryTreatment.[worker]': {title: 'PRELIMINARY_TREATMENT_WORKER', formatter: DisplayPersonNameByArray,},
      'preliminaryTreatment.[technical]': {title: 'ROLE.TECHNICIAN', formatter: DisplayPersonNameByArray,},
    },
  },
  {
    header: 'IMAGE_STORAGE',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'preliminaryTreatment.imageBefore': {
        title: 'PRELIMINARY_TREATMENT_IMAGE_BEFORE', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'preliminaryTreatment.imageAfter': {
        title: 'PRELIMINARY_TREATMENT_IMAGE_AFTER', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'preliminaryTreatment.imageInProgress': {
        title: 'PRELIMINARY_TREATMENT_IMAGE_PROCESSING',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info,
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
    },
  },
];

export const CleaningDetail: RenderInfoDetail = [
  {
    header: 'GENERAL_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      ...seedingCode,
      'seeding.species.name': { title: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' },
      ...plantingCode,
      'seeding.species.barcode': { title: 'GTIN' },
      ...harvestingCode,
      'cleaning.time': {
        keyField: 'cleaning', title: 'CLEANING_TIME',
        formatter: (e) => (<DisplayDiffTime startTime={e?.startTime} endTime={e?.endTime}/>)
      },
      ...preliminaryTreatmentCode,
      'cleaning.address': {
        keyField: 'cleaning.imageInProgress', title: 'CLEANING_LOCATION',
        formatter: (e) => {
          const master = e?.filter((item: any) => item.isMaster === true)
          return <>{master && master[0]?.location && DisplayCoordinates(master[0]?.location?.coordinates)}</>
        }      
      },
      'cleaning.code': { title: 'PRODUCTION_PLAN.CLEANING.CODE' },
      'cleaning.quantity': { title: 'CLEANING_QUANTITY' },
      
    },
  },
  {
    header: 'ADMIN_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-10 col-8 mb-10 pl-5',
    data: {
      'cleaning.[leader]': {title: 'CLEANING_LEADER', formatter: DisplayPersonNameByArray,},
      'cleaning.[worker]': {title: 'CLEANING_WORKER', formatter: DisplayPersonNameByArray,},
      'cleaning.[technical]': {title: 'ROLE.TECHNICIAN', formatter: DisplayPersonNameByArray,},
    },
  },
  {
    header: 'IMAGE_STORAGE',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'cleaning.imageBefore': {
        title: 'CLEANING_IMAGE_BEFORE', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'cleaning.imageAfter': {
        title: 'CLEANING_IMAGE_AFTER', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'cleaning.imageInProgress': {
        title: 'CLEANING_IMAGE_PROCESSING', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
    },
  },
];

export const PackingDetail: RenderInfoDetail = [
  {
    header: 'GENERAL_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      ...seedingCode,
      'seeding.species.name': { title: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' },
      ...plantingCode,
      'seeding.species.barcode': { title: 'GTIN' },
      ...harvestingCode,
      'packing.time': {
        keyField: 'packing', title: 'PACKING_TIME',
        formatter: (e) => (<DisplayDiffTime startTime={e?.startTime} endTime={e?.endTime}/>)
      },
      ...preliminaryTreatmentCode,
      // 'planting.farmLocation.[coordinates]': {title: 'PACKING_LOCATION', formatter: DisplayCoordinates,},
      'packing.address': {
        keyField: 'packing.packingImage', title: 'PACKING_LOCATION',
        formatter: (e) => {
          const master = e?.filter((item: any) => item.isMaster === true)
          return <>{master && master[0]?.location && DisplayCoordinates(master[0]?.location?.coordinates)}</>
        }
      },
      ...cleaningCode,
      'packing.packing.weight': {title: 'PRODUCT_PACKAGING.MODULE_NAME'},
      'packing.code': {title: 'PRODUCTION_PLAN.PACKING.CODE'},
      'packing.products': { 
        title: 'PACKING_REAL_QUANTITY', 
        formatter: (input) => {
          const quantity = input.filter((item: any) => item.isActive === true)
          return <>{quantity.length}</>
        }
      },
    },
  },
  {
    header: 'ADMIN_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-10 col-8 mb-10 pl-5',
    data: {
      'packing.[leader]': {title: 'PACKING_LEADER', formatter: DisplayPersonNameByArray,},
      'packing.[worker]': {title: 'PERSON_ASSIGN_QR', formatter: DisplayPersonNameByArray,},
      'packing.[technical]': {title: 'KCS_ACTIVE_QR', formatter: DisplayPersonNameByArray,},
    },
  },
  {
    header: 'PRODUCTION_INFO',
    className: 'col-12',
    titleClassName: 'col-0 hidden',
    dataClassName: 'col-12',
    data: {
      'packing.products': {
        formatter: (entities: any[]) => {
          const columns: ColumnDescription<any, any>[] = [
            {
              dataField: '_id',
              text: 'STT',
              formatter: (cell: any, row: any, rowIndex: number) => <p>{rowIndex + 1}</p>,
              style: {paddingTop: 20},
            },
            {
              dataField: 'species.barcode',
              text: `GTIN`,
              align: 'center',
              ...SortColumn,
            },
            {
              dataField: '_id',
              text: `Mã QR`,
              align: 'center',
              // formatter: (cell: any, row: any, rowIndex: number) => DisplayInnerLink(''),
              ...SortColumn,
            },
            {
              dataField: 'scanAt',
              text: `Ngày gán mã QR`,
              formatter: (input) => (<DisplayDateTime input={input}/>),
              ...SortColumn,
            },
            {
              dataField: 'scanBy.fullName',
              text: `PERSON_ASSIGN_QR`,
              align: 'center',
              // formatter: (cell: any, row: any, rowIndex: number) => DisplayPersonName(cell),
              ...SortColumn,
            },
            {
              dataField: 'activeAt',
              text: `Ngày kích hoạt`,
              formatter: (input) => input ? (<DisplayDateTime input={input}/>) : <>Không có thông tin</>,
              ...SortColumn,
            },
            {
              dataField: 'activeBy.fullName',
              text: `Người kích hoạt`,
              align: 'center',
              formatter: (cell: any, row: any, rowIndex: number) => {
                return (
                  <>
                  {row.activeBy && row.activeBy.fullName ? row.activeBy.fullName : 'Không có thông tin' }
                  </>
                )
              },
              ...SortColumn,
            },
            {
              dataField: 'expiry',
              text: `Hạn sử dụng`,
              formatter: (cell: any, row: any, rowIndex: number) => {
                return <span>{row.species ? <>{`${row.species.expiryDays} ngày`}</> : <>Không có thông tin</>}</span>
              },
            },
          ]
          return <DisplayTable entities={entities} columns={columns}/>
        },
      },
    },
  },
  
  {
    header: 'IMAGE_STORAGE',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'packing.sampleImage': {
        title: 'PACKING_EXAMPLE_PRODUCTION', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'packing.packingImage': {
        title: 'PACKING_IMAGE', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
    },
  },
];

export const PreservationDetail: RenderInfoDetail = [
  {
    header: 'GENERAL_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      ...seedingCode,
      'seeding.species.name': {title: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN'},
      ...plantingCode,
      'seeding.species.barcode': {title: 'GTIN'},
      ...harvestingCode,
      // 'preservation.estimatedStartTime': {
      //   title: 'PRESERVATION_ESTIMATED_TIME_START',
      //   formatter: input => DisplayDateTimeV2(input),
      // },
      'preservation.time': {
        keyField: 'preservation', title: 'PRESERVATION_TIME',
        formatter: (e) => (
          <DisplayDiffTime startTime={e?.startTime} endTime={e?.endTime}/>)
      },
      ...preliminaryTreatmentCode,
      // 'preservation.estimatedEndTime': {
      //   title: 'PRESERVATION_ESTIMATED_TIME_END',
      //   formatter: input => DisplayDateTimeV2(input),
      // },
      // 'planting.farmLocation.[coordinates]': {title: 'PRESERVATION_LOCATION', formatter: DisplayCoordinates,},
      'preservation.address': {
        keyField: 'preservation.storageImage', title: 'PRESERVATION_LOCATION',
        formatter: (e) => {
          const master = e?.filter((item: any) => item.isMaster === true)
          return <>{master && master[0]?.location && DisplayCoordinates(master[0]?.location?.coordinates)}</>
        }
      },
      ...cleaningCode,
      'preservation.temperature': {title: 'PRODUCTION_MANAGEMENT.PRESERVATION.TEMPERATURE', formatter: DisplayCelcius},
      ...packingCode,
      '': { title: "EMPTY" },
      'preservation.code': {title: 'PRODUCTION_PLAN.PRESERVATION.CODE'},
    },
  },
  {
    header: 'ADMIN_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-10 col-8 mb-10 pl-5',
    data: {
      'preservation.[worker]': {title: 'PRESERVATION_WORKER', formatter: DisplayPersonNameByArray,},
      'preservation.[technical]': {title: 'ROLE.TECHNICIAN', formatter: DisplayPersonNameByArray,},
    },
  },
  {
    header: 'IMAGE_STORAGE',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'preservation.storageImage': {
        title: 'PRESERVATION_IMAGE', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
    },
  },
];
