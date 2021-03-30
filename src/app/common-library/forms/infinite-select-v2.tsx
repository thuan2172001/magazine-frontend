import React, { useEffect } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useField, useFormikContext } from 'formik';
import { DefaultPagination } from '../common-consts/const';


const getError = (error: any, fieldName: string) => {
  if (fieldName.indexOf('.') === -1) {
    return error[fieldName]
  }
  
  const arrName = fieldName.split('.')
  
  if (arrName.length === 3) {
    return error[arrName[0]] && error[arrName[1]] ? error[arrName[0]][arrName[1]][arrName[2]] : ''
  }
  
  return error[arrName[0]] ? error[arrName[0]][arrName[1]] : ''
}

const getTouched = (touched: any, fieldName: string) => {
  if (fieldName.indexOf('.') === -1) {
    return touched[fieldName]
  }
  
  const arrName = fieldName.split('.')
  
  if (arrName.length === 3) {
    return touched[arrName[0]] && touched[arrName[1]] ? touched[arrName[0]][arrName[1]][arrName[2]] : ''
  }
  
  return touched[arrName[0]] ? touched[arrName[0]][arrName[1]] : ''
}

export function InfiniteSelectV2({
  label,
  value,
  onChange,
  placeholder,
  loadOptions,
  name,
  additional,
  refs,
  isHorizontal,
  isDisabled,
  service,
  keyField,
  display,
  dataField,
  ...props
}: any) {
  const { setFieldValue, errors, touched } = useFormikContext<any>();
  const [values, setValue] = React.useState(null);

  const loadOption = async (
    search: string,
    prevOptions: any,
    { page }: any,
    service: any,
    keyField: string,
    key: string,
    displayField?: string,
  ) => {

    const queryProps: any = {};
    queryProps[keyField] = dataField ? dataField._id : search;

    const paginationProps = {
      ...DefaultPagination,
      page: page,
    };

    const entities = await service.GetAll({ queryProps, paginationProps });
    // const count = onCount ? await onCount({ queryProps }) : await service.Count({ queryProps });
    const count = entities.data.paging.total;
    const hasMore = prevOptions.length < count - (DefaultPagination.limit ?? 0);

    const data = [...new Set(entities.data.data)];

    return {
      options: data.map((e: any) => {
        return displayField ? { label: e[displayField], value: e._id } : { label: e[keyField], value: e._id };
      }),
      hasMore: hasMore,
      additional: {
        page: page + 1,
      },
    };
  };

  return (
    <>
      <div className={isHorizontal ? 'row' : ''}>
        <div className={isHorizontal ? 'col-4' : ''}>
          <label>{label}</label>
        </div>
        <div className={isHorizontal ? `col-7` : ''}>
          <AsyncPaginate
            value={value}
            isDisabled={isDisabled}
            loadOptions={(search: string, prevOptions: any, { page }: any) =>
             loadOption(
                search,
                prevOptions,
                { page },
                service,
                keyField,
                name,
                display
              )
            }
            onChange={val => {
              setValue(val);
              onChange(val);
              setFieldValue(name, refs ? val.value : val.label);
            }}
            placeholder={placeholder}
            name={name}
            additional={additional}
            isSearchable={false}
            className={`${getError(errors, name) ? 'border border-danger rounded' : ''}`}
          />
          {getError(errors, name) && getTouched(touched, name) ? (
            <div className="invalid-datepicker-feedback text-danger" style={{ fontSize: '0.9rem' }}>
              Vui lòng chọn
              {
                // errors[field.name]?.toString()
                label
              }
            </div>
          ) : (
            <div className="feedback">
              {/* Please enter <b>{props.label}</b> in 'mm/dd/yyyy' format */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// export default InfiniteSelect;
