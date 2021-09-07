 import React, { ChangeEvent } from 'react';
import './custom.css';
import { FieldFeedbackLabel } from './field-feedback-label';
import { useIntl } from 'react-intl';
import { Select } from 'antd';
import { useField, useFormikContext } from 'formik';
import './select.scss';

const { Option } = Select;
const getFieldCSSClasses = (touched: any, errors: any) => {
  const classes = ['form-control'];

  // if (touched && errors) classes.push('is-invalid');

  // if (touched && errors) classes.push('is-valid');

  return classes.join(' ');
};

const getClassName = (labelWidth: number | null | undefined, labelStart: boolean) => {
  const classes: string[] = [];

  if (labelStart) {
    if (labelWidth) {
      classes.push(`col-xl-${labelWidth}`);
      classes.push(`col-md-${labelWidth}`);
      classes.push('col-12');
    } else {
      classes.push(`col-xl-3`);
      classes.push(`col-md-3`);
      classes.push('col-12');
    }
  } else {
    if (labelWidth) {
      classes.push(`col-xl-${12 - labelWidth - 1}`);
      classes.push(`col-md-${12 - labelWidth}`);
      classes.push('col-12');
    } else {
      classes.push(`col-xl-8`);
      classes.push(`col-md-9`);
      classes.push('col-12');
    }
  }

  return classes.join(' ');
};

const getError = (error: any, fieldName: string) => {
  if (fieldName.indexOf('.') === -1) {
    return error[fieldName]
  }

  const arrName = fieldName.split('.')

  if (arrName.length === 3) {
    return error[arrName[0]] ? error[arrName[0]][arrName[1]][arrName[2]] : ''
  }

  return error[arrName[0]] ? error[arrName[0]][arrName[1]] : ''
}

const getTouched = (touched: any, fieldName: string) => {
  if (fieldName.indexOf('.') === -1) {
    return touched[fieldName]
  }

  const arrName = fieldName.split('.')

  if (arrName.length === 3) {
    return touched[arrName[0]] ? touched[arrName[0]][arrName[1]][arrName[2]] : ''
  }

  return touched[arrName[0]] ? touched[arrName[0]][arrName[1]] : ''
}

export function SelectField({
  // field, // { name, value, onChange, onBlur }
  // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  placeholder,
  label,
  withFeedbackLabel,
  customFeedbackLabel,
  isHorizontal,
  labelWidth,
  width,
  children,
  type = 'text',
  name,
  ...props
}: {
  // field : any; // { name, value, onChange, onBlur }
  // form: { touched: any, errors: any }; // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label: string;
  placeholder: string;
  withFeedbackLabel: boolean;
  customFeedbackLabel: string;
  isHorizontal: boolean;
  labelWidth: number;
  width: number;
  children: any[];
  name: string;
  type: string;
}) {
  const styleLabe = {
    width: width,
  };

  const styleInput = {
    marginRight: 0,
  };

  const intl = useIntl();
  const { 
    touched,
    errors,
    values,
    validateOnChange,
    submitCount,
    status,  
  } = useFormikContext<any>();

  const [field, meta, helpers] = useField<any>(name);

  return (
    <>
      <div className={isHorizontal ? 'row' : ''}>
        <div className={isHorizontal ? getClassName(labelWidth, true): ''}>
          {label && (
            <label style={width ? styleLabe : {}} className={isHorizontal ? 'mb-0 input-label mt-2' : ''}>
              {label} {withFeedbackLabel && <span className="text-danger">*</span>}
            </label>
          )}
        </div>

        <div className={isHorizontal ? getClassName(labelWidth, false) : ''}>
        <Select
          className={withFeedbackLabel ? getFieldCSSClasses(touched, errors) : 'form-control'}
          {...field}
          {...props}>
          <Option hidden value={intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'})}>
            {intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'}, {label: intl.formatMessage({id: placeholder})})}
          </Option>
          {children ?
            children.map((opt: any, key: number) => {
              return (
                <Option key={key} data-code={opt.key} value={opt}>{opt}</Option>
              )
            })
            :
            (<></>)
          }
        </Select>

          {withFeedbackLabel && (
            <FieldFeedbackLabel
              error={getError(errors, field.name)}
              touched={getTouched(touched, field.name)}
              label={label}
              type={type}
              customFeedbackLabel={customFeedbackLabel}
            />
          )}
        </div>
      </div>
    </>
  );
}