import React from 'react';
import './custom.css';
import { FieldFeedbackLabel } from './field-feedback-label';
// import Email from 'react-email-autocomplete';

const getFieldCSSClasses = (touched: any, errors: any) => {
  const classes = ['form-control'];

  if (touched && errors) classes.push('is-invalid');

  if (touched && !errors) classes.push('is-valid');

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

interface MainInputState {
  field: any; // { name, value, onChange, onBlur }
  form: { touched: any; errors: any }; // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label: string | any;
  withFeedbackLabel: any;
  withValidation: any;
  customFeedbackLabel: any;
  isHorizontal: any;
  labelWidth: any;
  width: any;
  type: any;
}

export function EmailInput({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel,
  withValidation,
  customFeedbackLabel,
  isHorizontal,
  labelWidth,
  width,
  type = 'text',
  ...props
}: MainInputState) {
  const styleLabe = {
    width: width,
  };

  const styleInput = {
    marginRight: 0,
  };

  // console.log(errors)
  // console.log(touched)

  return (
    <>
      <div className={isHorizontal && 'row'}>
        <div className={isHorizontal && getClassName(labelWidth, true)}>
          {label && (
            <label style={width && styleLabe} className={isHorizontal && 'mb-0 input-label mt-2'}>
              {label} {withFeedbackLabel && <span className="text-danger">*</span>}
            </label>
          )}
        </div>

        <div className={isHorizontal && getClassName(labelWidth, false)}>
          {/* <Email 
            // onBlur={handleBlur}
            name="email"
            // value={values.email}
            // onChange={handleChange}
            {...field}
            {...props}
          /> */}
          <input
            type={type}
            style={width && styleInput}
            className={
              ['text', 'email', 'file', 'image', 'number'].includes(type)
                ? withFeedbackLabel
                  ? getFieldCSSClasses(getTouched(touched, field.name), getError(errors, field.name))
                  : 'form-control'
                : ''
            }
            min={type === 'number' ? 0 : undefined}
            {...field}
            {...props}
          />

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