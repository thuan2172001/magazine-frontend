import React from 'react';
import { RenderInfoDetail } from '../../common-library/common-types/common-type';
import {
  Display3Info,
  DisplayAddress,
  DisplayArray,
  DisplayCelcius,
  DisplayCoordinates,
  DisplayDateTime,
  DisplayDiffTime,
	DisplayDistribution,
  DisplayDownloadLink,
  DisplayImage,
  DisplayPercent,
  DisplayShipping,
  DisplayPersonNameByArray,
} from '../../common-library/helpers/detail-helpers';

export const entityExample = {
  status: {
    status: 'Đã bán',
    sellDate: new Date(),
    location: 'Cửa hàng A',
    employee: 'Nguyễn Văn C',
    customer: {
      phone: '0868670715',
    },
    qr: {
      _id: 'ABC123ABC123ABC123ABC123',
    },
  },
  enterprise: {
    name: 'UniFarm',
    taxId: '0123456789',
    address: {
      address: '',
      district: '123 Trung Kính',
      city: 'Cầu Giấy',
      state: 'Hà Nội',
    },
    phone: '02103874859',
    representative: {
      fullName: 'Nguyễn Văn A',
    },
  },
  species: {
    name: 'Rau muống',
    barcode: '0123456789',
  },
  seeding: {
    area: 90600,
    buyInvoice: {
      path: 'http://placeimg.com/640/480/people',
      hash: '54bcb73d8dfacd914cc25da61808eb0f',
    },
    certificates: {
      path: 'http://placeimg.com/640/480/sports',
      hash: 'cb0bfcdb5da416939561a12d847aed34',
    },
    code: '46333',
    createdAt: '2021-01-15T09:16:19.890Z',
    estimatedPlantingTime: '2021-01-15T09:16:19.851Z',
    expectedQuantity: 67375,
    farmLocation: { coordinates: ['-22.3444', '-23.1984'], type: 'Point' },
    humidity: 91900,
    landLot: {
      code: 'F22',
      createdAt: '2021-01-15T09:16:19.805Z',
      lot: 'F',
      subLot: '22',
      updatedAt: '2021-01-15T09:16:19.805Z',
      __v: 0,
      _id: '60015d63ea093200407dfdb4',
    },
    landLotImage: {
      path: 'http://placeimg.com/640/480/sports',
      hash: '1976150f31adacb2bc84e32dffdf7be0',
    },
    leader: [
      {
        _id: '60015d63ea093200407dfd2d',
        username: 'Leader',
        lastName: ' Trưởng',
        fullName: 'Tổ Trưởng',
      },
    ],
    manager: {
      _id: '60015d63ea093200407dfd2c',
      username: 'Manager',
      lastName: ' Lý',
      fullName: 'Quản Lý',
    },
    numberOfSeed: 11521,
    porosity: 96950,
    seedingImage: {
      path: 'http://placeimg.com/640/480/fashion',
      hash: '1976150f31adacb2bc84e32dffdf7be0',
    },
    seedingTime: '2021-01-15T09:16:19.851Z',
    species: {
      barcode: 'amateur_plum',
      code: '1ee720b2bf',
      createdAt: '2021-01-15T09:16:19.764Z',
      expiryDays: 70,
      growingDays: 14,
      name: 'precise apricot',
      plantingDays: 17,
      updatedAt: '2021-01-15T09:16:19.764Z',
      __v: 0,
      _id: '60015d63ea093200407dfda0',
    },
    temperature: 19862,
    updatedAt: '2021-01-15T09:16:19.890Z',
    worker: [
      {
        _id: '60015d63ea093200407dfd2e',
        username: 'Worker',
        lastName: ' Dân',
        fullName: 'Nông Dân',
      },
    ],
    __v: 0,
    _id: '60015d63ea093200407dfdbe',
  },
  planting: {
    area: 61985,
    code: '46333',
    createdAt: '2021-01-15T09:16:20.047Z',
    estimatedHarvestTime: '2021-01-15T09:16:20.045Z',
    estimatedPlantingTime: '2021-01-15T09:16:20.045Z',
    expectedQuantity: 69664,
    farmLocation: { coordinates: ['57.1770', '28.1353'], type: 'Point' },
    humidity: 58087,
    imageAfter: {
      path: 'http://placeimg.com/640/480/nightlife',
      hash: 'a5546afe8d3fda1371de2d058af49e36',
    },
    imageBefore: {
      path: 'http://placeimg.com/640/480/sports',
      hash: 'e1856d38cd449330b498a0bebd8a37f0',
    },
    landLot: {
      code: 'A45',
      createdAt: '2021-01-15T09:16:19.795Z',
      lot: 'A',
      subLot: '45',
      updatedAt: '2021-01-15T09:16:19.795Z',
      __v: 0,
      _id: '60015d63ea093200407dfdaf',
    },
    leader: [
      {
        _id: '60015d63ea093200407dfd2d',
        username: 'Leader',
        lastName: ' Trưởng',
        fullName: 'Tổ Trưởng',
      },
    ],
    manager: {
      _id: '60015d63ea093200407dfd2c',
      username: 'Manager',
      lastName: ' Lý',
      fullName: 'Quản Lý',
    },
    numberOfPlants: 9565,
    porosity: 52035,
    species: {
      barcode: 'amateur_plum',
      code: '1ee720b2bf',
      createdAt: '2021-01-15T09:16:19.764Z',
      expiryDays: 70,
      growingDays: 14,
      name: 'precise apricot',
      plantingDays: 17,
      updatedAt: '2021-01-15T09:16:19.764Z',
      __v: 0,
      _id: '60015d63ea093200407dfda0',
    },
    temperature: 95469,
    updatedAt: '2021-01-15T09:16:20.047Z',
    worker: [
      {
        _id: '60015d63ea093200407dfd2e',
        username: 'Worker',
        lastName: ' Dân',
        fullName: 'Nông Dân',
      },
    ],
    __v: 0,
    _id: '60015d64ea093200407dfdca',
  },
  harvesting: {
    code: '36319',
    createdAt: '2021-01-15T09:16:20.383Z',
    imageAfter: { location: { coordinates: [] } },
    imageBefore: { location: { coordinates: [] } },
    imageInProgress: [
      {
        path: 'http://placeimg.com/640/480/people',
        hash: '54bcb73d8dfacd914cc25da61808eb0f',
      },
      {
        path: 'http://placeimg.com/640/480/people',
        hash: '54bcb73d8dfacd914cc25da61808eb0f',
      },
      {
        path: 'http://placeimg.com/640/480/people',
        hash: '54bcb73d8dfacd914cc25da61808eb0f',
      },
    ],
    leader: [
      {
        process: '2',
        role: 'leader',
        user: {
          _id: '60015d63ea093200407dfd2b',
          firstName: 'Nông',
          lastName: 'Dân',
          fullName: 'Miss Sheila Ngô',
        },
        _id: '6001bbe72257840069165b4d',
      },
    ],
    technical: [
      {
        process: '2',
        role: 'technical',
        user: {
          _id: '60015d63ea093200407dfd2b',
          firstName: 'Nông',
          lastName: 'Dân',
          fullName: 'Miss Sheila Ngô',
        },
        _id: '6001bbe72257840069165b4c',
      },
    ],
    updatedAt: '2021-01-15T09:16:20.383Z',
    worker: [],
    __v: 0,
    _id: '60015d64ea093200407dfde2',
  },
  distributionHistory: [
    {
      agency: {
        address: {
          "address": "1 Hai Bà Trưng",
          "city": "Hoàn Kiếm",
          "district": "Tràng Tiền",
          "state": "Hà Nội"
        },
        _id: "601bde97819b3500406bc998",
        name: "Nhà phân phối miền Bắc",
      },
      time: "2021-02-04T11:48:37.419Z",
    },
    {
      agency: {
        address: {
          "address": "1 Hai Bà Trưng",
          "city": "Hoàn Kiếm",
          "district": "Tràng Tiền",
          "state": "Hà Nội"
        },
        _id: "601bde97819b3500406bc998",
        name: "Nhà phân phối miền Bắc",
      },
      time: "2021-02-04T11:48:37.419Z",
    }
  ],
  shippingHistory: [
    {
      _id: "601bdf15819b3500406bca33",
      from: {
        agency: {
          address: {
            address: "1 Hai Bà Trưng",
            city: "Hoàn Kiếm",
            district: "Tràng Tiền",
            state: "Hà Nội"
          },
          _id: "601bde97819b3500406bc998",
          name: "Nhà phân phối miền Bắc"
        },
        time: "2021-02-04T11:48:37.419Z"
      },
      to: {
        agency: {
          address: {
            address: "2 Ngô Quyền",
            city: "Sơn Trà",
            district: "An Hải Bắc",
            state: "Đà Nẵng"
          },
          _id: "601bde97819b3500406bc99b",
          name: "Nhà phân phối miền Trung"
        },
        time: "2021-02-04T11:48:37.419Z"
      },
      createdAt: "2021-02-04T11:48:37.419Z"
    },
    {
      _id: "601bdf15819b3500406bca33",
      from: {
        agency: {
          address: {
            address: "1 Hai Bà Trưng",
            city: "Hoàn Kiếm",
            district: "Tràng Tiền",
            state: "Hà Nội"
          },
          _id: "601bde97819b3500406bc998",
          name: "Nhà phân phối miền Bắc"
        },
        time: "2021-02-04T11:48:37.419Z"
      },
      to: {
        agency: {
          address: {
            address: "2 Ngô Quyền",
            city: "Sơn Trà",
            district: "An Hải Bắc",
            state: "Đà Nẵng"
          },
          _id: "601bde97819b3500406bc99b",
          name: "Nhà phân phối miền Trung"
        },
        time: "2021-02-04T11:48:37.419Z"
      },
      createdAt: "2021-02-04T11:48:37.419Z"
    }
  ],
};

