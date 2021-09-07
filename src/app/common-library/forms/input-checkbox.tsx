import React, { ReactElement, useCallback } from 'react';
import { Checkbox } from 'antd';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import { useIntl } from 'react-intl';

import './input-checkbox.scss';
import _ from 'lodash';

const CheckboxGroup = Checkbox.Group;

const GetCheckBoxValue = (data: any[]) => {
  if (!data) return [];

  const checkArr: any[] = [];

  data.forEach((values: any) => {
    checkArr.push(_.isString(values) ? values : values.value);
  });

  return checkArr;
};

const handleCheckAll = (data: any[]) => {
  if (!data) return [];

  const checkArr: any[] = [];

  data.forEach((values: any) => {
    if (!values.disabled) {
      checkArr.push(values.value);
    }
  });

  return checkArr;
};

interface Prop {
  optionData: any[];
  name: string;
  label: string | ReactElement;
}

function CheckBoxField({ optionData, name, label }: Prop) {
  const intl = useIntl();
  
  const [field] = useField({ name });


  const { setFieldValue, errors, touched, getFieldMeta, values } = useFormikContext<any>();

  const onChange = (list: any[]) => {
    console.log(list)
    setFieldValue(name, list);
    console.log(field)
    // setIndeterminate(!!list.length && list.length < optionData.filter((value: any) => !value.disabled).length);
  };

  const onCheckAllChange = (e: any) => {
    const checkArr: any[] = handleCheckAll(optionData);
    setFieldValue(name, e.target.checked ? checkArr : []);
    // setIndeterminate(false);
  };

  console.log(field)

  return (
    <>
      <div className="row">
        <div className="d-flex flex-column col-md-8 col-12">
          <div className="check-all-field checkbox-input bg-light pt-3 pb-3 pr-3">
            <Checkbox
              indeterminate={field.value && field.value.length > 0 && (field.value.length < optionData.length)}
              onChange={onCheckAllChange}
              checked={(field && field.value) ? (field.value.length >= optionData.length) : false}
              className="checkbox-all">
              {label}
            </Checkbox>
          </div>
          <div className="w-100 pr-3">
            <Checkbox.Group
              options={optionData}
              // defaultValue={GetCheckBoxValue(field.value)}
              value={field && field.value ? field.value : []}
              onChange={onChange}
              className="checkbox-input w-100"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckBoxField;
