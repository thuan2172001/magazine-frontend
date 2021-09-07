import {SortOrder} from 'react-bootstrap-table-next';

export const defaultSorted: { dataField: any; order: SortOrder }[] = [
  {
    dataField: 'id',
    order: 'asc',
  },
];
export const sizePerPageList = [
  {
    text: '5',
    value: 5,
  },
  {
    text: '10',
    value: 10,
  },
  {
    text: '15',
    value: 15,
  },
];
export const initialFilter = {
  data: {},
  sortOrder: 'asc', // asc||desc
  sortField: 'name',
  pageNumber: 1,
  limit: 5,
};
