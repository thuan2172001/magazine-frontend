import {DefaultPagination} from '../common-consts/const';
import {Field, useFormikContext} from 'formik';
import {MainInput} from '../forms/main-input';
import {DatePickerField} from '../forms/date-picker-field';
import CustomImageUpload from '../forms/custom-image-upload';
import {SwitchField} from '../forms/switch-field';
import {InfiniteSelect} from '../forms/infinite-select';
import TagInput from '../forms/tag-input';
import React, {ReactElement, useCallback} from 'react';
import {RadioField} from '../forms/radio-field';
import CustomTreeSelect from "../forms/tree-select";
import CheckBoxField from '../forms/input-checkbox';
import { SelectField } from '../forms/select-field';
import {UploadFile} from "../forms/upload-file";

const DefaultPlaceholder = {
  string: 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
  number: 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
  'search-select': 'COMMON_COMPONENT.INFINITE_SELECT.PLACEHOLDER',
  'tree-select': 'COMMON_COMPONENT.INFINITE_SELECT.PLACEHOLDER',
  tag: 'COMMON_COMPONENT.INFINITE_SELECT.PLACEHOLDER',
  'date-time': 'COMMON_COMPONENT.INFINITE_SELECT.PLACEHOLDER',
  boolean: 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
  image: 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
  'radio-group': 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
};

export type InputStringType = {
  name: string;
  className?: string;
  label: string | ReactElement;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  
  mode?: 'horizontal' | 'vertical';
  placeholder?: string;
  [X: string]: any;
};

export type InputRadioType = {
  name: string;
  className?: string;
  label: string | ReactElement;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  value: object | ((value: any) => any);
  mode?: 'horizontal' | 'vertical';
  placeholder?: string;
  options: { value: any; label: string | ((...props: any) => ReactElement) }[] | ((...props: any) => { value: any; label: string }[]);
  [X: string]: any;
};
export type InputNumberType = {
  name: string;
  className?: string;
  label: string | ReactElement;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  mode?: 'horizontal' | 'vertical';
  placeholder?: string;
  [X: string]: any;
};
export type InputDateTimeType = {
  name: string;
  label: string | ReactElement;
  className?: string;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  mode?: 'horizontal' | 'vertical';
  placeholder?: string;
  [X: string]: any;
};
export type InputBooleanType = {
  name: string;
  label: string | ReactElement;
  className?: string;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  mode?: 'horizontal' | 'vertical';
  placeholder?: string;
  [X: string]: any;
};
export type InputSearchSelectType = {
  name: string;
  label: string | ReactElement;
  onSearch: (searchQueryObject: any, values?: any) => any;
  keyField?: string;
  selectField?: string;
  onDisplayOptions?: (props: any) => ReactElement;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  mode?: 'horizontal' | 'vertical';
  placeholder?: string;
  [X: string]: any;
};
export type InputTreeSelectType = {
  name: string;
  data?: any;
  label: string | ReactElement;
  onSearch: (searchQueryObject: any) => any;
  keyField?: string;
  selectField?: string;
  onDisplayOptions?: (props: any) => ReactElement;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  mode?: 'horizontal' | 'vertical';
  placeholder?: string;
  [X: string]: any;
};
export type InputTagType = {
  name: string;
  label: string | ReactElement;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  mode?: 'horizontal' | 'vertical';
  placeholder?: string;
  [X: string]: any;
};
export type InputImageType = {
  name: string;
  value?: any;
  label: string | ReactElement;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  pathField?: string;
  mode?: 'horizontal' | 'vertical';
  [X: string]: any;
};

export type InputFileType = {
    name: string;
    value?: any;
    label: string | ReactElement;
    required?: boolean | ((values: any) => boolean);
    disabled?: boolean | ((values: any) => boolean);
    mode?: 'horizontal' | 'vertical';
    [X: string]: any;
};

export type InputCheckBoxType = {
  name: string;
  value: any;
  label: string | ReactElement;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  mode?: 'horizontal' | 'vertical';
  [X: string]: any;
};

export type InputSelectType = {
  name: string;
}

export const InputNumber = ({label, required, placeholder, className, ...props}: InputNumberType) => {
  const validate = useCallback((value: any): string | void => {
    if (required && !value) return 'INPUT.ERROR.REQUIRED';
  }, [required]);
  return (
    <div className={className}>
      <Field
        validate={validate}
        {...props}
        component={MainInput}
        placeholder={placeholder ?? DefaultPlaceholder.number}
        label={label}
        type="number"
        required={required}
      />
    </div>
  );
};
export const InputStringNumber = ({label, required, placeholder, className, ...props}: InputNumberType) => {
  const validate = useCallback((value: any): string | void => {
    if (required && !value) return 'INPUT.ERROR.REQUIRED';
  }, [required]);
  return (
    <div className={className}>
      <Field
        validate={validate}
        {...props}
        component={MainInput}
        placeholder={placeholder ?? DefaultPlaceholder.number}
        label={label}
        type="string-number"
        required={required}
      />
    </div>
  );
};

