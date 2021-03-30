import { SortOrder } from 'react-bootstrap-table-next';
import { PaginationProps } from '../common-types/common-type';
import { HeaderSortingClasses, SortCaret } from '../helpers/table-sorting-helpers';

export type OrderType = '1' | '-1';

export const SortDefault: { dataField: any; order: string }[] = [
  { dataField: '', order: 'desc' },
];
export const SizePerPageList = [
  { text: '5', value: 5 },
  { text: '10', value: 10 },
  { text: '15', value: 15 },
];
export const DefaultPagination: PaginationProps = {
  sortBy: SortDefault[0].dataField,
  sortType: SortDefault[0].order,
  page: 1,
  limit: 5,
};
export const iconStyle = {
  fontSize: 15, transform: 'translateY(-1px)',marginRight: 4
};

export const SortColumn = {
  sort: true,
  sortCaret: SortCaret,
  headerSortingClasses: HeaderSortingClasses,
  headerClasses: 'text-center',
  classes: 'text-center',
};

export const NormalColumn = {
  headerClasses: 'text-center',
  classes: 'text-center pr-0',
};

export const StatusValue = 1;

export const HomePageURL = {
  home: '/dashboard',
  user: '/account/user',
  post: '/post',
  role: '/account/role',
  academicYear: '/setting/academic-year',
  category: '/setting/category',
  faculty: '/setting/faculty',
  managementUnit: '/account/organization',
  customers: '/customers-management',
  landLot: '/land-lot',
  species: '/species',
  packaging: '/packaging',
  multilevelSale: '/multilevel-sale',
  agency: '/agency',
  shippingAgency: '/shipping-agency',
  productionPlan: '/production-plan',
  productionManagement: '/production-management',
  qrCode: '/qr'
}
