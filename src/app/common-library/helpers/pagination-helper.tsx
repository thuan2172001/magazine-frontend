/* Pagination Helprs */
import React from 'react';
import { useIntl } from 'react-intl';
import { TableChangeHandler } from 'react-bootstrap-table-next';
import { PaginationProps } from '../common-types/common-type';

export const GetPagesCount = (totalSize: number, sizePerPage: number) => {
  return Math.ceil(totalSize / sizePerPage);
};

export const GetPages = (page: number | null, pagesCount: number, paginationSize: number) => {
  const result: any[] = [];

  if (!page) return result;

  if (pagesCount === 1) {
    result.push(1);

    return result;
  }

  if (pagesCount < page) return result;

  if (pagesCount < paginationSize + 1) {
    for (let i = 1; i < pagesCount + 1; i++) {
      result.push(i);
    }

    return result;
  }

  if (page === 1) {
    for (let i = 1; i < paginationSize + 1; i++) {
      if (i < pagesCount) {
        result.push(i);
      }
    }

    return result;
  }

  if (page === pagesCount) {
    for (let i = pagesCount - paginationSize + 1; i <= pagesCount; i++) {
      if (i <= pagesCount) {
        result.push(i);
      }
    }

    return result;
  }

  const shiftCount = Math.floor(paginationSize / 2);

  if (shiftCount < 1) {
    result.push(page);

    return result;
  }

  if (page < shiftCount + 2) {
    for (let i = 1; i < paginationSize + 1; i++) {
      result.push(i);
    }

    return result;
  }

  if (pagesCount - page < shiftCount + 2) {
    for (let i = pagesCount - paginationSize; i < pagesCount + 1; i++) {
      result.push(i);
    }

    return result;
  }

  for (let i = page - shiftCount; i < page; i++) {
    if (i > 0) {
      result.push(i);
    }
  }

  result.push(page);

  for (let i = page + 1; i < page + shiftCount + 1; i++) {
    if (i <= pagesCount) {
      result.push(i);
    }
  }

  return result;
};

export function onTableChange(
  setPaginationParams: (data: PaginationProps) => void,
  paginationParams: PaginationProps,
): TableChangeHandler<PaginationProps> {
  return (type, data) => {
    // console.log(type);
    console.log(data);
    if (type === 'sort') {
      setPaginationParams({
        ...paginationParams,
        page: 1,
        sortBy: data.sortField,
        sortType: data.sortOrder,
      });
    }
    // setPaginationParams(type === "sort"
    //   ? {...paginationParams}
    //   : paginationParams);
  };
}

export function PleaseWaitMessage({ entities }: any) {
  const intl = useIntl();

  return <>{entities === null && <div>{intl.formatMessage({ id: 'PAGINATION.WAIT' })}</div>}</>;
}

export function NoRecordsFoundMessage({ entities }: any) {
  const intl = useIntl();
  const customersList = entities === null ? [] : entities;

  return (
    <>
      {customersList.length === 0 && entities !== null && (
        <div>{intl.formatMessage({ id: 'PAGINATION.NO_RECORD' })}</div>
      )}
    </>
  );
}
