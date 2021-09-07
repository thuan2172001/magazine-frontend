/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { PaginationTotalStandalone } from 'react-bootstrap-table2-paginator';

function PagiTotal(props) {
  // const [state, setState] = useState({
  //   from: 1,
  //   to: 5,
  // });

  // useEffect(() => {
  //   const start = state.from + (props.page - 1) * props.sizePerPage;
  //   const end = state.from + props.sizePerPage - 1;

  //   setState({from: start, to: end});
  // }, [props.page, props.sizePerPage]);

  return (
    <span className="text-muted">
      {props.tableName}/trang trong tổng số {props.totalSize}
    </span>
  );
}

export function PaginationToolbar(props) {
  const { isLoading, paginationProps } = props;
  const {
    sizePerPageList,
    sizePerPage,
    totalSize,
    onSizePerPageChange = [
      { text: '3', value: 3 },
      { text: '5', value: 5 },
      { text: '10', value: 10 },
    ],
  } = paginationProps;
  const style = {
    width: '75px',
  };

  const onSizeChange = event => {
    const newSize = +event.target.value;
    onSizePerPageChange(newSize);
  };

  return (
    <div className="d-flex align-items-center py-3">
      {isLoading && (
        <div className="d-flex align-items-center">
          <div className="mr-2 text-muted">Đang tải...</div>
          <div className="spinner spinner-primary mr-10"></div>
        </div>
      )}
      <select
        disabled={totalSize === 0}
        className={`form-control form-control-sm font-weight-bold mr-4 border-0 bg-light ${totalSize ===
          0 && 'disabled'}`}
        onChange={onSizeChange}
        value={sizePerPage}
        style={style}>
        {sizePerPageList.map(option => {
          const isSelect = sizePerPage === `${option.page}`;
          return (
            <option
              key={option.text}
              value={option.page}
              className={`btn ${isSelect ? 'active' : ''}`}>
              {option.text}
            </option>
          );
        })}
      </select>
      {/* <PaginationTotalStandalone className="text-muted" {...paginationProps} /> */}
      <PagiTotal className="text-muted" {...paginationProps} />
    </div>
  );
}
