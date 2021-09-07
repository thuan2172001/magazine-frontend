import _, {isArray, isEmpty} from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {DefaultPagination} from '../common-consts/const';
import {
  CountProps,
  CreateProps,
  DeleteManyProps,
  DeleteProps,
  GetAllPropsServer,
  GetProps,
  ModifyForm,
  UpdateProps,
} from '../common-types/common-type';
import {diff} from 'deep-object-diff';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useIntl} from "react-intl";
import {getFieldV3} from "../common-components/master-detail-page";

export const CapitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const GetCompareFunction = ({key, orderType}: { key: string, orderType: 1 | -1 }) => {
  return (a: any, b: any) => {
    const _a = key && key != '' ? getFieldV3(a, key)[0] : a;
    const _b = key && key != '' ? getFieldV3(b, key)[0] : b;
    if (_a === undefined) return -1 * orderType;
    if (_b === undefined) return 1 * orderType;
    if (_a < _b) {
      return -1 * orderType;
    }
    if (_a > _b) {
      return 1 * orderType;
    }
    return 0;
  }
}

export const RoleArrayToObject = (arr: string[]) => {
  const scopes: any = {};
  arr.forEach((item: string) => {
    const key = item.split('.')[0];
    if (!scopes[key]) scopes[key] = [];
    scopes[key].push(item);
  });
  return scopes;
}
export const RoleObjectToArray = (scopes?: any) => {
  return scopes ? Object.values(scopes).reduce((pre: any, cur: any) => {
    pre.push(...cur);
    return pre;
  }, []) : [];
}

const _initValues = ({inputs}: any): any => {
  return Object.keys(inputs).reduce((pre, key, k, o) => {
    const input = inputs[key];
    if (_.isString(input)) throw new Error('Sử dụng sai cách ' + key + '\n' + JSON.stringify(inputs));
    const name = key;
    switch (input._type) {
      case 'string':
      case 'email':
      case 'string-number':
      case 'number':
      case 'date-time':
      case 'radio':
      case 'boolean':
      case 'image':
      case 'tag':
      case 'checkbox':
      case 'custom':
        if (input.required) {
          return {...pre, [name]: ''}
        }
        return pre
      case 'search-select':
      case 'tree-select':
        if (input.required) {
          return {...pre, [name]: ''}
        }
        return pre;
      case 'object':
        const {_type, _subTitle, _className, _inputClassName, ...innt} = input as any;
        const s = name === '' ? _initValues({inputs: innt}) : {[name]: _initValues({inputs: innt})};
        return _.merge(pre, s);
    }
  }, {} as any);
}
export const InitValues = (formModel: ModifyForm) => {
  const result = {};
  const {_header, ...modifyPanels} = formModel;
  Object.keys(modifyPanels).map((key, index, keys) => {
    const val = modifyPanels[key];
    if (_.isString(val))
      throw new Error('Sử dụng sai cách ' + key + '\n' + JSON.stringify(modifyPanels));
    const {_title, ...panel} = val;
    const {_subTitle, ...pl} = panel;
    pl && Object.values(pl).map((inputGroup, index) => {
      if (_.isString(inputGroup)) throw new Error('Sử dụng sai cách ' + inputGroup + '\n' + JSON.stringify(pl));
      const {_subTitle, _className, _inputClassName, ...inputs} = inputGroup;
      _.merge(result, _initValues({inputs}));
    })
  })
  return result;
}

export const GetFieldCSSClasses = (touched: any, errors: any) => {
  const classes = ['form-control'];
  
  if (touched && errors) classes.push('is-invalid');
  
  if (touched && !errors) classes.push('');
  
  return classes.join(' ');
};

export const GetClassName = (labelWidth: number | null | undefined, labelStart: boolean) => {
  const classes: string[] = [];
  
  if (labelStart) {
    if (labelWidth == 0) classes.push('hidden');
    if (labelWidth != null) {
      classes.push(`col-xl-${labelWidth}`);
      classes.push(`col-md-${labelWidth}`);
      classes.push('col-12');
    } else {
      classes.push(`col-xl-4`);
      classes.push(`col-md-4`);
      classes.push('col-12');
    }
  } else {
    if (labelWidth != null) {
      if (labelWidth == 12) classes.push('hidden');
      classes.push(`col-xl-${12 - labelWidth}`);
      classes.push(`col-md-${12 - labelWidth}`);
      classes.push('col-12');
    } else {
      classes.push(`col-xl-8`);
      classes.push(`col-md-8`);
      classes.push('col-12');
    }
  }
  
  return classes.join(' ');
};

