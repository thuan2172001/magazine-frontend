import {AxiosResponse} from 'axios';
import {ReactElement} from "react";
import {ColumnDescription} from "react-bootstrap-table-next";
import {FormikProps} from "formik/dist/types";


export interface MainInputState {
  field: any; // { name, value, onChange, onBlur }
  form: FormikProps<any>; // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label: string | any;
  withFeedbackLabel: boolean;
  withValidation: any;
  customFeedbackLabel: any;
  mode: 'horizontal' | 'vertical';
  labelWidth: number;
  width: any;
  meta: any;
  type: string;
  value: any;
  placeholder: string;
  onChange?: (value: any, props: { setFieldValue: ((name: string, value: any) => void), values: any }) => any;
  onClick?: (value: any) => any;
  required?: boolean | ((values: any) => boolean);
  formatter?: (e: any) => any;
  disabled?: boolean | ((values: any) => boolean);
  name: string;
}

export interface PaginationProps {
  limit?: number;
  page?: number;
  sortType: string;
  sortBy: string;
}


export interface SortProps {
  [t: string]: 'asc' | 'des';
}

export interface DeleteDialogProps<T> {
  isShow: boolean;
  onHide: () => any;
  onDelete: (entity: T) => any;
  title?: string;
  moduleName?: string;
  entity: T;
  idProperty?: string;
  bodyTitle?: string;
  confirmMessage?: string;
  deleteBtn?: string;
  cancelBtn?: string;
  loading?: boolean;
  deletingMessage?: string;
  error?: { error: string };
}

export interface DeleteDialogPromiseProps<T> {
  isShow: boolean;
  onHide: () => any;
  onDelete: (entity: T) => any;
  title?: string;
  moduleName?: string;
  entity: T;
  idProperty?: string;
  bodyTitle?: string;
  confirmMessage?: string;
  deleteBtn?: string;
  cancelBtn?: string;
  loading?: boolean;
  deletingMessage?: string;
  error?: string;
  deleteSuccess: any;
  deleteFail: any;
}

export interface ConfirmDialogProps {
  isShow: boolean;
  onSubmit: () => any;
  onHide: () => any;
  title?: string;
  moduleName?: string;
  idProperty?: string;
  bodyTitle?: string;
  confirmMessage?: string;
  confirmBtn?: string;
  cancelBtn?: string;
  loading?: boolean;
  error?: string;
}

export interface NotifyDialogProps {
  isShow: boolean;
  onHide: () => any;
  title?: string;
  moduleName?: string;
  bodyTitle?: string;
  notifyMessage?: string;
  cancelBtn?: string;
}

export interface DeleteManyDialogProps<T> {
  isShow: boolean;
  onHide: () => any;
  onDelete: (entities?: T[]) => any;
  selectedEntities: any[];
  title?: string;
  moduleName?: string;
  entity?: T;
  idProperty?: string;
  bodyTitle?: string;
  confirmMessage?: string;
  noSelectedEntityMessage?: string;
  deletingMessage?: string;
  deleteBtn?: string;
  cancelBtn?: string;
  loading?: boolean;
  error?: { error: string };
}

export interface ActionColumnProps<T> {
  onShowDetail?: (entity: T) => void;
  onDelete?: (entity: T) => void;
  onEdit?: (entity: T) => void;
  onLock?: (entity: T) => void;
  onChangeRole?: (entity: T) => void;
  onClone?: (entity: T) => void;
  onGoHistory?: (entity: T) => void;
  // onCreate: (entity?: T) => void;
  // onSelectMany: (entities: T[]) => void;
  // onDeleteMany?: () => any;
  // openEditDialog: any;
  // openDeleteDialog: any;
  // detailTitle: string;
  // editTitle: string;
  // deleteTitle: string;
}

export type InputType =
  'string'
  | 'string-number'
  | 'number'
  | 'date-time'
  | 'search-select'
  | 'file'
  | 'tree-select'
  | 'nested';
