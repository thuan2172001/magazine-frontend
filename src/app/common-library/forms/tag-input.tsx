import React, {useCallback, useMemo} from 'react';
import {Select} from 'antd';
import {ErrorMessage, useField, useFormikContext} from 'formik';
import {GetClassName} from '../helpers/common-function';
import {useIntl} from 'react-intl';
import {DisplayError} from "./field-feedback-label";
import _ from "lodash";

const {Option} = Select;

function TagInput({
                    label,
                    data,
                    value,
                    name,
                    mode,
                    labelWidth,
                    required,
                    disabled,
                    tagData,
                    root, 
                    withFeedbackLabel = true,
                    placeholder,
                    ...props
                  }: {
  
  placeholder?: string;
  [X: string]: any;
}) {
  const validate = useCallback((value: any): string | void => {
    if (required && !value) return 'RADIO.ERROR.REQUIRED';
  }, [required, value]);
  const [field] = useField({name});
  const {setFieldValue, errors, touched, getFieldMeta, values, handleChange, setFieldTouched} = useFormikContext<any>();

  const getDefautltTag = useCallback((data: any) => {
    if (!data) return [];

    if (_.isString(data[0])) return data;
  
    const idArr: any[] = [];
    
    data?.forEach((el: any) => {
      idArr.push(el.user ? el.user._id : el._id)
    })
    
    return idArr;
  }, []);

  console.log(getDefautltTag(field.value))
  console.log(field)

  const intl = useIntl();
  const _label = useMemo(() => (_.isString(label) ? intl.formatMessage({id: label}) : label), []);
  return (
    <>
      <div className={mode === 'horizontal' ? 'row' : ''}>
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, true) : ''}>
          {_label && (
            <label className={mode === 'horizontal' ? 'mb-0 mt-2' : ''}>
              {_label}{required && <span className="text-danger">*</span>}
            </label>
          )}
        </div>
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, false) : ''}>
          <Select
            mode="multiple"
            style={{width: '100%'}}
            value={field.value ? getDefautltTag(field.value) : []}
            placeholder={intl.formatMessage({id: placeholder},  {label:_.isString(_label) ? _label:''})}
            onChange={(value: any) => {
              // handleChange(value);
              console.log(value)
              setFieldTouched(name, true);
              if (value) {
                setFieldValue(name, value);
              }
              
            }}
            onBlur={(e) => {
              setFieldTouched(name, true);
            }}
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            disabled={disabled ? typeof disabled === 'boolean' ? disabled : disabled(values) : disabled}
            className={`${getFieldMeta(field.name).touched && getFieldMeta(field.name).error ? 'border border-danger rounded' : ''}`}
          
          >
            {tagData && tagData.map((item: any, key: any) => (
              <Option key={item._id} value={item._id}>
                {item.fullName ? item.fullName : item.user && item.user.fullName ? item.user.fullName : item.lastName ? item.lastName : item.user.lastName}
              </Option>
            ))}
          </Select>
          {withFeedbackLabel && (<ErrorMessage name={field.name}>
            {msg => <DisplayError label={_label} error={msg}/>
            }
          </ErrorMessage>)}
        </div>
      </div>
    </>
  );
}

export default TagInput;
