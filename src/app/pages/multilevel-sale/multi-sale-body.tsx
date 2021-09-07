import React, {Fragment} from 'react';
import {useIntl} from 'react-intl';
import {Card, CardBody, CardHeader} from '../../common-library/card';
import {MasterTable} from '../../common-library/common-components/master-table';
import MasterTreeStructure from '../../common-library/common-components/master-tree-structure';
import {MultilevelSaleBodyProp} from './multilevel-sale.model';
import AddIcon from '@material-ui/icons/Add';
import './style/multilevel-sale.scss';

const MultiLevelSaleBody: React.FC<MultilevelSaleBodyProp> = ({
  title,
  body,
  onCreate,
  onEdit,
  onDelete,
  onFetchEntities,
}) => {
  const intl = useIntl();
  
  return (
    <Card>
      {title && <CardHeader title={intl.formatMessage({id: title})}/>}
      <CardBody>
        {/* <div className="row no-gutters mb-10">
          <div className="col-md-6 col-12">
            <MasterTreeStructure data={data} />
          </div>
        </div> */}
        <div className="row no-gutters mb-10 justify-content-between">
          {body.map((item: any, key: number) => {
            switch (item.type) {
              case 'Tree':
                return (
                  <Fragment key={key}>
                    <div className={`col-xl-${12 / body.length} col-12 pr-xl-3`}>
                      <div className="p-5 layout">
                        {
                          item.title && (
                            <p style={{fontWeight: 'bold'}}>
                              {intl.formatMessage({id: item.title})}
                              <span
                                className="text-primary"
                                style={{cursor: 'pointer'}}
                                onClick={() => {
                                  if (onCreate) {
                                    onCreate(null);
                                  }
                                }}>
                                <AddIcon/>
                              </span>
                            </p>
                          )
                        }
                        <MasterTreeStructure
                          data={item.data}
                          onCreate={onCreate}
                          onEdit={onEdit}
                          onDelete={onDelete}
                          onFetchEntities={onFetchEntities}
                        />
                      </div>
                    </div>
                  </Fragment>
                );
              
              case 'Table':
                return (
                  <Fragment key={key}>
                    <div className={`col-xl-${12 / body.length} col-12 pl-xl-3`}>
                      <div className="p-5 layout">
                        {
                          item.title && (
                            <p style={{fontWeight: 'bold'}}>
                              {intl.formatMessage({id: item.title})}
                            </p>
                          )
                        }
                        <MasterTable
                          entities={item.data}
                          columns={item.prop.columns}
                          total={item.prop.total}
                          loading={item.prop.loading}
                          paginationParams={item.prop.paginationParams}
                          setPaginationParams={item.prop.setPaginationParams}
                        />
                      </div>
                    </div>
                  </Fragment>
                );
            }
            return <></>;
          })}
        </div>
      </CardBody>
    </Card>
  );
};

export default MultiLevelSaleBody;
