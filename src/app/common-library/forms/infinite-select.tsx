import React, {ReactElement, useCallback, useEffect, useMemo} from 'react';
import {withAsyncPaginate} from 'react-select-async-paginate';
import {ErrorMessage, useField, useFormikContext} from 'formik';
import {GetClassName} from '../helpers/common-function'
import AtlaskitSelect from "@atlaskit/select";
import {StylesConfig} from "react-select/src/styles";
import {useIntl} from 'react-intl';
import {DisplayError} from "./field-feedback-label";
import _ from "lodash";

const getCSSClasses = (errorName: any, isTouched: any): string => {
  const classes: string[] = [];
  
  // classes.push('form-control')
  if (isTouched) {
    if (errorName) {
      classes.push('is-invalid');
      classes.push('border-danger');
    } else {
      // classes.push('is-valid');
    }
  }
  classes.push('input-search-select');
  return classes.join(" ");
}

export function InfiniteSelect({
                                 name,
                                 label,
                                 withFeedbackLabel = true,
                                 customFeedbackLabel,
                                 value,
                                 loadOptions,
                                 onChange,
                                 required,
                                 placeholder,
                                 keyField,
                                 disabled,
                                 selectField,
                                 validationMessage,
                                 labelWidth,
                                 formatter,
                                 isClearable = true,
                                 mode, ...props
                               }: {
  label: string | ReactElement;
  loadOptions: any;
  selectField?: string;
  withFeedbackLabel?: boolean;
  keyField?: string;
  mode?: 'horizontal' | 'vertical',
  value?: any;
  onChange?: (value: { value: any, entity: any }, props: { setFieldValue: ((name: string, value: any) => void), setFieldTouched: ((name: string, value: boolean) => void), values: any }) => any;
  placeholder?: string;
  name: string;
  customFeedbackLabel?: any;
  additional?: any;
  labelWidth?: number;
  validationMessage?: string;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  formatter?:(e:any) => any;
  isClearable?: boolean;
}) {
  const {
    setFieldValue,
    errors,
    touched,
    values,
    handleBlur,
    setFieldTouched,
    validateField,
    validateForm
  } = useFormikContext<any>();
  const CustomAsyncPaginate = withAsyncPaginate(AtlaskitSelect);
  const validate = useCallback((value: any): string | void => {
    if (required && !value && value === '') return 'RADIO.ERROR.REQUIRED';
  }, [required, values]);
  
  const [field, fieldMeta, fieldHelper] = useField({name, validate});
  const intl = useIntl();
  const _label = useMemo(() => (_.isString(label) ? intl.formatMessage({id: label}) : label), []);
  const _disabled = useMemo(() => (disabled ? typeof disabled === 'boolean' ? disabled : disabled(values) : disabled), [disabled, values]);
  useEffect(() => {
    setTimeout(() => {
      validateField(name);
    }, 10);
  }, [field.value])
  const styles = useMemo((): StylesConfig<any, false> => {
    return {
      control: (base, props1) => {
        // console.log("control", base, props1)
        return {
          ...base,
          backgroundColor: "transparent",
          borderColor: (!fieldMeta.touched) ? "#E4E6EF" : fieldMeta.error ? "#f10d0d" : "#0fc35c",
          borderRadius: "0.42rem",
          borderWidth: "1px",
          minHeight: "2.3rem",
          fontFamily: "SVN-Gilroy, Roboto, Poppins, Helvetica, sans-serif",
          ":hover": {borderColor: "#0fc35c"},
          ":focus": {borderColor: "#0fc35c"},
          fontSize: "12px"
        }
      },
      valueContainer: (base, props1) => {
        return {
          ...base,
          paddingLeft: "1rem",
          fontFamily: "SVN-Gilroy, Roboto, Poppins, Helvetica, sans-serif",
          fontSize: "12px"
        }
      },
      menuList: (base, props1) => {
        // console.log(props1);
        return {
          ...base,
          fontFamily: "SVN-Gilroy, Roboto, Poppins, Helvetica, sans-serif",
          fontSize: "12px"
        }
      },
      singleValue: (base, props1) => {
        return {
          ...base,
          fontFamily: "SVN-Gilroy, Roboto, Poppins, Helvetica, sans-serif",
          fontSize: "12px",
          margin: "0 0 0 0"
        }
      },
      dropdownIndicator: (base, props1) => {
        return {...base, padding: "0.41rem 0px !important", color: "#B5B5C3"}
      },
      placeholder: (styles) => {
        return {...styles, whiteSpace: "nowrap", color: "#B5B5C3", fontSize: "12px", margin: "0 0 0 0",}
      },
      option: (styles, {data, isDisabled, isFocused, isSelected}) => {
        return {...styles}
      },
    }
  }, [fieldMeta.error, fieldMeta.touched]);
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
          <CustomAsyncPaginate
            className={getCSSClasses(errors[name], touched[name])}
            {...props}
            {...field}
            value={formatter? formatter(field.value) : (keyField && keyField != '') ? (field.value && field.value[keyField]) ? field.value : '' : [field.value]}
            getOptionValue={option => {
              // console.log(option, selectField, selectField ? option[selectField] : option)
              return selectField ? option[selectField] : option
            }}
            getOptionLabel={option => {
              // console.log(option, keyField, keyField ? option[keyField] : option)
              return keyField ? option[keyField] : intl.formatMessage({ id: _.toString(option) })
            }}
            loadOptions={loadOptions}
            onChange={(value: any, action) => {
              if (onChange) {
                value = onChange(value, {setFieldTouched, setFieldValue, values}) ?? value;
              }
              setFieldTouched(name, true);
              setFieldValue(name, value !== null ? value : '');
            }}
            isClearable={isClearable}
            onBlur={(e) => {
              setFieldTouched(name, true);
            }}
            placeholder={_disabled ? '' : intl.formatMessage({id: placeholder}, {label: _.isString(_label) ? _label : ''})}
            styles={styles}
            isDisabled={_disabled}
            // className={`${errors[name] ? 'border-danger' : 'input-search-select'}`}
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

