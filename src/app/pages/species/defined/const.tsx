import {
  ModifyForm,
  ModifyInputGroup,
  RenderInfoDetail,
  SearchModel
} from '../../../common-library/common-types/common-type';
import {getField} from '../../../common-library/helpers/common-function';
import React, {useMemo, useState} from "react";

export const masterEntityDetailDialog: RenderInfoDetail = [
  {
    data: {
      image: {
        formatter: (data) => (
          <img src={data ? data.path : ''} alt="rau" className="border border-primary" width="200px"
               height="200px"/>
        )
      }
    },
    className: 'col-5 d-flex justify-content-center align-items-center ml-10',
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
    className: 'col-6',
  },
];

export const productTypeSearchModel: SearchModel = {
  code: {
    type: 'string',
    label: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
  },
  name: {
    type: 'string',
    label: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
  },
};

const [group1, setGroup1] = useState<ModifyInputGroup>({
  _subTitle: 'THÔNG TIN CHUNG',
  _className: 'col-6 pr-xl-15 pr-md-10 pr-5',
  code: {
    _type: 'string',
    label: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
    required: true,
    disabled: true,
  },
  name: {
    _type: 'string',
    required: true,
    label: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
  },
  barcode: {
    _type: 'string',
    required: true,
    label: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
  },
  images: {
    _type: 'image',
    // value: null,
    label: 'PRODUCT_TYPE.MASTER.IMAGE',
    multiple: false
  },
  // avatar: {
  //   type: 'image',
  //   placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
  //   label: 'Album 2',
  // },
});
const [group2, setGroup2] = useState<ModifyInputGroup>({
  _subTitle: 'THÔNG TIN VÒNG ĐỜI',
  _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
  growingDays: {
    _type: 'number',
    label: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
  },
  plantingDays: {
    _type: 'number',
    label: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
  },
  expiryDays: {
    _type: 'number',
    label: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
  },
});

export const createForm = useMemo((): ModifyForm => ({
  _header: "createTitle",
  panel1: {
    _title: '',
    group1: group1,
    group2: group2,
  },
}), []);
export const updateForm = useMemo((): ModifyForm => ({...createForm, _header: "sada"}), [createForm]);

interface FieldProp {
  field: string;
  ref?: { prop: string; key: string };
}

export const ConvertProductionPlan = (entity: any, keyField?: FieldProp[]) => {
  if (!entity) return;
  
  const convertEntity = {...entity};
  
  if (keyField && keyField.length > 0) {
    keyField.forEach(({field, ref}: FieldProp) => {
      if (ref && convertEntity[ref.prop]) {
        convertEntity[field] = {
          label: getField(convertEntity[ref.prop], ref.key),
          value: entity._id,
        };
      } else {
        convertEntity[field] = {label: convertEntity[field], value: entity._id};
      }
    });
    
    return convertEntity;
  }
  
  return convertEntity;
};
