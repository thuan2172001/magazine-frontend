import React, {Fragment, ReactElement, useMemo} from 'react';
import { Card, CardBody, CardHeader } from '../card';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AddIcon from '@material-ui/icons/Add';
import { useIntl } from 'react-intl';
import { iconStyle } from '../common-consts/const';
import { MasterTable } from './master-table';
import { MasterBodyColumns, PaginationProps } from '../common-types/common-type';
import _ from 'lodash';

export interface BasicUnitDataProps {
  showModal: any;
  hideModal: any;
  show: any;
  list: any[];
  total: number;
  loading: boolean;
  queryParams: any;
  setQueryParamsBase: any;
  ids: any[];
  setIds: any;
  setQueryParams: any;
}

export function MasterBody<T>({
  entities,
  total,
  loading,
  paginationParams,
  setPaginationParams,
  onSelectMany,
  onCreate,
  selectedEntities = [],
  columns,
  onDeleteMany,
  isShowId,
  title,
  hideHeaderButton,
    additionalActionComponent
}: {
  total: number;
  loading: boolean;
  onSelectMany?: (entities: T[]) => void;
  onCreate?: () => void;
  columns: MasterBodyColumns;
  entities: T[];
  selectedEntities?: T[];
  paginationParams: PaginationProps;
  setPaginationParams: (data: PaginationProps) => void;
  additionalActionComponent?: (props: any) => ReactElement;
  onDeleteMany?: () => void;
  isShowId?: boolean;
  title?: string;
  hideHeaderButton?: boolean;
}) {
  const intl = useIntl();
  const AdditionalActionComponent = additionalActionComponent;
  const idColumn = useMemo(() => ({
    dataField: '_id',
    text: 'STT',
    formatter: (cell: any, row: any, rowIndex: number) => (
      <Fragment>
        {rowIndex + 1 + ((paginationParams.page ?? 0) - 1) * (paginationParams.limit ?? 0)}
      </Fragment>
    ),
    headerClasses: 'text-center',
    align: 'center'
  }), [paginationParams]);
  const masterColumn = isShowId
    ? _.isArray(columns)
          ? [idColumn, ...columns]
          : { _id: idColumn, ...columns }
    : columns;

  return (
    <Card className={'master-body-card'}>
      {title && <CardHeader title={intl.formatMessage({ id: title }).toUpperCase()} />}
      <CardBody>
        {hideHeaderButton !== true && (
          <div className="row no-gutters mb-10">
            {onCreate && (
            <button
              type="button"
              className="btn btn-primary fixed-btn-width mr-8"
              onClick={onCreate}>
              <AddIcon style={iconStyle} />
              {intl.formatMessage({ id: 'COMMON_COMPONENT.MASTER_BODY.HEADER.ADD_BTN' })}
            </button>
            )}
            {onDeleteMany && (
              <button
                type="button"
                className="btn btn-outline-primary fixed-btn-width"
                onClick={() => {
                  onSelectMany && onSelectMany(selectedEntities);
                  onDeleteMany();
                }}>
                <DeleteOutlineOutlinedIcon style={iconStyle} />
                {intl.formatMessage({ id: 'COMMON_COMPONENT.MASTER_BODY.HEADER.DELETE_BTN' })}
              </button>
            )}
            {AdditionalActionComponent && (<AdditionalActionComponent />)}
          </div>
        )}
        <MasterTable
          entities={entities}
          columns={masterColumn}
          total={total}
          loading={loading}
          paginationParams={paginationParams}
          setPaginationParams={setPaginationParams}
          onSelectMany={onSelectMany}
          selectedEntities={selectedEntities}
        />

        {/* <MasterTreeStructure /> */}
      </CardBody>
    </Card>
  );
}
