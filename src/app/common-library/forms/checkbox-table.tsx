import React from 'react';
import { isEqual } from 'lodash';
import BootstrapTable, { RowSelectionType } from 'react-bootstrap-table-next';
import { SelectionCheckbox } from '../common-components/table-row-selection-helpers';
import { MasterBodyColumns, PaginationProps } from '../common-types/common-type';
import { NoRecordsFoundMessage, PleaseWaitMessage } from '../helpers/pagination-helper';
import {useFormikContext} from "formik";

const dataTest = [
  {
    _id: '1',
    value: 'Tên doanh nghiệp',
  },
  {
    _id: '2',
    value: 'Tên doanh nghiệp',
  },
  {
    _id: '3',
    value: 'Tên doanh nghiệp',
  },
  {
    _id: '4',
    value: 'Tên doanh nghiệp',
  },
  {
    _id: '5',
    value: 'Tên doanh nghiệp',
  },
  {
    _id: '6',
    value: 'Tên doanh nghiệp',
  },
  {
    _id: '7',
    value: 'Tên doanh nghiệp',
  },
  {
    _id: '8',
    value: 'Tên doanh nghiệp',
  },
];

const columnsTest = {
  value: {
    dataField: 'value',
    text: `Doanh nghiệp sản xuất`,
    classes: 'text-center',
  },
};

interface CheckboxTableProp<T> {
	name: string;
  data: T[];
  columns: MasterBodyColumns;
  total: number;
  loading: boolean;
  paginationParams?: PaginationProps;
  setPaginationParams?: (data: PaginationProps) => void;
  selectedEntities: T[];
  onSelectMany: (entities: T[]) => void;
  selectColumnPosition?: 'left' | 'right';
}

function CheckboxTable<T>({
  data,
  columns,
  total,
  loading,
  paginationParams,
  setPaginationParams,
  onSelectMany,
  selectedEntities,
	selectColumnPosition = 'left',
	name
}: CheckboxTableProp<T>) {

	const {setFieldValue, errors, touched} = useFormikContext<any>();

  function GetSelectRow<T>({
    entities,
    selectedEntities,
		onSelectMany,
		setFieldValue,
		name
  }: {
    entities: T[];
    selectedEntities: T[];
		onSelectMany: (entities: T[]) => void;
		setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
		name: string;
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
								setFieldValue(name, entities)
              } else {
								onSelectMany([]);
								setFieldValue(name, [])
              }
            }}
          />
        );
      },
      selectionRenderer: ({ rowIndex }: { rowIndex: number }) => {
        const isSelected =
          selectedEntities && selectedEntities.some(entity => isEqual(entity, entities[rowIndex]));
        return (
          <SelectionCheckbox
            isSelected={isSelected}
            onChange={() => {
              if (isSelected) {
                onSelectMany(
                  selectedEntities.filter(entity => !isEqual(entity, entities[rowIndex])),
								);
								setFieldValue(name, selectedEntities.filter(entity => !isEqual(entity, entities[rowIndex])))
              } else {
								onSelectMany([...selectedEntities, entities[rowIndex]]);
								setFieldValue(name, [...selectedEntities, entities[rowIndex]])
              }
            }}
          />
        );
      },
    };
  }

  const selectRow = {
    ...GetSelectRow({
      entities: data,
      selectedEntities: selectedEntities,
			onSelectMany: onSelectMany,
			setFieldValue: setFieldValue,
			name: name
    }),
    selectColumnPosition: selectColumnPosition,
  };

  console.log(data);

  return (
    <div>
      {/* <MasterTable
        entities={data}
        columns={columns}
        total={total}
        loading={loading}
        paginationParams={paginationParams}
        setPaginationParams={setPaginationParams}
        onSelectMany={onSelectMany}
        selectedEntities={selectedEntities}
        removeSelectRow
      /> */}
      <BootstrapTable
        wrapperClasses="table-responsive"
        bordered={false}
        classes="table table-head-custom table-vertical-center overflow-hidden noBorderOnClick"
        bootstrap4
        remote
        keyField="_id"
        data={data}
        columns={Object.values(columns)}
        selectRow={selectRow}>
        <PleaseWaitMessage entities={dataTest} />
        <NoRecordsFoundMessage entities={dataTest} />
      </BootstrapTable>
    </div>
  );
}

export default CheckboxTable;
