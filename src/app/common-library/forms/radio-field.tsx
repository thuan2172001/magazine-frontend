import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './custom.css';
import {DisplayError} from './field-feedback-label';
import {ErrorMessage, useField, useFormikContext} from 'formik';
import {useIntl} from 'react-intl';
import {FormControlLabel, RadioGroup} from "@material-ui/core";
import StyledRadio from "./StyledRadio";
import {GetClassName} from "../helpers/common-function";
import _ from "lodash";
import {InputRadioType} from "../common-components/common-input";


export function RadioField({
                             label,
                             name,
                             withFeedbackLabel = true,
                             withValidation,
                             customFeedbackLabel,
                             mode,
                             labelWidth,
                             disabled,
                             required,
                             options,
                             onChange,
                             type,
                             optionsClassName,
                             value,
                             ...props
                           }: InputRadioType) {
  const {setFieldValue, handleChange, values, handleBlur, validateField, setFieldTouched} = useFormikContext<any>();
  const intl = useIntl();
  const _label = useMemo(() => (_.isString(label) ? intl.formatMessage({id: label}) : label), []);
  
  const getValue = useCallback((value: any, fieldValue: any) => {
    // console.log(value, fieldValue);
    return value ? _.isFunction(value) ? value(fieldValue) : value : fieldValue;
  }, []);
  const [validate, setValidate] = useState(() => console.log);
  const [field] = useField({
    validate,
    name,
    disabled: disabled ? typeof disabled === 'boolean' ? disabled : disabled(values) : disabled,
    required: required ? typeof required === 'boolean' ? required : required(values) : required
  });
  useEffect(() => {
    setValidate(() => (val: any): string | void => {
      if (required && !getValue(value, val)) return 'RADIO.ERROR.REQUIRED';
    });
  }, [getValue, value])
  const _innerValue = useMemo(() => {
    return getValue(value, field.value)
  }, [field.value]);
  const [_innerOptions, setInnerOptions] = useState<any[]>([]);
  useEffect(() => {
    if (_.isArray(options)) setInnerOptions(options);
    else setInnerOptions(options({field, values, setFieldValue, setFieldTouched}));
  }, [field.value]);
  return (
    <>
      <div className={mode === 'horizontal' ? 'row' : ''}>
        {_label && (
          <div className={mode === 'horizontal' ? GetClassName(labelWidth, true) : ''}>
            <label className={mode === 'horizontal' ? 'mb-0 mt-2' : ''}>
              {_label}{required && <span className="text-danger">*</span>}
            </label>
          </div>
        )}
        
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, false) : ''}>
          <RadioGroup
            {...props}
            {...field}
            name={name}
            value={_innerValue ?? null}
            onChange={(e) => {
              if (_.isFunction(value)) {
                setFieldTouched(name, true);
                onChange && onChange(e, {setFieldValue, setFieldTouched, values});
              } else {
                onChange && onChange(e, {setFieldValue, setFieldTouched, values});
                handleChange(e);
              }
            }}
            onBlur={handleBlur}
          >
            <div className={'row no-gutters'}>
              {_innerOptions.map((val, index, arr) => {
                return (<FormControlLabel className={optionsClassName} value={val.value} control={<StyledRadio/>}
                                          key={`radio_${name}_${index}_${JSON.stringify(val.value)}`}
                                          label={_.isString(val.label) ?
                                            intl.formatMessage({id: val.label}) : val.label({
                                              setFieldValue,
                                              handleChange,
                                              values,
                                              handleBlur
                                            })}/>)
              })}
            </div>
          </RadioGroup>
          {withFeedbackLabel && (<ErrorMessage name={name}>
            {msg => <DisplayError label={_label} error={msg}/>
            }
          </ErrorMessage>)}
        </div>
      </div>
    </>
  );
}