export const InputString = ({label, required, placeholder, className, ...props}: InputStringType) => {
  const validate = useCallback((value: any): string | void => {
    if (required && !value) return 'INPUT.ERROR.REQUIRED';
    if (props.type === 'email') {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'INPUT.ERROR.INVALID_EMAIL';
      }
    }
  }, [required]);
  return (
    <div className={className}>
      <Field
        validate={validate}
        {...props}
        component={MainInput}
        placeholder={placeholder ?? DefaultPlaceholder.string}
        label={label}
        required={required}
      />
    </div>
  );
};

export const InputRadio = ({label, placeholder, className, ...props}: InputRadioType) => {
  return (
    <div className={className}>
      <RadioField
        {...props}
        label={label}
      />
    </div>
  );
};

export const InputDateTime = ({label, placeholder, className, ...props}: InputDateTimeType) => {
  return (
    <div className={className}>
      <DatePickerField
        {...props}
        placeholder={placeholder ?? DefaultPlaceholder['date-time']}
        label={label}
      />
    </div>
  );
};

export const InputBoolean = ({label, placeholder, className, ...props}: InputBooleanType) => {
  return (
    <div className={className}>
      <SwitchField
        {...props}
        label={label}
      />
    </div>
  );
};
export const InputImage = ({label, className, value, ...props}: InputImageType) => {
  return (
    <div className={className}>
      <CustomImageUpload
        value={value}
        {...props}
        label={label}
      />
    </div>
  );
};

export const InputFile = ({label, className, value, ...props}: InputFileType) => {
    return (
        <div className={className}>
            <UploadFile
                value={value}
                {...props}
                label={label}
            />
        </div>
    );
};
export const InputTag = ({
                           label,
                           placeholder,
                           className,
                           data,
                           tagData,
                           ...props
                         }: InputTagType) => {
  return (
    <div className={className}>
      <TagInput
        {...props}
        placeholder={placeholder ?? DefaultPlaceholder.tag}
        label={label}
        // handleChange={handleChangeTag}
        data={data || []}
        tagData={tagData || []}
      />
    </div>
  );
};

export const InputSearchSelect = ({
                                    name,
                                    label,
                                    placeholder,
                                    onSearch,
                                    keyField,
                                    onDisplayOptions,
                                    className,
                                    selectField,
                                    ...props
                                  }: InputSearchSelectType) => {
  const {values,} = useFormikContext<any>();
  const loadOptions = useCallback(
    async (search: string, prevOptions: any, {page}: any) => {
      const queryProps: any = {};
      if (keyField) {
        queryProps[keyField] = search;
      } else {
        const names = name.split('.');
        queryProps[names[names.length - 1]] = search;
      }
      const paginationProps = {
        ...DefaultPagination,
        sortBy: keyField,
        page,
      };
      const entities = await onSearch({queryProps, paginationProps}, values);
      const count = entities.data.paging.total;
      const data = [...new Set(entities.data.data)];
      const hasMore = prevOptions.length + data.length < count;
      return {
        options: data,
        hasMore: hasMore,
        additional: {
          page: page + 1,
        },
      };
    },
    [onSearch, values],
  );
  return (
    <div className={className}>
      <InfiniteSelect
        {...props}
        name={name}
        keyField={keyField}
        selectField={selectField}
        placeholder={placeholder ?? DefaultPlaceholder['search-select']}
        label={label}
        loadOptions={loadOptions}
        additional={{
          page: DefaultPagination.page,
        }}
      />
    </div>
  );
};

export const InputTreeSelect = ({
                                  label,
                                  placeholder,
                                  className,
                                  onSearch,
                                  ...props
                                }: InputTreeSelectType) => {
  return (
    <div className={className}>
      <CustomTreeSelect
        {...props}
        placeholder={placeholder ?? DefaultPlaceholder['tree-select']}
        label={label}
        onSearch={onSearch}
      />
    </div>
  );
};

export const InputCheckBox = ({
                                label,
                                optionData,
                                ...props
                              }: InputCheckBoxType) => {
  return (
    <CheckBoxField
      {...props}
      optionData={optionData}
      label={label}
    />
  );
};

export const InputSelect = ({
  ...props
}: InputSelectType) => {
  return (
    <SelectField
      {...props}
      label='hihi'
      placeholder='ROLE.EDIT.MANAGEMENT_ORGANIZATION.PLACEHOLDER'
      withFeedbackLabel={true}
      customFeedbackLabel=''
      isHorizontal={true}
      labelWidth={4}
      width={200}
      children={['a', '1', '3']}
      type='select'
    />
  );
}
