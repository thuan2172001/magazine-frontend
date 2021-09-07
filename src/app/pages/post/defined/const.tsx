import React from 'react';
import {
  ModifyForm,
  ModifyPanel,
  RenderInfoDetail,
  SearchModel,
} from '../../../common-library/common-types/common-type';
import {GenerateAllFormField} from '../../../common-library/helpers/common-function';
import * as CategoryService from '../../category/category.service';
import * as UserService from '../../user/user.service';
import * as Yup from 'yup';

import '../../../pages/production-plan/style/production-plan.scss';
import _ from 'lodash';
import {useIntl} from 'react-intl';
import {
  Display3Info,
  DisplayArray,
  DisplayCelcius,
  DisplayCoordinates,
  DisplayDateTime,
  DisplayDownloadLink,
  DisplayImage,
  DisplayPercent,
  DisplayPersonNameByArray,
  DisplayUnit,
} from '../../../common-library/helpers/detail-helpers';
import {DetailImage} from "../../../common-library/common-components/detail/detail-image";

export const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
export const bodyTitle = 'PRODUCT_TYPE.MASTER.BODY.TITLE';
export const moduleName = 'PRODUCT_TYPE.MODULE_NAME';
export const deleteDialogTitle = 'PRODUCT_TYPE.DELETE_DIALOG.TITLE';
export const createTitle = 'PRODUCT_TYPE.CREATE.TITLE';
export const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
export const homeURL = `${window.location.pathname}`;

export const Fix = ({title}: { title: string }) => {
  const intl = useIntl();
  return <div style={{minWidth: 174}}>{intl.formatMessage({id: title})}</div>;
};

export const basicUnit = [1, 1000, 10000, 100000, 1000000]

export const productPlanSearchModel1: SearchModel = {
  faculty: {
    type: 'search-select',
    label: 'Faculty',
    onSearch: UserService.GetAll,
    keyField: 'faculty.faculty',
  },
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
    type: 'string',
    label: 'Status',
  },
};

// @ts-ignore
export const modifyModel: ModifyPanel = {
  _title: '',
  commonInfo: {
    _subTitle: 'THÔNG TIN CHUNG',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    code: {
      _type: 'string',
      label: 'Mã kế hoạch',
      required: true,
      disabled: true,
    },
  },
};

export const updateForm: ModifyForm = {
  _header: 'test',
  panel1: modifyModel,
};

export const formPart = {
  form_1: {
    title: '',
    modifyModel: modifyModel,
    header: 'KẾ HOẠCH',
  },
};

export const allFormField: any = {
  ...GenerateAllFormField(
    modifyModel,
  ),
};


export const masterEntityDetailDialog2: RenderInfoDetail = [
  {
    header: 'THÔNG TIN CHUNG',
    className: 'col-12',
    titleClassName: 'col-12',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
        title: {
          title: 'POST.MASTER.TABLE.TITLE'
        },
        file: {
          title: 'POST',
          formatter: (input) => {
            if (!input) return <></>
            const [_, ...nameArr] = input.path.split('-');
            const nameFile = nameArr.join('');
            return DisplayDownloadLink('/'+input.path, undefined, nameFile)
          }
        },
        description: {title: 'POST.MASTER.HEADER.DESCRIPTION'},
        image: {
          title: 'IMAGE',
          formatter: (input) => <DetailImage images={input} width={200} height={200}/>
        },
      },
    },
];

export const addInitField = (obj1: any, obj2: any) => {
  const rs = {...obj1};
  
  Object.keys(obj2).forEach(key => {
    if (!rs[key]) {
      rs[key] = obj2[key]
    } 
    if (rs[key]) {
      Object.keys(obj2[key]).forEach(keys => {
        if (!rs[key][keys]) {
          rs[key][keys] = obj2[key][keys];
        }
      });
    }
  });
  
  return rs;
};

