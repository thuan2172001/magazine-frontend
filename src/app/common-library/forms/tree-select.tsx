import React, {ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import {TreeSelect} from 'antd';
import {ErrorMessage, useField, useFormikContext} from 'formik';
import './tree-select.scss'
import SelectDropDownIcon from './select-drop-down-icon';
import {useIntl} from 'react-intl';
import {GetClassName} from "../helpers/common-function";
import {DisplayError} from "./field-feedback-label";
import _ from "lodash";

const ConvertToTreeNode = (data: any, {keyField, selectField, childrenField}: any) => {
  const t = {
    title: data[keyField],
    value: data,
    key: data[selectField],
    children: data[childrenField] ? data[childrenField].map((e: any) => ConvertToTreeNode(e, {
      keyField,
      childrenField
    })) : [],
  };
  console.log(t);
  return t;
};

function CustomTreeSelect(
  {
    name,
    label,
    withFeedbackLabel = true,
    customFeedbackLabel,
    onChange,
    required,
    selectField = '_id',
    childrenField = 'children',
    keyField = 'name',
    placeholder,
    labelWidth,
    disabled,
    onSearch,
    mode, ...props
  }
    : {
    label: string | ReactElement;
    mode?: 'horizontal' | 'vertical',
    keyField?: string;
    selectField?: string;
    childrenField?: string;
    withFeedbackLabel?: boolean;
    customFeedbackLabel?: any;
    onChange?: (value: { value: any, entity: any }, props: { setFieldValue: ((name: string, value: any) => void), setFieldTouched: ((name: string, value: boolean) => void), values: any }) => any;
    onSearch: (searchQueryObject: any) => any;
    placeholder?: string;
    name: string;
    additional?: any;
    labelWidth?: number;
    validationMessage?: string;
    required?: boolean | ((values: any) => boolean);
    disabled?: boolean | ((values: any) => boolean);
  }) {
  const {
    setFieldValue, errors, touched, validateField,
    setFieldTouched, values,
  } = useFormikContext<any>();
  const intl = useIntl();
  const _label = useMemo(() => (_.isString(label) ? intl.formatMessage({id: label}) : label), []);
  const _disabled = useMemo(() => (disabled ? typeof disabled === 'boolean' ? disabled : disabled(values) : disabled), [disabled]);
  
  
  const ConvertToTree = useCallback((data: any[]) => {
    return data.map((value: any, key: any) => {
      return ConvertToTreeNode(value, {keyField, childrenField, selectField});
    });
  }, [keyField, childrenField, selectField]);
  const validate = useCallback((value: any): string | void => {
    if (required && !value && value === '') return 'RADIO.ERROR.REQUIRED';
  }, [required]);
  const [field, fieldMeta, fieldHelper] = useField({name, validate});
  useEffect(() => {
    setTimeout(() => {
      validateField(name);
    }, 10);
  }, [field.value]);
  const [treeData, setTreeData] = useState<any[]>([]);
  useEffect(() => {
    onSearch({}).then((data: any) => {
      const c = ConvertToTree(data);
      setTreeData(c);
    });
  }, [ConvertToTree]);
  const _innerValue = useMemo(() => {
    return field.value ? (_.isString(field.value) ? field.value === '' ? null : field.value : field.value[keyField]) : null;
  }, [field.value]);
  return (
    <>
      <div className={mode === 'horizontal' ? 'row' : ''}>
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, true) : ''}>
          {_label && (
            <label className={mode === 'horizontal' ? 'mb-0 mt-2' : ''}>
              {_label} {required && <span className="text-danger">*</span>}
            </label>
          )}
        </div>
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, false) : ''}>
          <TreeSelect
            suffixIcon={<SelectDropDownIcon/>}
            value={_innerValue}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            treeData={treeData}
            // loadData={(e) => {
            //   // console.log(e);
            //   return onSearch({})
            // }}
            allowClear={true}
            disabled={_disabled}
            placeholder={_disabled ? '' : intl.formatMessage({id: placeholder}, {label: _.isString(_label) ? _label : ''})}
            treeDefaultExpandAll
            onChange={(value: any) => {
              onChange && onChange(value, {setFieldTouched, setFieldValue, values});
              setFieldTouched(name, true);
              setFieldValue(name, value ?? '');
            }}
            className={((!fieldMeta.touched) ? '' : fieldMeta.error ? 'is-invalid' : "is-valid") + ' ant-tree-select-custom'}
          />
          {withFeedbackLabel && (<ErrorMessage name={name}>
            {msg => <DisplayError label={_label} error={msg}/>
            }
          </ErrorMessage>)}
        </div>
      </div>
    </>
  );
}

export default CustomTreeSelect;
