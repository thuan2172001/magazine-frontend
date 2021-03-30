/* eslint-disable no-unused-vars */
import React from 'react';
import {PaginationOptions} from 'react-bootstrap-table-next';
import {useIntl} from 'react-intl';
import {Select} from 'antd';
import SelectDropDownIcon from "../forms/select-drop-down-icon";

const {Option} = Select;

export function PaginationToolbar({
                                    isLoading,
                                    paginationProps,
                                  }: {
  isLoading: boolean;
  paginationProps: PaginationOptions;
}) {
  const intl = useIntl();
  const {
    sizePerPageList = [{text: 0, value: 0}],
    sizePerPage = 10,
    onSizePerPageChange = () => null,
    totalSize = 5,
    page,
  } = paginationProps;
  const style = {
    width: '75px',
  };
  
  const onSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number.parseInt(event.target.value);
    onSizePerPageChange(page ?? -1, newSize);
  };
  
  const handleChange = (value: string) => {
    const newSize = Number.parseInt(value);
    onSizePerPageChange(page ?? -1, newSize);
  }
  
  return (
    <div className="d-flex align-items-center">
      {isLoading && (
        <div className="d-flex align-items-center">
          <div className="mr-2 text-muted">
            {intl.formatMessage({id: 'COMMON_COMPONENT.PAGINATION.LOADING'})}
          </div>
          <div className="spinner spinner-primary mr-10"/>
        </div>
      )}
      {/* <select
        disabled={totalSize === 0}
        className={`form-control form-control-sm font-weight-bold mr-4 border-0 bg-light ${totalSize ===
          0 && 'disabled'}`}
        onChange={onSizeChange}
        value={sizePerPage}
        style={style}>
        {(sizePerPageList as { text: string; value: number }[]).map(value => {
          const isSelect = sizePerPage === value.value;
          return (
            <option
              key={value.text}
              value={value.value}
              className={`btn ${isSelect ? 'active' : ''}`}>
              {value.text}
            </option>
          );
        })}
      </select> */}
      <Select
        // defaultValue="lucy" 
        // size='small'
        className={'pagination-toolbar mr-5'}
        onChange={handleChange}
        disabled={totalSize === 0}
        value={'' + sizePerPage}
        suffixIcon={<SelectDropDownIcon/>}
      >
        
        
        {(sizePerPageList as { text: string; value: number }[]).map(value => {
          const isSelect = sizePerPage === value.value;
          return (
            <Option key={value.text}
                    value={'' + value.value}>{value.text}</Option>
            // <option
            //   key={value.text}
            //   value={value.value}
            //   className={`btn ${isSelect ? 'active' : ''}`}>
            //   {value.text}
            // </option>
          );
        })}
      </Select>
      <span className="text-muted">
        {intl.formatMessage({id: 'COMMON_COMPONENT.PAGINATION.RECORD_PER_PAGE'})} {totalSize}
      </span>
    </div>
  );
}
