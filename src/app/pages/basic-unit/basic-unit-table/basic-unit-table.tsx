import React from 'react';
import {useIntl} from 'react-intl';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {PaginationProvider} from 'react-bootstrap-table2-paginator';
import {NoRecordsFoundMessage, PleaseWaitMessage,} from '../../../common-library/helpers/pagination-helper';
import {HeaderSortingClasses, SortCaret} from '../../../common-library/helpers/table-sorting-helpers';
import {Pagination} from '../../../../_metronic/_partials/controls';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import {ActionsColumnFormatter} from './column-formatters/actions-column-formatter';
import {defaultSorted, sizePerPageList} from '../basic-unit-ui-helpers';
import './basic-unit-table.scss';
import {GetSelectBasicUnitRow} from '../../../common-library/common-components/table-row-selection-helpers';
import {BasicUnitDataProps} from '../_interface/basic-unit.interface';

function BasicUnitTable({
                          show,
                          showModal,
                          hideModal,
                          basicUnitArray,
                          total,
                          loading,
                          queryParams,
                          setQueryParamsBase,
                          ids,
                          setIds,
                          setQueryParams,
                        }: BasicUnitDataProps) {
  const intl = useIntl();
  
  const columns = [
    {
      dataField: 'ordinal',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + (queryParams.page - 1) * queryParams.limit}</p>
      ),
      style: {paddingTop: 20},
    },
    {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.CODE'})}`,
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
    },
    {
      dataField: 'name',
      text: `${intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.NAME'})}`,
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
    },
    {
      dataField: 'status',
      text: `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${intl.formatMessage({
        id: 'BASIC_UNIT.CARD.TABLE.STATUS',
      })}`,
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
      headerClasses: 'text-center',
      classes: 'text-center pr-0',
      formatter: (cell: any, row: any) =>
        row.status === 1 ? (
          <CheckCircleIcon style={{color: '#1DBE2D'}}/>
        ) : (
          <IndeterminateCheckBoxIcon/>
        ),
    },
    {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.ACTION'})}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditDialog: showModal,
        openDeleteDialog: showModal,
        openDetailDialog: showModal,
        show: show,
        detailTitle: `${intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.ACTION.DETAIL.TITLE'})}`,
        editTitle: `${intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.ACTION.EDIT.TITLE'})}`,
        deleteTitle: `${intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.ACTION.DELETE.TITLE'})}`,
      },
      classes: 'text-center pr-0',
      headerClasses: 'text-center',
      style: {
        minWidth: '130px',
      },
    },
  ];
  
  const paginationOptions = {
    basicUnit: true,
    totalSize: total,
    tableName: 'đơn vị cơ bản',
    sizePerPageList: sizePerPageList,
    sizePerPage: queryParams.limit,
    page: queryParams.pageNumber,
  };
  
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({paginationProps, paginationTableProps}) => {
          return (
            <Pagination isLoading={loading} paginationProps={paginationProps}>
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden noBorderOnClick"
                bootstrap4
                remote
                {...paginationTableProps}
                keyField="code"
                data={basicUnitArray}
                columns={columns}
                defaultSorted={defaultSorted as any}
                selectRow={
                  GetSelectBasicUnitRow({
                    basicUnitArray,
                    ids: ids,
                    setIds: setIds,
                  }) as any
                }
                {...paginationProps}>
                <PleaseWaitMessage entities={basicUnitArray}/>
                <NoRecordsFoundMessage entities={basicUnitArray}/>
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}

export default BasicUnitTable;
