import React, {useEffect, useMemo, useState} from 'react';
import {
  ConvertStatusToBoolean,
  ConvertStatusToString,
  InitMasterProps,
} from '../../common-library/helpers/common-function';
import MultiLevelSaleBody from './multi-sale-body';
import {TreeData} from './multilevel-sale.model';
import * as MultilevelSaleService from './multilevel-sale.service';
import {useIntl} from 'react-intl';
import {DefaultPagination, NormalColumn, SortColumn,} from '../../common-library/common-consts/const';
import {MultilevelSaleActionColumn} from './multilevel-action-column';
import ModifyEntityDialog from '../../common-library/common-components/modify-entity-dialog';
import {DeleteEntityDialog} from '../../common-library/common-components/delete-entity-dialog';
import {ModifyForm, ModifyInputGroup,} from '../../common-library/common-types/common-type';
import * as Yup from 'yup';
import {Route, Switch, useHistory} from 'react-router-dom';

const moduleName = 'MULTILEVEL_SALE.MODULE_NAME';
const deleteDialogTitle = 'MULTILEVEL_SALE.DELETE_DIALOG.TITLE';
const createTitle = 'MULTILEVEL_SALE.CREATE.TITLE';
const updateTitle = 'MULTILEVEL_SALE.UPDATE.TITLE';
const homeURL = `${window.location.pathname}`;

