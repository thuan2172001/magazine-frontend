import {MenuItemModel} from './layout/components/aside/aside-menu/menu-item-model';
import {ToAbsoluteUrl} from './common-library/helpers/assets-helpers';
import SVG from 'react-inlinesvg';
import React, {lazy} from 'react';

const HomePage = lazy(() => import('./pages/_homepage'))

const UserPage = lazy(() => import('./pages/user/user'));

const AnalystPage = lazy(() => import('./pages/analyst/analyst'))

const ProductPage = lazy(() => import('./pages/product'));

const AgencyPage = lazy(() => import('./pages/agency/agency'));

const AgencyTypePage = lazy(() => import('./pages/agency-type-2/agency-type'));

// const CategoryPage = lazy(() => import('./pages/category/category-page'));
const BasicUnitPage = lazy(() => import('./pages/basic-unit/basic-unit'));

const PurchaseOrderPage = lazy(() => import('./pages/purchase-order/purchase-order'));

const LandLotPage = lazy(() => import('./pages/land-lot/land-lot'));

const StudentPage = lazy(() => import('./pages/student/student'));

const FacultyPage = lazy(() => import('./pages/faculty/faculty'));

const AcademicYearPage = lazy(() => import('./pages/academic-year/academic-year'));

const CategoryPage = lazy(() => import('./pages/category/category'));

const PostPage = lazy(() => import('./pages/post/post'));

const SchoolPage = lazy(() => import('./pages/school/school'));

const ProductType = lazy(() => import('./pages/species/species'));

const ProductPackaging = lazy(() => import('./pages/product-packaging/product-packaging'));

const MultilevelSale = lazy(() => import('./pages/multilevel-sale/multilevel-sale'));

const ShippingAgency = lazy(() => import('./pages/shipping-agency/shipping-agency'));


const ProductionManagement = lazy(() => import('./pages/production-management/production-management'))
const QrManagement = lazy(() => import('./pages/qr-management/qr'))
const RolePage = lazy(() => import('./pages/role/role'))

const ManagementOrganization = lazy(() => import('./pages/management-organization/management-organization'))

const CustomersManagement = lazy(() => import('./pages/customers/customers-management'))

export const MainRoutes: MenuItemModel[] = [
  {parent: true, title: 'MENU.DASHBOARD', url: '/dashboard', component: HomePage},
  {parent: true, title: 'MENU.POST', url: '/post', component: PostPage},
  {
    // section: true,
    parent: true,
    title: 'MENU.USER',
    guard: (authInfo) => ['admin'].includes(authInfo.role.role),
    url: '/account',
    icon: 'distributor-1.svg',
    children: [
      {
        title: 'MENU.USER.ROLE',
        url: 'role',
        icon: 'role.svg',
        component:RolePage
      },
      {
        title: 'MENU.USER.ACCOUNT',
        url: 'user',
        icon: (
          <SVG src={ToAbsoluteUrl('/media/svg/vncheck/account.svg')} style={{width: '17px'}}/>
        ),
        component:UserPage
      },
    ],
  },
  {parent: true, title: 'MENU.ANALYST', url: '/analyst', component:AnalystPage,
    guard: (authInfo) => ['manager', 'admin'].includes(authInfo.role.role),
  },
  {
    // section: true,
    parent: true,
    title: 'MENU.SETTING',
    url: '/setting',
    icon: 'distributor-1.svg',
    guard: (authInfo) => ['admin'].includes(authInfo.role.role),
    children: [
      {
        title: 'MENU.SETTING.NEW_CAMPAIGN',
        url: 'academic-year',
        // icon: <ImageOutlinedIcon style={{ width: '17px' }} htmlColor="#888C9F" />,
        icon: 'land-lot.svg',
        component: AcademicYearPage
      },
      {
        title: 'MENU.SETTING.CATEGORY',
        url: 'category',
        icon: 'species-categories.svg',
        component: CategoryPage
      },
      {
        title: 'MENU.SETTING.FACULTY',
        url: 'faculty',
        icon: 'distribution.svg',
        component: FacultyPage
      },
    ],
  },
  // {parent: true, title: 'MENU.PRODUCT_PLANT', url: '/production-plan'},
  // {parent: true, title: 'MENU.PRODUCT_MANAGEMENT', url: '/production-management'},
  // {parent: true, title: 'MENU.QRCODE', url: '/qr',},
];
