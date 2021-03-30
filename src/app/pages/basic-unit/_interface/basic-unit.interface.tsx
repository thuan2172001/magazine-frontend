export interface queryParamsProps {
  data: any;
  limit: number | string;
  pageNumber: number | string;
  sortOrder: string;
  sortField: string;
}

export interface DeleteMany {
  ids: string[];
  show: any;
  hideModal: any;
  unitForEdit: any;
  loading: boolean;
  deleteManyBasicUnit: any;
}

export interface BasicUnitDataProps {
  showModal: any;
  hideModal: any;
  show: any;
  basicUnitArray: any[];
  total: number;
  loading: boolean;
  queryParams: any;
  setQueryParamsBase: any;
  ids: any[];
  setIds: any;
  setQueryParams: any;
}