export const exampleDetail: RenderInfoDetail = [
  {
    header: 'Trạng thái',
    className: 'col-12',
    titleClassName: 'col-md-5 col-4 mb-10',
    dataClassName: 'col-md-7 col-8 mb-10 pl-5 text-right',
    data: {
      'retailInfo.isSold': { title: 'Trạng thái', formatter: input => <>{input ? 'Đã bán' : 'Chưa bán'}</> },
      'retailInfo.soldDate': {
        title: 'Ngày bán',
        formatter: input => <DisplayDateTime input={input} />,
      },
      'retailInfo.soldAt': { title: 'Nơi bán', formatter: input => <>{input?.agency?.name}</> },
      'retailInfo.soldBy': { title: 'Nhân viên nơi bán', formatter: input => <>{input?.user?.name}</> },
      'retailInfo.buyer': { title: 'Số điện thoại người mua', formatter: input => <>{input?.customer?.username}</> },
      '_id': { title: 'ID QR' },
    },
  },
  {
    header: 'Doanh nghiệp sản xuất',
    className: 'col-12',
    titleClassName: 'col-md-5 col-4 mb-10',
    dataClassName: 'col-md-7 col-8 mb-10 pl-5 text-right',
    data: {
      'enterprise.name': {title: 'ENTERPRISE.NAME'},
    'enterprise.taxId': {title: 'ENTERPRISE.TAX_ID'},
    'enterprise.address': {title: 'ENTERPRISE.ADDRESS'},
    'enterprise.phone': {title: 'ENTERPRISE.PHONE'},
    'enterprise.presentedBy': {title: 'ENTERPRISE.REPRESENTED_BY'},
    },
  },
  {
    header: 'Thông tin chung',
    className: 'col-12',
    titleClassName: 'col-md-5 col-4 mb-10',
    dataClassName: 'col-md-7 col-8 mb-10 pl-5 text-right',
    data: {
      'species.name': { title: 'Tên chủng loại' },
      'species.barcode': { title: 'Đăng ký vạch' },
    },
  },
  {
    header: 'Thông tin xuống giống',
    className: 'col-12',
    titleClassName: 'col-md-5 col-4 mb-10',
    dataClassName: 'col-md-7 col-8 mb-10 pl-5 text-right',
    data: {
      'productPlan.seeding.certificates': {
        title: 'SEEDING.CERTIFICATE',
        formatter: (input) => DisplayDownloadLink(input, 'path')
      },
      'productPlan.seeding.buyInvoice': {
        title: 'SEEDING.INVOICE',
        formatter: (input) => DisplayDownloadLink(input, 'path')
      },
      'productPlan.seeding.seedingTime': {
        title: 'SEEDING.SEEDING_TIME',
        formatter: (input) => (<DisplayDateTime input={input}/>),
      },
      'productPlan.seeding.farmLocation.[coordinates]': {
        title: 'SEEDING.FARM_LOCATION',
        formatter: DisplayCoordinates
      },
      'productPlan.seeding.numberOfSeed': {title: 'SEEDING.NUMBER_OF_SEED',},
      'productPlan.seeding.landLot.code': {title: 'SEEDING.LAND_LOT',},
      'productPlan.seeding.area': {
        title: 'SEEDING_AREA',
        formatter: (input) => {
          return (<>{input ? (input + ' m2') : ''}</>)
        },
      },
      'productPlan.seeding.temperature': {
        title: 'TEMPERATURE',
        formatter: DisplayCelcius,
      },
      'productPlan.seeding.humidity': {
        title: 'HUMIDITY',
        formatter: DisplayPercent,
      },
      'productPlan.seeding.porosity': {
        title: 'POROSITY',
        formatter: DisplayPercent,
      },
      'productPlan.seeding.seedingImage': {
        title: 'PLANTING_IMAGE_BEFORE',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo)
        }
      },
      'productPlan.seeding.landLotImage': {
        title: 'PLANTING_LAND_LOT_IMAGE',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo)
        }
      },
      'productPlan.seeding.manager.fullName': {
        title: 'ADMIN_DIRECTOR_INFO',
      },
      'productPlan.seeding.[leader].fullName': {
        title: 'ADMIN_SEEDING_LEADER',
        formatter: (input) => DisplayArray(input)
      },
      'productPlan.seeding.[technical].user.fullName': {
        title: 'ROLE.TECHNICIAN',
        formatter: (input) => DisplayArray(input)
      },
      'productPlan.seeding.[worker].fullName': {
        title: 'SEEDING_WORKER',
        formatter: (input) => {
          console.log(input);
          return DisplayArray(input)
        }
      },
    },
  },
  {
    header: 'Thông tin gieo trồng',
    className: 'col-12',
    titleClassName: 'col-md-5 col-4 mb-10',
    dataClassName: 'col-md-7 col-8 mb-10 pl-5 text-right',
    data: {
      'productPlan.planting.numberOfPlants': {
        title: 'PLATING_QUANTITY',
      },
      'productPlan.planting.area': {
        title: 'PLANTING_AREA',
        formatter: (input) => {
          return (<>{input ? (input + ' m2') : ''}</>)
        },
      },
      'productPlan.planting.farmLocation.[coordinates]': {
        title: 'PLANTING.FARM_LOCATION',
        formatter: DisplayCoordinates
      },
      'productPlan.planting.imageBefore': {
        title: 'PLANTING_LAND_LOT_IMAGE',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo)
        }
      },
      'productPlan.planting.imageAfter': {
        title: 'PLANTING_IMAGE_PROCESSING',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo)
        }
      },
      'productPlan.planting.temperature': {
        title: 'TEMPERATURE',
        formatter: DisplayCelcius,
      },
      'productPlan.planting.humidity': {
        title: 'HUMIDITY',
        formatter: DisplayPercent,
      },
      'productPlan.planting.porosity': {
        title: 'POROSITY',
        formatter: DisplayPercent,
      },
      'productPlan.planting.manager.fullName': {
        title: 'ADMIN_DIRECTOR_INFO',
      },
      'productPlan.planting.[leader].fullName': {
        title: 'ADMIN_SEEDING_LEADER',
        formatter: (input) => DisplayArray(input)
      },
      'productPlan.planting.[technical].user.fullName': {
        title: 'ROLE.TECHNICIAN',
        formatter: (input) => DisplayArray(input)
      },
      'productPlan.planting.[worker].fullName': {
        title: 'PLANTING_WORKER',
        formatter: (input) => DisplayArray(input)
      },
    },
  },
  {
    header: 'Thông tin thu hoạch',
    className: 'col-12',
    titleClassName: 'col-md-5 col-4 mb-10',
    dataClassName: 'col-md-7 col-8 mb-10 pl-5 text-right',
    data: {
      'productPlan.harvesting.time': {
        keyField: 'productPlan.harvesting',
        title: 'HARVESTING_DATE',
        formatter: (e) => (<DisplayDiffTime startTime={e?.startTime} endTime={e?.endTime}/>)
      },
      'productPlan.harvesting.quantity': {
        title: 'HARVESTING_REAL_QUANTITY',
      },
      'productPlan.harvesting.imageBefore': {
        title: 'HARVESTING_IMAGE_BEFORE',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'productPlan.harvesting.imageInProgress': {
        title: 'HARVESTING_IMAGE_PROCESSING',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'productPlan.harvesting.imageAfter': {
        title: 'HARVESTING_IMAGE_AFTER',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'productPlan.harvesting.temperature': {
        title: 'TEMPERATURE',
        formatter: DisplayCelcius
      },
      'productPlan.harvesting.humidity': {
        title: 'HUMIDITY',
        formatter: DisplayPercent
      },
      'productPlan.harvesting.porosity': {
        title: 'POROSITY',
        formatter: DisplayPercent
      },
      'productPlan.planting.manager.fullName': {
        title: 'ADMIN_DIRECTOR_INFO',
      },
      'productPlan.harvesting.[leader].user.fullName': {
        title: 'ADMIN_HARVESTING_LEADER',
        formatter: (input) => DisplayArray(input),
      },
      'productPlan.harvesting.[technical].user.fullName': {
        title: 'ROLE.TECHNICIAN',
        formatter: (input) => DisplayArray(input),
      },
      'productPlan.harvesting.[worker].user.fullName': {
        title: 'HARVESTING_WORKER',
        formatter: (input) => DisplayArray(input),
      },
    },
  },
  {
    header: 'Thông tin sơ chế',
    className: 'col-12',
    titleClassName: 'col-md-5 col-4 mb-10',
    dataClassName: 'col-md-7 col-8 mb-10 pl-5 text-right',
    data: {
      'productPlan.preliminaryTreatment.time': {
        keyField: 'productPlan.preliminaryTreatment', title: 'PRELIMINARY_TREATMENT_TIME',
        formatter: (e) => (<DisplayDiffTime startTime={e?.startTime} endTime={e?.endTime}/>)
      },
      'productPlan.preliminaryTreatment.quantity': {
        title: 'PRELIMINARY_TREATMENT_QUANTITY_REAL',
      },
      'productPlan.preliminaryTreatment.imageBefore': {
        title: 'PRELIMINARY_TREATMENT_IMAGE_BEFORE',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'productPlan.preliminaryTreatment.imageInProgress': {
        title: 'PRELIMINARY_TREATMENT_IMAGE_PROCESSING',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'productPlan.preliminaryTreatment.imageAfter': {
        title: 'PRELIMINARY_TREATMENT_IMAGE_AFTER',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'productPlan.planting.manager.fullName': {
        title: 'ADMIN_DIRECTOR_INFO',
      },
      'productPlan.preliminaryTreatment.[leader].user.fullName': {
        title: 'PRELIMINARY_TREATMENT_LEADER',
        formatter: (input) => DisplayArray(input),
      },
      'productPlan.preliminaryTreatment.[technical].user.fullName': {
        title: 'PRELIMINARY_TREATMENT_TECHNICAL',
        formatter: (input) => DisplayArray(input),
      },
      'productPlan.preliminaryTreatment.[worker].user.fullName': {
        title: 'PRELIMINARY_TREATMENT_WORKER',
        formatter: (input) => DisplayArray(input),
      },
    }
  },
  {
    header: 'Thông tin làm sạch',
    className: 'col-12',
    titleClassName: 'col-md-5 col-4 mb-10',
    dataClassName: 'col-md-7 col-8 mb-10 pl-5 text-right',
    data: {
      'productPlan.cleaning.time': {
        keyField: 'productPlan.cleaning', title: 'CLEANING_TIME',
        formatter: (e) => (<DisplayDiffTime startTime={e?.startTime} endTime={e?.endTime}/>)
      },
      'productPlan.cleaning.quantity': {
        title: 'Sản lượng sau làm sạch',
      },
      'productPlan.cleaning.imageBefore': {
        title: 'CLEANING_IMAGE_BEFORE',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'productPlan.cleaning.imageInProgress': {
        title: 'CLEANING_IMAGE_PROCESSING',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'productPlan.cleaning.imageAfter': {
        title: 'CLEANING_IMAGE_AFTER',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'productPlan.planting.manager.fullName': {
        title: 'ADMIN_DIRECTOR_INFO',
      },
      'productPlan.cleaning.[leader].user.fullName': {
        title: 'CLEANING_LEADER',
        formatter: (input) => DisplayArray(input),
      },
      'productPlan.cleaning.[technical].user.fullName': {
        title: 'CLEANING_TECHNICAL',
        formatter: (input) => DisplayArray(input),
      },
      'productPlan.cleaning.[worker].user.fullName': {
        title: 'CLEANING_WORKER',
        formatter: (input) => DisplayArray(input),
      },
    },
  },
  {
    header: 'Thông tin đóng gói',
    className: 'col-12',
    titleClassName: 'col-md-5 col-4 mb-10',
    dataClassName: 'col-md-7 col-8 mb-10 pl-5 text-right',
    data: {
      'productPlan.packing.address': {
        keyField: 'productPlan.packing.packingImage', title: 'PACKING_LOCATION',
        formatter: (e) => {
          const master = e?.filter((item: any) => item.isMaster === true)
          return <>{master && master[0]?.location && DisplayCoordinates(master[0]?.location?.coordinates)}</>
        }
      },
      'productPlan.packing.packing.code': {
        title: 'Quy cách đóng gói',
      },
      'productPlan.packing.exp': {
        keyField: 'productPlan.packing', title: 'Hạn sử dụng',
        formatter: (e) => (<DisplayDiffTime startTime={e?.estimatedExpireTimeStart} endTime={e?.estimatedExpireTimeEnd}/>)
      },
      'productPlan.packing.sampleImage': {
        title: 'Hình ảnh sản phẩm',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'productPlan.packing.packingImage': {
        title: 'Hình ảnh sau khi đóng gói',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'scanAt': {
        title: 'Ngày gán QR',
        formatter: (input) => (<DisplayDateTime input={input}/>),
      },
      'scanBy.fullName': {
        title: 'Người gán QR',
      },
      'activeBy.fullName': {
        title: 'QR_ACTIVATE_BY',
      },
      'activeAt': {
        title: 'QR_ACTIVATE_AT',
        formatter: (input) => (<DisplayDateTime input={input}/>),
      },
      'productPlan.planting.manager.fullName': {
        title: 'ADMIN_DIRECTOR_INFO',
      },
      'productPlan.packing.[leader].user.fullName': {
        title: 'PACKING_LEADER',
        formatter: (input) => DisplayArray(input),
      },
    },
  },
  {
    header: 'Thông tin bảo quản',
    className: 'col-12',
    titleClassName: 'col-md-5 col-4 mb-10',
    dataClassName: 'col-md-7 col-8 mb-10 pl-5 text-right',
    data: {
      'productPlan.preservation.time': {
        keyField: 'productPlan.preservation', title: 'PRESERVATION_TIME',
        formatter: (e) => (
          <DisplayDiffTime startTime={e?.startTime} endTime={e?.endTime}/>)
      },
      'productPlan.preservation.address': {
        keyField: 'productPlan.preservation.storageImage', title: 'PRESERVATION_LOCATION',
        formatter: (e) => {
          const master = e?.filter((item: any) => item.isMaster === true)
          return <>{master && master[0]?.location && DisplayCoordinates(master[0]?.location?.coordinates)}</>
        }
      },
      'productPlan.preservation.temperature': {
        title: 'Nhiệt độ bảo quản',
        formatter: DisplayCelcius
      },
      'productPlan.preservation.storageImage': {
        title: 'Hình ảnh bảo quản',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo, ['isMaster', true])
        }
      },
      'productPlan.preservation.[technical].user.fullName': {
        title: 'Kĩ thuật',
        formatter: (input) => DisplayArray(input),
      },
      'productPlan.preservation.[worker].user.fullName': {
        title: 'Nhân viên',
        formatter: (input) => DisplayArray(input),
      },
    },
  },
	{
    header: 'Thông tin phân phối',
    className: 'col-12',
    titleClassName: 'col-md-0 col-12 mb-10',
    dataClassName: 'col-md-12 col-12 mb-10',
    data: {
      'distributionHistory': { formatter: input => DisplayDistribution(input ? input : entityExample.distributionHistory) },
    },
  },
  {
    header: 'Thông tin vận chuyển',
    className: 'col-12',
    titleClassName: 'col-md-0 col-12 mb-10',
    dataClassName: 'col-md-12 col-12 mb-10',
    data: {
      'shippingHistory': { formatter: input => <DisplayShipping input={input ? input : entityExample.shippingHistory} /> },
    },

  }
];