export type SearchModel = {
  [T: string]: {
    type: InputType;
    placeholder?: string;
    label: string | ReactElement;
    keyField?: string;
    disabled?: boolean | ((values: any) => boolean);
    selectField?: string;
    onSearch?: (e: any, values?: any) => any;
    onChange?: (value: any, props: { setFieldValue: ((name: string, value: any) => void), values: any }) => any;
    data?: any;
    name?: string;
    showTime?: boolean;
  };
};

export type MasterBodyColumns = {
  [T: string]: ColumnDescription
} | ColumnDescription[];

export type ModifyForm = { _header: (string | ((entity: any) => string)) } & Panels;

export type Panels = {
  [T: string]: ModifyPanel | string,
}
export type ModifyPanel = { _title: string, _validationField?: string } & InputGroups;

export type InputGroups = {
  [T: string]: ModifyInputGroup | string
};


export type ModifyInputGroup = InputGroupType & {
  _subTitle: string;
  _className?: string;
  _inputClassName?: string;
};

export type InputGroupType = { [T: string]: _ModifyModelInput | string }

export type _CommonProps = {
  label: string | ReactElement;
  placeholder?: string;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  value?: any;
  name?: string;
  formatter?: (e: any) => any;
  [T: string]: any;
  onChange?: (value: any, props: { setFieldValue: ((name: string, value: any) => void), setFieldTouched: ((name: string, value: boolean) => void), values: any }) => any;
}


export type GetAllPropsServer<T> = ({
                                      queryProps,
                                      sortList,
                                      paginationProps,
                                    }: {
  queryProps: any;
  sortList?: SortProps[];
  paginationProps?: PaginationProps;
}) => (Promise<AxiosResponse<{ data: T[], paging: any }>>);
export type _ModifyModelInput =
  ({ _type: 'object', [S: string]: any })
  | ({ _type: 'image', value?: any, pathField?: string, width?: string | number, height?: string | number } & _CommonProps)
  | ({ _type: 'file', value?: any } & _CommonProps)
  | ({ _type: 'string' | 'string-number' | 'email' | 'date-time' | 'number' | 'boolean' | 'tag' | 'gallery' } & _CommonProps)
  | ({ _type: 'custom', component: (value: any) => ReactElement })
  | ({ _type: 'radio', options: { value: any, label: string }[] | ((...props: any) => { value: any, label: string }[]); } & _CommonProps)
  | ({ _type: 'checkbox' } & _CommonProps)
  | ({ _type: 'search-select', onSearch: GetAllPropsServer<any> | GetAllProps<any>, keyField?: string, selectField?: string } & _CommonProps)
  | ({ _type: 'tree-select', onSearch: any, keyField?: string, selectField?: string } & _CommonProps)
  | ({ _type: 'select', onSearch: any, keyField?: string, selectField?: string } & _CommonProps)

export type GetAllProps<T> = ({
                                queryProps,
                                sortList,
                                paginationProps,
                              }: {
  queryProps: any;
  sortList?: SortProps[];
  paginationProps?: PaginationProps;
}, values?: any) => (Promise<{ code: number, data: any, success: boolean }>);

export type CountProps<T> = ({
                               queryProps,
                               sortList,
                               paginationProps,
                             }: {
  queryProps: any;
  sortList?: SortProps[];
  paginationProps?: PaginationProps;
}) => Promise<AxiosResponse>;
export type RenderInfoDetail = {
  header?: string;
  className?: string;
  titleClassName?: string;
  dataClassName?: string;
  style?: string;
  data: RenderInfoDetailColumn,
}[]
export type RenderInfoDetailColumn = {
  [T: string]: {
    title?: string;
    formatter?: (value: any | any[], entity?: any) => ReactElement;
    keyField?: string;
  }
}
export type GetProps<T> = (entity: T) => Promise<AxiosResponse>;
export type UpdateProps<T> = (entity: T) => Promise<AxiosResponse>;
export type ApproveProps<T> = (entity: T, data: T) => Promise<AxiosResponse>;
export type DeleteProps<T> = (entity: T) => Promise<AxiosResponse>;
export type CreateProps<T> = (entity: T) => Promise<AxiosResponse>;
export type DeleteManyProps<T> = (entities: T[]) => Promise<AxiosResponse>;