export const halfValidate = {
  estimatedHarvestTime: Yup.mixed(),
  expectedQuantity: Yup.number(),
  technical: Yup.array().test('oneOfRequired', 'INPUT_ALL', function (value: any) {
    console.log(this.schema);
    console.log(this.path);
    console.log(this.options);
    return (
      (this.parent?.leader?.length > 0 &&
        this.parent?.expectedQuantity > 0 &&
        this.parent?.estimatedHarvestTime &&
        value.length > 0) ||
      ((!this.parent?.leader || this.parent?.leader.length === 0) &&
        this.parent?.expectedQuantity > 0 &&
        this.parent?.estimatedHarvestTime &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
  leader: Yup.array().test('oneOfRequired', 'INPUT_ALL', function (value: any) {
    return (
      (this.parent?.technical?.length > 0 &&
        this.parent?.estimatedQuantity > 0 &&
        this.parent?.estimatedHarvestTime &&
        value.length > 0) ||
      ((!this.parent?.technical || this.parent?.technical.length === 0) &&
        this.parent?.expectedQuantity > 0 &&
        this.parent?.estimatedHarvestTime &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
};

export const CompareDate = (date1: Date, date2: Date) => {
  if (!_.isDate(date1) || !_.isDate(date2)) return false;
  return date1.getTime() > date2.getTime();
};

export const validate = {
  estimatedTime: Yup.mixed().test('oneOfRequired', 'DATE_VALIDATE', function (value: any) {
    return (
      (this.parent?.leader?.length > 0 &&
        this.parent?.technical?.length > 0 &&
        this.parent?.estimatedQuantity > 0 &&
        value) ||
      ((!this.parent?.leader || this.parent?.leader.length === 0) &&
        (!this.parent?.technical || this.parent?.technical.length === 0) &&
        (!this.parent?.estimatedQuantity || this.parent?.estimatedQuantity === 0) &&
        !value) ||
      (value)
    );
  }),
  estimatedQuantity: Yup.number().test('oneOfRequired', 'ESTIMATED_QUANTITY_VALIDATE', function (value: any) {
    return (
      (this.parent?.leader?.length > 0 &&
        this.parent?.technical?.length > 0 &&
        this.parent?.estimatedTime &&
        value > 0) ||
      ((!this.parent?.leader || this.parent?.leader.length === 0) &&
        (!this.parent?.technical || this.parent?.technical.length === 0) &&
        (!this.parent?.estimatedTime || this.parent?.estimatedTime === '') &&
        (!value || value === 0)) ||
      (value)
    );
  }),
  technical: Yup.array().test('oneOfRequired', 'INPUT_ALL', function (value: any) {
    console.log(value);
    return (
      (this.parent?.leader?.length > 0 &&
        this.parent?.estimatedQuantity > 0 &&
        this.parent?.estimatedTime &&
        value.length > 0) ||
      ((!this.parent?.leader || this.parent?.leader.length === 0) &&
        (!this.parent?.estimatedQuantity || this.parent?.estimatedQuantity === 0) &&
        (!this.parent?.estimatedTime || this.parent?.estimatedTime === '') &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
  leader: Yup.array().test('oneOfRequired', 'INPUT_ALL', function (value: any) {
    return (
      (this.parent?.technical?.length > 0 &&
        this.parent?.estimatedQuantity > 0 &&
        this.parent?.estimatedTime &&
        value.length > 0) ||
      ((!this.parent?.technical || this.parent?.technical.length === 0) &&
        (!this.parent?.estimatedQuantity || this.parent?.estimatedQuantity === 0) &&
        (!this.parent?.estimatedTime || this.parent?.estimatedTime === '') &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
};

export const preservationValidate = {
  estimatedStartTime: Yup.mixed().test('oneOfRequired', 'DATE_VALIDATE', function (value: any) {
    return (
      (this.parent?.technical?.length > 0 &&
        this.parent?.estimatedEndTime &&
        value) ||
      ((!this.parent?.technical || this.parent?.technical.length === 0) &&
        !this.parent?.estimatedEndTime &&
        !value) ||
      (value)
    );
  }),

  estimatedEndTime: Yup.mixed().test('oneOfRequired',
      'DATE_VALIDATE', function (value: any) {
    return (
      (this.parent?.technical?.length > 0 &&
        this.parent?.estimatedStartTime &&
        value) ||
      ((!this.parent?.technical || this.parent?.technical.length === 0) &&
        !this.parent?.estimatedStartTime &&
        !value) ||
      (value)
    );
  }),
  technical: Yup.array().test('oneOfRequired', 'INPUT_ALL', function (value: any) {
    return (
      (this.parent?.estimatedStartTime && this.parent?.estimatedEndTime && value.length > 0) ||
      (!this.parent?.estimatedStartTime &&
        !this.parent?.estimatedEndTime &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
};
