import React from 'react';
import BootstrapTable, {RowSelectionType} from 'react-bootstrap-table-next';
import paginationFactory, {PaginationProvider} from 'react-bootstrap-table2-paginator';
import {NoRecordsFoundMessage, onTableChange, PleaseWaitMessage,} from '../helpers/pagination-helper';
import './master-table.scss';
import {SizePerPageList, SortDefault} from '../common-consts/const';
import {SelectionCheckbox} from './table-row-selection-helpers';
import {MasterBodyColumns, PaginationProps} from '../common-types/common-type';
import {Pagination} from '../pagination/pagination';
import isEqual from 'react-fast-compare';

export function GetSelectRow<T>({
                                  entities,
                                  selectedEntities,
                                  onSelectMany,
                                }: {
  entities: T[];
  selectedEntities: T[];
  onSelectMany: (entities: T[]) => void;
}) {
  return {
    
    mode: 'checkbox' as RowSelectionType,
    clickToSelect: true,
    hideSelectAll: false,
    
    selectionHeaderRenderer: () => {
      const isSelected =
        selectedEntities &&
        selectedEntities.length > 0 &&
        selectedEntities.length === entities.length;
      
      return (
        <SelectionCheckbox
          isFirstRow={true}
          isSelected={isSelected}
          onChange={() => {
            if (!isSelected) {
              onSelectMany(entities);
            } else {
              onSelectMany([]);
            }
          }}
        />
      );
    },
    selectionRenderer: ({rowIndex}: { rowIndex: number }) => {
      const isSelected =
        selectedEntities && selectedEntities.some(entity => isEqual(entity, entities[rowIndex]));
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => {
            if (isSelected) {
              onSelectMany(selectedEntities.filter(entity => !isEqual(entity, entities[rowIndex])));
            } else {
              onSelectMany([...selectedEntities, entities[rowIndex]]);
            }
          }}
        />
      );
    },
  };
}

export function MasterTable<T>({
                                 entities,
                                 selectedEntities,
                                 total,
                                 loading = false,
                                 paginationParams,
                                 setPaginationParams,
                                 onSelectMany,
                                 columns,
                                 disablePagination,
                                 selectColumnPosition = "left"
                               }: {
  total?: number;
  loading?: boolean;
  onSelectMany?: (entities: T[]) => void;
  selectedEntities?: T[];
  columns: MasterBodyColumns;
  disablePagination?: boolean,
  entities: T[];
  paginationParams: PaginationProps;
  setPaginationParams: (data: PaginationProps) => void;
  selectColumnPosition?: 'left' | 'right'
  // [T: string]: any;
}) {
  const paginationOptions = {
    totalSize: total,
    sizePerPageList: SizePerPageList,
    sizePerPage: paginationParams.limit,
    page: paginationParams.page,
    onSizePerPageChange: (page: number, sizePerPage: number) => {
      setPaginationParams({...paginationParams, page: 1, limit: sizePerPage});
      onSelectMany && onSelectMany([])
    },
    onPageChange: (page: number) => {
      setPaginationParams({...paginationParams, page});
      onSelectMany && onSelectMany([])
    },
  };
  return (
    <PaginationProvider pagination={paginationFactory(paginationOptions)}>
      {({paginationProps, paginationTableProps}) => {
        return (
          <Pagination disabled={disablePagination} isLoading={loading} paginationProps={paginationProps}>
            <BootstrapTable
              wrapperClasses="table-responsive"
              bordered={false}
              classes="table table-head-custom table-vertical-center overflow-hidden noBorderOnClick"
              bootstrap4
              remote
              {...paginationTableProps}
              keyField="_id"
              data={entities}
              columns={Object.values(columns)}
              defaultSorted={SortDefault as any}
              selectRow={(!onSelectMany || !selectedEntities) ? undefined : {
                ...GetSelectRow({
                  entities: entities,
                  selectedEntities: selectedEntities,
                  onSelectMany: onSelectMany,
                }), selectColumnPosition: selectColumnPosition
              }}
              onTableChange={onTableChange(setPaginationParams, paginationParams)}>
              <PleaseWaitMessage entities={entities}/>
              <NoRecordsFoundMessage entities={entities}/>
            </BootstrapTable>
          </Pagination>
        );
      }}
    </PaginationProvider>
  );
}
