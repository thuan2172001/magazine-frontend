import {Switch} from 'antd';
import React, {useCallback, useMemo} from 'react';
import './custom.css';
import {ErrorMessage, useField, useFormikContext} from 'formik';
import {GetClassName} from "../helpers/common-function";
import {CheckOutlined} from "@material-ui/icons";
import {InputBooleanType} from "../common-components/common-input";
import {DisplayError} from "./field-feedback-label";
import {useIntl} from "react-intl";
import _ from "lodash";

export function SwitchField({
                              mode, disabled, required, onChange, withFeedbackLabel = true,
                              trueFalse = {true: 'true', false: 'false'},label,
                              ...props
                            }: InputBooleanType) {
  const {setFieldValue, errors, setFieldTouched, values} = useFormikContext<any>();
  const validate = useCallback((value: any): string | void => {
    if (required && (disabled ? typeof disabled === 'boolean' ? !disabled : !disabled(values) : true) && !value && value !== '') return 'RADIO.ERROR.REQUIRED';
  }, []);
  
  const intl = useIntl();
  const _label = useMemo(() => (_.isString(label) ? intl.formatMessage({id: label}) : label), []);
  
  const [field] = useField({
    validate,
    ...props,
    disabled: disabled ? typeof disabled === 'boolean' ? disabled : disabled(values) : disabled,
    required: required ? typeof required === 'boolean' ? required : required(values) : required
  });
  return (
    <>
      <div className={mode === 'horizontal' ? 'row' : ''}>
        <div className={mode === 'horizontal' ? GetClassName(props.labelWidth, true) : ''}>
          {_label && (
            <label className={mode === 'horizontal' ? 'mb-0 mt-4' : ''}>
              {_label}{required && <span className="text-danger">*</span>}
            </label>
          )}
        </div>
        <div className={mode == 'horizontal' ? GetClassName(props.labelWidth, false) : ''}>
          {
            <Switch
              checked={field?.value === trueFalse.true}
              className={(field?.value === trueFalse.true ? 'bg-primary' : 'bg-dark-o-95') + ' mt-4 mb-4'}
              {...props}
              onChange={(e) => {
                setFieldValue(field.name, e ? trueFalse.true : trueFalse.false);
                setFieldTouched(field.name, true)
                onChange && onChange(e, {setFieldValue, values})
              }}
              checkedChildren={<CheckOutlined/>}
              // unCheckedChildren={<CloseOutlined/>}
            />
          }
          {withFeedbackLabel && (<ErrorMessage name={field.name}>
            {msg => <DisplayError label={_label} error={msg}/>
            }
          </ErrorMessage>)}
        </div>
      </div>
    </>
  );
}