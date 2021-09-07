import React, { ReactElement } from 'react';
import { Card, CardHeader, CardBody } from '../../common-library/card';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { SortOrder } from 'react-bootstrap-table-next';
import { DefaultPagination } from '../../common-library/common-consts/const';
import { AxiosResponse } from 'axios';
import { MasterTable } from '../../common-library/common-components/master-table';

interface Prop {
  columns: { [X: string]: any };
  code: string;
  history: any;
  title: string | ReactElement;
  onFetch: (code: string, params: any) => Promise<AxiosResponse<any>>;
  sortField: { dataField: any; order: SortOrder };
  setSortField: (sortField: { dataField: any; order: string }) => void
}

function CustomersManagementView({ columns, code, history, title, onFetch }: Prop) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [entity, setEntity] = React.useState<{ [X: string]: any }[]>([]);
  const [paginationProps, setPaginationProps] = React.useState(DefaultPagination);
  const [total, setTotal] = React.useState(0)
  const [orderCode, setOrderCode] = React.useState('')

  React.useEffect(() => {
    setLoading(true);
    onFetch(code, { ...paginationProps })
      .then(res => {
        setEntity(res.data.data ? res.data.data : res.data.products);
        setTotal(res.data?.paging?.total)
        setOrderCode(res.data?.code || res.data?.customer?.code || 'CHI TIẾT')
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, paginationProps]);

  console.log(paginationProps)

  return (
    <Card>
      <CardHeader
        title={
          <>
            <span onClick={() => history.goBack()} className=" cursor-pointer text-primary font-weight-boldest">
              <ArrowBackIosIcon /> {orderCode}
            </span>
          </>
        }
      />
      <CardBody>
        <div className="mt-8 mb-10">
          <span className="text-primary detail-dialog-subtitle">{title} {orderCode}</span>
        </div>
        {/* <BootstrapTable
            wrapperClasses="table-responsive"
            bordered={false}
            classes="table table-head-custom table-vertical-center overflow-hidden noBorderOnClick"
            bootstrap4
            remote
            keyField="_id"
            data={entity}
            columns={Object.values(columns)}
            defaultSorted={SortDefault as any}
            sort={sortField}
            onTableChange={(type: string, state: any) => {
              console.log(state)
              if (type === 'sort') {
                setSortField({ dataField: state.sortField, order: state.sortOrder })
              }
            }}
          >
            <PleaseWaitMessage entities={entity} />
            <NoRecordsFoundMessage entities={entity} />
          </BootstrapTable> */}
            <MasterTable
              entities={entity}
              columns={columns}
              total={total}
              loading={loading}
              paginationParams={paginationProps}
              setPaginationParams={setPaginationProps}
            />
      </CardBody>
    </Card>
  );
}

export default CustomersManagementView;