export const deCapitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

export const generateInitForm = (modifyModel: any, initField?: string, initData?: string) => {
  const initValue = {} as any;
  
  Object.keys(modifyModel).map(key => {
    if (modifyModel[key].type === 'string') {
      initValue[key] = '';
    } else if (modifyModel[key].type === 'number') {
      initValue[key] = undefined;
    } else if (modifyModel[key].type === 'SearchSelect') {
      initValue[key] = null;
    } else if (modifyModel[key].type === 'Datetime') {
      initValue[key] = null;
    } else if (modifyModel[key].type === 'image') {
      initValue[key] = []
    } else if (modifyModel[key].type === 'boolean') {
      initValue[key] = true
    } else if (modifyModel[key].type === 'radioGroup') {
      initValue[key] = [];
    } else if (modifyModel[key].type === 'display') {
      initValue[key] = '';
    } else if (modifyModel[key].type === 'stateSelect') {
      initValue[key] = '';
    } else if (modifyModel[key].type === 'citySelect') {
      initValue[key] = '';
    } else if (modifyModel[key].type === 'districtSelect') {
      initValue[key] = '';
    } else if (modifyModel[key].type === 'option') {
      key === 'gender' ? initValue[key] = '1' : initValue[key] = '0' // male gender
    }
      // else {
    //   initValue[key] = '';
    else if (modifyModel[key].type === 'object') {
      // initValue[key] = {}
      initValue[key] = generateInitForm(modifyModel[key].data)
      // console.log(generateInitForm(modifyModel[key].data))
      // Object.keys(modifyModel[key]).map(childKey => {
      //   if (modifyModel[key][childKey].type === 'string') {
      //     initValue[key][childKey] = ''
      //   } else if (modifyModel[key][childKey].type === 'number') {
      //     initValue[key][childKey] = undefined
      //   }
      // })
    }
    
  });
  
  if (initField && initData) {
    initValue[initField] = initData;
  }
  
  return initValue;
};

export const getOnlyFile = (arr: any[]) => {
  const fileArray: any[] = [];
  
  arr.forEach(values => {
    fileArray.push(values.file);
  });
  
  return fileArray;
};

export const getOnlyBase64 = (arr: any[]) => {
  const base64Array: any[] = [];
  
  arr.forEach(values => {
    base64Array.push(values.data_url);
  });
  
  return base64Array;
};

export const getNewImage = (prevArr: any[], currentArr: any[]) => {
  const newArr: any[] = [];
  prevArr = prevArr ?? [];
  if (prevArr.length === 0) {
    return currentArr;
  }
  
  currentArr.forEach((curEl: any) => {
    const index = prevArr.findIndex(prevEl => isEmpty(diff(curEl, prevEl)));
    
    if (index === -1) {
      newArr.push(curEl);
    }
  });
  
  return newArr;
};

export const getNewFile = (prevArr: any[], currentArr: any[]) => {
  const newArr: any[] = [];
  prevArr = prevArr ?? [];
  if (prevArr.length === 0) {
    return currentArr;
  }

  currentArr.forEach((curEl: any) => {
    const index = prevArr.findIndex(prevEl => isEmpty(diff(curEl, prevEl)));

    if (index === -1) {
      newArr.push(curEl);
    }
  });

  return newArr;
};


export const GenerateAllFormField = (...params: any) => {
  
  let fieldForm: any = {};
  
  params.forEach((value: any) => {
    if (isArray(value)) {
      // fieldForm = {...fieldForm, ...Object.assign({}, ...value)}
      value.forEach((item: any) => {
        fieldForm = {...fieldForm, ...item.data}
      })
    }
  })
  
  return fieldForm;
}