function MultilevelSale() {
  const intl = useIntl();
  
  const {
    entities,
    deleteEntity,
    setDeleteEntity,
    editEntity,
    setEditEntity,
    setCreateEntity,
    selectedEntities,
    setSelectedEntities,
    showDelete,
    setShowDelete,
    showEdit,
    setShowEdit,
    showCreate,
    setShowCreate,
    paginationProps,
    setPaginationProps,
    filterProps,
    loading,
    error,
    setError,
    add,
    update,
    deleteFn,
    getAll,
  } = InitMasterProps<TreeData>({
    getServer: MultilevelSaleService.Get,
    countServer: MultilevelSaleService.Count,
    createServer: MultilevelSaleService.Create,
    deleteServer: MultilevelSaleService.Delete,
    deleteManyServer: MultilevelSaleService.DeleteMany,
    getAllServer: MultilevelSaleService.GetAll,
    updateServer: MultilevelSaleService.Update,
  });
  
  const [agency, setAgency] = useState<any[]>([]);
  const [agencyTotal, setAgencyTotal] = useState(0);
  const [agencyLoading, setAgencyLoading] = useState(false);
  const [agencyParams, setAgencyParams] = useState({
    storeLevel: {
      _id: ''
    },
  });
  const [showdeleteAgency, setShowDeleteAgency] = useState(false);
  const [deleteAgency, setDeleteAgency] = useState<any>(null);
  const [refresh, setRefresh] = useState(false);
  const [errorAgency, setErrorAgency] = useState('');
  
  const history = useHistory();
  
  useEffect(() => {
    getAll({ ...filterProps });
  }, [filterProps, paginationProps]);
  
  useEffect(() => {
    setAgencyLoading(true);
    MultilevelSaleService.GetAgency({agencyParams: { ...agencyParams, type: '0' }, paginationProps})
      .then(res => {
        setAgency(res.data.data);
        setAgencyTotal(res.data.paging.total);
        setAgencyLoading(false);
        setErrorAgency('');
      })
      .catch(err => {
        console.log(err);
        setAgencyLoading(false);
        setErrorAgency(err.message);
      });
  }, [paginationProps, agencyParams, refresh]);
  
  const columns = {
    _id: {
      dataField: '_id',
      text: `${intl.formatMessage({id: 'ORDINAL'})}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      style: {paddingTop: 20},
    },
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'MULTILEVEL_SALE.MASTER.TABLE.CODE_AGENCY'})}`,
      ...SortColumn,
      classes: 'text-center',
    },
    name: {
      dataField: 'name',
      text: `${intl.formatMessage({id: 'MULTILEVEL_SALE.MASTER.TABLE.NAME_AGENCY'})}`,
      ...SortColumn,
      classes: 'text-center',
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: MultilevelSaleActionColumn,
      formatExtraData: {
        intl,
        onDelete: (entity: any) => {
          setDeleteAgency(entity);
          setErrorAgency('');
          setShowDeleteAgency(true);
          history.push(`/multilevel-sale/agency/${entity._id}/delete`);
        },
      },
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  };
  
  const MultilevelSaleSchema = Yup.object().shape({
    name: Yup.string()
      .test('Exists validate', 'MULTIVELEVEL_SALE_NAME_WAS_EXISTED', function (value) {
        if (editEntity) {
          const validArr = entities.filter(item => item._id !== editEntity._id);
          const index = validArr.findIndex(el => el.name === value);
          return index === -1;
        }
        
        const index = entities.findIndex(el => el.name === value);
        return index === -1;
      }),
  });
  
  const TreeBody = [
    {
      name: 'Cấp',
      title: 'MULTIVELEVEL_SALE_TREE_DATA',
      type: 'Tree',
      data: entities,
    },
    {
      name: 'Test',
      title: 'MULTIVELEVEL_SALE_AGENCY_DATA',
      type: 'Table',
      data: agency,
      prop: {
        columns: columns,
        total: agencyTotal,
        loading: agencyLoading,
        paginationParams: paginationProps,
        setPaginationParams: setPaginationProps,
        onSelectMany: setSelectedEntities,
        selectedEntities: selectedEntities,
      },
    },
  ];
  const [group1] = useState<ModifyInputGroup>({
    _subTitle: '',
    code: {
      _type: 'string',
      placeholder: intl.formatMessage({id: 'EMPTY'}),
      label: intl.formatMessage({id: 'MULTILEVEL_SALE.MASTER.CODE_COLUMN'}),
      disabled: true,
    },
    name: {
      _type: 'string',
      required: true,
      label: intl.formatMessage({id: 'MULTILEVEL_SALE.MASTER.NAME_COLUMN'}),
    },
    status: {
      _type: 'boolean',
      placeholder: intl.formatMessage({id: 'COMMON_STATUS'}),
      label: intl.formatMessage({id: 'COMMON_STATUS'}),
    },
  });
  
  const createForm = useMemo(
    (): ModifyForm => ({
      _header: createTitle,
      panel1: {
        _title: '',
        group1: group1,
      },
    }),
    [],
  );
  
  const updateForm = useMemo((): ModifyForm => ({...createForm, _header: updateTitle}), [
    createForm,
  ]);
  
  // const allFormField: any = {
  //   ...GenerateAllFormField(modifyModel),
  // };
  
  const onFetchAgency = (entity: any) => {
    setPaginationProps(DefaultPagination);
    setAgencyParams({storeLevel: {_id: entity._id}});
  };
  
  const onDeleteAgency = (entity: any) => {
    setAgencyLoading(true);
    MultilevelSaleService.DeleteAgency(entity)
      .then(() => {
        setAgencyLoading(false);
        setShowDeleteAgency(false);
        setRefresh(!refresh);
        setErrorAgency('');
      })
      .catch(err => {
        setAgencyLoading(false);
        setErrorAgency(err.message || err.reason);
      });
  };
  
  return (
    <React.Fragment>
      <Switch>
        <Route path="/multilevel-sale/:id/delete">
          {({history}) => (
            <DeleteEntityDialog
              moduleName={moduleName}
              entity={deleteEntity}
              onDelete={deleteFn}
              isShow={showDelete}
              loading={loading}
              error={error}
              onHide={() => {
                setShowDelete(false);
                history.push('/multilevel-sale');
              }}
              title={deleteDialogTitle}
            />
          )}
        </Route>
        <Route path="/multilevel-sale/agency/:id/delete">
          {({history}) => (
            <DeleteEntityDialog
              moduleName={moduleName}
              entity={deleteAgency}
              onDelete={onDeleteAgency}
              isShow={showdeleteAgency}
              loading={agencyLoading}
              error={{error: errorAgency}}
              onHide={() => {
                setShowDeleteAgency(false);
                history.push('/multilevel-sale');
              }}
              title={deleteDialogTitle}
            />
          )}
        </Route>
        <Route path="/multilevel-sale/new">
          {({history}) => (
            <ModifyEntityDialog
              show={showCreate}
              entity={{name: '', status: true}}
              validation={MultilevelSaleSchema}
              onModify={(values) => {

                if (editEntity) {
                  return add({parentId: editEntity._id, ...ConvertStatusToString(values)});
                } else {
                  return add(ConvertStatusToString(values));
                }
              }}
              onHide={() => {
                setShowCreate(false);
                history.push('/multilevel-sale');
              }}
              loading={loading}
              error={error}
              homePage={homeURL}
              formModel={createForm}
            />
          )}
        </Route>
        <Route path="/multilevel-sale/:id/edit">
          {({history}) => (
            <ModifyEntityDialog
              show={showEdit}
              entity={editEntity}
              validation={MultilevelSaleSchema}
              onModify={values => {
                console.log(values);
                if (editEntity) {
                  return update({parentId: editEntity._id, ...ConvertStatusToString(values)});
                } else {
                  return update(ConvertStatusToString(values));
                }
              }}
              loading={loading}
              onHide={() => {
                setShowEdit(false);
                history.push('/multilevel-sale');
              }}
              error={error}
              homePage={homeURL}
              formModel={updateForm}
            />
          )}
        </Route>
      </Switch>
      
      <Route path="/multilevel-sale">
        {({history}) => (
          <MultiLevelSaleBody
            title="MULTILEVEL_SALE"
            body={TreeBody}
            onCreate={(entity: any) => {
              setCreateEntity(null);
              setEditEntity(entity);
              setShowCreate(true);
              history.push(`/multilevel-sale/new`);
            }}
            onEdit={(entity: any) => {
              // get(entity);
              setEditEntity(ConvertStatusToBoolean(entity));
              setShowEdit(true);
              history.push(`/multilevel-sale/${entity._id}/edit`);
            }}
            onDelete={(entity: any) => {
              setError({error: ''});
              setDeleteEntity(entity);
              setShowDelete(true);
              history.push(`/multilevel-sale/${entity._id}/delete`);
            }}
            onFetchEntities={onFetchAgency}
          />
        )}
      </Route>
    </React.Fragment>
  );
}

export default MultilevelSale;