export const GetHomePage = (url: string) => {
  
  const index = url.lastIndexOf('/')
  
  if (index === -1) return window.location.pathname;
  
  const homeURL: string = url.slice(0, index)
  
  return homeURL;
}

export const getField = (field: any, fieldName: string) => {
  if (fieldName.indexOf('.') === -1) {
    return field[fieldName]
  }
  
  const arrName = fieldName.split('.')
  
  if (!field[arrName[0]]) return;
  
  let fields: any = field[arrName[0]]
  
  arrName.forEach((el: string, key: number) => {
    if (key > 0) {
      if (fields[el]) {
        fields = fields[el]
      }
    }
    
  })
  
  return fields
}

export const getFieldV2 = (field: any, fieldName: string[]) => {
  
  if (!field[fieldName[0]]) return;
  
  let fields: any = field[fieldName[0]]
  
  fieldName.forEach((el: string, key: number) => {
    if (key > 0) {
      if (fields[el]) {
        fields = fields[el]
      }
    }
    
  })
  
  return fields
}
export const ToDataURL = (url: string) =>
  fetch(url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }),
    );
export const ConvertStatusToBoolean = (data: any) => {
  return data.status && typeof data.status === 'string' ? {...data, status: data.status === "1" ? 'true' : 'false'} : data;
}

export const ConvertStatusToString = (data: any) => {
  return (typeof data.status === 'boolean' || typeof data.status === 'string') ? {
    ...data,
    status: (data.status === true || data.status === "true") ? "1" : "0"
  } : data;
}

export function InitMasterProps<T>({
                                     getAllServer,
                                     countServer,
                                     getServer,
                                     createServer,
                                     updateServer,
                                     deleteServer,
                                     deleteManyServer,
                                   }: {
  getAllServer: GetAllPropsServer<T>;
  getServer: GetProps<T>;
  countServer: CountProps<T>;
  createServer: CreateProps<T>;
  updateServer: UpdateProps<T>;
  deleteServer: DeleteProps<T>;
  deleteManyServer: DeleteManyProps<T>;
}) {
  const intl = useIntl();
  const [entities, setEntities] = useState<T[]>([]);
  const [deleteEntity, setDeleteEntity] = useState<T>(null as any);
  const [editEntity, setEditEntity] = useState<T | null>({} as any);
  const [createEntity, setCreateEntity] = useState<T | null>({} as any);
  const [selectedEntities, setSelectedEntities] = useState<T[]>([]);
  const [detailEntity, setDetailEntity] = useState<T>(null as any);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDeleteMany, setShowDeleteMany] = useState(false);
  const [paginationProps, setPaginationProps] = useState(DefaultPagination);
  const [filterProps, setFilterProps] = useState({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false)
  const [error, setError] = useState({error: ''});
  
  const notifyError = useCallback((error: string) => {
    const getError = (error: string): string | ({ message: string, additional: string }[]) => {
      try {
        return JSON.parse(error)
      } catch (e) {
        return error
      }
    };
    const _innerError = getError(error);
    
    toast.error(_.isString(_innerError) ? intl.formatMessage({id: _innerError ?? 'COMMON_COMPONENT.TOAST.DEFAULT_ERROR'}, {additional: ''}) :
      (<span>{_innerError.map((e, index) => (
        (<span key={`abc${index}`} style={{display: 'block'}}>{intl.formatMessage({id: e.message}, e)}</span>)
      ))}</span>)
      , {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }, []);
  const notifySuccess = useCallback((message?: string) => {
    toast.success(intl.formatMessage({id: message ?? 'COMMON_COMPONENT.TOAST.DEFAULT_SUCCESS'}), {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);
  useEffect(() => {
    setError({error: ''});
  }, [showDetail, showDeleteMany, showDelete]);
  
  useEffect(() => {
    setSelectedEntities(selectedEntities.filter((t: any) => entities.some((e: any) => e._id === t._id)));
  }, [entities]);
  
  const dispatch = useDispatch();
  useEffect(() => {
    if (error.error !== '') {
      notifyError(error.error);
    }
  }, [error]);
  const getAll = useCallback(
    (filterProps?) => {
      setLoading(true);
      return getAllServer({paginationProps, queryProps: filterProps})
        .then(getAllResponse => {
          // countServer(filterProps).then(countResponse => {
          //   setEntities(getAllResponse.data);
          //   setLoading(false);
          //   setTotal(countResponse.data);
          // });
          const data: any = getAllResponse.data;
          setEntities(data.data ??  data);
          setLoading(false);
          setSpinning(false);
          setTotal(data.paging ? data.paging.total : 5);
          // notifySuccess();
        })
        .catch(error => {
          setError({error: error.message || error.response.data || JSON.stringify(error)});
          setSpinning(false)
          setLoading(false);
          throw error;
        });
    },
    [getAllServer, paginationProps],
  );
  
  const refreshData = useCallback(() => {
    // setPaginationProps({ ...paginationProps, page: 1 });
    setShowDelete(false);
    setShowDetail(false);
    setShowEdit(false);
    setShowDeleteMany(false);
    setShowCreate(false);
    setSelectedEntities([]);
    setLoading(false);
    setSpinning(false);
    setFilterProps({});
    setError({error: ''})
  }, []);
  
  const deleteFn = useCallback((entity: T) => {
    setLoading(true);
    return deleteServer(entity)
      .then((e) => {
        refreshData();
        notifySuccess('COMMON_COMPONENT.TOAST.DELETE_SUCCESS');
        return e;
      })
      .catch(error => {
        setError({error: error.message || error.response.data || JSON.stringify(error)});
        setLoading(false);
        throw error;
      });
  }, []);
  
  const deleteMany = useCallback((entities?: T[]) => {
    setLoading(true);
    return deleteManyServer(entities ?? selectedEntities)
      .then((e) => {
        refreshData();
        notifySuccess('COMMON_COMPONENT.TOAST.DELETE_SUCCESS');
        return e;
      })
      .catch(error => {
        console.log(error)
        setError({error: error.message || error.response.data || JSON.stringify(error)});
        setLoading(false);
        throw error;
      });
  }, []);
  
  const get = useCallback((entity: T) => {
    return getServer(entity)
      .then(res => {
        setDetailEntity(res.data);
        setEditEntity(res.data);
        // notifySuccess('COMMON_COMPONENT.TOAST.GET_SUCCESS');
        return res;
      })
      .catch(error => {
        setError({error: error.message || error.response.data || JSON.stringify(error)});
        throw error;
      });
  }, []);
  const update = useCallback((entity: T) => {
    setLoading(true);
    return updateServer(entity)
      .then((e) => {
        refreshData();
        notifySuccess('COMMON_COMPONENT.TOAST.UPDATE_SUCCESS');
        return e;
      })
      .catch(error => {
        setError({error: error.message || error.response.data || JSON.stringify(error)});
        throw error;
      }).finally(() => {
        setLoading(false);
      });
  }, []);
  
  const add = useCallback((entity: T) => {
    setLoading(true);
    return createServer(entity)
      .then((e) => {
        refreshData();
        notifySuccess('COMMON_COMPONENT.TOAST.ADD_SUCCESS');
        return e;
      })
      .catch(error => {
        setError({error: error.message || error.response.data || JSON.stringify(error)});
        throw error;
      }).finally(() => {
        setLoading(false);
      });
  }, []);
  
  return {
    entities,
    setEntities,
    deleteEntity,
    setDeleteEntity,
    editEntity,
    setEditEntity,
    createEntity,
    setCreateEntity,
    selectedEntities,
    setSelectedEntities,
    detailEntity,
    setDetailEntity,
    showDelete,
    setShowDelete,
    showEdit,
    setShowEdit,
    showCreate,
    setShowCreate,
    showDetail,
    setShowDetail,
    showDeleteMany,
    setShowDeleteMany,
    paginationProps,
    setPaginationProps,
    filterProps,
    setFilterProps,
    total,
    setTotal,
    loading,
    setLoading,
    error,
    setError,
    add,
    update,
    get,
    intl,
    spinning,
    setSpinning,
    deleteMany,
    deleteFn,
    getAll,
    refreshData,
    notifySuccess,
    notifyError,
  };
}
